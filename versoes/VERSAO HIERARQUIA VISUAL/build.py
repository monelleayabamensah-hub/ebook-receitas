# Gera ebook.html com a hierarquia visual (H1, H2, H3, corpo) aplicada ao texto do PDF do Canva.
# Uso: python3 build.py && node pdf.js
from html import escape as e
from conteudo import (LOREM, SUMARIO, INTRO, FUNDAMENTOS, ETAPAS, CAPITULOS, PULOS_1, PULOS_2, FECHO)

CSS = """
@font-face { font-family: "Barlow Condensed"; font-weight: 400; src: url(fontes/barlow-condensed-400.woff2) format("woff2"); }
@font-face { font-family: "Barlow Condensed"; font-weight: 600; src: url(fontes/barlow-condensed-600.woff2) format("woff2"); }
@font-face { font-family: "Barlow Condensed"; font-weight: 700; src: url(fontes/barlow-condensed-700.woff2) format("woff2"); }
@font-face { font-family: "Barlow Condensed"; font-weight: 800; src: url(fontes/barlow-condensed-800.woff2) format("woff2"); }
@font-face { font-family: "Arimo"; font-weight: 400 700; src: url(fontes/arimo.woff2) format("woff2"); }

:root {
  /* cores do PDF original */
  --creme: #F6EBCE; --floresta: #18542A; --tomate: #D52518; --cenoura: #F96015; --sol: #FFC926; --areia: #EADCB8;
  /* famílias de fonte do PDF original (não alteradas) */
  --titulo: "Barlow Condensed", sans-serif;
  --texto: "Arimo", sans-serif;
  --manuscrita: "A Day Without Sun", "A Day Without Sun Text", "Arimo", sans-serif;
  --manuscrita-texto: "A Day Without Sun Text", "Arimo", sans-serif;
}
@page { size: 210mm 297mm; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; background: #d9cfb6; }
body { font-family: var(--texto); font-size: 14.667px; color: var(--floresta); -webkit-print-color-adjust: exact; print-color-adjust: exact; }

.pagina { width: 210mm; height: 297mm; margin: 10mm auto; padding: 16mm 17mm 20mm; position: relative; overflow: hidden;
  background: var(--creme); break-after: page; }
@media print { html, body { background: var(--creme); } .pagina { margin: 0; } }

/* ===== HIERARQUIA (regras pedidas) ===== */
/* H1: 2.2em, 800, entrelinha 1.15, 24px abaixo */
h1 { font: 800 2.2em/1.15 var(--titulo); margin: 0 0 24px; color: var(--tomate); text-transform: uppercase; }
/* H2: 1.5em, 600, entrelinha 1.2, 28px acima, 12px abaixo */
h2 { font: 600 1.5em/1.2 var(--titulo); margin: 28px 0 12px; color: var(--floresta); text-transform: uppercase; }
/* H3: 1.2em, 600, 20px acima, 8px abaixo */
h3 { font: 600 1.2em/1.2 var(--titulo); margin: 20px 0 8px; color: var(--cenoura); text-transform: uppercase; }
/* Corpo: 1em, 400, entrelinha 1.5, 12px entre parágrafos, alinhado à esquerda */
p, li, td { font-size: 1em; font-weight: 400; line-height: 1.5; text-align: left; }
p { margin: 0 0 12px; }
h1 + h2, h1 + h3 { margin-top: 0; }
h2 + h3 { margin-top: 8px; }

/* elementos de apoio (fora da escala de títulos) */
.kicker { font: 400 .875em/1.2 var(--titulo); letter-spacing: .14em; text-transform: uppercase; color: var(--cenoura); margin: 0 0 8px; }
.subtitulo { font: 600 1.5em/1.2 var(--titulo); text-transform: uppercase; color: var(--floresta); margin: -12px 0 24px; }
.destaque { font: 700 1.5em/1.2 var(--titulo); text-transform: uppercase; color: var(--floresta); margin: 28px 0 12px;
  padding-left: 14px; border-left: 4px solid var(--sol); }
.assinatura { font: 400 1.2em/1.2 var(--manuscrita); color: var(--tomate); margin: 8px 0 12px; }
.manuscrita { font-family: var(--manuscrita-texto); }
.rodape { position: absolute; left: 17mm; right: 17mm; bottom: 9mm; display: flex; justify-content: flex-end; gap: 12px;
  font: 400 .75em/1 var(--titulo); letter-spacing: .14em; color: var(--floresta); }
.rodape b { font-weight: 700; color: var(--tomate); }

ul, ol { margin: 0 0 12px; padding: 0; list-style: none; }
ul.marcadores li { position: relative; padding-left: 18px; margin-bottom: 6px; }
ul.marcadores li::before { content: ""; position: absolute; left: 2px; top: .62em; width: 7px; height: 7px; border-radius: 50%; background: var(--cenoura); }
ol.passos li { display: grid; grid-template-columns: 22px 1fr; gap: 8px; margin-bottom: 3px; }
.n { font: 700 1.2em/1.25 var(--titulo); color: var(--tomate); text-align: left; }

/* capa */
.capa { display: flex; flex-direction: column; justify-content: center; }
.logo { font: 800 5.5em/.9 var(--titulo); color: var(--tomate); margin: 0 0 24px; text-transform: uppercase; }

/* sumário */
.sumario li { display: grid; grid-template-columns: 28px 1fr auto; gap: 10px; align-items: baseline; }
.sumario li.cap { margin-top: 10px; font-weight: 700; }
.sumario li.sub { grid-template-columns: 38px 1fr auto; font-size: .9375em; }
.sumario .pg { font: 600 1em var(--titulo); color: var(--tomate); }

/* tabelas */
table { width: 100%; border-collapse: collapse; margin: 0 0 12px; }
th { font: 600 .875em/1.2 var(--titulo); letter-spacing: .12em; text-transform: uppercase; text-align: left;
  color: var(--creme); background: var(--floresta); padding: 8px 10px; }
td { padding: 7px 10px; vertical-align: top; border-bottom: 1px solid var(--areia); }
td:first-child { width: 36%; font: 600 1.0625em/1.4 var(--titulo); color: var(--tomate); }

/* receitas */
.rotulo { font: 600 1em/1.4 var(--titulo); letter-spacing: .08em; text-transform: uppercase; color: var(--cenoura); margin: -12px 0 12px; }
.rotulo span { font: 400 1em var(--texto); letter-spacing: 0; text-transform: none; color: var(--floresta); }
.meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; border-top: 2px solid var(--floresta); border-bottom: 2px solid var(--floresta); padding: 8px 0; margin: 0; }
.meta p { margin: 0; line-height: 1.35; }
.meta b { display: block; font: 600 .875em/1.2 var(--titulo); letter-spacing: .12em; color: var(--tomate); }
.colunas { columns: 2; column-gap: 24px; }
.colunas .grupo { break-inside: avoid; }
.colunas h3:first-child { margin-top: 0; }
.colunas ul.marcadores li { margin-bottom: 2px; break-inside: avoid; }
.segredo { background: var(--sol); border-radius: 10px; padding: 12px 16px 6px; margin-top: 8px; }
.segredo h3 { margin: 0 0 8px; color: var(--tomate); }

/* listas rotuladas (fundamentos, transformações, pulos) */
.rotulados li { display: grid; grid-template-columns: 34px 1fr; gap: 10px; margin-bottom: 4px; }
.rotulados h3 { margin: 0 0 8px; }
.rotulados .n { font-size: 1.5em; line-height: 1; }
.rotulados p { margin-bottom: 12px; }
.rotulados .pgr { font: 600 1em var(--titulo); color: var(--tomate); letter-spacing: 0; }
"""


