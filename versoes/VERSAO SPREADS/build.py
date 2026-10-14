# Gera ebook.html: o ebook diagramado em páginas duplas (spreads) assimétricas.
# Uso: python3 build.py && node pdf.js
#
# Cada página tem uma coluna de texto em cor sólida no lado de fora e uma área de imagem
# neutra no lado de dentro. As fotos encostam na dobra, então nas páginas duplas os
# pratos das duas páginas se encontram no meio.
#   página da esquerda (par):   [coluna | imagem]  → número no canto inferior esquerdo
#   página da direita (ímpar):  [imagem | coluna]  → número no canto inferior direito
# A capa é a página 1, sozinha à direita.
from html import escape as e
from conteudo import (LOREM, SUMARIO, INTRO, FUNDAMENTOS, ETAPAS, CAPITULOS, PULOS_1, PULOS_2, FECHO)

# Cor sólida de cada parte do livro (texto creme por cima)
CORES = {
    "abertura": "#6E4234",  # cacau
    1: "#A9472A",           # abóbora
    2: "#94631B",           # banana caramelizada
    3: "#862D3B",           # vinho (frango)
    4: "#56653A",           # oliva (mandioca)
    5: "#B04656",           # rosa-cenoura
    "bonus": "#2E5960",     # verde-petróleo
}

# Frases de apoio, em cima das imagens
APOIO_CAP = {1: "DA CASCA À SEMENTE", 2: "DO SALGADO AO DOCE", 3: "O CORTE QUE PERDOA", 4: "A RAIZ DO BRASIL", 5: "DA RAIZ À RAMA"}

