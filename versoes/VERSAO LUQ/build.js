// Gera o ebook: node build.js
// Saídas: ebook.html (pré-visualização) e Cozinha-Mamede.pdf
//
// Cada página é uma "folha" A4 de tamanho fixo. Se o conteúdo de alguma folha
// não couber, o build avisa qual é — aí é só encurtar o texto em conteudo.js.
//
// Fotos (opcional): coloque imagens na pasta fotos/ e indique no conteudo.js
// (campo `foto` do capítulo ou da receita, ou `fotoCapa`). Sem foto, o espaço
// mostra uma ilustração do ingrediente num prato.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");
const c = require("./conteudo");

const ROOT = __dirname;
const SAIDA_PDF = path.join(ROOT, "Cozinha-Mamede.pdf");
const SAIDA_HTML = path.join(ROOT, "ebook.html");
const pad = (n) => String(n).padStart(2, "0");

// ─────────────────────────────────────────── ícones (traço simples)
const svg = (d, vb = 48) =>
  `<svg viewBox="0 0 ${vb} ${vb}" fill="none" stroke="currentColor" stroke-width="${vb === 48 ? 2 : 3}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I = {
  abobora: svg(`<path d="M60 34c-6-10-2-18 6-22"/><path d="M66 22c8-6 18-4 22 2"/><path d="M60 36c-22-6-46 6-46 34s20 38 46 38 46-10 46-38-24-40-46-34z"/><path d="M60 36c-10 8-14 22-14 36s4 28 14 36"/><path d="M60 36c10 8 14 22 14 36s-4 28-14 36"/><path d="M38 40c-10 8-14 18-14 30s4 24 14 32"/><path d="M82 40c10 8 14 18 14 30s-4 24-14 32"/>`, 120),
  banana: svg(`<path d="M92 18l6-6"/><path d="M90 20c10 30 2 66-30 82-14 7-30 6-40-2 22 2 40-8 52-26 10-16 14-34 12-50z"/><path d="M90 20c-4 26-14 48-34 62"/><path d="M20 100c-2-4 0-8 4-8"/>`, 120),
  frango: svg(`<path d="M70 52c14-14 34-12 38 4 4 18-12 34-30 34-10 0-14-4-20-10z"/><path d="M58 80L30 96"/><path d="M30 96c-6 0-12-2-14 4-2 5 3 9 8 8 0 5 4 9 9 6 5-3 3-9 0-12"/><path d="M78 58c6-4 14-4 18 2"/>`, 120),
  mandioca: svg(`<path d="M22 30c10-8 22-6 32 4l44 50c6 8 6 16 0 22-6 4-12 2-20-4L30 64c-12-10-16-24-8-34z"/><path d="M22 30c-4-6-8-8-12-6"/><path d="M38 44l10 4"/><path d="M52 60l12 2"/><path d="M68 78l10 2"/><path d="M98 106c4 4 8 6 12 4"/>`, 120),
  cenoura: svg(`<path d="M76 44c8 8 8 18 0 26L30 108c-6 4-12-2-8-8L56 44c8-8 14-8 20 0z"/><path d="M76 44c4-14 10-24 22-30"/><path d="M80 48c10-6 22-8 32-4"/><path d="M78 46c2-12 0-24-8-32"/><path d="M48 62l8 6"/><path d="M38 80l8 6"/><path d="M60 72l6 4"/>`, 120),
  chapeu: svg(`<path d="M14 30c-6-1-9-6-8-11 1-6 8-9 13-6 1-5 6-8 11-7 4 0 7 3 8 6 5-2 11 1 11 7 1 5-3 10-9 11"/><path d="M14 29v10h26V29"/><path d="M14 35h26"/>`),
  relogio: svg(`<circle cx="24" cy="24" r="17"/><path d="M24 14v10l7 5"/>`),
  pessoas: svg(`<circle cx="18" cy="17" r="6"/><path d="M7 38c0-7 5-12 11-12s11 5 11 12"/><circle cx="33" cy="19" r="5"/><path d="M31 27c6 0 10 4 10 11"/>`),
  prato: svg(`<circle cx="24" cy="26" r="13"/><circle cx="24" cy="26" r="8"/><path d="M6 10v8a3 3 0 0 0 6 0v-8M9 18v22"/><path d="M42 10c-4 2-5 7-5 12h5v18"/>`),
  coracao: `<svg viewBox="0 0 48 48" fill="currentColor"><path d="M24 41S6 30 6 17c0-6 5-10 10-10 4 0 7 2 8 5 1-3 4-5 8-5 5 0 10 4 10 10 0 13-18 24-18 24z"/></svg>`,
  coracaoL: svg(`<path d="M24 41S6 30 6 17c0-6 5-10 10-10 4 0 7 2 8 5 1-3 4-5 8-5 5 0 10 4 10 10 0 13-18 24-18 24z"/>`),
  faca: svg(`<path d="M8 40L34 14c3-3 7-3 8 0 1 2 0 4-2 6L18 42"/><path d="M8 40l6 2"/><path d="M28 20l4 4"/>`),
  folha: svg(`<path d="M10 38C10 20 22 9 40 8c0 18-10 30-28 30z"/><path d="M10 38l16-16"/>`),
  lupa: svg(`<circle cx="21" cy="21" r="12"/><path d="M30 30l10 10"/>`),
  cesta: svg(`<path d="M6 20h36l-4 20H10z"/><path d="M14 20l6-12M34 20l-6-12"/><path d="M18 26v8M24 26v8M30 26v8"/>`),
  panela: svg(`<path d="M8 20h32v12a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8z"/><path d="M4 22h4M40 22h4"/><path d="M18 14c0-3 2-3 2-6M26 14c0-3 2-3 2-6"/>`),
  raio: svg(`<path d="M27 5L11 27h12l-3 16 17-23H25z"/>`),
  troca: svg(`<path d="M8 16h28l-6-6"/><path d="M40 32H12l6 6"/>`),
  recicla: svg(`<path d="M24 6l7 12h-14z"/><path d="M38 34l-7 12-7-12z" transform="rotate(0)"/><path d="M10 34h14l-7 12z"/><path d="M17 18l-8 14M31 18l8 14M17 40h14"/>`),
  pote: svg(`<rect x="10" y="14" width="28" height="28" rx="4"/><path d="M8 8h32v6H8z"/><path d="M16 24h16"/>`),
  estrela: svg(`<path d="M24 5l5.6 12 13 1.4-9.7 8.8 2.7 12.8L24 33.5 12.4 40l2.7-12.8L5.4 18.4l13-1.4z"/>`),
  balao: svg(`<path d="M8 10h32v22H22l-9 8v-8H8z"/><path d="M16 19h16M16 25h10"/>`),
};

// ─────────────────────────────────────────── utilitários de layout
const fotoExiste = (f) => f && fs.existsSync(path.join(ROOT, f));
const prato = (icone, foto, cls = "") =>
  fotoExiste(foto)
    ? `<div class="prato com-foto ${cls}" style="background-image:url('${foto}')"></div>`
    : `<div class="prato ${cls}"><div class="prato-borda"></div><div class="prato-icone">${I[icone]}</div></div>`;

const titulo = (l1, l2, cls = "") => `<h2 class="titulo ${cls}"><span>${l1}</span><em>${l2}</em><i class="titulo-traco"></i></h2>`;
const rotulo = (t) => `<div class="rotulo">${t}</div>`;
const lista = (itens, cls = "pontos") => `<ul class="${cls}">${itens.map((i) => `<li>${i}</li>`).join("")}</ul>`;

// ─────────────────────────────────────────── montagem das folhas
const folhas = []; // { html, cls, semRodape }
const destino = {}; // id → número da página
const folha = (html, { cls = "", id = null, semRodape = false } = {}) => {
  folhas.push({ html, cls, semRodape });
  if (id) destino[id] = folhas.length;
  return folhas.length;
};

// Capa
const capaIcones = ["abobora", "banana", "frango", "mandioca", "cenoura"];
folha(
  `<div class="capa-esq">
     <div class="marca">${I.chapeu}<div><b>${c.autor.toUpperCase()}</b><small>afeto · técnica · aproveitamento</small></div></div>
     <div class="capa-titulo">
       <span class="capa-o">O GUIA</span>
       <h1><span>Cozinha</span><em>Mamede</em></h1>
       <span class="capa-o">DE TRANSFORMAÇÕES</span>
     </div>
     <div class="traco"></div>
     <ul class="capa-lista"><li>5 ingredientes do dia a dia</li><li>15 transformações</li><li>Técnica, afeto e aproveitamento</li></ul>
     <div class="selo"><span>${I.faca}</span><b>COZINHE MELHOR<br>DESPERDICE MENOS</b></div>
   </div>
   <div class="capa-dir">
     ${fotoExiste(c.fotoCapa) ? prato(null, c.fotoCapa, "capa-prato") : `<div class="prato capa-prato"><div class="prato-borda"></div><div class="capa-ingredientes">${capaIcones.map((k) => `<span>${I[k]}</span>`).join("")}</div></div>`}
   </div>
   <div class="faixa">POR ${c.autor.toUpperCase()}</div>`,
  { cls: "capa", semRodape: true }
);

// Boas-vindas
folha(
  `<div class="col-texto">
     ${rotulo("Boas-vindas")}
     <div class="traco"></div>
     <h2 class="titulo-misto">Que bom ter você <em>aqui.</em></h2>
     <div class="corrido">${c.proposta.map((p) => `<p>${p}</p>`).join("")}</div>
     <div class="script">Vamos cozinhar!</div>
     <div class="coracao-pq">${I.coracaoL}</div>
   </div>
   <div class="painel">${prato("abobora", c.fotoBoasVindas, "painel-prato")}${prato("cenoura", null, "painel-prato2")}<div class="painel-base">${I.chapeu}</div></div>`,
  { cls: "com-painel", id: "proposta" }
);

// Jeito Mamede + como usar
folha(
  `${titulo("O jeito Mamede", "de cozinhar")}
   <p class="lead">O método que guia todo o material se apoia em três fundamentos.</p>
   <div class="dicas">${c.fundamentos
     .map((f, i) => `<div class="dica"><span class="quad">${[I.coracaoL, I.faca, I.folha][i]}</span><div><h4>${f.nome}</h4><p>${f.texto}</p></div></div>`)
     .join("")}</div>
   <div class="espaco"></div>
   ${titulo("Como usar", "este guia", "menor")}
   <p class="lead">Cada um dos 5 capítulos é dedicado a um ingrediente e segue a mesma jornada:</p>
   <div class="grade">${c.jornada
     .map((j, i) => `<div class="celula"><span class="cel-ic">${[I.lupa, I.cesta, I.panela, I.raio, I.troca, I.folha][i]}</span><b>${j.nome}</b><small>${j.texto}</small></div>`)
     .join("")}</div>
   <p class="medidas"><b>Medidas usadas</b> 1 xícara = 240 ml · 1 colher (sopa) = 15 ml · 1 colher (chá) = 5 ml · forno sempre preaquecido</p>`,
  { id: "jeito" }
);

// Sumário (preenchido depois que todas as páginas existirem)
const paginaSumario = folha("@@SUMARIO@@");

// Capítulos
c.capitulos.forEach((cap, ci) => {
  const n = ci + 1;
  const idsReceitas = cap.receitas.map((_, i) => `r${n}-${i + 1}`);
  const pagAbertura = folha("", { id: `cap${n}` }); // preenchida abaixo, quando as páginas das receitas forem conhecidas

  folha(
    `${titulo("Antes da", "panela")}
     <p class="lead">Escolher bem, guardar direito e cortar do jeito certo: metade do prato se resolve aqui.</p>
     <div class="antes">
       <div class="caixa"><div class="caixa-topo"><span class="quad">${I.cesta}</span><h4>Na hora de escolher</h4></div>${lista(cap.antes.escolha)}</div>
       <div class="caixa"><div class="caixa-topo"><span class="quad">${I.pote}</span><h4>Como guardar</h4></div>${lista(cap.antes.armazenamento)}</div>
       <div class="caixa larga"><div class="caixa-topo"><span class="quad">${I.faca}</span><h4>Pré-preparo e cortes</h4></div>${lista(cap.antes.cortes)}</div>
     </div>`
  );

  const pagsReceitas = cap.receitas.map((r, i) => {
    const ingr = r.ingredientes.map((g) => `${g.grupo ? `<h5>${g.grupo}</h5>` : ""}${lista(g.itens)}`).join("");
    return folha(
      `<div class="rec-cab">
         <div class="rec-cab-txt">
           <div class="rotulo">Receita ${n}.${i + 1} · ${r.rotulo}</div>
           <h2 class="rec-titulo">${r.nome}</h2>
           ${r.subtitulo ? `<p class="rec-sub">${r.subtitulo}</p>` : ""}
           <div class="rec-meta">
             <div><span class="circ">${I.relogio}</span><b>${r.tempo}</b><small>tempo</small></div>
             <div><span class="circ">${I.pessoas}</span><b>${r.rende}</b><small>rendimento</small></div>
           </div>
         </div>
         ${prato(cap.icone, r.foto, "rec-prato")}
       </div>
       <div class="rec-corpo">
         <div class="rec-ingr"><h4>Ingredientes</h4>${ingr}</div>
         <div class="rec-preparo"><h4>Modo de preparo</h4><ol>${r.preparo.map((p, k) => `<li><span class="num">${k + 1}</span><div>${p}</div></li>`).join("")}</ol></div>
       </div>
       <div class="toque"><span class="quad">${I.chapeu}</span><div><b>Toque do Mamede</b><p>${r.dica}</p></div></div>`,
      { id: idsReceitas[i], cls: "receita" }
    );
  });

  folha(
    `${titulo("O pulo", "do chef")}
     <h3 class="subtitulo">${cap.pulo.titulo}</h3>
     <div class="pulo">
       <div class="pulo-erro"><div class="caixa-topo"><span class="quad terra">${I.raio}</span><h4>O erro</h4></div><p>${cap.pulo.erro}</p></div>
       <div class="pulo-tec"><div class="caixa-topo"><span class="quad">${I.chapeu}</span><h4>A técnica</h4></div>${lista(cap.pulo.tecnica, "setas")}</div>
     </div>
     <div class="espaco"></div>
     ${titulo("Não tem", "isso?", "menor")}
     <table class="subs"><thead><tr><th>Se não tiver…</th><th>Use…</th></tr></thead>
       <tbody>${cap.substituicoes.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join("")}</tbody></table>`
  );

  folha(
    `<div class="col-texto">
       ${titulo("Aproveita", "isso também")}
       <p class="lead">Cascas, talos, ramas e aparas: o que ia para o lixo vira sabor.</p>
       <div class="aproveita">${cap.aproveita.map((a) => `<div class="ap-item"><span class="quad">${I.folha}</span><div><h4>${a.nome}</h4><p>${a.texto}</p></div></div>`).join("")}</div>
     </div>
     <div class="painel">${prato(cap.icone, null, "painel-prato")}<div class="painel-base">${I.folha}</div></div>`,
    { cls: "com-painel" }
  );

  // abertura do capítulo
  folhas[pagAbertura - 1].html = `
    <div class="ab-topo">
      <div class="ab-txt">
        ${titulo(`Capítulo ${n}`, cap.nome, "abertura")}
        <div class="apelido">${cap.apelido}</div>
        <p class="lead">${cap.porQue}</p>
      </div>
      ${prato(cap.icone, cap.foto, "ab-prato")}
    </div>
    ${rotulo("O ingrediente")}
    <div class="corrido">${cap.ingrediente.map((p) => `<p>${p}</p>`).join("")}</div>
    ${rotulo("As 3 transformações")}
    <ol class="indice">${cap.receitas
      .map((r, i) => `<li><span class="pill terra">${pad(i + 1)}</span><a href="#p${pagsReceitas[i]}"><small>${r.rotulo}</small><span>${r.nome}${r.subtitulo ? ` <em>(${r.subtitulo})</em>` : ""}</span></a><i></i><b>${pad(pagsReceitas[i])}</b></li>`)
      .join("")}</ol>`;
  folhas[pagAbertura - 1].cls = "abertura";
});

// Bônus
folha(
  `${titulo("Bônus: os 10 pulos", "do Mamede")}
   <p class="lead">Dez decisões universais de cozinha, que valem para qualquer ingrediente e qualquer receita, deste guia ou da sua vida.</p>
   <div class="pulos">${c.pulos.map((p, i) => `<div class="dica"><span class="quad num">${pad(i + 1)}</span><div><h4>${p.titulo}</h4><p>${p.texto}</p></div></div>`).join("")}</div>`,
  { id: "bonus" }
);

// Encerramento
folha(
  `<div class="col-texto">
     ${titulo("Muito", "obrigado!", "grande")}
     <div class="traco"></div>
     <div class="corrido">${c.encerramento.map((p) => `<p>${p}</p>`).join("")}</div>
     <div class="script">Bom apetite,<br>Chef Allan Mamede</div>
     <div class="coracao-pq cheio">${I.coracao}</div>
   </div>
   <div class="painel">${prato("banana", null, "painel-prato")}${prato("frango", null, "painel-prato2")}<div class="painel-base">${I.chapeu}</div></div>`,
  { cls: "com-painel", id: "fim" }
);

// Sumário
const entradas = [
  ["proposta", "Boas-vindas"],
  ["jeito", "O Jeito Mamede de Cozinhar"],
  ...c.capitulos.map((cap, i) => [`cap${i + 1}`, cap.nome, cap.receitas.map((r, k) => [`r${i + 1}-${k + 1}`, r.nome])]),
  ["bonus", "Bônus: Os 10 Pulos do Mamede"],
  ["fim", "Para seguir cozinhando"],
];
let k = 0;
folhas[paginaSumario - 1].html = `
  ${titulo("O que tem", "neste guia")}
  <ol class="indice sumario">${entradas
    .map(([id, nome, subs]) => {
      k++;
      const linha = `<li><span class="pill">${pad(k)}</span><a href="#p${destino[id]}">${nome}</a><i></i><b>${pad(destino[id])}</b></li>`;
      const sub = subs ? subs.map(([sid, sn]) => `<li class="sub"><a href="#p${destino[sid]}">${sn}</a><i></i><b>${pad(destino[sid])}</b></li>`).join("") : "";
      return linha + sub;
    })
    .join("")}</ol>`;

// ─────────────────────────────────────────── HTML final
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<title>${c.titulo}</title>
<link rel="stylesheet" href="fontes/fontes.css">
<link rel="stylesheet" href="estilo.css">
</head><body>
${folhas
  .map(
    (f, i) => `<section class="folha ${f.cls}" id="p${i + 1}">
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

  // painéis e ilustrações sangram de propósito para fora da margem: não contam
  const estouros = await page.evaluate(() => {
    const sangria = [...document.querySelectorAll(".painel, .prato, .capa-dir")];
    sangria.forEach((el) => (el.style.display = "none"));
    const r = [...document.querySelectorAll(".folha .conteudo")]
      .map((el, i) => ({ pagina: i + 1, sobra: el.scrollHeight - el.clientHeight }))
      .filter((x) => x.sobra > 1);
    sangria.forEach((el) => (el.style.display = ""));
    return r;
  });
  for (const e of estouros) console.warn(`⚠ Página ${e.pagina}: conteúdo passa ${e.sobra}px do limite`);

  await page.pdf({ path: SAIDA_PDF, preferCSSPageSize: true, printBackground: true });
  await browser.close();
  const total = execFileSync("pdfinfo", [SAIDA_PDF], { encoding: "utf8" }).match(/Pages:\s+(\d+)/)[1];
  console.log(`OK: ${path.basename(SAIDA_PDF)} (${total} páginas)`);
  if (estouros.length) process.exitCode = 1;
})();