def rodape(n):
    return f'<footer class="rodape"><span>COZINHA MAMEDE</span><b>{n}</b></footer>' if n else ""


def pagina(corpo, n=None, cls=""):
    return f'<section class="pagina {cls}">{corpo}{rodape(n)}</section>'


def ps(textos, cls=""):
    c = f' class="{cls}"' if cls else ""
    return "".join(f"<p{c}>{e(t)}</p>" for t in textos)


def ul(itens):
    return '<ul class="marcadores">' + "".join(f"<li>{e(i)}</li>" for i in itens) + "</ul>"


def ol(itens):
    return '<ol class="passos">' + "".join(f'<li><span class="n">{k}</span><span>{e(t)}</span></li>' for k, t in enumerate(itens, 1)) + "</ol>"


def tabela(cab, linhas):
    return ("<table><thead><tr>" + "".join(f"<th>{e(c)}</th>" for c in cab) + "</tr></thead><tbody>"
            + "".join(f"<tr><td>{e(a)}</td><td>{e(b)}</td></tr>" for a, b in linhas) + "</tbody></table>")


def capa():
    return pagina('<p class="kicker">EBOOK DE RECEITAS</p><h1 class="logo">COZINHA<br>MAMEDE</h1>'
                  '<p class="assinatura">por CHEF ALLAN MAMEDE</p>', cls="capa")


