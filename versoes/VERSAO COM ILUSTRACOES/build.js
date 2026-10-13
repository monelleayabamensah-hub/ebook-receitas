// Gera o ebook (Versão com ilustrações): node build.js
// Saídas: ebook.html e Cozinha-Mamede.pdf
//
// Conteúdo: conteudo.js (o mesmo da VERSAO COM FOTOGRAFIAS).
// Identidade visual: a da primeira versão ilustrada (fundo creme, verde floresta,
// cenoura, tomate, sol e kiwi; títulos em Barlow Condensed, texto em Short
// Stack, traçados soltos, círculos numerados e ilustrações chapadas).
//
// Cada página é uma folha A4 fixa. Se o conteúdo não couber, o build avisa
// qual página estourou.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");
const c = require("./conteudo");
const { cores: K, ILU } = require("./ilustracoes");

const ROOT = __dirname;
const SAIDA_PDF = path.join(ROOT, "Cozinha-Mamede.pdf");
const SAIDA_HTML = path.join(ROOT, "ebook.html");
const pad = (n) => String(n).padStart(2, "0");

// ─────────────────────────────────────────── traçados soltos (da primeira versão ilustrada)
const TRACOS = {
  tr: "M112 16 C136 10 166 12 174 22 C180 30 170 36 166 29 C162 22 176 16 186 24 C196 32 200 58 194 80 C190 92 182 92 184 84 C186 76 196 80 197 92 C199 110 196 132 200 156",
  bl: "M7 196 C12 216 15 240 12 258 C10 268 3 268 5 260 C7 252 16 258 20 266 C26 280 52 290 96 292 C106 292 110 286 104 285 C98 284 98 294 118 295",
  tl: "M2 36 C8 22 18 13 36 9 C48 6 53 13 47 15 C40 17 40 6 54 4 C80 0 118 3 150 2",
  br: "M200 172 C192 198 196 222 190 240 C186 250 178 248 180 240 C182 232 194 236 195 248 C196 262 200 280 206 297",
  r: "M204 40 C190 70 206 92 198 118 C194 130 184 128 186 120 C188 112 200 116 200 130 C200 160 190 190 204 230",
};
const COMBOS = [["tr", "bl"], ["tl", "br"], ["r", "bl"], ["tl", "r"], ["tr", "br"]];
const tracos = (keys) =>
  `<svg class="tracos" viewBox="0 0 210 297" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${keys
    .map((k) => `<path d="${TRACOS[k]}" fill="none" stroke="${K.CENOURA}" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>`)
    .join("")}</svg>`;

