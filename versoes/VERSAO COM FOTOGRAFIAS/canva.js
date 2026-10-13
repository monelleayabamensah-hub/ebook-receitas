// Gera a versão editável para o Canva: node canva.js  (rode `node build.js` antes)
// Saída: Cozinha-Mamede-Canva.pptx
//
// Lê o layout já renderizado de ebook.html e recria cada página A4 como um slide:
// cada bloco de texto vira uma caixa de texto editável, fundos e bordas viram
// formas, e os ícones viram imagens PNG. No Canva: Criar design → Importar
// arquivo → escolha o .pptx.

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const PptxGenJS = require("pptxgenjs");

const ROOT = __dirname;
const HTML = path.join(ROOT, "ebook.html");
const SAIDA = path.join(ROOT, "Cozinha-Mamede-Canva.pptx");
const PX = 1 / 96; // px → polegadas
const PT = 0.75; // px → pt

// Executado dentro da página: descreve cada folha como uma lista de elementos.
function extrair() {
  const rgb = (s) => {
    const m = s && s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = 1] = m[1].split(",").map((x) => parseFloat(x));
    if (a === 0) return null;
    return { hex: [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase(), a };
  };
  const fonte = (cs) => cs.fontFamily.split(",")[0].replace(/["']/g, "").trim();
  const inline = (el) => ["inline", "inline-block"].includes(getComputedStyle(el).display) || el.tagName === "BR";

  return [...document.querySelectorAll(".folha")].map((folha) => {
    const base = folha.getBoundingClientRect();
    const box = (r) => ({ x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height });
    const itens = [];
    let icone = 0;

    const fundo = (el, cs, r) => {
      const bg = rgb(cs.backgroundColor);
      const img = cs.backgroundImage;
      const raio = parseFloat(cs.borderTopLeftRadius) || 0;
      const lados = ["Top", "Right", "Bottom", "Left"].map((l) => ({
        lado: l, w: parseFloat(cs[`border${l}Width`]) || 0, cor: rgb(cs[`border${l}Color`]), estilo: cs[`border${l}Style`],
      })).filter((b) => b.w > 0 && b.cor && b.estilo !== "none");
      const igual = lados.length === 4 && lados.every((b) => b.w === lados[0].w && b.cor.hex === lados[0].cor.hex);
      const sombra = cs.boxShadow !== "none";
      let fill = bg;
      if (!fill && img.includes("radial-gradient")) fill = { hex: "F4EEE4", a: 1 };
      const foto = img.match(/url\("?(.*?)"?\)/);
      if (fill || igual || foto) {
        itens.push({
          tipo: "forma", ...box(r), fill, raio, elipse: (cs.borderTopLeftRadius.endsWith("%") && raio >= 50) || raio >= Math.min(r.width, r.height) / 2 - 0.5,
          borda: igual ? { w: lados[0].w, cor: lados[0].cor.hex, estilo: lados[0].estilo } : null,
          sombra, foto: foto ? foto[1] : null,
        });
      }
      if (!igual) {
        for (const b of lados) {
          const L = { Top: [r.left, r.top, r.right, r.top], Bottom: [r.left, r.bottom, r.right, r.bottom], Left: [r.left, r.top, r.left, r.bottom], Right: [r.right, r.top, r.right, r.bottom] }[b.lado];
          itens.push({ tipo: "linha", x1: L[0] - base.left, y1: L[1] - base.top, x2: L[2] - base.left, y2: L[3] - base.top, w: b.w, cor: b.cor.hex, estilo: b.estilo });
        }
      }
    };

    const runsDe = (el) => {
      const runs = [];
      const walk = (n) => {
        if (n.nodeType === 3) {
          const p = n.parentElement, cs = getComputedStyle(p);
          let t = n.textContent.replace(/\s+/g, " ");
          if (!t) return;
          if (cs.textTransform === "uppercase") t = t.toUpperCase();
          runs.push({
            t, fonte: fonte(cs), tam: parseFloat(cs.fontSize), cor: rgb(cs.color)?.hex || "000000",
            negrito: parseInt(cs.fontWeight) >= 600, italico: cs.fontStyle === "italic",
            esp: parseFloat(cs.letterSpacing) || 0,
          });
        } else if (n.tagName === "BR") runs.push({ br: true });
        else if (n.nodeType === 1 && getComputedStyle(n).display !== "none") n.childNodes.forEach(walk);
      };
      el.childNodes.forEach(walk);
      // apara espaços nas pontas e nas quebras de linha
      for (let i = 0; i < runs.length; i++) {
        if (runs[i].br) continue;
        const ant = runs[i - 1], prox = runs[i + 1];
        if (!ant || ant.br) runs[i].t = runs[i].t.replace(/^ /, "");
        if (!prox || prox.br) runs[i].t = runs[i].t.replace(/ $/, "");
      }
      return runs.filter((r) => r.br || r.t);
    };

    const texto = (el, cs) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const rects = [...range.getClientRects()].filter((q) => q.width > 0 && q.height > 0);
      if (!rects.length) return;
      const linhas = new Set(rects.map((q) => Math.round(q.top))).size;
      const rr = range.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const pl = parseFloat(cs.paddingLeft), pr = parseFloat(cs.paddingRight);
      let x, w;
      const alinh = { center: "center", right: "right", end: "right", justify: "justify" }[cs.textAlign] || "left";
      if (linhas > 1) { x = er.left + pl; w = er.width - pl - pr; }
      else {
        const folga = Math.max(rr.width * 0.12, 12);
        if (alinh === "center") { x = rr.left - folga / 2; w = rr.width + folga; }
        else if (alinh === "right") { x = rr.left - folga; w = rr.width + folga; }
        else { x = rr.left; w = rr.width + folga; }
      }
      const tam = parseFloat(cs.fontSize);
      const lh = cs.lineHeight === "normal" ? tam * 1.25 : parseFloat(cs.lineHeight);
      itens.push({
        tipo: "texto", x: x - base.left, y: rr.top - base.top, w, h: rr.height + 2,
        runs: runsDe(el), alinh: alinh === "justify" ? "left" : alinh, lh,
      });
    };

    const pseudo = (el, er) => {
      const ps = getComputedStyle(el, "::before");
      if (!ps || ps.content === "none" || ps.position !== "absolute") return;
      const x = er.left + parseFloat(ps.left), y = er.top + parseFloat(ps.top);
      const conteudo = ps.content.replace(/^"|"$/g, "");
      if (conteudo) {
        itens.push({ tipo: "texto", x: x - base.left, y: y - base.top, w: 14, h: parseFloat(ps.lineHeight) || 14, alinh: "left",
          lh: parseFloat(ps.lineHeight) || parseFloat(ps.fontSize) * 1.3,
          runs: [{ t: conteudo, fonte: fonte(ps), tam: parseFloat(ps.fontSize), cor: rgb(ps.color).hex, negrito: parseInt(ps.fontWeight) >= 600 }] });
      } else if (rgb(ps.backgroundColor)) {
        const w = parseFloat(ps.width), h = parseFloat(ps.height);
        itens.push({ tipo: "forma", x: x - base.left, y: y - base.top, w, h, fill: rgb(ps.backgroundColor), elipse: true });
      }
    };

    const visitar = (el) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      const r = el.getBoundingClientRect();
      if (el.tagName.toLowerCase() === "svg") {
        el.setAttribute("data-icone", String(++icone));
        itens.push({ tipo: "icone", ...box(r), id: icone });
        return;
      }
      if (el !== folha) fundo(el, cs, r);
      pseudo(el, r);
      const filhos = [...el.children];
      const temTexto = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (temTexto && filhos.every(inline) && !el.querySelector("svg")) { texto(el, cs); return; }
      filhos.forEach(visitar);
    };
    visitar(folha);
    folha.querySelectorAll("svg").forEach((s) => s.setAttribute("data-folha", folha.id));
    return itens;
  });
}

