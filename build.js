// Gera o ebook: node build.js
// Saídas: ebook.html (pré-visualização) e Cozinha-Mamede.pdf
//
// O sumário é numerado em duas passadas: a primeira gera um PDF com marcadores
// invisíveis, lê em que página cada marcador caiu (pdftotext) e a segunda
// gera o PDF final com os números de página certos.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");
const c = require("./conteudo");

const ROOT = __dirname;
const SAIDA_PDF = path.join(ROOT, "Cozinha-Mamede.pdf");
const SAIDA_HTML = path.join(ROOT, "ebook.html");

const esc = (s) => s; // textos do conteudo.js podem conter <b> e entidades
const pad = (n) => String(n).padStart(2, "0");

// ─────────────────────────────────────────── ícones (traço simples)
const ICONES = {
  abobora: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M60 34c-6-10-2-18 6-22"/><path d="M66 22c8-6 18-4 22 2"/>
    <path d="M60 36c-22-6-46 6-46 34s20 38 46 38 46-10 46-38-24-40-46-34z"/>
    <path d="M60 36c-10 8-14 22-14 36s4 28 14 36"/><path d="M60 36c10 8 14 22 14 36s-4 28-14 36"/>
    <path d="M38 40c-10 8-14 18-14 30s4 24 14 32"/><path d="M82 40c10 8 14 18 14 30s-4 24-14 32"/></svg>`,
  banana: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M92 18l6-6"/><path d="M90 20c10 30 2 66-30 82-14 7-30 6-40-2 22 2 40-8 52-26 10-16 14-34 12-50z"/>
    <path d="M90 20c-4 26-14 48-34 62"/><path d="M20 100c-2-4 0-8 4-8"/></svg>`,
  frango: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M70 52c14-14 34-12 38 4 4 18-12 34-30 34-10 0-14-4-20-10z"/>
    <path d="M58 80L30 96"/><path d="M30 96c-6 0-12-2-14 4-2 5 3 9 8 8 0 5 4 9 9 6 5-3 3-9 0-12"/>
    <path d="M78 58c6-4 14-4 18 2"/></svg>`,
  mandioca: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 30c10-8 22-6 32 4l44 50c6 8 6 16 0 22-6 4-12 2-20-4L30 64c-12-10-16-24-8-34z"/>
    <path d="M22 30c-4-6-8-8-12-6"/><path d="M38 44l10 4"/><path d="M52 60l12 2"/><path d="M68 78l10 2"/>
    <path d="M98 106c4 4 8 6 12 4"/></svg>`,
  cenoura: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M76 44c8 8 8 18 0 26L30 108c-6 4-12-2-8-8L56 44c8-8 14-8 20 0z"/>
    <path d="M76 44c4-14 10-24 22-30"/><path d="M80 48c10-6 22-8 32-4"/><path d="M78 46c2-12 0-24-8-32"/>
    <path d="M48 62l8 6"/><path d="M38 80l8 6"/><path d="M60 72l6 4"/></svg>`,
  estrela: `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="60" cy="60" r="44"/><path d="M60 30v60M30 60h60M39 39l42 42M81 39L39 81"/><circle cx="60" cy="60" r="12"/></svg>`,
};

// ─────────────────────────────────────────── sumário e marcadores
const toc = []; // { id, nivel, titulo }
let marcadores = true; // primeira passada: com marcadores
const alvo = (id, titulo, nivel = 1) => {
  toc.push({ id, titulo, nivel });
  return `<a id="${id}"></a>${marcadores ? `<span class="mk">@@${id}@@</span>` : ""}`;
};

// ─────────────────────────────────────────── blocos
const lista = (itens, cls = "") => `<ul class="${cls}">${itens.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

function receitaHTML(r, i, cap, ci) {
  const id = `r${ci + 1}-${i + 1}`;
  const ingr = r.ingredientes.map((g) => `${g.grupo ? `<h5>${g.grupo}</h5>` : ""}${lista(g.itens)}`).join("");
  return `
  <section class="pagina receita">
    ${alvo(id, r.nome, 2)}
    <div class="rec-topo">
      <span class="rec-num">${ci + 1}.${i + 1}</span>
      <span class="kicker">Transformação ${i + 1} · ${r.rotulo}</span>
    </div>
    <h3>${r.nome}</h3>
    <div class="meta"><span><b>Rende</b> ${r.rende}</span><span><b>Tempo</b> ${r.tempo}</span></div>
    <div class="rec-corpo">
      <aside class="ingredientes"><h4>Ingredientes</h4>${ingr}</aside>
      <div class="preparo"><h4>Modo de preparo</h4><ol>${r.preparo.map((p) => `<li>${p}</li>`).join("")}</ol></div>
    </div>
    <div class="toque"><span class="toque-rot">Toque do Mamede</span><p>${r.dica}</p></div>
  </section>`;
}

function capituloHTML(cap, ci) {
  const n = ci + 1;
  return `
  <div class="cap" style="--cap:${cap.cor}">
    <section class="abertura">
      ${alvo(`cap${n}`, cap.nome, 1)}
      <div class="ab-num">${pad(n)}</div>
      <div class="ab-icone">${ICONES[cap.icone]}</div>
      <div class="ab-texto">
        <div class="ab-kicker">Capítulo ${n}</div>
        <h2>${cap.nome}</h2>
        <div class="ab-apelido">${cap.apelido}</div>
        <p class="ab-porque">${cap.porQue}</p>
        <ol class="ab-lista">${cap.receitas.map((r) => `<li><span>${r.rotulo}</span>${r.nome}</li>`).join("")}</ol>
      </div>
    </section>

    <section class="pagina">
      <div class="secao-rot">O Ingrediente</div>
      <h3 class="h-sec">O olhar do chef sobre a ${cap.nome.toLowerCase().startsWith("sobrecoxa") ? "sobrecoxa" : cap.nome.toLowerCase().split(" ")[0]}</h3>
      <div class="intro">${cap.ingrediente.map((p) => `<p>${p}</p>`).join("")}</div>

      <div class="secao-rot secao-esp">Antes da Panela</div>
      <div class="antes">
        <div><h4>Na hora de escolher</h4>${lista(cap.antes.escolha, "check")}</div>
        <div><h4>Como guardar</h4>${lista(cap.antes.armazenamento, "check")}</div>
        <div class="antes-full"><h4>Pré-preparo e cortes</h4>${lista(cap.antes.cortes, "check")}</div>
      </div>
    </section>

    ${cap.receitas.map((r, i) => receitaHTML(r, i, cap, ci)).join("")}

    <section class="pagina">
      <div class="pulo">
        <div class="secao-rot">O Pulo do Chef</div>
        <h3 class="h-sec">${cap.pulo.titulo}</h3>
        <div class="pulo-erro"><span>O erro</span><p>${cap.pulo.erro}</p></div>
        <div class="pulo-tec"><span>A técnica</span>${lista(cap.pulo.tecnica, "seta")}</div>
      </div>

      <div class="secao-rot secao-esp">Não Tem Isso?</div>
      <table class="subs">
        <thead><tr><th>Se não tiver…</th><th>Use…</th></tr></thead>
        <tbody>${cap.substituicoes.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join("")}</tbody>
      </table>
    </section>

    <section class="pagina">
      <div class="secao-rot">Aproveita Isso Também</div>
      <h3 class="h-sec">Nada vai para o lixo</h3>
      <div class="aproveita">${cap.aproveita.map((a) => `<div class="ap-item"><h4>${a.nome}</h4><p>${a.texto}</p></div>`).join("")}</div>
    </section>
  </div>`;
}

function montarHTML(paginas = {}) {
  toc.length = 0;
  const num = (id) => (paginas[id] != null ? paginas[id] : "");

  const corpo = `
  <section class="capa">
    <div class="capa-topo">${c.autor}</div>
    <div class="capa-centro">
      <div class="capa-icones">${["abobora", "banana", "frango", "mandioca", "cenoura"].map((k) => `<span>${ICONES[k]}</span>`).join("")}</div>
      <h1>Cozinha<br><em>Mamede</em></h1>
      <p class="capa-sub">${c.subtitulo}</p>
    </div>
    <div class="capa-base"><span>5 ingredientes</span><span>15 transformações</span><span>+ bônus</span></div>
  </section>

  <section class="pagina abre">
    ${alvo("proposta", "A Proposta", 0)}
    <div class="secao-rot">A Proposta</div>
    <h2 class="h-grande">Um novo jeito de olhar para a sua cozinha</h2>
    <div class="intro grande">${c.proposta.map((p) => `<p>${p}</p>`).join("")}</div>
    <p class="assinatura">${c.autor}</p>
  </section>

  <section class="pagina abre">
    ${alvo("jeito", "O Jeito Mamede de Cozinhar", 0)}
    <div class="secao-rot">O Método</div>
    <h2 class="h-grande">O Jeito Mamede de Cozinhar</h2>
    <p class="lead">O método que guia todo o material se apoia em três fundamentos.</p>
    <div class="fundamentos">${c.fundamentos.map((f, i) => `<div class="fund"><span class="fund-n">${pad(i + 1)}</span><h4>${f.nome}</h4><p>${f.texto}</p></div>`).join("")}</div>

    <div class="secao-rot secao-esp">Como usar este guia</div>
    <p class="lead">Cada um dos 5 capítulos é dedicado a um ingrediente e segue a mesma jornada:</p>
    <ol class="jornada">${c.jornada.map((j) => `<li><b>${j.nome}</b><span>${j.texto}</span></li>`).join("")}</ol>
    <p class="medidas"><b>Medidas usadas:</b> 1 xícara = 240 ml · 1 colher (sopa) = 15 ml · 1 colher (chá) = 5 ml. Temperaturas de forno sempre preaquecido.</p>
  </section>

  <section class="pagina abre sumario">
    <div class="secao-rot">Sumário</div>
    <h2 class="h-grande">O que tem aqui</h2>
    @@SUMARIO@@
  </section>

  ${c.capitulos.map(capituloHTML).join("")}

  <div class="cap" style="--cap:#3E4A2C">
    <section class="abertura">
      ${alvo("bonus", "Bônus: Os 10 Pulos do Mamede", 1)}
      <div class="ab-num">+</div>
      <div class="ab-icone">${ICONES.estrela}</div>
      <div class="ab-texto">
        <div class="ab-kicker">Bônus</div>
        <h2>Os 10 Pulos do Mamede</h2>
        <div class="ab-apelido">decisões universais de cozinha</div>
        <p class="ab-porque">Dez decisões simples que valem para qualquer ingrediente e qualquer receita, deste livro ou da sua vida.</p>
      </div>
    </section>
    <section class="pagina">
      <div class="pulos">${c.pulos.map((p, i) => `<div class="pulo-item"><span class="pulo-n">${pad(i + 1)}</span><div><h4>${p.titulo}</h4><p>${p.texto}</p></div></div>`).join("")}</div>
    </section>
  </div>

  <section class="pagina abre fim">
    ${alvo("fim", "Para seguir cozinhando", 0)}
    <div class="secao-rot">Para seguir cozinhando</div>
    <div class="intro grande">${c.encerramento.map((p) => `<p>${p}</p>`).join("")}</div>
    <p class="assinatura">Bom apetite,<br>${c.autor}</p>
  </section>`;

  const linhas = toc.map((t) =>
    t.nivel === 2
      ? `<li class="n2"><a href="#${t.id}">${t.titulo}</a><span class="pn">${num(t.id)}</span></li>`
      : `<li class="n${t.nivel}"><a href="#${t.id}">${t.titulo}</a><span class="pn">${num(t.id)}</span></li>`
  );
  const sumario = `<ul class="toc">${linhas.join("")}</ul>`;

  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<title>${c.titulo}</title>
<link rel="stylesheet" href="fontes/fontes.css">
<link rel="stylesheet" href="estilo.css">
</head><body>${corpo.replace("@@SUMARIO@@", sumario)}</body></html>`;
}

// ─────────────────────────────────────────── renderização
async function gerarPDF(html, destino) {
  fs.writeFileSync(SAIDA_HTML, html);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + SAIDA_HTML, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: destino, preferCSSPageSize: true, printBackground: true });
  await browser.close();
}

function lerPaginas(pdf) {
  const txt = execFileSync("pdftotext", ["-layout", pdf, "-"], { encoding: "utf8" });
  const paginas = {};
  txt.split("\f").forEach((p, i) => {
    for (const m of p.matchAll(/@@([\w-]+)@@/g)) if (!(m[1] in paginas)) paginas[m[1]] = i + 1;
  });
  return paginas;
}

(async () => {
  const tmp = path.join(ROOT, ".passada1.pdf");
  marcadores = true;
  await gerarPDF(montarHTML(), tmp);
  const paginas = lerPaginas(tmp);
  fs.unlinkSync(tmp);

  const faltando = toc.filter((t) => !(t.id in paginas)).map((t) => t.id);
  if (faltando.length) console.warn("Sem número de página:", faltando.join(", "));

  marcadores = false;
  await gerarPDF(montarHTML(paginas), SAIDA_PDF);
  const total = execFileSync("pdfinfo", [SAIDA_PDF], { encoding: "utf8" }).match(/Pages:\s+(\d+)/)[1];
  console.log(`OK: ${path.basename(SAIDA_PDF)} (${total} páginas)`);
})();