CSS = """
@font-face { font-family: "Outfit"; font-weight: 300; src: url(fontes/outfit-300.ttf); }
@font-face { font-family: "Outfit"; font-weight: 400; src: url(fontes/outfit-400.ttf); }
@font-face { font-family: "Outfit"; font-weight: 500; src: url(fontes/outfit-500.ttf); }
@font-face { font-family: "DM Sans"; font-weight: 400; src: url(fontes/dm-sans-400.ttf); }
@font-face { font-family: "DM Sans"; font-weight: 500; src: url(fontes/dm-sans-500.ttf); }
@font-face { font-family: "DM Sans"; font-weight: 700; src: url(fontes/dm-sans-700.ttf); }

:root {
  --neutro: #F0ECE5; --neutro-2: #E6E0D6; --borda: #1F5560; --creme: #FFF7EC; --apoio: #1F5560; --tag: #183F47; --ouro: #F2B84B;
  --titulo: "Outfit", "Helvetica Neue", Arial, sans-serif;
  --texto: "DM Sans", "Helvetica Neue", Arial, sans-serif;
}
@page { size: 210mm 297mm; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; }
body { background: #CFC5A6; font-family: var(--texto); font-size: 13.4px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

/* ===== na tela: páginas duplas lado a lado, como um livro aberto ===== */
.livro { display: flex; flex-direction: column; align-items: center; gap: 14mm; padding: 14mm 0; }
.spread { display: flex; box-shadow: 0 10px 34px rgba(60, 45, 10, .28); }
.spread.so-direita { margin-left: 210mm; }
@media print {
  body { background: none; }
  .livro { display: block; padding: 0; }
  .spread { display: contents; box-shadow: none; }
  .spread.so-direita { margin: 0; }
}
@media screen and (max-width: 900px) {
  .livro { gap: 0; padding: 0; }
  .spread { flex-direction: column; box-shadow: none; }
  .spread.so-direita { margin: 0; }
  .pagina { width: 100vw !important; height: calc(100vw * 297 / 210) !important; font-size: calc(100vw / 210mm * 12px); }
}

/* ===== página ===== */
.pagina { width: 210mm; height: 297mm; position: relative; overflow: hidden; break-after: page; background: var(--neutro);
  display: grid; color: var(--creme); }
.esq { grid-template-columns: var(--col, 47%) 1fr; }
.dir { grid-template-columns: 1fr var(--col, 47%); }
.dir .coluna { order: 2; }

.coluna { position: relative; z-index: 2; background: var(--cor); padding: 24mm 11mm 30mm; overflow: hidden; }
.esq .coluna { border-radius: 0 9mm 9mm 0; }
.dir .coluna { border-radius: 9mm 0 0 9mm; }
.imagem { position: relative; z-index: 1; }
/* borda de cor contrastante em volta da área de imagem */
.imagem::before { content: ""; position: absolute; inset: 9mm; border: 1.6px solid var(--borda); border-radius: 6mm; opacity: .55; }
.esq .imagem::before { right: -2mm; border-right: 0; border-radius: 6mm 0 0 6mm; }
.dir .imagem::before { left: -2mm; border-left: 0; border-radius: 0 6mm 6mm 0; }

/* texto de apoio, pequeno, em cima da imagem */
.apoio { position: absolute; top: 19mm; left: 15mm; right: 15mm; margin: 0; text-align: center;
  font: 700 7.5pt/1.35 var(--texto); letter-spacing: .16em; text-transform: uppercase; color: var(--apoio); }

/* foto: prato redondo que encosta na dobra */
.foto { position: absolute; top: 50%; width: 138mm; height: 138mm; margin-top: -62mm; border-radius: 50%;
  background: center / cover no-repeat; border: 2.4mm solid var(--borda); box-shadow: 0 14px 30px rgba(40, 30, 10, .18); }
.esq .foto { right: -30mm; }
.dir .foto { left: -30mm; }
.foto.media { width: 118mm; height: 118mm; margin-top: -50mm; }
.esq .foto.media { right: -22mm; }
.dir .foto.media { left: -22mm; }

/* número de página nos cantos externos, com um fio de cor acima */
.num { position: absolute; bottom: 11mm; z-index: 3; display: flex; flex-direction: column; gap: 2.2mm; }
.esq .num { left: 11mm; align-items: flex-start; }
.dir .num { right: 11mm; align-items: flex-end; }
.num::before { content: ""; width: 12mm; height: 1.2px; background: var(--ouro); }
.num span { background: var(--tag); color: var(--creme); font: 700 8pt/1 var(--texto); letter-spacing: .08em; padding: 1.6mm 3.2mm; border-radius: 1mm; }

/* ===== tipografia ===== */
h1 { font: 300 34pt/1.04 var(--titulo); letter-spacing: -.01em; margin: 0 0 7mm; }
h1.medio { font-size: 24pt; }
h2 { font: 400 16.5pt/1.18 var(--titulo); margin: 0 0 5mm; }
h3, .rotulo { font: 700 8pt/1.3 var(--texto); letter-spacing: .16em; text-transform: uppercase; color: var(--ouro); margin: 6mm 0 2.4mm; }
h1 + h3, h2 + h3, .kicker + h3 { margin-top: 0; }
.kicker { font: 500 7.5pt/1.3 var(--texto); letter-spacing: .2em; text-transform: uppercase; opacity: .8; margin: 0 0 4mm; }
p, li { margin: 0 0 2.6mm; line-height: 1.5; }
.lead { font: 300 13.5pt/1.35 var(--titulo); margin-bottom: 5mm; }
.miuda { font-size: 9pt; }
.destaque { font: 400 12.5pt/1.3 var(--titulo); margin: 6mm 0 3mm; padding-left: 4mm; border-left: 2px solid var(--ouro); }
.assinatura { font: 500 8pt/1.3 var(--texto); letter-spacing: .16em; text-transform: uppercase; color: var(--ouro); margin-top: 4mm; }
ul, ol { margin: 0 0 3mm; padding: 0; list-style: none; }
ul.ing li { position: relative; padding-left: 4mm; margin-bottom: 1.4mm; }
ul.ing li::before { content: ""; position: absolute; left: 0; top: .62em; width: 1.6mm; height: 1.6mm; border-radius: 50%; background: var(--ouro); }
ol.passos li { display: grid; grid-template-columns: 5mm 1fr; gap: 1.6mm; margin-bottom: 2.2mm; }
ol.passos .n { font: 700 8pt/1.5 var(--texto); color: var(--ouro); }
.meta { display: grid; grid-template-columns: repeat(3, auto); justify-content: start; gap: 5mm; margin: 0 0 5mm; padding: 3mm 0;
  border-top: 1px solid rgba(255, 247, 236, .35); border-bottom: 1px solid rgba(255, 247, 236, .35); }
.meta p { margin: 0; line-height: 1.3; }
.meta b { display: block; font: 700 6.5pt/1.5 var(--texto); letter-spacing: .16em; color: var(--ouro); }
.caixa { background: rgba(255, 247, 236, .12); border-radius: 3mm; padding: 3.4mm 4mm .8mm; margin-top: 4mm; }
.caixa h3 { margin-top: 0; }
.tags { display: flex; flex-wrap: wrap; gap: 1.8mm; margin: 0 0 7mm; }
.tags span { font: 700 6.5pt/1 var(--texto); letter-spacing: .14em; padding: 1.8mm 2.6mm; border: 1px solid rgba(255, 247, 236, .55); border-radius: 9px; }
.rotulados li { display: grid; grid-template-columns: 7mm 1fr; gap: 1mm; margin-bottom: 1.6mm; }
.rotulados .n { font: 300 15pt/1 var(--titulo); color: var(--ouro); }
.rotulados h3 { margin: 0 0 1.4mm; }
.rotulados .pg { color: var(--creme); opacity: .7; margin-left: 2mm; }
dl { margin: 0; }
dt { font: 700 7.5pt/1.3 var(--texto); letter-spacing: .1em; text-transform: uppercase; color: var(--ouro); margin-top: 3.4mm; }
dd { margin: 1mm 0 0; line-height: 1.45; }
.sumario li { display: grid; grid-template-columns: 5mm 1fr auto; gap: 2mm; margin: 0; padding: 1mm 0; line-height: 1.35; }
.sumario li.cap { margin-top: 2.6mm; font-weight: 700; }
.sumario li.sub { grid-template-columns: 7mm 1fr auto; opacity: .85; font-size: 8.5pt; }
.sumario .n, .sumario .pg { color: var(--ouro); font-weight: 700; }

/* capa e contracapa */
.capa h1 { font-size: 46pt; line-height: .98; font-weight: 300; }
.capa .coluna { display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 34mm; }
"""