// ─────────────────────────────────────────── blocos de texto
const SUBLINHADO = `<svg class="sub" viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M3 7 C50 4 120 4 197 6" fill="none" stroke="${K.SOL}" stroke-width="5" stroke-linecap="round"/></svg>`;
const h2 = (t) => `<h2>${SUBLINHADO}<span>${t}</span></h2>`;
const pontos = (itens) => `<ol class="pontos">${itens.map((t, i) => `<li><span class="bola">${i + 1}</span><span class="txt">${t}</span></li>`).join("")}</ol>`;
const bolinhas = (itens, cls = "") => `<ul class="bolinhas ${cls}">${itens.map((t) => `<li><span class="bk"></span><span class="txt">${t}</span></li>`).join("")}</ul>`;
const rotulados = (itens) => `<ol class="rotulados">${itens.map(([r, t], i) => `<li><span class="bola">${i + 1}</span><span class="rot">${r}</span><span class="txt">${t}</span></li>`).join("")}</ol>`;
const tabela = (cab, linhas) =>
  `<table><thead><tr>${cab.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${linhas
    .map((l) => `<tr>${l.map((x) => `<td>${x}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
const destaque = (t) => `<p class="destaque">${t}</p>`;
// Imagens do ChatGPT: se existir imagens/<arquivo>.png (ou .jpg/.webp), ela
// entra no lugar da ilustração provisória em SVG.
const imagem = (arq) => ["png", "jpg", "jpeg", "webp"].map((e) => `imagens/${arq}.${e}`).find((f) => fs.existsSync(path.join(ROOT, f)));
const ilu = (nome, cls, arq = nome) => {
  const img = imagem(arq);
  return `<div class="ilu ${cls}">${img ? `<img src="${img}" alt="">` : ILU[nome]()}</div>`;
};
const segredo = (t) => `<div class="segredo"><p class="seg-tit">Segredo de chef</p><p>${t}</p></div>`;

// ─────────────────────────────────────────── folhas
const folhas = [];
const destino = {};
const folha = (html, { cls = "", id = null, semRodape = false } = {}) => {
  folhas.push({ html, cls, semRodape });
  if (id) destino[id] = folhas.length;
  return folhas.length;
};
const ICONES = ["abobora", "banana", "frango", "mandioca", "cenoura"];
const NOMES_CURTOS = ["Abóbora", "Banana", "Frango", "Mandioca", "Cenoura"];

// Capa
folha(
  `<p class="kicker">ebook de receitas</p>
   <h1 class="capa-titulo"><span class="l1">Cozinha</span><span class="l2">Mamede</span></h1>
   <div class="capa-grade">
     <div>${h2("5 ingredientes")}${pontos(c.capitulos.map((x) => x.nome))}</div>
     ${ilu("tigelaCapa", "capa-ilu", "capa")}
   </div>
   <p class="capa-promessa"><span class="grande">15 transformações.</span><br>Um novo jeito de olhar para a sua cozinha.</p>
   <p class="capa-sub">Técnica de chef, sabor afetivo e aproveitamento integral, da casca à semente, com o que você já compra toda semana.</p>
   <p class="capa-autor">por ${c.autor.toUpperCase()}</p>`,
  { cls: "capa", semRodape: true }
);

const paginaSumario = folha("@@SUMARIO@@");

// Introdução
folha(
  `${ilu("talheres", "canto pequeno")}
   <p class="kicker">Introdução</p>
   <h1 class="com-arte">Um novo jeito de olhar para a sua cozinha</h1>
   ${c.proposta.map((p, i) => `<p class="${i === 0 ? "lead" : ""}">${p}</p>`).join("")}
   ${destaque("Pare de fazer sempre a mesma comida do mesmo jeito.")}
   <p class="assinatura">${c.autor}</p>`,
  { id: "proposta" }
);

// O jeito Mamede
folha(
  `<p class="kicker">O método</p>
   <h1>O jeito Mamede de cozinhar</h1>
   <p class="lead">O método que guia todo o material se apoia em três fundamentos.</p>
   ${rotulados(c.fundamentos.map((f) => [f.nome, f.texto]))}
   ${destaque("Afeto, técnica e aproveitamento. Nessa ordem, em todo prato.")}
   ${h2("Como usar este guia")}
   <p>Cada um dos 5 capítulos é dedicado a um ingrediente e segue a mesma jornada:</p>
   ${tabela(["Etapa", "O que você encontra"], c.jornada.map((j) => [j.nome, j.texto]))}
   <p class="medidas"><span class="rot-inline">Medidas:</span> 1 xícara = 240 ml · 1 colher (sopa) = 15 ml · 1 colher (chá) = 5 ml · forno sempre preaquecido.</p>`,
  { id: "jeito" }
);

// Capítulos
c.capitulos.forEach((cap, ci) => {
  const n = ci + 1;
  const icone = ICONES[ci];
  const pagAbertura = folha("", { id: `cap${n}` });

  folha(
    `<p class="kicker">Capítulo ${pad(n)} · ${NOMES_CURTOS[ci]}</p>
     <h1>O ingrediente</h1>
     ${cap.ingrediente.map((p) => `<p>${p}</p>`).join("")}
     ${h2("Antes da panela")}
     <h3>Na hora de escolher</h3>${bolinhas(cap.antes.escolha)}
     <h3>Como guardar</h3>${bolinhas(cap.antes.armazenamento)}
     <h3>Pré-preparo e cortes</h3>${bolinhas(cap.antes.cortes)}`
  );

  const pagsReceitas = cap.receitas.map((r, i) => {
    const ingr = r.ingredientes.map((g) => `${g.grupo ? `<h3>${g.grupo}</h3>` : ""}${bolinhas(g.itens, "ingr")}`).join("");
    return folha(
      `${ilu(icone, "canto pequeno", `r${n}-${i + 1}`)}
       <p class="kicker">Transformação ${pad(i + 1)} · ${NOMES_CURTOS[ci]}</p>
       <h1 class="receita-titulo com-arte">${r.nome}</h1>
       <p class="meta">${r.rotulo} · ${r.rende} · ${r.tempo}</p>
       ${r.subtitulo ? `<p class="subtitulo">(${r.subtitulo})</p>` : ""}
       ${h2("Ingredientes")}
       <div class="duas-colunas">${ingr}</div>
       ${h2("Modo de preparo")}
       ${pontos(r.preparo)}
       ${segredo(r.dica)}`,
      { id: `r${n}-${i + 1}`, cls: "receita" }
    );
  });

  folha(
    `${ilu("frigideira", "canto pequeno")}
     <p class="kicker">O pulo do chef · ${NOMES_CURTOS[ci]}</p>
     <h1 class="com-arte">${cap.pulo.titulo}</h1>
     ${h2("O erro")}
     <p>${cap.pulo.erro}</p>
     ${h2("A técnica")}
     ${pontos(cap.pulo.tecnica)}
     ${h2("Não tem isso?")}
     ${tabela(["Se não tiver…", "Use…"], cap.substituicoes)}`
  );

  folha(
    `${ilu("pote", "canto baixo", `aproveita${n}`)}
     <p class="kicker">Aproveita isso também · ${NOMES_CURTOS[ci]}</p>
     <h1>Nada vai para o lixo</h1>
     ${cap.aproveita.map((a) => `${h2(a.nome)}<p>${a.texto}</p>`).join("")}`,
    { cls: "aproveita" }
  );

  folhas[pagAbertura - 1].html = `
    <p class="kicker">Capítulo ${pad(n)}</p>
    <h1>${cap.nome}</h1>
    <p class="meta">${cap.apelido}</p>
    ${ilu(icone, "abertura-ilu", `cap${n}`)}
    <p class="lead">${cap.porQue}</p>
    ${h2("3 transformações")}
    <ol class="pontos indice">${cap.receitas
      .map((r, i) => `<li><span class="bola">${i + 1}</span><a class="txt" href="#p${pagsReceitas[i]}"><span class="rotulo-receita">${r.rotulo}</span><span class="nome-receita">${r.nome}</span></a><i class="pontilhado"></i><span class="num">${pad(pagsReceitas[i])}</span></li>`)
      .join("")}</ol>`;
});

// Bônus (duas páginas)
[c.pulos.slice(0, 5), c.pulos.slice(5)].forEach((grupo, gi) => {
  folha(
    `${gi === 0 ? ilu("talheres", "canto pequeno") : ""}
     <p class="kicker">Bônus${gi ? " · continuação" : ""}</p>
     <h1 class="com-arte">${gi === 0 ? "Os 10 pulos do Mamede" : "Mais 5 pulos do Mamede"}</h1>
     ${gi === 0 ? `<p class="lead">Dez decisões universais de cozinha, que valem para qualquer ingrediente e qualquer receita.</p>` : ""}
     <ol class="pulos">${grupo
       .map((p, i) => `<li><span class="bola">${gi * 5 + i + 1}</span><div><p class="pulo-tit">${p.titulo}</p><p>${p.texto}</p></div></li>`)
       .join("")}</ol>
     ${gi === 1 ? destaque("Chef é quem olha para o básico e enxerga possibilidades.") : ""}`,
    { id: gi === 0 ? "bonus" : null }
  );
});

// Encerramento
folha(
  `${ilu("tigelaCapa", "fim-ilu", "capa")}
   <h1 class="capa-titulo pequeno"><span class="l1">Cozinha</span> <span class="l2">Mamede</span></h1>
   ${c.encerramento.map((p) => `<p>${p}</p>`).join("")}
   <p class="capa-autor fim">Bom apetite! · ${c.autor.toUpperCase()}</p>`,
  { cls: "fim", id: "fim", semRodape: true }
);

// Sumário
const entradas = [
  ["proposta", "Introdução"],
  ["jeito", "O jeito Mamede de cozinhar"],
  ...c.capitulos.map((cap, i) => [`cap${i + 1}`, cap.nome, cap.receitas.map((r, k) => [`r${i + 1}-${k + 1}`, r.nome])]),
  ["bonus", "Bônus: os 10 pulos do Mamede"],
  ["fim", "Para seguir cozinhando"],
];
folhas[paginaSumario - 1].html = `
  <h1>Sumário</h1>
  <ol class="pontos sumario">${entradas
    .map(([id, nome, subs], k) => {
      const linha = `<li><span class="bola">${k + 1}</span><a class="txt" href="#p${destino[id]}">${nome}</a><i class="pontilhado"></i><span class="num">${pad(destino[id])}</span></li>`;
      const sub = (subs || []).map(([sid, sn]) => `<li class="sub"><a class="txt" href="#p${destino[sid]}">${sn}</a><i class="pontilhado"></i><span class="num">${pad(destino[sid])}</span></li>`).join("");
      return linha + sub;
    })
    .join("")}</ol>`;

// ─────────────────────────────────────────── HTML
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<title>${c.titulo}</title>
<link rel="stylesheet" href="estilo.css">
</head><body>
${folhas
  .map(
    (f, i) => `<section class="folha ${f.cls}" id="p${i + 1}">
  ${tracos(COMBOS[i % COMBOS.length])}
  <div class="conteudo">${f.html}</div>
  ${f.semRodape ? "" : `<footer class="rodape"><span>COZINHA MAMEDE</span><span>${pad(i + 1)}</span></footer>`}
</section>`
  )
  .join("\n")}
</body></html>`;

(async () => {
  fs.writeFileSync(SAIDA_HTML, html);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + SAIDA_HTML, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const estouros = await page.evaluate(() =>
    [...document.querySelectorAll(".folha .conteudo")]
      .map((el, i) => ({ pagina: i + 1, sobra: el.scrollHeight - el.clientHeight }))
      .filter((x) => x.sobra > 1)
  );
  for (const e of estouros) console.warn(`⚠ Página ${e.pagina}: conteúdo passa ${e.sobra}px do limite`);
  await page.pdf({ path: SAIDA_PDF, preferCSSPageSize: true, printBackground: true });
  await browser.close();
  const total = execFileSync("pdfinfo", [SAIDA_PDF], { encoding: "utf8" }).match(/Pages:\s+(\d+)/)[1];
  console.log(`OK: ${path.basename(SAIDA_PDF)} (${total} páginas)`);
  if (estouros.length) process.exitCode = 1;
})();