(async () => {
  if (!fs.existsSync(HTML)) throw new Error("Rode `node build.js` antes.");
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 4, viewport: { width: 800, height: 1130 } });
  await page.goto("file://" + HTML, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const folhas = await page.evaluate(extrair);

  // ícones → PNG transparente, desenhados isolados numa página vazia
  // (com cache para ícones repetidos)
  const cache = new Map();
  const tela = await browser.newPage({ deviceScaleFactor: 4 });
  for (let f = 0; f < folhas.length; f++) {
    for (const it of folhas[f].filter((i) => i.tipo === "icone")) {
      const info = await page.locator(`#p${f + 1} svg[data-icone="${it.id}"]`).evaluate((s) => ({
        svg: s.outerHTML.replace(/ data-[a-z]+="[^"]*"/g, ""), cor: getComputedStyle(s).color,
      }));
      const chave = info.svg + info.cor + it.w.toFixed(1) + it.h.toFixed(1);
      if (!cache.has(chave)) {
        await tela.setContent(`<html><body style="margin:0;background:transparent"><div id="i" style="width:${it.w}px;height:${it.h}px;color:${info.cor}">${info.svg.replace("<svg", '<svg width="100%" height="100%"')}</div></body></html>`);
        cache.set(chave, (await tela.locator("#i").screenshot({ omitBackground: true })).toString("base64"));
      }
      it.png = cache.get(chave);
    }
  }
  await browser.close();

  const pres = new PptxGenJS();
  pres.defineLayout({ name: "A4", width: 210 / 25.4, height: 297 / 25.4 });
  pres.layout = "A4";
  pres.title = "Cozinha Mamede";
  pres.author = "Chef Allan Mamede";

  folhas.forEach((itens) => {
    const s = pres.addSlide();
    s.background = { color: "F7F2EA" };
    for (const it of itens) {
      if (it.tipo === "forma") {
        const arq = it.foto && (it.foto.startsWith("file:") ? require("url").fileURLToPath(it.foto) : path.join(ROOT, it.foto));
        if (arq && fs.existsSync(arq)) {
          s.addImage({ path: arq, x: it.x * PX, y: it.y * PX, w: it.w * PX, h: it.h * PX, rounding: it.elipse, sizing: { type: "cover", w: it.w * PX, h: it.h * PX } });
          continue;
        }
        const opts = { x: it.x * PX, y: it.y * PX, w: it.w * PX, h: it.h * PX };
        opts.fill = it.fill ? { color: it.fill.hex, transparency: Math.round((1 - it.fill.a) * 100) } : { type: "none" };
        opts.line = it.borda ? { color: it.borda.cor, width: it.borda.w * PT, dashType: it.borda.estilo === "dotted" ? "sysDot" : "solid" } : { type: "none" };
        if (it.sombra) opts.shadow = { type: "outer", color: "50401E", opacity: 0.18, blur: 14, offset: 6, angle: 90 };
        let tipo = pres.ShapeType.rect;
        if (it.elipse) tipo = pres.ShapeType.ellipse;
        else if (it.raio > 0) { tipo = pres.ShapeType.roundRect; opts.rectRadius = Math.min(0.5, (it.raio * PX) / Math.min(opts.w, opts.h)); }
        s.addShape(tipo, opts);
      } else if (it.tipo === "linha") {
        const x = Math.min(it.x1, it.x2), y = Math.min(it.y1, it.y2);
        s.addShape(pres.ShapeType.line, {
          x: x * PX, y: y * PX, w: Math.abs(it.x2 - it.x1) * PX, h: Math.abs(it.y2 - it.y1) * PX,
          line: { color: it.cor, width: Math.max(0.5, it.w * PT), dashType: it.estilo === "dotted" ? "sysDot" : it.estilo === "dashed" ? "dash" : "solid" },
        });
      } else if (it.tipo === "icone") {
        s.addImage({ data: "image/png;base64," + it.png, x: it.x * PX, y: it.y * PX, w: it.w * PX, h: it.h * PX });
      } else if (it.tipo === "texto") {
        const runs = it.runs.map((r, i) => {
          if (r.br) return { text: "", options: { breakLine: true } };
          return {
            text: r.t,
            options: {
              fontFace: r.fonte, fontSize: +(r.tam * PT).toFixed(1), color: r.cor, bold: r.negrito, italic: r.italico,
              charSpacing: r.esp ? +(r.esp * PT).toFixed(2) : undefined,
            },
          };
        });
        s.addText(runs, {
          x: it.x * PX, y: it.y * PX, w: it.w * PX, h: it.h * PX, margin: 0, valign: "top", align: it.alinh,
          lineSpacing: +(it.lh * PT).toFixed(1), isTextBox: true, fit: "none", wrap: true,
        });
      }
    }
  });

  await pres.writeFile({ fileName: SAIDA });
  console.log(`OK: ${path.basename(SAIDA)} (${folhas.length} páginas)`);
})();
