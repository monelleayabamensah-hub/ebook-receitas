// Gera a versão editável para o Canva: node canva.js  (rode `python3 build.py` antes)
// Saída: Cozinha-Mamede-Canva.pptx
//
// Lê o layout já renderizado de ebook.html e recria cada página A4 como um slide:
// cada bloco de texto vira uma caixa de texto editável, cartões, painéis e bordas
// viram formas, as fotos viram imagens redondas e a estampa de cada página vira o
// fundo do slide. No Canva: Criar design → Importar
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

// Barlow Condensed tem um nome de fonte por peso (nomes usados no Canva)
// Fraunces SemiBold e DM Sans Medium têm nome próprio; Bold e Regular usam o nome da família
const fonteCanva = (r) => {
  if (r.fonte === "Fraunces") {
    if (r.peso >= 700) return { fontFace: "Fraunces", bold: true };
    if (r.peso >= 600) return { fontFace: "Fraunces SemiBold", bold: false };
    return { fontFace: "Fraunces", bold: false };
  }
  if (r.fonte === "DM Sans") {
    if (r.peso >= 700) return { fontFace: "DM Sans", bold: true };
    if (r.peso >= 500) return { fontFace: "DM Sans Medium", bold: false };
    return { fontFace: "DM Sans", bold: false };
  }
  return { fontFace: r.fonte, bold: r.negrito };
};

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

  return [...document.querySelectorAll(".pagina")].map((folha) => {
    const base = folha.getBoundingClientRect();
    const box = (r) => ({ x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height });
    const itens = [];
    const bgp = getComputedStyle(folha).backgroundImage.match(/url\("?(.*?)"?\)/);
    itens.fundoPagina = bgp ? bgp[1] : null;
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
            negrito: parseInt(cs.fontWeight) >= 600, peso: parseInt(cs.fontWeight), italico: cs.fontStyle === "italic",
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

    // fotos com o texto contornando (float): o parágrafo ao lado vira duas caixas,
    // uma estreita ao lado da foto e outra larga abaixo dela
    const flutuantes = [...folha.querySelectorAll(".foto-flutua")].map((f) => f.getBoundingClientRect());
    const dividirAoRedor = (el, cs) => {
      if (el.childNodes.length !== 1 || el.firstChild.nodeType !== 3) return false;
      const er = el.getBoundingClientRect();
      const f = flutuantes.find((q) => q.top < er.bottom && q.bottom > er.top && q.left > er.left);
      if (!f) return false;
      const no = el.firstChild, t = no.textContent;
      const r = document.createRange();
      const topo = (i) => { r.setStart(no, i); r.setEnd(no, i + 1); return r.getBoundingClientRect().top; };
      // primeiro caractere numa linha que começa abaixo da foto
      let k = -1;
      for (let i = 0; i < t.length; i++) { if (t[i] !== " " && topo(i) >= f.bottom - 2) { k = i; break; } }
      const tam = parseFloat(cs.fontSize), lh = parseFloat(cs.lineHeight) || tam * 1.25;
      const run = (txt) => ({ t: txt, fonte: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(), tam, cor: rgb(cs.color)?.hex || "000000",
        negrito: parseInt(cs.fontWeight) >= 600, peso: parseInt(cs.fontWeight), italico: cs.fontStyle === "italic", esp: 0 });
      const parteA = k === -1 ? t : t.slice(0, k), parteB = k === -1 ? "" : t.slice(k);
      const yB = k === -1 ? er.bottom : topo(k);
      const larguraA = f.left - er.left - 2;
      const linhasDe = (y0, y1) => { const rg = document.createRange(); rg.selectNodeContents(el);
        return new Set([...rg.getClientRects()].filter((q) => q.width > 0 && q.top >= y0 - 1 && q.bottom <= y1 + 1).map((q) => Math.round(q.top))).size; };
      itens.push({ tipo: "texto", x: er.left - base.left, y: er.top - base.top, w: larguraA, h: yB - er.top + 2,
        runs: [run(parteA.trim())], alinh: "left", lh, linhas: linhasDe(er.top, yB), tam });
      if (parteB.trim()) itens.push({ tipo: "texto", x: er.left - base.left, y: yB - base.top, w: er.width, h: er.bottom - yB + 2,
        runs: [run(parteB.trim())], alinh: "left", lh, linhas: linhasDe(yB, er.bottom), tam });
      return true;
    };

    const texto = (el, cs) => {
      if (flutuantes.length && dividirAoRedor(el, cs)) return;
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
        runs: runsDe(el), alinh: alinh === "justify" ? "left" : alinh, lh, linhas, tam,
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
      } else if (parseFloat(ps.borderTopWidth) > 0 && rgb(ps.borderTopColor)) {
        itens.push({ tipo: "forma", x: x - base.left, y: y - base.top, w: parseFloat(ps.width) + 2 * parseFloat(ps.borderTopWidth),
          h: parseFloat(ps.height) + 2 * parseFloat(ps.borderTopWidth), fill: null, raio: parseFloat(ps.borderTopLeftRadius) || 0,
          borda: { w: parseFloat(ps.borderTopWidth), cor: rgb(ps.borderTopColor).hex, estilo: "solid" } });
      } else if (rgb(ps.backgroundColor)) {
        const w = parseFloat(ps.width), h = parseFloat(ps.height);
        itens.push({ tipo: "forma", x: x - base.left, y: y - base.top, w, h, fill: rgb(ps.backgroundColor), elipse: true });
      }
    };

    const visitar = (el) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      const r = el.getBoundingClientRect();
      if (el.tagName === "IMG") {
        itens.push({ tipo: "img", ...box(r), src: el.src });
        return;
      }
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
    return { itens, fundo: itens.fundoPagina };
  });
}

