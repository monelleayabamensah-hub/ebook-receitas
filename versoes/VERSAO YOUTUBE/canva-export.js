// Separa cada página do ebook em camadas para montar a versão editável (Canva):
//   - fundo sem texto (círculos, quadros, faixas de tabela)
//   - traçados laranja (PNG transparente)
//   - cada ilustração (PNG transparente)
//   - cada bloco de texto, com posição, fonte, cor e trechos coloridos
// Uso: node canva-export.js <pasta-de-saída>
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCALE = 3; // resolução das imagens (3x = ~290 dpi em A4)
const TEXT_SEL = 'h1, h2, p, ol.dots li > span, ul.bul li, ul.check li, ol.steps li > span, th, td, footer span';
const ART_SEL = '.illu-corner, .opener-illu, .recipe-illu, .cover-illu, .back-illu';

(async () => {
  const out = process.argv[2];
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: SCALE });
  await page.goto('file://' + path.join(__dirname, 'ebook-cozinha-mamede.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // páginas empilhadas sem margem, para as coordenadas baterem
  await page.addStyleTag({ content: '.page { margin: 0 !important; }' });

  const data = await page.evaluate(({ TEXT_SEL, ART_SEL }) => {
    const pages = [...document.querySelectorAll('.page')];
    return pages.map((pg) => {
      const pr = pg.getBoundingClientRect();
      const rel = (r) => ({ x: r.left - pr.left, y: r.top - pr.top, w: r.width, h: r.height });

      const blocks = [];
      const chosen = [...pg.querySelectorAll(TEXT_SEL)].filter((el) => !el.closest('svg'));
      for (const el of chosen) {
        if (chosen.some((o) => o !== el && o.contains(el))) continue;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const box = {
          x: r.left - pr.left + parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth),
          y: r.top - pr.top + parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth),
          w: r.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth),
          h: r.height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom),
        };
        const runs = [];
        const walk = (node) => {
          for (const n of node.childNodes) {
            if (n.nodeType === 3) {
              const p = n.parentElement;
              const s = getComputedStyle(p);
              let t = n.textContent.replace(/\s+/g, ' ');
              if (s.textTransform === 'uppercase') t = t.toUpperCase();
              if (t) runs.push({ t, color: s.color, family: s.fontFamily, weight: s.fontWeight, size: parseFloat(s.fontSize), ls: s.letterSpacing });
            } else if (n.nodeType === 1) {
              if (n.tagName === 'svg') continue;
              if (n.tagName === 'BR') { runs.push({ br: true }); continue; }
              const d = getComputedStyle(n).display;
              if (d === 'block' && runs.length) runs.push({ br: true });
              walk(n);
            }
          }
        };
        walk(el);
        // limpa espaços nas pontas e em volta das quebras
        const clean = [];
        for (const rn of runs) {
          if (rn.br) { const last = clean[clean.length - 1]; if (last && last.br) continue; if (last && !last.br) last.t = last.t.replace(/ $/, ''); clean.push(rn); continue; }
          const prev = clean[clean.length - 1];
          if (!prev || prev.br) rn.t = rn.t.replace(/^ /, '');
          if (rn.t) clean.push(rn);
        }
        while (clean.length && clean[clean.length - 1].br) clean.pop();
        if (clean.length && !clean[clean.length - 1].br) clean[clean.length - 1].t = clean[clean.length - 1].t.replace(/ $/, '');
        if (!clean.some((rn) => rn.t && rn.t.trim())) continue;
        blocks.push({
          box, runs: clean,
          align: cs.textAlign,
          lineHeight: parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2,
        });
      }

      const art = [...pg.querySelectorAll(ART_SEL)].map((el) => {
        const svg = el.querySelector('svg');
        return { box: rel(svg.getBoundingClientRect()), svg: svg.outerHTML };
      });
      const swirls = pg.querySelector('.swirls').outerHTML;
      return { blocks, art, swirls };
    });
  }, { TEXT_SEL, ART_SEL });

  // Fundo de cada página: sem texto, sem traçados e sem ilustrações
  await page.addStyleTag({ content: `
    .page *:not(svg):not(svg *) { color: transparent !important; text-decoration: none !important; }
    .swirls, ${ART_SEL} { visibility: hidden !important; }` });
  const els = await page.$$('.page');
  for (let i = 0; i < els.length; i++) {
    await els[i].screenshot({ path: path.join(out, `p${i + 1}-fundo.png`) });
  }

  // Traçados e ilustrações como PNG transparente
  const art = await browser.newPage({ deviceScaleFactor: SCALE });
  const shot = async (svg, w, h, file) => {
    await art.setViewportSize({ width: Math.ceil(w), height: Math.ceil(h) });
    await art.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg', `<svg width="${w}" height="${h}" style="display:block"`)}</body></html>`);
    await art.screenshot({ path: file, omitBackground: true });
  };
  for (let i = 0; i < data.length; i++) {
    await shot(data[i].swirls.replace(/class="swirls"/, ''), 794, 1123, path.join(out, `p${i + 1}-tracados.png`));
    for (let k = 0; k < data[i].art.length; k++) {
      const a = data[i].art[k];
      await shot(a.svg, a.box.w, a.box.h, path.join(out, `p${i + 1}-ilustracao${k + 1}.png`));
    }
    delete data[i].swirls;
    data[i].art.forEach((a) => delete a.svg);
  }
  fs.writeFileSync(path.join(out, 'layout.json'), JSON.stringify(data));
  console.log(`${data.length} páginas exportadas`);
  await browser.close();
})();
