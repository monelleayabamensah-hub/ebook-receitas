# Gera ebook.html: o texto do ebook com a identidade dos três fundos ilustrados.
# Uso: python3 build.py && node pdf.js
#
# Fundos:
#   verde-caju      → capa, aberturas de capítulo, fechamento (impacto)
#   terracota       → divisórias e abertura de cada receita (impacto)
#   creme-mostarda  → páginas de leitura e receitas, sempre com um cartão claro por cima
#
# Fotos (28): fotos/capa.jpg, boas-vindas, cap1…cap5, r1-1…r5-3, aproveita1…aproveita5, obrigado.
# Cada uma entra na página em que o prato ou ingrediente é citado; sem o arquivo, a página fica sem foto.
import os
from html import escape as e
from conteudo import (LOREM, SUMARIO, INTRO, FUNDAMENTOS, ETAPAS, CAPITULOS, PULOS_1, PULOS_2, FECHO)

CSS = """
@font-face { font-family: "Fraunces"; font-weight: 400; src: url(fontes/fraunces-400.ttf); }
@font-face { font-family: "Fraunces"; font-weight: 400; font-style: italic; src: url(fontes/fraunces-400-italic.ttf); }
@font-face { font-family: "Fraunces"; font-weight: 600; src: url(fontes/fraunces-600.ttf); }
@font-face { font-family: "Fraunces"; font-weight: 700; src: url(fontes/fraunces-700.ttf); }
@font-face { font-family: "DM Sans"; font-weight: 400; src: url(fontes/dm-sans-400.ttf); }
@font-face { font-family: "DM Sans"; font-weight: 500; src: url(fontes/dm-sans-500.ttf); }
@font-face { font-family: "DM Sans"; font-weight: 700; src: url(fontes/dm-sans-700.ttf); }

:root {
  --verde: #2F4A22; --verde-claro: #5E7F3A; --terracota: #A3300F; --telha: #C8501F;
  --mostarda: #E5A82E; --creme: #F8EED9; --papel: #FFFCF5; --tinta: #2B2A22; --suave: #6B6556; --linha: #EADFC6;
  --titulo: "Fraunces", Georgia, serif;
  --texto: "DM Sans", "Helvetica Neue", Arial, sans-serif;
}
@page { size: 210mm 297mm; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; background: #cfc6b2; }
body { font-family: var(--texto); font-size: 13.333px; color: var(--tinta); -webkit-print-color-adjust: exact; print-color-adjust: exact; }

/* ===== página e fundos ===== */
.pagina { width: 210mm; height: 297mm; margin: 10mm auto; position: relative; overflow: hidden; break-after: page;
  background: var(--creme) center / 100% 100% no-repeat; box-shadow: 0 4px 24px rgba(0,0,0,.18); }
.fundo-verde { background-image: url(fundos/verde-caju.jpg); background-color: #384D28; color: var(--creme); }
.fundo-terracota { background-image: url(fundos/terracota.jpg); background-color: #9D240C; color: var(--creme); }
.fundo-creme { background-image: url(fundos/creme-mostarda.jpg); }
@media print {
  html, body { background: none; } .pagina { margin: 0; box-shadow: none; }
  /* no PDF, sombras viram imagens pesadas: troca por um contorno fino */
  .cartao { box-shadow: none; outline: 1px solid rgba(150, 110, 30, .14); }
  .foto { box-shadow: none; }
}
@media screen and (max-width: 820px) {
  .pagina { width: 100%; height: auto; aspect-ratio: 210 / 297; margin: 0 0 16px; }
}

/* cartão claro sobre o fundo creme: leitura com contraste alto */
.fundo-creme { display: flex; align-items: center; padding: 12mm; }
.cartao { position: relative; width: 100%; max-height: 100%; background: rgba(255, 252, 245, .96); border-radius: 5mm;
  padding: 11mm 12mm 7mm; box-shadow: 0 1px 0 rgba(120, 90, 20, .08), 0 8px 26px rgba(120, 90, 20, .10); }
.rodape { margin-top: 6mm; display: flex; justify-content: space-between;
  font: 500 .75em/1 var(--texto); letter-spacing: .14em; text-transform: uppercase; color: var(--suave); }
.rodape b { color: var(--terracota); font-weight: 700; }
.rodape-topo { position: absolute; top: 12mm; left: 26mm; right: 26mm; display: flex; justify-content: space-between;
  font: 500 .75em/1 var(--texto); letter-spacing: .14em; text-transform: uppercase; color: var(--creme); }
.rodape-topo b { color: var(--mostarda); font-weight: 700; }

/* ===== hierarquia ===== */
h1 { font: 600 2.2em/1.12 var(--titulo); letter-spacing: -.01em; margin: 0 0 18px; color: var(--terracota); }
h2 { font: 600 1.5em/1.2 var(--titulo); margin: 22px 0 10px; color: var(--verde); }
h3 { font: 700 .875em/1.3 var(--texto); letter-spacing: .1em; text-transform: uppercase; margin: 16px 0 6px; color: var(--telha); }
p, li, td { line-height: 1.5; }
p { margin: 0 0 10px; }
h1 + h2, h1 + h3, h2 + h3 { margin-top: 0; }
.kicker { font: 700 .75em/1.2 var(--texto); letter-spacing: .2em; text-transform: uppercase; color: var(--telha); margin: 0 0 8px; }
.lead { font: italic 400 1.2em/1.45 var(--titulo); color: var(--verde); }
.destaque { font: 600 1.35em/1.3 var(--titulo); color: var(--verde); margin: 18px 0 12px; padding: 10px 0 10px 16px;
  border-left: 4px solid var(--mostarda); }
.assinatura { font: italic 400 1.15em/1.3 var(--titulo); color: var(--terracota); margin: 6px 0 10px; }

/* listas */
ul, ol { margin: 0 0 10px; padding: 0; list-style: none; }
ul.marcadores li { position: relative; padding-left: 16px; margin-bottom: 4px; }
ul.marcadores li::before { content: ""; position: absolute; left: 1px; top: .58em; width: 6px; height: 6px; border-radius: 50%; background: var(--mostarda); }
ul.checks li { position: relative; padding-left: 20px; margin-bottom: 3px; break-inside: avoid; }
ul.checks li::before { content: ""; position: absolute; left: 0; top: .32em; width: 10px; height: 10px; border: 1.5px solid var(--telha); border-radius: 2.5px; }
ol.passos li { display: grid; grid-template-columns: 22px 1fr; gap: 8px; margin-bottom: 5px; }
ol.passos .n { width: 20px; height: 20px; margin-top: 1px; border-radius: 50%; background: var(--verde); color: var(--creme);
  font: 700 .8em/20px var(--texto); text-align: center; }

/* ===== páginas de impacto (verde e terracota) ===== */
.abertura { position: absolute; inset: 0; padding: 30mm 26mm; display: flex; flex-direction: column; justify-content: center; }
.abertura.alto { justify-content: flex-start; padding-top: 34mm; }
.abertura h1, .abertura h2 { color: var(--creme); }
.abertura .kicker { color: var(--mostarda); }
.abertura .lead, .abertura p { color: var(--creme); }
.abertura .assinatura { color: var(--mostarda); }
.abertura .destaque { color: var(--creme); border-color: var(--mostarda); }
.logo { font: 700 4.6em/.95 var(--titulo); letter-spacing: -.02em; color: var(--creme); margin: 0 0 16px; }
.grande { font-size: 3.2em; line-height: 1.02; }
.fio { width: 56px; height: 3px; background: var(--mostarda); border: 0; margin: 4px 0 22px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 6px 0 26px; }
.tags span { font: 700 .75em/1 var(--texto); letter-spacing: .14em; text-transform: uppercase; padding: 8px 12px; border-radius: 99px;
  border: 1.5px solid rgba(248, 238, 217, .6); color: var(--creme); }
.lista-abertura li { display: grid; grid-template-columns: 40px 1fr; gap: 12px; padding: 12px 0; border-top: 1px solid rgba(248, 238, 217, .28); }
.lista-abertura li:last-child { border-bottom: 1px solid rgba(248, 238, 217, .28); }
.lista-abertura .n { font: 600 1.9em/1 var(--titulo); color: var(--mostarda); }
.lista-abertura h3 { color: var(--mostarda); margin: 2px 0 4px; }
.lista-abertura h3 .pg { color: var(--creme); opacity: .75; margin-left: 6px; }
.lista-abertura p { margin: 0; }

/* abertura da receita (terracota): título no fundo, ingredientes num cartão */
.cartao-ingredientes { background: rgba(255, 252, 245, .97); color: var(--tinta); border-radius: 5mm; padding: 9mm 10mm 7mm; margin-top: 8mm; }
.cartao-ingredientes h2 { color: var(--verde); margin-top: 0; }
.cartao-ingredientes .assinatura { color: var(--terracota); margin: 10px 0 0; }

/* ===== receitas ===== */
.rotulo { font: 700 .8em/1.3 var(--texto); letter-spacing: .14em; text-transform: uppercase; color: var(--verde-claro); margin: -8px 0 12px; }
.rotulo span { font: italic 400 1.25em var(--titulo); letter-spacing: 0; text-transform: none; color: var(--suave); }
.meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 0 0 14px; }
.meta p { margin: 0; background: var(--creme); border-radius: 3mm; padding: 7px 11px; line-height: 1.3; font-weight: 500; }
.meta b { display: block; font: 700 .7em/1.4 var(--texto); letter-spacing: .16em; color: var(--telha); }
.bloco-ingredientes { background: #FBF4E4; border: 1px solid var(--linha); border-radius: 4mm; padding: 10px 14px 4px; margin-bottom: 14px; }
.bloco-ingredientes h2 { margin: 0 0 6px; }
.colunas { columns: 2; column-gap: 22px; }
.colunas .grupo { break-inside: avoid; }
.colunas h3 { margin-top: 0; }
.receita h2.preparo { margin-top: 0; }
.segredo { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: start; background: var(--verde); color: var(--creme);
  border-radius: 4mm; padding: 11px 14px 2px; margin-top: 10px; }
.segredo h3 { color: var(--mostarda); margin: 2px 0 0; white-space: nowrap; }
.segredo p { margin-bottom: 9px; }

/* sumário */
.sumario li { display: grid; grid-template-columns: 26px 1fr auto; gap: 8px; align-items: baseline; padding: 3px 0; }
.sumario li.cap { margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--linha); font-weight: 700; }
.sumario li.cap:first-child { border-top: 0; margin-top: 0; }
.sumario li.sub { grid-template-columns: 34px 1fr auto; color: var(--suave); }
.sumario .n { font: 600 1.15em var(--titulo); color: var(--telha); }
.sumario .pg { font: 600 1em var(--titulo); color: var(--terracota); }

/* tabelas */
table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 0 0 10px; border: 1px solid var(--linha); border-radius: 3mm; overflow: hidden; }
th { font: 700 .72em/1.2 var(--texto); letter-spacing: .14em; text-transform: uppercase; text-align: left; color: var(--creme); background: var(--verde); padding: 8px 11px; }
td { padding: 6px 11px; vertical-align: top; border-top: 1px solid var(--linha); }
tr:nth-child(even) td { background: #FBF4E4; }
td:first-child { width: 34%; font: 600 1.05em/1.4 var(--titulo); color: var(--terracota); }

/* listas rotuladas nas páginas claras */
.rotulados li { display: grid; grid-template-columns: 30px 1fr; gap: 8px; }
.rotulados .n { font: 600 1.6em/1 var(--titulo); color: var(--mostarda); }
.rotulados h3 { margin: 2px 0 4px; }
.rotulados p { margin-bottom: 9px; }

/* fotos: recorte redondo, como pratos vistos de cima */
.foto { display: block; aspect-ratio: 1; border-radius: 50%; background: center / cover no-repeat; border: 2.2mm solid var(--creme);
  box-shadow: 0 10px 28px rgba(0, 0, 0, .30); }
.foto-rodape { position: absolute; left: 50%; bottom: 16mm; width: 84mm; transform: translateX(-50%); }
.foto-capa { width: 104mm; bottom: 14mm; }
.topo-receita { display: flex; align-items: center; gap: 8mm; }
.topo-receita > div { flex: 1; min-width: 0; }
.foto-receita { flex: none; width: 66mm; }
.foto-flutua { float: right; width: 50mm; margin: 0 0 4mm 7mm; shape-outside: circle(50%); border-color: #fff;
  box-shadow: 0 6px 18px rgba(120, 90, 20, .22); }

.manuscrita { font-family: var(--titulo); font-style: italic; font-size: 1.08em; }
"""


