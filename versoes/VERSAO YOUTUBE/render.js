// Gera o PDF a partir do HTML e, opcionalmente, PNGs de cada página para revisão.
// Uso: node render.js [pasta-de-previews]
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await page.goto('file://' + path.join(__dirname, 'ebook-cozinha-mamede.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  // Avisa se o conteúdo de alguma página invade o rodapé.
  const overflow = await page.$$eval('.page', ps => ps.map((p, i) => {
    const c = p.querySelector('.content');
    const f = p.querySelector('footer');
    const last = [...c.children].pop();
    if (!last) return null;
    const top = p.getBoundingClientRect().top;
    const bottom = last.getBoundingClientRect().bottom - top;
    const limit = (f ? f.getBoundingClientRect().top - top : p.clientHeight) - 4;
    return bottom > limit ? `página ${i + 1}: passou ${Math.round(bottom - limit)}px` : null;
  }).filter(Boolean));
  console.log(overflow.length ? overflow.join('\n') : 'nenhuma página estourou');

  await page.pdf({
    path: path.join(__dirname, 'ebook-cozinha-mamede.pdf'),
    format: 'A4', printBackground: true, preferCSSPageSize: true,
  });

  const out = process.argv[2];
  if (out) {
    const els = await page.$$('.page');
    for (let i = 0; i < els.length; i++) {
      await els[i].screenshot({ path: path.join(out, `p${String(i + 1).padStart(2, '0')}.png`) });
    }
  }
  await browser.close();
})();