MINUSCULAS = {"de", "da", "do", "das", "dos", "e", "no", "na", "com", "ou"}


def titulo(t):
    """NHOQUE DE ABÓBORA → Nhoque de Abóbora"""
    return " ".join(p.lower() if i and p.lower() in MINUSCULAS else p.capitalize() for i, p in enumerate(t.split()))


def ps(textos, cls=""):
    c = f' class="{cls}"' if cls else ""
    return "".join(f"<p{c}>{e(t)}</p>" for t in textos)


def ul(itens, cls="ing"):
    return f'<ul class="{cls}">' + "".join(f"<li>{e(i)}</li>" for i in itens) + "</ul>"


def ol(itens):
    return '<ol class="passos">' + "".join(f'<li><span class="n">{k:02d}</span><span>{e(t)}</span></li>' for k, t in enumerate(itens, 1)) + "</ol>"


def rotulados(itens, ini=1):
    return '<ol class="rotulados">' + "".join(
        f'<li><span class="n">{k}</span><div><h3>{e(a)}</h3><p>{e(b)}</p></div></li>' for k, (a, b) in enumerate(itens, ini)) + "</ol>"


class Pagina:
    """Uma página: coluna de texto + área de imagem. O número é dado depois, na paginação."""

    def __init__(self, chave, cor, coluna, foto, apoio="", zoom=None, col=None, media=False, cls=""):
        self.chave, self.cor, self.coluna, self.foto, self.apoio = chave, cor, coluna, foto, apoio
        self.zoom, self.col, self.media, self.cls = zoom, col, media, cls

    def html(self, n, nums):
        lado = "esq" if n % 2 == 0 else "dir"
        estilo = f"--cor:{self.cor};" + (f"--col:{self.col};" if self.col else "")
        bg = f"background-image:url('fotos/{self.foto}.jpg');"
        if self.zoom:  # close-up: mesma foto, ampliada num ponto
            tam, x, y = self.zoom
            bg += f"background-size:{tam}%;background-position:{x}% {y}%;"
        coluna = self.coluna(nums) if callable(self.coluna) else self.coluna
        apoio = f'<p class="apoio">{e(self.apoio)}</p>' if self.apoio else ""
        num = f'<footer class="num"><span>{n:02d}</span></footer>' if self.chave != "capa" else ""
        return (f'<section class="pagina {lado} {self.cls}" style="{estilo}" id="p{n}">'
                f'<div class="coluna">{coluna}</div>'
                f'<div class="imagem">{apoio}<div class="foto{" media" if self.media else ""}" style="{bg}" role="img" aria-label="{self.foto}"></div></div>'
                f"{num}</section>")