def ps(textos, cls=""):
    c = f' class="{cls}"' if cls else ""
    return "".join(f"<p{c}>{e(t)}</p>" for t in textos)


def lista(itens, cls="marcadores"):
    return f'<ul class="{cls}">' + "".join(f"<li>{e(i)}</li>" for i in itens) + "</ul>"


def ol(itens):
    return '<ol class="passos">' + "".join(f'<li><span class="n">{k}</span><span>{e(t)}</span></li>' for k, t in enumerate(itens, 1)) + "</ol>"


def tabela(cab, linhas):
    return ("<table><thead><tr>" + "".join(f"<th>{e(c)}</th>" for c in cab) + "</tr></thead><tbody>"
            + "".join(f"<tr><td>{e(a)}</td><td>{e(b)}</td></tr>" for a, b in linhas) + "</tbody></table>")


def clara(corpo, n=None, cls=""):
    rod = f'<footer class="rodape"><span>Cozinha Mamede</span><b>{n}</b></footer>' if n else ""
    return f'<section class="pagina fundo-creme {cls}"><div class="cartao">{corpo}{rod}</div></section>'


def foto(nome):
    """Caminho da foto em fotos/ (jpg, jpeg, png ou webp), ou None se ela ainda não existir."""
    for ext in ("jpg", "jpeg", "png", "webp"):
        if os.path.exists(f"fotos/{nome}.{ext}"):
            return f"fotos/{nome}.{ext}"
    return None