def paginas():
    out = [capa()]
    # 2
    out.append(pagina(
        "<h1>CINCO INGREDIENTES</h1>"
        '<p class="kicker">ABÓBORA CABOTIÁ · CENOURA · MANDIOCA · SOBRECOXA DE FRANGO · BANANA-DA-TERRA</p>'
        '<h1 style="margin-top:40px">QUINZE TRANSFORMAÇÕES</h1>'
        "<h2>UM NOVO JEITO DE OLHAR PARA A SUA COZINHA.</h2>"
        '<p class="manuscrita">Técnica de chef, sabor afetivo e aproveitamento integral, da casca à semente, com o que você já compra toda semana.</p>'))
    # 3
    out.append(pagina("<h1>QUEM É CHEF ALLAN MAMEDE?</h1>" + ps([LOREM + ".", LOREM, LOREM], "manuscrita")))
    # 4
    out.append(pagina("<h1>SUMÁRIO</h1>", cls="capa"))
    # 5
    itens = []
    for n, t, pg, subs in SUMARIO:
        itens.append(f'<li class="cap"><span class="n">{n}</span><span>{e(t)}</span><span class="pg">{pg}</span></li>')
        itens += [f'<li class="sub"><span></span><span>{e(s)}</span><span class="pg">{p}</span></li>' for s, p in subs]
    out.append(pagina('<h1>SUMÁRIO</h1><ul class="sumario">' + "".join(itens) + "</ul>", "02"))
    # 6
    out.append(pagina('<p class="kicker">INTRODUÇÃO</p><h1>UM NOVO JEITO DE OLHAR A SUA COZINHA</h1>' + ps(INTRO, "manuscrita")
                      + '<blockquote class="destaque">PARE DE FAZER SEMPRE A MESMA COMIDA DO MESMO JEITO.</blockquote>'
                      + '<p class="assinatura">CHEF ALLAN MAMEDE</p>'))
    # 7
    fund = '<ol class="rotulados">' + "".join(
        f'<li><span class="n">{k}</span><div><h3>{e(a)}</h3><p>{e(b)}</p></div></li>' for k, (a, b) in enumerate(FUNDAMENTOS, 1)) + "</ol>"
    out.append(pagina('<p class="kicker">O MÉTODO</p><h1>O JEITO MAMEDE DE COZINHAR</h1>'
                      "<p>O método que guia todo o material se apoia em três fundamentos.</p>" + fund
                      + '<blockquote class="destaque">AFETO, TÉCNICA E APROVEITAMENTO. NESSA ORDEM, EM TODO PRATO.</blockquote>'
                      + "<h2>COMO USAR ESTE GUIA</h2><p>Cada um dos 5 capítulos é dedicado a um ingrediente e segue a mesma jornada:</p>"
                      + tabela(("ETAPA", "O QUE VOCÊ ENCONTRA"), ETAPAS)
                      + "<p>MEDIDAS: 1 xícara = 240 ml · 1 colher (sopa) = 15 ml · 1 colher (chá) = 5 ml · forno sempre preaquecido.</p>", "04"))

    for c in CAPITULOS:
        out += capitulo(c)

    # bônus
    def pulos(lista, ini):
        return '<ol class="rotulados">' + "".join(
            f'<li><span class="n">{k}</span><div><h3>{e(a)}</h3><p>{e(b)}</p></div></li>' for k, (a, b) in enumerate(lista, ini)) + "</ol>"
    out.append(pagina('<p class="kicker">BÔNUS</p><h1>OS 10 PULOS DO MAMEDE</h1>'
                      "<p>Dez decisões universais de cozinha, que valem para qualquer ingrediente e qualquer receita.</p>" + pulos(PULOS_1, 1), "55"))
    out.append(pagina('<p class="kicker">BÔNUS · CONTINUAÇÃO</p><h1>MAIS 5 PULOS DO MAMEDE</h1>' + pulos(PULOS_2, 6)
                      + '<blockquote class="destaque">CHEF É QUEM OLHA PARA O BÁSICO E ENXERGA POSSIBILIDADES.</blockquote>', "56"))
    out.append(pagina("<h1>COZINHA MAMEDE</h1>" + ps(FECHO) + '<p class="assinatura">Bom apetite! · CHEF ALLAN MAMEDE</p>'))
    return out


def transformacoes(c, manuscrita=False):
    cls = ' class="manuscrita"' if manuscrita else ""
    itens = ""
    for k, (rot, desc, pg) in enumerate(c["transf"], 1):
        pgr = f"&nbsp;&nbsp;<span class=\"pgr\">{pg}</span>" if pg else ""
        itens += f'<li><span class="n">{k}</span><div><h3>{e(rot)}{pgr}</h3><p{cls}>{e(desc)}</p></div></li>'
    return '<h2>3 TRANSFORMAÇÕES</h2><ol class="rotulados">' + itens + "</ol>"