(async () => {
  if (!fs.existsSync(HTML)) throw new Error("Rode `node build.js` antes.");
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1, viewport: { width: 1000, height: 1130 } });
  await page.goto("file://" + HTML, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const folhas = await page.evaluate(extrair);

  // fundo de cada página: a estampa recortada no formato A4, como aparece no ebook
  const fundos = new Map();
  const tela = await browser.newPage({ deviceScaleFactor: 1.35, viewport: { width: 800, height: 1130 } });
  for (const f of folhas) {
    if (!f.fundo || fundos.has(f.fundo)) continue;
    const pos = f.fundo.includes("creme-laranja") ? "100% 100%" : "cover";
    const dados = fs.readFileSync(require("url").fileURLToPath(f.fundo)).toString("base64");
    await tela.setContent(`<html><body style="margin:0"><div id="f" style="width:210mm;height:297mm;background:url('data:image/jpeg;base64,${dados}') center / ${pos} no-repeat"></div></body></html>`);
    await tela.waitForTimeout(150);
    fundos.set(f.fundo, (await tela.locator("#f").screenshot({ type: "jpeg", quality: 78 })).toString("base64"));
  }
  await browser.close();

  const pres = new PptxGenJS();
  pres.defineLayout({ name: "A4", width: 210 / 25.4, height: 297 / 25.4 });
  pres.layout = "A4";

  pres.title = "Cozinha Mamede";
  pres.author = "Chef Allan Mamede";

  folhas.forEach(({ itens, fundo }) => {
    const s = pres.addSlide();
    if (fundo) s.background = { data: "image/jpeg;base64," + fundos.get(fundo) };
    for (const it of itens) {
      if (it.tipo === "forma") {
        const arq = it.foto && (it.foto.startsWith("file:") ? require("url").fileURLToPath(it.foto) : path.join(ROOT, it.foto));
        if (arq && fs.existsSync(arq)) {
          // foto redonda: aro creme por baixo e a foto por cima, um pouco menor
          const b = it.borda ? it.borda.w : 0;
          if (b) s.addShape(pres.ShapeType.ellipse, { x: it.x * PX, y: it.y * PX, w: it.w * PX, h: it.h * PX, fill: { color: it.borda.cor }, line: { type: "none" } });
          const iw = (it.w - 2 * b) * PX, ih = (it.h - 2 * b) * PX;
          s.addImage({ path: arq, x: (it.x + b) * PX, y: (it.y + b) * PX, w: iw, h: ih, rounding: it.elipse, sizing: { type: "cover", w: iw, h: ih } });
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
      } else if (it.tipo === "img") {
        s.addImage({ path: require("url").fileURLToPath(it.src), x: it.x * PX, y: it.y * PX, w: it.w * PX, h: it.h * PX });
      } else if (it.tipo === "icone") {
        s.addImage({ data: "image/png;base64," + it.png, x: it.x * PX, y: it.y * PX, w: it.w * PX, h: it.h * PX });
      } else if (it.tipo === "texto") {
        const runs = it.runs.map((r, i) => {
          if (r.br) return { text: "", options: { breakLine: true } };
          return {
            text: r.t,
            options: {
              ...fonteCanva(r), fontSize: +(r.tam * PT).toFixed(1), color: r.cor, italic: r.italico,
              charSpacing: r.esp ? +(r.esp * PT).toFixed(2) : undefined,
            },
          };
        });
        // Uma linha: caixa centrada na linha, com espaçamento natural da fonte.
        // Várias linhas: espaçamento exato; títulos com entrelinha apertada
        // descem um pouco, porque o PowerPoint/Canva sobe a primeira linha.
        const o = { x: it.x * PX, w: it.w * PX, margin: 0, align: it.alinh, isTextBox: true, fit: "none", wrap: true };
        if (it.linhas === 1 || !it.linhas) {
          const h = Math.max(it.h, (it.tam || it.lh) * 1.3);
          Object.assign(o, { y: (it.y + it.h / 2 - h / 2) * PX, h: h * PX, valign: "middle" });
        } else {
          const aperto = it.lh < it.tam * 1.15 ? (it.tam * 1.2 - it.lh) * 0.5 : 0;
          Object.assign(o, { y: (it.y + aperto) * PX, h: (it.h + aperto) * PX, valign: "top", lineSpacing: +(it.lh * PT).toFixed(1) });
        }
        s.addText(runs, o);
      }
    }
  });

  await pres.writeFile({ fileName: SAIDA });
  console.log(`OK: ${path.basename(SAIDA)} (${folhas.length} páginas)`);
})();