def img(nome, cls):
    f = foto(nome)
    return f'<div class="foto {cls}" style="background-image:url(\'{f}\')" role="img" aria-label="{nome}"></div>' if f else ""


def impacto(corpo, fundo="verde", alto=False, foto_rodape=None, cls_foto=""):
    extra = img(foto_rodape, f"foto-rodape {cls_foto}") if foto_rodape else ""
    return f'<section class="pagina fundo-{fundo}"><div class="abertura{" alto" if alto else ""}">{corpo}</div>{extra}</section>'


def capa():
    return impacto('<p class="kicker">EBOOK DE RECEITAS</p><h1 class="logo">Cozinha<br>Mamede</h1><hr class="fio">'
                   '<p class="assinatura">por CHEF ALLAN MAMEDE</p>', alto=True, foto_rodape="capa", cls_foto="foto-capa")


def rotulados(itens, ini=1):
    return '<ol class="rotulados">' + "".join(
        f'<li><span class="n">{k}</span><div><h3>{e(a)}</h3><p>{e(b)}</p></div></li>' for k, (a, b) in enumerate(itens, ini)) + "</ol>"


def paginas():
    out = [capa()]
    out.append(impacto(
        '<h1 class="grande">CINCO INGREDIENTES</h1>'
        '<div class="tags"><span>ABÓBORA CABOTIÁ</span><span>CENOURA</span><span>MANDIOCA</span><span>SOBRECOXA DE FRANGO</span><span>BANANA-DA-TERRA</span></div>'
        '<h1 class="grande">QUINZE TRANSFORMAÇÕES</h1><hr class="fio">'
        "<h2>UM NOVO JEITO DE OLHAR PARA A SUA COZINHA.</h2>"
        '<p class="lead">Técnica de chef, sabor afetivo e aproveitamento integral, da casca à semente, com o que você já compra toda semana.</p>',
        "terracota"))
    out.append(clara("<h1>QUEM É CHEF ALLAN MAMEDE?</h1>" + ps([LOREM + ".", LOREM, LOREM])))
    out.append(impacto('<h1 class="logo">SUMÁRIO</h1><hr class="fio">', "terracota"))
    itens = []
    for n, t, pg, subs in SUMARIO:
        itens.append(f'<li class="cap"><span class="n">{n}</span><span>{e(t)}</span><span class="pg">{pg}</span></li>')
        itens += [f'<li class="sub"><span></span><span>{e(s)}</span><span class="pg">{p}</span></li>' for s, p in subs]
    out.append(clara('<h1>SUMÁRIO</h1><ul class="sumario">' + "".join(itens) + "</ul>", "02"))
    out.append(clara('<p class="kicker">INTRODUÇÃO</p><h1>UM NOVO JEITO DE OLHAR A SUA COZINHA</h1>' + img("boas-vindas", "foto-flutua") + ps(INTRO)
                     + '<blockquote class="destaque">PARE DE FAZER SEMPRE A MESMA COMIDA DO MESMO JEITO.</blockquote>'
                     + '<p class="assinatura">CHEF ALLAN MAMEDE</p>'))
    out.append(clara('<p class="kicker">O MÉTODO</p><h1>O JEITO MAMEDE DE COZINHAR</h1>'
                     "<p>O método que guia todo o material se apoia em três fundamentos.</p>" + rotulados(FUNDAMENTOS)
                     + '<blockquote class="destaque">AFETO, TÉCNICA E APROVEITAMENTO. NESSA ORDEM, EM TODO PRATO.</blockquote>'
                     + "<h2>COMO USAR ESTE GUIA</h2><p>Cada um dos 5 capítulos é dedicado a um ingrediente e segue a mesma jornada:</p>"
                     + tabela(("ETAPA", "O QUE VOCÊ ENCONTRA"), ETAPAS)
                     + "<p>MEDIDAS: 1 xícara = 240 ml · 1 colher (sopa) = 15 ml · 1 colher (chá) = 5 ml · forno sempre preaquecido.</p>", "04"))
    for n, c in enumerate(CAPITULOS, 1):
        out += capitulo(c, n)
    out.append(clara('<p class="kicker">BÔNUS</p><h1>OS 10 PULOS DO MAMEDE</h1>'
                     '<p class="lead">Dez decisões universais de cozinha, que valem para qualquer ingrediente e qualquer receita.</p>'
                     + rotulados(PULOS_1), "55"))
    out.append(clara('<p class="kicker">BÔNUS · CONTINUAÇÃO</p><h1>MAIS 5 PULOS DO MAMEDE</h1>' + rotulados(PULOS_2, 6)
                     + '<blockquote class="destaque">CHEF É QUEM OLHA PARA O BÁSICO E ENXERGA POSSIBILIDADES.</blockquote>', "56"))
    out.append(impacto('<h1 class="logo">COZINHA MAMEDE</h1><hr class="fio">' + ps(FECHO, "lead")
                       + '<p class="assinatura">Bom apetite! · CHEF ALLAN MAMEDE</p>', alto=True, foto_rodape="obrigado"))
    return out