def capitulo(c, n):
    cor = CORES[n]
    tag = c["tag"]
    pags = []
    pags.append(Pagina(f"cap{n}", cor,
                       f'<p class="kicker">{c["abre_kicker"]}</p><h1>{e(c["nome"])}</h1><h3>{e(c["sub"])}</h3>'
                       + (f'<p class="destaque">{e(c["destaque"])}</p>' if c.get("abertura_ch1") else f'<p class="lead">{e(c["destaque"])}</p>'),
                       f"cap{n}", APOIO_CAP[n]))

    def transf(nums):
        itens = "".join(
            f'<li><span class="n">{k}</span><div><h3>{e(rot)}<span class="pg">{nums[f"r{n}-{k}"]:02d}</span></h3><p>{e(desc)}</p></div></li>'
            for k, (rot, desc, _) in enumerate(c["transf"], 1))
        return f'<p class="kicker">CAPÍTULO 0{n} · {tag}</p><h1 class="medio">3 TRANSFORMAÇÕES</h1><ol class="rotulados">{itens}</ol>'
    pags.append(Pagina(f"transf{n}", cor, transf, f"cap{n}", f"3 jeitos de olhar para {['', 'a abóbora', 'a banana', 'a sobrecoxa', 'a mandioca', 'a cenoura'][n]}",
                       zoom=(170, 30, 40), media=True))
    pags.append(Pagina(f"ing{n}", cor, f'<p class="kicker">{c["kicker_ing"]}</p><h1 class="medio">O INGREDIENTE</h1>' + ps(c["ingrediente"]),
                       f"cap{n}", "O olhar do chef", zoom=(210, 70, 60)))
    pags.append(Pagina(f"antes{n}", cor,
                       f'<p class="kicker">{c["kicker_ing"]}</p><h1 class="medio">ANTES DA PANELA</h1>'
                       f'<h3>NA HORA DE ESCOLHER</h3>{ul(c["escolher"])}<h3>COMO GUARDAR</h3>{ul(c["guardar"])}'
                       f'<h3>PRÉ-PREPARO E CORTES</h3>{ul(c["cortes"])}',
                       f"cap{n}", "Escolher · guardar · cortar", zoom=(190, 45, 75), col="55%", media=True))
    for k, r in enumerate(c["receitas"], 1):
        grupos = "".join(f'{f"<h3>{e(t)}</h3>" if t else ""}{ul(g)}' for t, g in r["grupos"])
        pags.append(Pagina(f"r{n}-{k}", cor,
                           f'<p class="kicker">#COZINHAMAMEDE · TRANSFORMAÇÃO 0{k}</p><h1>{e(titulo(r["curto"]))}</h1>'
                           f'<p class="lead">{e(r["linha"])}</p>'
                           f'<div class="meta"><p><b>PREPARO:</b>{e(r["preparo"])}</p><p><b>COZIMENTO:</b>{e(r["cozimento"])}</p>'
                           f'<p><b>RENDE:</b>{e(r["rende"])}</p></div>'
                           f'<h3>INGREDIENTES</h3>{grupos}<p class="assinatura">receitas por CHEF ALLAN MAMEDE</p>',
                           f"r{n}-{k}", f'{r["rotulo"]} {r["nota"]}'))
        pags.append(Pagina(f"r{n}-{k}b", cor,
                           f'<p class="kicker">TRANSFORMAÇÃO 0{k} · {tag}</p><h2>{e(r["titulo"])}</h2>'
                           f'<h3>MODO DE PREPARO</h3>{ol(r["passos"])}'
                           f'<div class="caixa"><h3>SEGREDO DE CHEF</h3><p>{e(r["segredo"])}</p></div>',
                           f"r{n}-{k}", f'Rende {r["rende"]}', zoom=(175, 40, 45), col="52%", media=True))
    pags.append(Pagina(f"pulo{n}", cor,
                       f'<p class="kicker">O PULO DO CHEF · {tag}</p><h1 class="medio">{e(c["pulo_titulo"])}</h1>'
                       f'<h3>O ERRO</h3><p>{e(c["erro"])}</p><h3>A TÉCNICA</h3>{ol(c["tecnica"])}',
                       f"r{n}-1", "O erro mais comum", zoom=(160, 55, 50)))
    pags.append(Pagina(f"subst{n}", cor,
                       f'<p class="kicker">NÃO TEM ISSO? · {tag}</p><h1 class="medio">NÃO TEM ISSO?</h1>'
                       '<p class="miuda"><b>SE NÃO TIVER… USE…</b></p><dl>'
                       + "".join(f"<dt>{e(a)}</dt><dd>{e(b)}</dd>" for a, b in c["subst"]) + "</dl>",
                       f"cap{n}", "Substitua sem travar", zoom=(230, 20, 30), media=True))
    meio = 1
    for parte, itens in (("a", c["aprov"][:meio]), ("b", c["aprov"][meio:])):
        corpo = "".join(f"<h3>{e(t)}</h3><p>{e(x)}</p>" for t, x in itens)
        topo = (f'<p class="kicker">APROVEITA ISSO TAMBÉM · {tag}</p><h1 class="medio">NADA VAI PARA O LIXO</h1>' if parte == "a"
                else f'<p class="kicker">APROVEITA ISSO TAMBÉM · {tag}</p>')
        pags.append(Pagina(f"aprov{n}{parte}", cor, topo + corpo, f"aproveita{n}",
                           "Nada vai para o lixo" if parte == "a" else "Sabor que iria para o lixo",
                           zoom=None if parte == "a" else (180, 60, 40), media=parte == "b"))
    return pags