def capitulo(c):
    out = []
    if c.get("abertura_ch1"):
        out.append(pagina(f'<p class="kicker">{c["abre_kicker"]}</p><h1>{e(c["nome"])}</h1><p class="subtitulo">{e(c["sub"])}</p>', cls="capa"))
        aberta = f'<blockquote class="destaque" style="margin-top:0">{e(c["destaque"])}</blockquote>' + transformacoes(c, True)
        out += [pagina(aberta), pagina(aberta)]
    else:
        out.append(pagina(f'<p class="kicker">{c["abre_kicker"]}</p><h1>{e(c["nome"])}</h1><p class="subtitulo">{e(c["sub"])}</p>'
                          f'<p>{e(c["destaque"])}</p>' + transformacoes(c), c["pag_abre"]))
    out.append(pagina(f'<p class="kicker">{c["kicker_ing"]}</p><h1>O INGREDIENTE</h1>' + ps(c["ingrediente"])
                      + "<h2>ANTES DA PANELA</h2><h3>NA HORA DE ESCOLHER</h3>" + ul(c["escolher"])
                      + "<h3>COMO GUARDAR</h3>" + ul(c["guardar"]) + "<h3>PRÉ-PREPARO E CORTES</h3>" + ul(c["cortes"]), c["pag_ing"]))
    if c.get("abertura_ch1"):
        out.append(pagina('<p class="kicker">EBOOK DE RECEITAS</p><h1 class="logo">COZINHA<br>MAMEDE</h1>', cls="capa"))
    for k, r in enumerate(c["receitas"], 1):
        todos = [i for _, g in r["grupos"] for i in g]
        out.append(pagina(f'<p class="kicker">#COZINHAMAMEDE · TRANSFORMAÇÃO 0{k}</p><h1>{e(r["curto"])}</h1><p>{e(r["linha"])}</p>'
                          + "<h2>INGREDIENTES</h2>" + ul(todos) + '<p class="assinatura">receitas por CHEF ALLAN MAMEDE</p>'))
        grupos = "".join(f'<div class="grupo">{f"<h3>{e(t)}</h3>" if t else ""}{ul(g)}</div>' for t, g in r["grupos"])
        out.append(pagina(
            f'<p class="kicker">TRANSFORMAÇÃO 0{k} · {c["tag"]}</p><h1>{e(r["titulo"])}</h1>'
            f'<p class="rotulo">{e(r["rotulo"])} <span>{e(r["nota"])}</span></p>'
            f'<div class="meta"><p><b>PREPARO:</b><span>{e(r["preparo"])}</span></p><p><b>COZIMENTO:</b><span>{e(r["cozimento"])}</span></p><p><b>RENDE:</b><span>{e(r["rende"])}</span></p></div>'
            f'<h2>INGREDIENTES</h2><div class="colunas">{grupos}</div>'
            f'<h2>MODO DE PREPARO</h2>{ol(r["passos"])}'
            f'<div class="segredo"><h3>SEGREDO DE CHEF</h3><p>{e(r["segredo"])}</p></div>', r["pagina"]))
    tec = '<ol class="passos">' + "".join(f'<li><span class="n">{k}</span><span>{e(t)}</span></li>' for k, t in enumerate(c["tecnica"], 1)) + "</ol>"
    out.append(pagina(f'<p class="kicker">O PULO DO CHEF · {c["tag"]}</p><h1>{e(c["pulo_titulo"])}</h1>'
                      f'<h2>O ERRO</h2><p>{e(c["erro"])}</p><h2>A TÉCNICA</h2>{tec}'
                      "<h2>NÃO TEM ISSO?</h2>" + tabela(("SE NÃO TIVER…", "USE…"), c["subst"]), c["pag_pulo"]))
    out.append(pagina(f'<p class="kicker">APROVEITA ISSO TAMBÉM · {c["tag"]}</p><h1>NADA VAI PARA O LIXO</h1>'
                      + "".join(f"<h2>{e(t)}</h2><p>{e(x)}</p>" for t, x in c["aprov"]), c["pag_aprov"]))
    return out


if __name__ == "__main__":
    pags = paginas()
    html = ('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width, initial-scale=1">'
            f"<title>Cozinha Mamede</title><style>{CSS}</style></head><body>" + "\n".join(pags) + "</body></html>")
    open("ebook.html", "w", encoding="utf-8").write(html)
    print(len(pags), "páginas")