def lista_transf(c):
    itens = ""
    for k, (rot, desc, pg) in enumerate(c["transf"], 1):
        pgr = f'&nbsp;&nbsp;<span class="pg">{pg}</span>' if pg else ""
        itens += f'<li><span class="n">{k}</span><div><h3>{e(rot)}{pgr}</h3><p>{e(desc)}</p></div></li>'
    return '<h2>3 TRANSFORMAÇÕES</h2><ol class="lista-abertura">' + itens + "</ol>"


def capitulo(c, n):
    out = []
    if c.get("abertura_ch1"):
        out.append(impacto(f'<p class="kicker">{c["abre_kicker"]}</p><h1 class="logo">{e(c["nome"])}</h1><hr class="fio">'
                           f'<h2>{e(c["sub"])}</h2>', alto=True, foto_rodape=f"cap{n}"))
        aberta = f'<blockquote class="destaque">{e(c["destaque"])}</blockquote>' + lista_transf(c)
        out += [impacto(aberta, "terracota"), impacto(aberta, "terracota")]
    else:
        out.append(impacto(f'<p class="kicker">{c["abre_kicker"]}</p><h1 class="logo">{e(c["nome"])}</h1><hr class="fio">'
                           f'<h2>{e(c["sub"])}</h2><p class="lead">{e(c["destaque"])}</p>' + lista_transf(c), alto=True, foto_rodape=f"cap{n}")
                   .replace("</section>", f'<footer class="rodape-topo"><span>Cozinha Mamede</span><b>{c["pag_abre"]}</b></footer></section>'))
    out.append(clara(f'<p class="kicker">{c["kicker_ing"]}</p><h1>O INGREDIENTE</h1>' + ps(c["ingrediente"])
                     + "<h2>ANTES DA PANELA</h2><h3>NA HORA DE ESCOLHER</h3>" + lista(c["escolher"])
                     + "<h3>COMO GUARDAR</h3>" + lista(c["guardar"]) + "<h3>PRÉ-PREPARO E CORTES</h3>" + lista(c["cortes"]), c["pag_ing"]))
    if c.get("abertura_ch1"):
        out.append(impacto('<p class="kicker">EBOOK DE RECEITAS</p><h1 class="logo">COZINHA<br>MAMEDE</h1><hr class="fio">'))
    for k, r in enumerate(c["receitas"], 1):
        todos = [i for _, g in r["grupos"] for i in g]
        out.append(impacto(f'<div class="topo-receita"><div><p class="kicker">#COZINHAMAMEDE · TRANSFORMAÇÃO 0{k}</p><h1 class="grande">{e(r["curto"])}</h1>'
                           f'<p class="lead">{e(r["linha"])}</p></div>{img(f"r{n}-{k}", "foto-receita")}</div>'
                           f'<div class="cartao-ingredientes"><h2>INGREDIENTES</h2>{lista(todos, "checks")}'
                           '<p class="assinatura">receitas por CHEF ALLAN MAMEDE</p></div>', "terracota", alto=True))
        grupos = "".join(f'<div class="grupo">{f"<h3>{e(t)}</h3>" if t else ""}{lista(g, "checks")}</div>' for t, g in r["grupos"])
        out.append(clara(
            f'<div class="receita"><p class="kicker">TRANSFORMAÇÃO 0{k} · {c["tag"]}</p><h1>{e(r["titulo"])}</h1>'
            f'<p class="rotulo">{e(r["rotulo"])} <span>{e(r["nota"])}</span></p>'
            f'<div class="meta"><p><b>PREPARO:</b><span>{e(r["preparo"])}</span></p><p><b>COZIMENTO:</b><span>{e(r["cozimento"])}</span></p>'
            f'<p><b>RENDE:</b><span>{e(r["rende"])}</span></p></div>'
            f'<div class="bloco-ingredientes"><h2>INGREDIENTES</h2><div class="colunas">{grupos}</div></div>'
            f'<h2 class="preparo">MODO DE PREPARO</h2>{ol(r["passos"])}'
            f'<div class="segredo"><h3>SEGREDO DE CHEF</h3><p>{e(r["segredo"])}</p></div></div>', r["pagina"]))
    out.append(clara(f'<p class="kicker">O PULO DO CHEF · {c["tag"]}</p><h1>{e(c["pulo_titulo"])}</h1>'
                     f'<h2>O ERRO</h2><p>{e(c["erro"])}</p><h2>A TÉCNICA</h2>{ol(c["tecnica"])}'
                     "<h2>NÃO TEM ISSO?</h2>" + tabela(("SE NÃO TIVER…", "USE…"), c["subst"]), c["pag_pulo"]))
    out.append(clara(f'<p class="kicker">APROVEITA ISSO TAMBÉM · {c["tag"]}</p><h1>NADA VAI PARA O LIXO</h1>' + img(f"aproveita{n}", "foto-flutua")
                     + "".join(f"<h2>{e(t)}</h2><p>{e(x)}</p>" for t, x in c["aprov"]), c["pag_aprov"]))
    return out


if __name__ == "__main__":
    pags = paginas()
    html = ('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width, initial-scale=1">'
            f"<title>Cozinha Mamede</title><style>{CSS}</style></head><body>" + "\n".join(pags) + "</body></html>")
    open("ebook.html", "w", encoding="utf-8").write(html)
    print(len(pags), "páginas")