def paginas():
    A, B = CORES["abertura"], CORES["bonus"]
    P = []
    P.append(Pagina("capa", A,
                    '<p class="kicker">EBOOK DE RECEITAS</p><h1>Cozinha<br>Mamede</h1>'
                    '<p class="lead">CINCO INGREDIENTES.<br>QUINZE TRANSFORMAÇÕES.</p><p class="assinatura">por CHEF ALLAN MAMEDE</p>',
                    "capa", "", cls="capa"))
    P.append(Pagina("cinco", A,
                    '<h1 class="medio">CINCO INGREDIENTES</h1><div class="tags"><span>ABÓBORA CABOTIÁ</span><span>CENOURA</span>'
                    '<span>MANDIOCA</span><span>SOBRECOXA DE FRANGO</span><span>BANANA-DA-TERRA</span></div>'
                    '<h1 class="medio">QUINZE TRANSFORMAÇÕES</h1><h2>UM NOVO JEITO DE OLHAR PARA A SUA COZINHA.</h2>'
                    '<p class="lead">Técnica de chef, sabor afetivo e aproveitamento integral, da casca à semente, com o que você já compra toda semana.</p>',
                    "capa", "Da feira para a sua cozinha", zoom=(170, 30, 35)))
    P.append(Pagina("quem", A, "<h1 class=\"medio\">QUEM É CHEF ALLAN MAMEDE?</h1>" + ps([LOREM + ".", LOREM, LOREM]),
                    "boas-vindas", "O chef por trás das receitas"))

    def sumario(nums):
        destino = {"1": "intro", "2": "metodo", "3": "cap1", "4": "cap2", "5": "cap3", "6": "cap4", "7": "cap5", "8": "bonus1", "9": "fecho"}
        itens = []
        for n, t, _, subs in SUMARIO:
            itens.append(f'<li class="cap"><span class="n">{n}</span><span>{e(t)}</span><span class="pg">{nums[destino[n]]:02d}</span></li>')
            cap = int(n) - 2
            itens += [f'<li class="sub"><span></span><span>{e(s)}</span><span class="pg">{nums[f"r{cap}-{k}"]:02d}</span></li>'
                      for k, (s, _) in enumerate(subs, 1)]
        return '<h1 class="medio">SUMÁRIO</h1><ul class="sumario">' + "".join(itens) + "</ul>"
    P.append(Pagina("sumario", A, sumario, "obrigado", "15 receitas, 5 ingredientes", zoom=(165, 35, 40), col="58%", media=True))
    P.append(Pagina("intro", A, '<p class="kicker">INTRODUÇÃO</p><h1 class="medio">UM NOVO JEITO DE OLHAR A SUA COZINHA</h1>' + ps(INTRO)
                    + '<p class="destaque">PARE DE FAZER SEMPRE A MESMA COMIDA DO MESMO JEITO.</p><p class="assinatura">CHEF ALLAN MAMEDE</p>',
                    "boas-vindas", "Comece por aqui", zoom=(190, 50, 55), media=True))
    P.append(Pagina("metodo", A, '<p class="kicker">O MÉTODO</p><h1 class="medio">O JEITO MAMEDE DE COZINHAR</h1>'
                    "<p>O método que guia todo o material se apoia em três fundamentos.</p>" + rotulados(FUNDAMENTOS)
                    + '<p class="destaque">AFETO, TÉCNICA E APROVEITAMENTO. NESSA ORDEM, EM TODO PRATO.</p>',
                    "capa", "Afeto · técnica · aproveitamento", zoom=(200, 70, 65)))
    P.append(Pagina("guia", A, '<p class="kicker">O MÉTODO</p><h1 class="medio">COMO USAR ESTE GUIA</h1>'
                    "<p>Cada um dos 5 capítulos é dedicado a um ingrediente e segue a mesma jornada:</p>"
                    '<p class="miuda"><b>ETAPA · O QUE VOCÊ ENCONTRA</b></p><dl>'
                    + "".join(f"<dt>{e(a)}</dt><dd>{e(b)}</dd>" for a, b in ETAPAS) + "</dl>"
                    '<p class="miuda" style="margin-top:5mm">MEDIDAS: 1 xícara = 240 ml · 1 colher (sopa) = 15 ml · 1 colher (chá) = 5 ml · forno sempre preaquecido.</p>',
                    "obrigado", "A mesma jornada em cada capítulo", zoom=(180, 65, 60), media=True))
    for n, c in enumerate(CAPITULOS, 1):
        P += capitulo(c, n)
    P.append(Pagina("bonus1", B, '<p class="kicker">BÔNUS</p><h1 class="medio">OS 10 PULOS DO MAMEDE</h1>'
                    '<p class="lead">Dez decisões universais de cozinha, que valem para qualquer ingrediente e qualquer receita.</p>' + rotulados(PULOS_1),
                    "r3-1", "Dez decisões de chef", zoom=(165, 45, 45), col="54%"))
    P.append(Pagina("bonus2", B, '<p class="kicker">BÔNUS · CONTINUAÇÃO</p><h1 class="medio">MAIS 5 PULOS DO MAMEDE</h1>' + rotulados(PULOS_2, 6)
                    + '<p class="destaque">CHEF É QUEM OLHA PARA O BÁSICO E ENXERGA POSSIBILIDADES.</p>',
                    "r1-1", "Técnica que vale para tudo", zoom=(170, 55, 50), col="54%", media=True))
    P.append(Pagina("fecho", A, '<h1 class="medio">COZINHA MAMEDE</h1>' + ps(FECHO) + '<p class="assinatura">Bom apetite! · CHEF ALLAN MAMEDE</p>',
                    "obrigado", "Bom apetite!"))
    P.append(Pagina("contracapa", A, '<p class="kicker">EBOOK DE RECEITAS</p><h1>Cozinha<br>Mamede</h1><p class="assinatura">por CHEF ALLAN MAMEDE</p>',
                    "capa", "", zoom=(200, 25, 70), cls="capa"))
    return P


if __name__ == "__main__":
    P = paginas()
    nums = {p.chave: i for i, p in enumerate(P, 1)}
    htmls = [p.html(i, nums) for i, p in enumerate(P, 1)]
    # spreads: a capa sozinha à direita, depois pares (2-3), (4-5)…
    spreads = ['<div class="spread so-direita">' + htmls[0] + "</div>"]
    for i in range(1, len(htmls), 2):
        spreads.append('<div class="spread">' + "".join(htmls[i:i + 2]) + "</div>")
    html = ('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width, initial-scale=1">'
            f'<title>Cozinha Mamede</title><style>{CSS}</style></head><body><main class="livro">' + "\n".join(spreads) + "</main></body></html>")
    open("ebook.html", "w", encoding="utf-8").write(html)
    print(len(P), "páginas")
