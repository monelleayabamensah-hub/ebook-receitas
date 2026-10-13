"""Gera o ebook diagramado (HTML pronto para PDF) da Cozinha Mamede.

Estilo inspirado em ficha de receita ilustrada: fundo creme, azul cobalto,
laranja vivo, títulos em caligrafia, texto em fonte mono e traçados soltos.

Uso:  python3 build.py   ->  ebook-cozinha-mamede.html
"""
from pathlib import Path

SAPPHIRE = "#0F52BA"
JADE = "#00A86B"
JADE_LIGHT = "#66CDAA"
JADE_DARK = "#00553A"
GOLD = "#FFD700"
CREAM = "#F6F3EA"

# ---------------------------------------------------------------- ilustrações

def _grains(points):
    return "".join(
        f'<path d="M{x} {y} q4 -3 9 -1" stroke="{SAPPHIRE}" stroke-width="2.6" fill="none" stroke-linecap="round" transform="rotate({r} {x} {y})"/>'
        for x, y, r in points
    )

RICE_GRAINS = _grains([
    (88, 104, -10), (110, 88, 20), (132, 100, -25), (150, 74, 10), (172, 96, 30),
    (196, 82, -15), (214, 104, 15), (120, 70, 35), (100, 112, 5), (232, 110, -30),
    (160, 108, 0), (186, 112, 25), (140, 86, -5), (70, 112, 20), (206, 66, 40),
])


def bowl_body():
    return f"""
  <path d="M26 118 L274 118 C272 182 226 216 150 216 C74 216 28 182 26 118 Z" fill="{SAPPHIRE}"/>
  <path d="M34 128 C110 138 190 138 266 128" stroke="{CREAM}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M44 158 c11 -20 33 -20 42 0 c11 -20 33 -20 42 0 c11 -20 33 -20 42 0 c11 -20 33 -20 42 0 c11 -20 33 -20 42 0" stroke="{CREAM}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M74 186 c8 -14 24 -14 30 0 c8 -14 24 -14 30 0 c8 -14 24 -14 30 0 c8 -14 24 -14 30 0" stroke="{CREAM}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M84 158 q2 10 6 14 M126 158 q2 10 6 14 M168 158 q2 10 6 14 M210 158 q2 10 6 14" stroke="{CREAM}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M110 212 L190 212 L183 236 L117 236 Z" fill="{SAPPHIRE}"/>
  <path d="M120 224 L180 224" stroke="{CREAM}" stroke-width="2.5" stroke-linecap="round"/>"""


def egg_half(cx, cy, rx=24, ry=17, rot=-10):
    return f"""
  <g transform="rotate({rot} {cx} {cy})">
    <ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{CREAM}" stroke="{JADE}" stroke-width="3"/>
    <circle cx="{cx}" cy="{cy}" r="{ry * 0.62:.1f}" fill="{GOLD}" stroke="{JADE}" stroke-width="2.5"/>
    <path d="M{cx - 4} {cy - 4} q3 -3 7 -2" stroke="{CREAM}" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>"""


def svg_rice():
    return f"""<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
  <path d="M232 30 L150 96 M250 40 L160 100" stroke="{JADE}" stroke-width="5" stroke-linecap="round"/>
  <path d="M48 118 C54 68 106 50 150 50 C196 50 246 68 252 118 Z" fill="{CREAM}" stroke="{SAPPHIRE}" stroke-width="4"/>
  {RICE_GRAINS}
  <circle cx="96" cy="84" r="5" fill="none" stroke="{SAPPHIRE}" stroke-width="2.5"/>
  <circle cx="226" cy="92" r="5" fill="none" stroke="{SAPPHIRE}" stroke-width="2.5"/>
  <circle cx="176" cy="64" r="4" fill="none" stroke="{SAPPHIRE}" stroke-width="2.5"/>
  {bowl_body()}
</svg>"""


def svg_cover_bowl():
    chicken = f"""
  <path d="M92 104 C88 70 126 56 158 64 C150 80 136 98 120 112 Z" fill="{GOLD}" stroke="{JADE_DARK}" stroke-width="2.5"/>
  <path d="M104 98 C112 86 126 76 142 70 M112 106 C122 94 134 84 150 76 M98 88 C106 78 116 72 128 66" stroke="{CREAM}" stroke-width="2.5" fill="none" stroke-linecap="round"/>"""
    banana = "".join(
        f'<circle cx="{x}" cy="{y}" r="11" fill="{GOLD}" stroke="{JADE}" stroke-width="2.5"/>'
        f'<path d="M{x - 3} {y - 2} l3 5 l3 -5" stroke="{JADE}" stroke-width="1.8" fill="none"/>'
        for x, y in [(232, 98), (246, 112), (218, 112)]
    )
    beans = "".join(
        f'<ellipse cx="{x}" cy="{y}" rx="7" ry="4.5" fill="{SAPPHIRE}" transform="rotate({r} {x} {y})"/>'
        for x, y, r in [(70, 110, 25), (82, 100, -10), (64, 96, 40), (78, 88, 15)]
    )
    return f"""<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
  <path d="M48 118 C54 68 106 50 150 50 C196 50 246 68 252 118 Z" fill="{CREAM}" stroke="{SAPPHIRE}" stroke-width="4"/>
  {chicken}
  {egg_half(178, 80)}
  {egg_half(204, 96, rot=15)}
  {banana}
  {beans}
  <path d="M138 52 C132 30 150 18 146 4 M160 52 C166 34 152 24 160 10" stroke="{JADE}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="122" cy="110" r="5" fill="none" stroke="{SAPPHIRE}" stroke-width="2.5"/>
  <circle cx="162" cy="112" r="5" fill="none" stroke="{SAPPHIRE}" stroke-width="2.5"/>
  {bowl_body()}
</svg>"""


def svg_beans():
    beans = "".join(
        f'<g transform="rotate({r} {x} {y})"><ellipse cx="{x}" cy="{y}" rx="9" ry="6" fill="{SAPPHIRE}"/>'
        f'<path d="M{x - 4} {y - 2} q4 -2 8 0" stroke="{CREAM}" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>'
        for x, y, r in [(36, 232, 20), (58, 240, -15), (250, 236, 30), (272, 228, -10), (22, 214, 45)]
    )
    floating = "".join(
        f'<ellipse cx="{x}" cy="{y}" rx="8" ry="5" fill="{CREAM}" stroke="{SAPPHIRE}" stroke-width="2" transform="rotate({r} {x} {y})"/>'
        for x, y, r in [(100, 100, 15), (130, 106, -20), (165, 98, 10), (196, 106, 30), (118, 94, 40), (180, 92, -10), (215, 98, 0), (85, 106, -30)]
    )
    return f"""<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
  <path d="M120 70 c-12 -14 10 -22 0 -36 c-8 -12 8 -18 2 -28 M150 66 c-12 -14 10 -22 0 -36 c-8 -12 8 -18 2 -28 M180 70 c-12 -14 10 -22 0 -36 c-8 -12 8 -18 2 -28" stroke="{JADE}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M42 128 C14 126 14 160 44 160" stroke="{SAPPHIRE}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M258 128 C286 126 286 160 256 160" stroke="{SAPPHIRE}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <ellipse cx="150" cy="102" rx="104" ry="16" fill="{JADE_LIGHT}"/>
  {floating}
  <path d="M48 106 L252 106 L244 206 C242 222 230 228 214 228 L86 228 C70 228 58 222 56 206 Z" fill="{SAPPHIRE}"/>
  <rect x="38" y="98" width="224" height="16" rx="8" fill="{SAPPHIRE}"/>
  <path d="M50 106 L250 106" stroke="{CREAM}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M70 146 q15 -12 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" stroke="{CREAM}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M74 178 q13 -10 26 0 t26 0 t26 0 t26 0 t26 0 t26 0" stroke="{CREAM}" stroke-width="3" fill="none" stroke-linecap="round"/>
  {"".join(f'<circle cx="{x}" cy="204" r="3.5" fill="{CREAM}"/>' for x in range(86, 220, 20))}
  <path d="M236 70 L206 118" stroke="{JADE}" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="244" cy="58" rx="16" ry="11" fill="{JADE}" transform="rotate(-30 244 58)"/>
  {beans}
</svg>"""


def svg_chicken():
    def drum(tx, ty, s, rot):
        return f"""
  <g transform="translate({tx} {ty}) rotate({rot}) scale({s})">
    <path d="M60 30 L118 -6" stroke="{SAPPHIRE}" stroke-width="18" stroke-linecap="round"/>
    <path d="M60 30 L118 -6" stroke="{CREAM}" stroke-width="11" stroke-linecap="round"/>
    <circle cx="122" cy="-14" r="10" fill="{CREAM}" stroke="{SAPPHIRE}" stroke-width="3.5"/>
    <circle cx="130" cy="-2" r="10" fill="{CREAM}" stroke="{SAPPHIRE}" stroke-width="3.5"/>
    <path d="M124 -8 L114 -2" stroke="{CREAM}" stroke-width="10"/>
    <path d="M-40 40 C-50 0 -10 -26 30 -10 C56 0 74 22 66 40 C58 62 26 74 -4 70 C-24 66 -36 56 -40 40 Z" fill="{GOLD}" stroke="{JADE_DARK}" stroke-width="3"/>
    <path d="M-26 30 c10 -14 26 -20 44 -18 M-28 48 c14 -12 34 -16 56 -10 M-12 62 c12 -8 30 -10 46 -4 M-14 10 c8 -8 20 -12 34 -10" stroke="{CREAM}" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>"""
    return f"""<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="150" cy="178" rx="138" ry="50" fill="{SAPPHIRE}"/>
  <ellipse cx="150" cy="174" rx="118" ry="38" fill="none" stroke="{CREAM}" stroke-width="3"/>
  <path d="M44 186 c8 -10 20 -10 26 0 M230 186 c8 -10 20 -10 26 0 M120 214 c8 -8 20 -8 26 0 M160 214 c8 -8 20 -8 26 0" stroke="{CREAM}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  {drum(110, 156, 0.95, -8)}
  {drum(150, 122, 0.8, 14)}
  <path d="M236 150 A26 26 0 0 1 288 150 Z" fill="{GOLD}" stroke="{JADE}" stroke-width="3"/>
  <path d="M262 150 L248 132 M262 150 L262 126 M262 150 L276 132" stroke="{JADE}" stroke-width="2" stroke-linecap="round"/>
  <path d="M40 120 C50 90 70 70 92 60" stroke="{SAPPHIRE}" stroke-width="3" fill="none" stroke-linecap="round"/>
  {"".join(f'<ellipse cx="{x}" cy="{y}" rx="9" ry="4.5" fill="{SAPPHIRE}" transform="rotate({r} {x} {y})"/>' for x, y, r in [(50, 98, -60), (62, 82, 20), (70, 74, -40), (84, 64, 30), (46, 112, 10)])}
</svg>"""


def svg_egg():
    return f"""<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
  <path d="M206 112 L290 82" stroke="{SAPPHIRE}" stroke-width="18" stroke-linecap="round"/>
  <path d="M232 104 L280 86" stroke="{CREAM}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="126" cy="132" r="96" fill="{SAPPHIRE}"/>
  <circle cx="126" cy="132" r="80" fill="none" stroke="{CREAM}" stroke-width="3"/>
  <path d="M76 120 C64 90 104 66 132 78 C162 64 196 94 182 124 C200 154 168 186 134 176 C98 192 64 160 76 120 Z" fill="{CREAM}" stroke="{JADE}" stroke-width="3"/>
  <circle cx="128" cy="126" r="24" fill="{GOLD}" stroke="{JADE}" stroke-width="3"/>
  <path d="M116 116 q6 -6 14 -4" stroke="{CREAM}" stroke-width="3" fill="none" stroke-linecap="round"/>
  {"".join(f'<circle cx="{x}" cy="{y}" r="2.2" fill="{SAPPHIRE}"/>' for x, y in [(98, 150), (104, 158), (160, 150), (152, 98), (96, 104)])}
  <g transform="rotate(18 252 196)">
    <ellipse cx="252" cy="196" rx="26" ry="34" fill="{CREAM}" stroke="{SAPPHIRE}" stroke-width="3.5"/>
    <path d="M240 178 q6 -8 14 -8" stroke="{SAPPHIRE}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>
  {egg_half(210, 232, 22, 15, 0)}
</svg>"""


def svg_banana():
    def banana(tx, ty, rot, s=1.0):
        return f"""
  <g transform="translate({tx} {ty}) rotate({rot}) scale({s})">
    <path d="M0 0 C10 70 70 120 170 112 C180 111 184 104 176 100 C92 100 40 62 24 -4 Z" fill="{GOLD}" stroke="{SAPPHIRE}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M14 8 C26 60 70 94 150 104" stroke="{JADE}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M0 0 L4 -18 L24 -20 L24 -4 Z" fill="{SAPPHIRE}"/>
    <circle cx="178" cy="106" r="4" fill="{SAPPHIRE}"/>
  </g>"""
    return f"""<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 200 C40 120 120 60 230 40 C200 110 120 180 20 200 Z" fill="{SAPPHIRE}"/>
  <path d="M24 196 C90 150 160 96 226 44 M70 168 l-10 -26 M110 140 l-8 -28 M150 110 l-6 -26 M90 154 l26 4 M132 124 l26 4 M172 92 l24 2" stroke="{CREAM}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  {banana(60, 50, 4)}
  {banana(70, 74, -6, 0.95)}
  {banana(52, 96, -2, 0.9)}
  {"".join(f'<circle cx="{x}" cy="{y}" r="14" fill="{CREAM}" stroke="{JADE}" stroke-width="3"/><circle cx="{x}" cy="{y}" r="5" fill="none" stroke="{SAPPHIRE}" stroke-width="2"/>' for x, y in [(220, 214), (252, 222), (238, 192)])}
</svg>"""


def svg_utensils():
    return f"""<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(-28 150 125)">
    <ellipse cx="110" cy="60" rx="24" ry="36" fill="{SAPPHIRE}"/>
    <ellipse cx="110" cy="56" rx="14" ry="24" fill="none" stroke="{CREAM}" stroke-width="3"/>
    <path d="M110 96 L110 226" stroke="{SAPPHIRE}" stroke-width="12" stroke-linecap="round"/>
    <path d="M110 150 L110 214" stroke="{CREAM}" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <g transform="rotate(26 150 125)">
    <path d="M176 24 L176 76 M190 24 L190 76 M204 24 L204 76 M218 24 L218 76" stroke="{JADE}" stroke-width="7" stroke-linecap="round"/>
    <path d="M170 70 C170 100 224 100 224 70" fill="{JADE}"/>
    <path d="M197 96 L197 226" stroke="{JADE}" stroke-width="12" stroke-linecap="round"/>
  </g>
  {"".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/>' for x, y, r, c in [(40, 200, 6, GOLD), (262, 210, 5, SAPPHIRE), (56, 60, 4, JADE), (250, 50, 6, GOLD)])}
</svg>"""


def svg_jar():
    return f"""<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">
  <rect x="88" y="30" width="124" height="28" rx="6" fill="{JADE}"/>
  <path d="M100 44 L200 44" stroke="{CREAM}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="6 6"/>
  <path d="M96 58 L204 58 C232 70 236 96 236 120 L236 214 C236 228 226 236 212 236 L88 236 C74 236 64 228 64 214 L64 120 C64 96 68 70 96 58 Z" fill="{SAPPHIRE}"/>
  <rect x="92" y="120" width="116" height="70" rx="6" fill="{CREAM}"/>
  <path d="M106 142 c10 -10 22 -10 30 0 c10 -10 22 -10 30 0 c10 -10 22 -10 30 0" stroke="{JADE}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M106 168 L194 168" stroke="{SAPPHIRE}" stroke-width="3" stroke-linecap="round"/>
  <path d="M80 100 C82 86 88 76 98 70" stroke="{CREAM}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M30 220 C28 190 46 170 56 160 M22 232 C40 214 50 206 60 200" stroke="{JADE}" stroke-width="3" fill="none" stroke-linecap="round"/>
  {"".join(f'<ellipse cx="{x}" cy="{y}" rx="10" ry="5" fill="{SAPPHIRE}" transform="rotate({r} {x} {y})"/>' for x, y, r in [(254, 226, -20), (270, 210, 30), (262, 236, 10)])}
</svg>"""


ILLU = {
    "rice": svg_rice, "beans": svg_beans, "chicken": svg_chicken, "egg": svg_egg,
    "banana": svg_banana, "cover": svg_cover_bowl, "utensils": svg_utensils, "jar": svg_jar,
}

# --------------------------------------------------------------- traçados

SWIRLS = {
    "tr": "M112 16 C136 10 166 12 174 22 C180 30 170 36 166 29 C162 22 176 16 186 24 C196 32 200 58 194 80 C190 92 182 92 184 84 C186 76 196 80 197 92 C199 110 196 132 200 156",
    "bl": "M7 196 C12 216 15 240 12 258 C10 268 3 268 5 260 C7 252 16 258 20 266 C26 280 52 290 96 292 C106 292 110 286 104 285 C98 284 98 294 118 295",
    "tl": "M2 36 C8 22 18 13 36 9 C48 6 53 13 47 15 C40 17 40 6 54 4 C80 0 118 3 150 2",
    "br": "M200 172 C192 198 196 222 190 240 C186 250 178 248 180 240 C182 232 194 236 195 248 C196 262 200 280 206 297",
    "r": "M204 40 C190 70 206 92 198 118 C194 130 184 128 186 120 C188 112 200 116 200 130 C200 160 190 190 204 230",
}


def swirls(*keys):
    paths = "".join(
        f'<path d="{SWIRLS[k]}" fill="none" stroke="{JADE}" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>'
        for k in keys
    )
    return f'<svg class="swirls" viewBox="0 0 210 297" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">{paths}</svg>'


UNDERLINE = f'<svg class="uline" viewBox="0 0 200 12" preserveAspectRatio="none"><path d="M2 8 C50 3 120 2 198 7" fill="none" stroke="{JADE}" stroke-width="1.6" stroke-linecap="round"/></svg>'

# --------------------------------------------------------------- helpers

def h2(text):
    return f'<h2>{text}{UNDERLINE}</h2>'


def ol(items):
    return '<ol class="dots">' + "".join(f"<li><span>{i}</span></li>" for i in items) + "</ol>"


def ul(items):
    return '<ul class="bul">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"


def steps(items):
    rows = "".join(
        f'<li><span class="lbl">{lbl}:</span><span>{txt}</span></li>' for lbl, txt in items
    )
    return f'<ol class="steps">{rows}</ol>'


def quote(text):
    return f'<p class="quote">{text}</p>'


def table(head, rows):
    th = "".join(f"<th>{h}</th>" for h in head)
    tr = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows)
    return f'<table><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table>'


# --------------------------------------------------------------- páginas

pages = []  # (html, toc_label or None)


def page(body, sw=("tr", "bl"), cls="", toc=None, illu=None, illu_cls="illu-corner"):
    art = f'<div class="{illu_cls}">{ILLU[illu]()}</div>' if illu else ""
    pages.append((f'<section class="page {cls}">{swirls(*sw)}{art}<div class="content">{body}</div>__FOOTER__</section>', toc))


def chapter(kicker, title, body, **kw):
    page(f'<p class="kicker">{kicker}</p><h1>{title}</h1>{body}', **kw)


# ---- capa
pages.append((f"""<section class="page cover">{swirls("tr", "bl")}
  <div class="content">
    <p class="kicker">ebook de receitas</p>
    <h1 class="cover-title">Cozinha<br><span>Mamede</span></h1>
    <div class="cover-grid">
      <div>
        {h2("5 ingredientes")}
        {ol(["Arroz", "Feijão", "Frango", "Ovo", "Banana"])}
      </div>
      <div class="cover-illu">{svg_cover_bowl()}</div>
    </div>
    <p class="cover-promise"><b>15 TRANSFORMAÇÕES.</b><br>Um novo jeito de olhar para a sua cozinha.</p>
    <p class="cover-sub">Pare de fazer sempre a mesma comida do mesmo jeito. Transforme o básico em refeições com sabor de chef, gastando menos e sem desperdiçar nada.</p>
    <p class="cover-author">por COZINHA MAMEDE</p>
  </div>
</section>""", None))

TOC_INDEX = len(pages)
pages.append(("__TOC__", None))

# ---- introdução
chapter("introdução", "A sua cozinha já tem tudo", f"""
<p class="lead">Segunda: arroz, feijão e frango.<br>Terça: arroz, feijão e frango.<br>Quarta: adivinha?</p>
<p>Se você se reconheceu, respira. <b>Você não cozinha mal. Você cozinha no automático.</b> E isso tem solução.</p>
{h2("A crença que te prende")}
<p>Muita gente acha que, para variar o cardápio, precisa de ingrediente caro, receita difícil ou tempo sobrando. <b>Mentira.</b></p>
<p>O que separa a cozinha de casa da cozinha de restaurante não é o ingrediente. <b>É a técnica.</b> O chef pega o mesmo arroz que você e faz cinco pratos diferentes. Ele não vê "arroz". Ele vê possibilidades.</p>
{h2("O que você vai aprender")}
{ol(["15 receitas testadas, simples e com sabor de verdade", "Técnicas de chef explicadas sem frescura", "Aproveitamento integral: casca, osso e sobra viram comida", "Um cardápio semanal pronto para copiar"])}
{h2("Um combinado entre nós")}
<p>Aqui não tem palavra difícil, ingrediente de empório ou prato bonito que ninguém come. <b>Tem comida de verdade, feita por quem vive a cozinha todo dia.</b></p>
{quote("Bora para a cozinha?")}
""", toc="Introdução", illu="utensils", illu_cls="illu-corner small")

# ---- capítulo 1
chapter("capítulo 01", "Não é o ingrediente. É o jeito.", f"""
{h2("O ciclo da comida repetida")}
<p>Você vai ao mercado. Compra as mesmas coisas. Faz as mesmas receitas. Enjoa. Pede delivery. Gasta mais. Esse ciclo tem três causas:</p>
{steps([("REPERTÓRIO", "Você conhece poucas formas de preparar cada ingrediente."), ("TEMPO", "E aí vai no que é rápido e conhecido."), ("MEDO DE ERRAR", "Melhor o \"sem graça garantido\" do que arriscar.")])}
{quote("Repetir não é o problema. Repetir sem perceber é.")}
{h2("Ponto de partida, não destino")}
<p>Pensa no ovo. Frito, cozido, mexido, pochê, omelete, fritata, base de massa, cola de empanado... <b>É o mesmo ovo. O que muda é a decisão que você toma.</b></p>
{h2("A virada de chave")}
<p>Antes de cozinhar, faça uma pergunta só: <b>"De que outro jeito eu posso servir isso?"</b> Essa pergunta vale mais do que qualquer livro de receitas.</p>
{h2("Na prática")}
<p>Abra a geladeira e escolha um ingrediente. Escreva três formas de servir que <b>não sejam</b> a de sempre. <b>Criatividade na cozinha é músculo: quanto mais usa, mais forte fica.</b></p>
""", toc="1. Não é o ingrediente. É o jeito.", sw=("r", "bl"))

# ---- capítulo 2
chapter("capítulo 02", "O Método das 3 Transformações", f"""
<p>Para transformar qualquer ingrediente, mexa em uma destas três alavancas. <b>Mudou uma alavanca, nasceu um prato novo.</b></p>
{table(["Alavanca", "O que muda", "Exemplo com batata"], [["<b>TEXTURA</b>", "Crocante, cremoso, macio", "Purê × batata frita"], ["<b>FORMA</b>", "Inteiro, desfiado, moldado", "Cozida × bolinho"], ["<b>CONTEXTO</b>", "Café, almoço, lanche, doce", "Acompanhamento × prato principal"]])}
{h2("Os 4 pilares do sabor")}
{steps([("SAL", "Realça tudo. Tempere em camadas, não só no final."), ("GORDURA", "Carrega sabor: manteiga, azeite, gordura do frango."), ("ÁCIDO", "Acorda o prato: limão, vinagre, tomate."), ("CALOR", "Cria cor e sabor. Dourar é diferente de cozinhar.")])}
{quote("Faltando alguma coisa? Em 9 de 10 vezes, é ácido.")}
{h2("Dourar é sabor")}
<p>Aquele marrom no fundo da panela é a <b>reação de Maillard</b>. É ali que nasce o sabor de comida de restaurante.</p>
{ul(["Panela bem quente antes de colocar o alimento", "Alimento seco (papel-toalha nele)", "Não lote a panela: muita coisa junta cozinha no vapor", "<b>Não mexa o tempo todo.</b> Deixe dourar"])}
""", toc="2. O Método das 3 Transformações", sw=("tr", "br"))

# ---- capítulo 3
chapter("capítulo 03", "A despensa estratégica", f"""
<p>Você não precisa de 40 temperos. Precisa dos <b>certos</b>. Com esta lista, você faz todas as receitas deste ebook.</p>
{h2("A base que não pode faltar")}
{steps([("AROMÁTICOS", "Cebola, alho, cheiro-verde."), ("GORDURAS", "Óleo, azeite, manteiga."), ("ÁCIDOS", "Limão, vinagre."), ("SECOS", "Farinha de trigo, de mandioca e de rosca."), ("TEMPEROS", "Sal, pimenta-do-reino, páprica defumada, cominho, louro, canela."), ("CORINGAS", "Shoyu, molho de tomate, queijo ralado.")])}
{quote("Cebola, alho, limão e sal bem usados já resolvem quase tudo.")}
{h2("Utensílios que fazem diferença")}
{ul(["Frigideira antiaderente boa (de preferência que vá ao forno)", "Faca afiada: faca cega é mais perigosa e mais lenta", "Panela de fundo grosso para caldos e refogados", "Potes com tampa para guardar e congelar"])}
{h2("Mise en place")}
<p>Francês para "tudo no lugar". Leia a receita inteira, pique tudo, separe em potinhos e só então acenda o fogo. <b>Cozinha organizada é cozinha rápida.</b></p>
""", toc="3. A despensa estratégica", sw=("tl", "br"))

# ---- receitas

INGREDIENTS = [
    dict(
        key="rice", num="04", name="Arroz", title="Arroz, da sobra ao destaque",
        intro="Todo mundo faz arroz. Quase todo mundo faz demais. E a sobra vai esquecida no fundo da geladeira até virar lixo.",
        punch="Sobra de arroz não é problema. É ingrediente pronto.",
        extra="Arroz de um dia para o outro fica mais seco e firme. Perfeito para as três receitas a seguir.",
        recipes=[
            dict(title="Arroz frito de geladeira", lever="contexto", yields="2 porções · 15 min",
                 ing=["2 xícaras de arroz cozido <b>gelado</b>", "2 ovos", "2 dentes de alho picados", "1 xícara de legumes picados (cenoura, ervilha, milho)", "2 colheres (sopa) de shoyu", "2 colheres (sopa) de óleo", "Cebolinha picada"],
                 steps=[("OVOS", "Aqueça metade do óleo em fogo alto, mexa os ovos rapidamente e reserve."), ("REFOGUE", "Junte o resto do óleo, o alho e os legumes. Refogue 2 minutos."), ("TOSTE O ARROZ", "Adicione o arroz, solte os grãos e deixe 1 minuto sem mexer."), ("FINALIZE", "Shoyu, ovos e cebolinha. Misture e sirva na hora.")],
                 secret="Arroz recém-feito vira papa. <b>Arroz gelado vira arroz frito de verdade.</b>",
                 var="Junte frango desfiado e vira prato completo."),
            dict(title="Bolinho de arroz crocante", lever="forma", yields="15 bolinhos · 30 min",
                 ing=["2 xícaras de arroz cozido", "1 ovo", "½ xícara de queijo ralado", "3 a 4 colheres (sopa) de farinha de trigo", "1 colher (chá) de fermento em pó", "Cheiro-verde, sal e pimenta", "Óleo para fritar"],
                 steps=[("MASSA", "Misture tudo, menos o óleo, até a massa segurar na colher."), ("AJUSTE", "Se estiver mole, junte farinha, uma colher por vez."), ("ÓLEO", "Aqueça a cerca de 170 °C: um palito mergulhado forma bolhinhas."), ("FRITE", "Frite colheradas até dourar, virando uma vez. Escorra."), ("AIR FRYER", "Bolinhas pinceladas com óleo, 200 °C por 12 a 15 min.")],
                 secret="<b>Óleo frio deixa o bolinho encharcado.</b> Teste a temperatura antes.",
                 var="Recheie com um cubinho de muçarela no centro."),
            dict(title="Arroz de forno cremoso", lever="textura", yields="4 porções · 30 min",
                 ing=["3 xícaras de arroz cozido", "1 xícara de frango desfiado", "1 caixinha de creme de leite (200 g)", "3 colheres (sopa) de requeijão", "½ xícara de milho ou ervilha", "1 xícara de muçarela ralada", "2 colheres (sopa) de queijo ralado"],
                 steps=[("MISTURE", "Arroz, frango, creme de leite, requeijão e milho."), ("TEMPERE", "Prove e acerte o sal."), ("MONTE", "Refratário, muçarela e queijo ralado por cima."), ("FORNO", "200 °C preaquecido por 20 minutos, até gratinar.")],
                 secret="Raspas de limão por cima no final. <b>O ácido corta a gordura e o prato fica leve.</b>",
                 var="Troque o frango por presunto ou legumes assados."),
        ],
    ),
    dict(
        key="beans", num="05", name="Feijão", title="Feijão, muito além da concha",
        intro="Proteína, fibra, barato e rende muito. Mas quase sempre aparece do mesmo jeito: na concha, por cima do arroz.",
        punch="Feijão é uma das bases mais versáteis da cozinha.",
        extra="Dica de ouro: cozinhe uma panela grande no domingo, separe em porções e use nas três receitas durante a semana.",
        recipes=[
            dict(title="Caldinho de feijão de boteco", lever="textura", yields="4 xícaras · 20 min",
                 ing=["3 xícaras de feijão cozido com caldo", "1 cebola picada", "3 dentes de alho picados", "100 g de bacon ou calabresa (opcional)", "1 folha de louro", "Cheiro-verde, pimenta e limão"],
                 steps=[("BATA", "Feijão com o caldo no liquidificador até ficar liso."), ("DOURE", "Bacon na panela. Junte cebola e alho e refogue."), ("COZINHE", "Feijão batido e louro, fogo baixo por 10 min, mexendo."), ("AJUSTE", "Engrossou demais? Um pouco de água."), ("SIRVA", "Cheiro-verde, uma gota de limão e pimenta.")],
                 secret="<b>O limão no final é o que dá o gosto de boteco.</b> Não pule.",
                 var="Sirva em copinhos com torradas de pão amanhecido."),
            dict(title="Tutu de feijão mineiro", lever="forma", yields="4 porções · 20 min",
                 ing=["3 xícaras de feijão cozido com caldo", "1 cebola picada", "2 dentes de alho", "2 colheres (sopa) de manteiga ou banha", "½ a 1 xícara de farinha de mandioca", "Cheiro-verde e sal"],
                 steps=[("BATA", "Feijão com o caldo no liquidificador."), ("REFOGUE", "Cebola e alho na manteiga."), ("FERVA", "Junte o feijão batido e deixe ferver."), ("FARINHA", "Fogo baixo, farinha aos poucos, em chuva, mexendo sempre."), ("PONTO", "Cremoso e soltando do fundo. Cheiro-verde e pronto.")],
                 secret="O tutu engrossa ao esfriar. <b>Desligue um pouco antes do ponto que você quer.</b>",
                 var="Com ovo frito e banana dourada: prato mineiro completo."),
            dict(title="Hambúrguer de feijão", lever="contexto", yields="6 unidades · 45 min",
                 ing=["2 xícaras de feijão cozido <b>bem escorrido</b>", "½ cebola ralada", "1 dente de alho amassado", "½ xícara de farinha de rosca ou aveia", "1 colher (chá) de cominho", "1 colher (chá) de páprica defumada", "Sal, pimenta e cheiro-verde"],
                 steps=[("AMASSE", "Feijão no garfo, deixando alguns pedaços para dar textura."), ("LIGA", "Misture os outros ingredientes até dar liga."), ("DESCANSE", "Modele e leve à geladeira por 30 minutos."), ("DOURE", "Frigideira com um fio de óleo, 4 minutos de cada lado.")],
                 secret="<b>Feijão molhado desmancha.</b> Escorra muito bem e seque no papel-toalha.",
                 var="Congele crus, separados com papel-manteiga, por até 3 meses."),
        ],
    ),
    dict(
        key="chicken", num="06", name="Frango", title="Frango: um bicho, três refeições",
        intro="Frango inteiro ou em partes com osso é mais barato e tem mais sabor do que o filé. E rende três refeições diferentes.",
        punch="Pele vira crocância. Carne vira recheio. Osso vira caldo.",
        extra="Nada se perde. Cada parte do frango tem um destino nas receitas a seguir.",
        recipes=[
            dict(title="Sobrecoxa com pele crocante", lever="textura", yields="2 porções · 30 min",
                 ing=["4 sobrecoxas com pele e osso", "Sal, pimenta e páprica", "2 dentes de alho amassados", "Suco de ½ limão"],
                 steps=[("SEQUE", "Pele bem seca no papel-toalha. Pele molhada não fica crocante."), ("TEMPERE", "Sal, pimenta, páprica e alho."), ("FRIGIDEIRA FRIA", "Pele para baixo, sem óleo, e só então ligue em fogo médio."), ("NÃO MEXA", "15 minutos: a gordura derrete e frita a pele."), ("VIRE", "Mais 10 a 12 minutos, até o suco sair transparente."), ("FINALIZE", "Um fio de limão por cima.")],
                 secret="<b>É a própria gordura do frango que deixa a pele crocante.</b>",
                 var="Guarde a gordura da frigideira: é ouro para refogar arroz e legumes."),
            dict(title="Frango desfiado multiuso", lever="forma", yields="4 xícaras · 40 min",
                 ing=["1 kg de peito (ou coxa e sobrecoxa sem pele)", "1 cebola cortada ao meio", "2 folhas de louro", "1 cebola picada e 3 dentes de alho", "2 tomates picados", "Sal, pimenta e cheiro-verde"],
                 steps=[("COZINHE", "Frango em água com cebola e louro por 25 minutos."), ("GUARDE", "A água do cozimento: ela já é um caldo leve."), ("DESFIE", "Com dois garfos, ainda morno."), ("REFOGUE", "Cebola, alho e tomate até desmanchar."), ("UNA", "Frango e uma concha da água do cozimento. Acerte o sal.")],
                 secret="Desfie o frango <b>ainda morno</b>. Frio, ele resiste e fica em pedaços.",
                 var="Use em arroz de forno, torta, sanduíche, panqueca ou escondidinho."),
            dict(title="Caldo dourado de carcaça", lever="contexto", yields="2 litros · 3 h",
                 ing=["1 kg de ossos e carcaças (junte no congelador)", "1 cebola com casca, ao meio", "1 cenoura", "Talos de salsinha e cascas de cebola", "2 folhas de louro", "3 litros de água fria"],
                 steps=[("ASSE", "Ossos a 200 °C por 30 minutos, até dourar."), ("PANELA", "Tudo junto com a água fria."), ("FOGO MÍNIMO", "Ferveu, abaixe. Retire a espuma."), ("PACIÊNCIA", "2 a 3 horas, sem deixar ferver forte."), ("COE", "Esfrie, leve à geladeira e retire a gordura de cima.")],
                 secret="<b>Assar os ossos antes é o que dá cor e sabor profundo.</b>",
                 var="Congele em forminhas de gelo por até 3 meses."),
        ],
    ),
    dict(
        key="egg", num="07", name="Ovo", title="Ovo, o coringa da geladeira",
        intro="O ovo salva o jantar. Dá liga, dá cremosidade e vira prato principal em 5 minutos.",
        punch="Quem domina o ovo nunca fica sem refeição.",
        extra="O ingrediente mais barato e versátil que existe. Três jeitos de tirar ele do automático.",
        recipes=[
            dict(title="Ovo marinado no shoyu", lever="contexto", yields="6 ovos · 4 h de marinada",
                 ing=["6 ovos", "½ xícara de shoyu", "½ xícara de água", "1 colher (sopa) de açúcar", "1 dente de alho amassado (opcional)"],
                 steps=[("ÁGUA FERVENDO", "Coloque os ovos com a água já em fervura."), ("TEMPO", "6 min 30 s para gema cremosa ou 9 min para firme."), ("GELO", "Direto para água com gelo. Descasque."), ("MARINE", "Shoyu, água, açúcar e alho. Mergulhe os ovos."), ("ESPERE", "Mínimo 4 horas na geladeira. Consuma em até 3 dias.")],
                 secret="<b>O banho de gelo faz o ovo descascar fácil</b> e trava o ponto certo.",
                 var="Sirva com arroz frito, em saladas ou como petisco."),
            dict(title="Fritata de geladeira", lever="forma", yields="4 porções · 20 min",
                 ing=["6 ovos", "2 xícaras de sobras (legumes, frango, batata, espinafre)", "½ xícara de queijo ralado", "Sal, pimenta e cheiro-verde", "1 colher (sopa) de manteiga"],
                 steps=[("BATA", "Ovos, queijo, sal, pimenta e cheiro-verde."), ("AQUEÇA", "Manteiga e sobras na frigideira antiaderente."), ("DESPEJE", "Os ovos por cima. Não mexa."), ("TAMPE", "Fogo baixo, 10 a 12 minutos, até o centro firmar."), ("FATIE", "Solte com a espátula e sirva quente ou fria.")],
                 secret="<b>Fogo baixo é a regra.</b> Fogo alto queima embaixo e deixa cru em cima.",
                 var="Frigideira que vai ao forno: 5 min no fogo e 10 min a 180 °C."),
            dict(title="Ovos no molho de tomate", lever="textura", yields="2 porções · 25 min",
                 ing=["4 ovos", "2 xícaras de molho de tomate (ou 4 tomates maduros)", "1 cebola picada", "2 dentes de alho", "1 colher (chá) de páprica defumada", "½ colher (chá) de cominho", "Cheiro-verde e pão"],
                 steps=[("REFOGUE", "Cebola e alho no azeite. Páprica e cominho por 30 s."), ("MOLHO", "Tomate por 10 minutos, até engrossar. Acerte o sal."), ("COVINHAS", "Faça 4 covinhas e quebre um ovo em cada."), ("TAMPE", "Fogo baixo, 5 a 7 minutos, até a clara firmar."), ("SIRVA", "Cheiro-verde e pão para molhar.")],
                 secret="<b>Tempero seco frita no óleo antes do líquido.</b> Libera todo o aroma.",
                 var="Junte feijão cozido ao molho para uma versão mais robusta."),
        ],
    ),
    dict(
        key="banana", num="08", name="Banana", title="Banana, com casca e tudo",
        intro="A banana passa do ponto, escurece e vai para o lixo. Toda semana, em milhões de casas.",
        punch="Banana madura não é banana estragada. É banana pronta para outra receita.",
        extra="E a casca? Também é comida. Do doce ao salgado, você vai ver.",
        recipes=[
            dict(title="Farofa de banana", lever="contexto", yields="4 porções · 15 min",
                 ing=["3 bananas maduras e firmes, em cubos", "3 colheres (sopa) de manteiga", "1 cebola picada", "1 xícara de farinha de mandioca", "Sal e cheiro-verde"],
                 steps=[("CARAMELIZE", "Banana na manteiga, fogo médio, sem mexer muito."), ("RESERVE", "Tire a banana da frigideira."), ("REFOGUE", "Cebola na mesma frigideira."), ("TOSTE", "Farinha por 3 a 4 minutos, mexendo."), ("UNA", "Volte a banana, acerte o sal e finalize com cheiro-verde.")],
                 secret="<b>O contraste doce e salgado é o que deixa a farofa viciante.</b>",
                 var="Perfeita ao lado do frango crocante e do feijão."),
            dict(title="Panqueca de banana de 2 ingredientes", lever="forma", yields="6 panquequinhas · 10 min",
                 ing=["1 banana bem madura (quanto mais pintada, melhor)", "2 ovos", "Canela a gosto (opcional)"],
                 steps=[("AMASSE", "Banana no garfo até virar purê."), ("MISTURE", "Ovos e canela. Bata bem."), ("FOGO BAIXO", "Frigideira antiaderente untada."), ("VIRE", "Quando as bordas firmarem, cerca de 2 minutos."), ("DOURE", "Mais 1 minuto do outro lado.")],
                 secret="<b>Panqueca pequena vira fácil, panqueca grande quebra.</b> Tamanho da palma da mão.",
                 var="Sirva com mel, frutas, pasta de amendoim ou iogurte."),
            dict(title="\"Carne louca\" de casca de banana", lever="contexto", yields="4 porções · 35 min",
                 ing=["Cascas de 6 bananas maduras (de preferência orgânicas)", "Suco de 1 limão", "1 cebola em tiras e 2 dentes de alho", "1 tomate picado", "½ pimentão em tiras (opcional)", "2 colheres (sopa) de shoyu", "1 colher (chá) de páprica defumada"],
                 steps=[("LAVE", "Cascas bem lavadas com escovinha. Corte as pontas."), ("DESFIE", "Com um garfo, no sentido do comprimento."), ("LIMÃO", "10 minutos de molho em água com limão. Escorra."), ("REFOGUE", "Cebola, alho, pimentão, tomate e páprica."), ("COZINHE", "Cascas e shoyu por 15 a 20 min, até amaciar.")],
                 secret="<b>Shoyu e páprica defumada dão o sabor \"de carne\".</b> A textura desfiada faz o resto.",
                 var="No pão com queijo ou como recheio de tapioca."),
        ],
    ),
]

transformation = 0
for ing in INGREDIENTS:
    names = [r["title"] for r in ing["recipes"]]
    chapter(f"capítulo {ing['num']}", ing["title"], f"""
<div class="opener-illu">{ILLU[ing['key']]()}</div>
<p class="lead">{ing['intro']}</p>
{quote(ing['punch'])}
<p>{ing['extra']}</p>
{h2("3 transformações")}
{ol(names)}
""", toc=f"{int(ing['num'])}. {ing['title']}", sw=("tr", "bl"), cls="opener")
    for r in ing["recipes"]:
        transformation += 1
        body = f"""
<p class="kicker">transformação {transformation:02d} · {ing['name'].lower()}</p>
<h1 class="recipe-title">{r['title']}</h1>
<p class="meta">ALAVANCA: {r['lever'].upper()} &nbsp;·&nbsp; {r['yields'].upper()}</p>
<div class="recipe-top">
  <div>{h2("Ingredientes")}{ol(r['ing'])}</div>
  <div class="recipe-illu">{ILLU[ing['key']]()}</div>
</div>
{h2("Modo de preparo")}
{steps(r['steps'])}
<div class="tip"><p class="tip-title">Segredo de chef</p><p>{r['secret']}</p><p class="tip-var"><b>VARIAÇÃO:</b> {r['var']}</p></div>
"""
        page(body, sw=("tr", "bl") if transformation % 2 else ("r", "bl"), cls="recipe")

# ---- capítulo 9
week = [
    ["<b>SEG</b>", "Arroz, feijão, sobrecoxa crocante e farofa de banana", "Caldinho de feijão com ovo marinado"],
    ["<b>TER</b>", "Arroz frito com frango desfiado", "Fritata de geladeira com salada"],
    ["<b>QUA</b>", "Tutu, ovo frito e banana dourada", "Sanduíche de \"carne louca\""],
    ["<b>QUI</b>", "Arroz de forno cremoso", "Ovos no molho de tomate com pão"],
    ["<b>SEX</b>", "Hambúrguer de feijão com arroz", "Bolinho de arroz com salada"],
    ["<b>SÁB</b>", "Dia livre (ou repita o favorito)", "Sopa com o caldo de carcaça"],
    ["<b>DOM</b>", "Dia de preparo", "Panqueca de banana"],
]
chapter("capítulo 09", "A semana com 5 ingredientes", f"""
<p>Receita boa sem planejamento vira receita esquecida. <b>Organize uma vez, coma bem a semana toda.</b></p>
{h2("O domingo de preparo")}
{steps([("FEIJÃO", "Uma panela grande."), ("ARROZ", "Cozinhe em dobro."), ("FRANGO", "Cozinhe e desfie. Guarde a água."), ("CARCAÇAS", "Direto para o congelador."), ("OVOS", "Cozinhe e marine 6.")])}
{h2("O cardápio")}
{table(["Dia", "Almoço", "Jantar"], week)}
{quote("O cardápio usa a sobra da refeição anterior.")}
""", toc="9. A semana com 5 ingredientes", sw=("tl", "br"), cls="dense")

chapter("capítulo 09", "Lista de compras", f"""
<p>A base para 2 pessoas passarem a semana. Ajuste as quantidades para a sua casa.</p>
{h2("Os 5 protagonistas")}
{ol(["1 kg de arroz", "1 kg de feijão", "1 kg de sobrecoxa + 1 kg de peito com osso", "2 dúzias de ovos", "1 penca de banana"])}
{h2("Para dar sabor")}
{ul(["Cebola, alho, tomate, limão, cheiro-verde", "Queijo ralado, muçarela, creme de leite, requeijão", "Shoyu, páprica defumada, cominho, louro, canela", "Farinha de mandioca, farinha de trigo, farinha de rosca"])}
{quote("Economia de verdade é não jogar nada fora.")}
""", sw=("tr", "bl"), illu="jar", illu_cls="illu-corner bottom")

# ---- capítulo 10
chapter("capítulo 10", "Aproveitamento integral", f"""
<p>Casca, talo, osso, sobra. Quase tudo que você joga fora pode virar comida. <b>Não é coisa de economia de crise. É cozinha inteligente.</b></p>
{h2("Antes ia para o lixo, agora vira")}
{table(["Antes", "Agora vira"], [["Ossos e carcaça", "Caldo dourado"], ["Água do cozimento do frango", "Base para arroz e sopas"], ["Gordura da pele", "Gordura para refogar"], ["Arroz de ontem", "Arroz frito, bolinho, arroz de forno"], ["Banana passada", "Panqueca, bolo, vitamina"], ["Casca de banana", "\"Carne louca\""], ["Talos e cascas de cebola", "Cor e sabor no caldo"], ["Casca de limão", "Raspas para finalizar pratos"]])}
{h2("A geladeira de segunda")}
<p>Antes do mercado, abra a geladeira: o que está perto de vencer? Que sobra posso transformar? <b>Faça a compra a partir da geladeira, não da vontade.</b></p>
""", toc="10. Aproveitamento integral", sw=("r", "bl"), cls="dense")

chapter("capítulo 10", "Quanto tempo dura", f"""
{table(["Preparo", "Geladeira", "Congelador"], [["Arroz cozido", "3 dias", "3 meses"], ["Feijão cozido", "4 dias", "3 meses"], ["Frango desfiado", "3 dias", "3 meses"], ["Caldo de carcaça", "4 dias", "3 meses"], ["Ovo marinado", "3 dias", "não congela"], ["Hambúrguer de feijão (cru)", "2 dias", "3 meses"], ["Banana madura descascada", "não recomendado", "3 meses"]])}
{h2("Regra de ouro")}
{steps([("ESFRIE RÁPIDO", "Não deixe comida horas fora da geladeira."), ("FECHE BEM", "Pote com tampa, sem ar."), ("ETIQUETE", "Nome e data. Sempre.")])}
{quote("Se você não sabe quando fez, não sabe se ainda pode comer.")}
""", sw=("tl", "br"), illu="jar", illu_cls="illu-corner bottom small")

# ---- extra
chapter("capítulo extra", "10 erros que tiram o sabor", f"""
{steps([("SALGAR SÓ NO FINAL", "Tempere em camadas, ao longo do preparo."), ("ESQUECER O ÁCIDO", "Limão ou vinagre acordam qualquer prato."), ("PANELA LOTADA", "Comida amontoada cozinha no vapor e não doura."), ("PANELA FRIA", "Sem calor não tem cor. Sem cor não tem sabor."), ("MEXER DEMAIS", "Deixe a comida dourar em paz."), ("ALIMENTO MOLHADO", "Seque antes de dourar. Sempre."), ("ALHO QUEIMADO", "Entra depois da cebola e fica pouco no fogo."), ("NÃO PROVAR", "Prove durante o preparo, não só no fim."), ("TEMPERO VELHO", "Páprica de 2 anos atrás é só pó colorido."), ("TUDO IGUAL", "Um prato bom tem cremoso <b>e</b> crocante.")])}
""", toc="Extra: 10 erros + Checklist do Prato de Chef", sw=("tr", "bl"), illu="utensils", illu_cls="illu-corner bottom")

chapter("capítulo extra", "Checklist do Prato de Chef", f"""
<p>Antes de servir, confira:</p>
<ul class="check">
<li>Provei e acertei o sal?</li>
<li>Tem um toque de ácido (limão, vinagre, tomate)?</li>
<li>Tem contraste de textura (algo crocante)?</li>
<li>Tem cor (algo dourado, algo verde)?</li>
<li>Tem um toque fresco no final (cheiro-verde, raspas de limão)?</li>
<li>Está na temperatura certa (quente bem quente, frio bem frio)?</li>
</ul>
{quote("Marcou tudo? Você acabou de servir comida de chef.")}
""", sw=("r", "bl"), illu="egg", illu_cls="illu-corner bottom")

# ---- conclusão
chapter("conclusão", "Comece hoje", f"""
{h2("O que você aprendeu")}
{ul(["<b>O problema nunca foi o ingrediente.</b> Foi o jeito", "<b>3 alavancas</b> transformam tudo: textura, forma e contexto", "<b>4 pilares</b> dão sabor: sal, gordura, ácido e calor", "<b>5 ingredientes</b> viraram <b>15 receitas</b>", "<b>Sobra é ingrediente.</b> Casca, osso e talo também"])}
{quote("Chef é quem olha para um ovo e enxerga dez pratos.")}
{h2("O seu desafio")}
{steps([("HOJE", "Escolha <b>uma</b> transformação e faça no jantar."), ("ESTA SEMANA", "Teste pelo menos 3 receitas novas."), ("ESTE MÊS", "Crie a sua própria transformação com o método.")])}
<p>A geladeira está aí. Os ingredientes já estão aí. <b>Só falta você ligar o fogo.</b> Faça hoje, e me conta como ficou.</p>
""", toc="Conclusão: Comece hoje", sw=("tl", "br"), illu="cover", illu_cls="illu-corner bottom left")

# ---- contracapa
pages.append((f"""<section class="page cover back">{swirls("tr", "bl")}
  <div class="content">
    <div class="back-illu">{svg_cover_bowl()}</div>
    <h1 class="cover-title small">Cozinha <span>Mamede</span></h1>
    <p class="cover-promise">Comida de verdade,<br>feita com afeto e técnica.</p>
  </div>
</section>""", None))

# --------------------------------------------------------------- sumário + rodapé

toc_rows = "".join(
    f'<li><span class="toc-name">{label}</span><span class="toc-dots"></span><span class="toc-num">{i + 1:02d}</span></li>'
    for i, (_, label) in enumerate(pages) if label
)
toc_html = f"""<section class="page toc">{swirls("tr", "bl")}<div class="content">
<h1>Sumário</h1>
<ol class="dots toc-list">{toc_rows}</ol>
</div>__FOOTER__</section>"""
pages[TOC_INDEX] = (toc_html, None)

out = []
for i, (html, _) in enumerate(pages):
    footer = f'<footer><span>COZINHA MAMEDE</span><span>{i + 1:02d}</span></footer>'
    out.append(html.replace("__FOOTER__", footer))

CSS = f"""
@font-face {{ font-family: 'Allison'; src: url(fonts/allison.woff2) format('woff2'); }}
@font-face {{ font-family: 'Sometype Mono'; src: url(fonts/sometype-mono.woff2) format('woff2'); font-weight: 400 700; }}
@font-face {{ font-family: 'Sometype Mono'; src: url(fonts/sometype-mono-italic.woff2) format('woff2'); font-style: italic; }}
@page {{ size: A4; margin: 0; }}
* {{ box-sizing: border-box; }}
html, body {{ margin: 0; background: {JADE_DARK}; }}
body {{ font-family: 'Sometype Mono', monospace; color: {JADE_DARK}; font-size: 10pt; line-height: 1.55;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
.page {{ width: 210mm; height: 297mm; position: relative; overflow: hidden; background: {CREAM};
  margin: 0 auto 10mm; page-break-after: always; break-after: page; }}
@media print {{ html, body {{ background: {CREAM}; }} .page {{ margin: 0; }} }}
.swirls {{ position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }}
.content {{ position: relative; padding: 24mm 24mm 22mm; height: 100%; }}
footer {{ position: absolute; left: 24mm; right: 24mm; bottom: 10mm; display: flex; justify-content: flex-end; gap: 6mm;
  font-size: 7.5pt; letter-spacing: .18em; }}
.kicker {{ font-size: 8pt; letter-spacing: .28em; text-transform: uppercase; color: {JADE}; margin: 0 0 1mm; }}
h1 {{ color: {SAPPHIRE}; font-family: 'Allison', cursive; font-weight: 400; font-size: 66pt; line-height: .82; margin: 0 0 6mm;
  transform: rotate(-3deg); transform-origin: left center; max-width: 150mm; }}
h1.recipe-title {{ font-size: 58pt; }}
h2 {{ color: {SAPPHIRE}; font-family: 'Allison', cursive; font-weight: 400; font-size: 35pt; line-height: 1; margin: 4.5mm 0 3.5mm;
  position: relative; display: inline-block; padding-right: 6mm; }}
h2 .uline {{ position: absolute; left: -2mm; right: 0; bottom: -1.5mm; width: calc(100% + 2mm); height: 3mm; }}
p {{ margin: 0 0 3.2mm; max-width: 155mm; }}
b {{ font-weight: 700; }}
.lead {{ font-size: 12pt; line-height: 1.5; }}
.meta {{ font-size: 8pt; letter-spacing: .16em; margin: 0 0 1mm; }}
.quote {{ font-family: 'Allison', cursive; color: {JADE}; font-size: 33pt; line-height: 1.05; margin: 4mm 0 4mm 6mm;
  transform: rotate(-2deg); transform-origin: left center; }}
ol.dots {{ list-style: none; counter-reset: d; padding: 0; margin: 0 0 2mm; }}
ol.dots li {{ counter-increment: d; position: relative; padding-left: 11mm; margin: 0 0 2.6mm; min-height: 7mm;
  display: flex; align-items: center; }}
ol.dots li::before {{ content: counter(d); position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  width: 7mm; height: 7mm; border-radius: 50%; background: {JADE}; color: #fff; font-weight: 700;
  font-size: 7.5pt; display: flex; align-items: center; justify-content: center; }}
ul.bul {{ list-style: none; padding: 0; margin: 0 0 2mm; }}
ul.bul li {{ position: relative; padding-left: 7mm; margin: 0 0 2.6mm; }}
ul.bul li::before {{ content: ""; position: absolute; left: 1mm; top: 2.1mm; width: 2.4mm; height: 2.4mm;
  border-radius: 50%; background: {JADE}; }}
ol.steps {{ list-style: none; counter-reset: s; padding: 0; margin: 0 0 2mm; }}
ol.steps li {{ counter-increment: s; display: grid; grid-template-columns: 12mm 42mm 1fr; align-items: start;
  margin: 0 0 3.6mm; }}
ol.steps li::before {{ content: counter(s); width: 7mm; height: 7mm; border-radius: 50%; background: {JADE};
  color: #fff; font-weight: 700; font-size: 7pt; display: flex; align-items: center; justify-content: center; margin-top: -1mm; }}
ol.steps .lbl {{ font-size: 8.6pt; letter-spacing: .06em; padding-right: 3mm; }}
table {{ width: 100%; border-collapse: collapse; margin: 2mm 0 3mm; font-size: 9.4pt; }}
td:first-child {{ white-space: nowrap; padding-right: 4mm; }}
th {{ text-align: left; font-weight: 400; font-size: 7.5pt; letter-spacing: .2em; text-transform: uppercase;
  color: {JADE}; border-bottom: 1.4px solid {JADE_DARK}; padding: 2mm 2mm 1.5mm 0; }}
td {{ border-bottom: 1px dashed rgba(0,85,58,.35); padding: 2.6mm 2mm 2.6mm 0; vertical-align: top; }}
ul.check {{ list-style: none; padding: 0; margin: 3mm 0; }}
ul.check li {{ position: relative; padding-left: 11mm; margin: 0 0 4.5mm; font-size: 10.5pt; }}
ul.check li::before {{ content: ""; position: absolute; left: 0; top: -.4mm; width: 6mm; height: 6mm;
  border: 1.6px solid {JADE}; border-radius: 50%; }}
/* ilustrações */
.illu-corner {{ position: absolute; right: 16mm; top: 22mm; width: 62mm; }}
.illu-corner.small {{ width: 40mm; top: 18mm; right: 18mm; }}
.illu-corner.bottom {{ top: auto; bottom: 24mm; width: 70mm; }}
.illu-corner.left {{ right: auto; left: 30mm; width: 80mm; }}
.illu-corner.bottom.small {{ width: 54mm; }}
.opener-illu {{ width: 120mm; margin: 2mm 0 4mm 14mm; }}
.recipe-top {{ display: grid; grid-template-columns: 1fr 64mm; gap: 6mm; align-items: center; }}
.recipe-illu svg {{ width: 100%; }}
.tip {{ border-top: 1.4px solid {JADE}; margin-top: 3mm; padding-top: 2mm; }}
.tip-title {{ font-family: 'Allison', cursive; color: {JADE}; font-size: 32pt; line-height: 1; margin: 0 0 1mm; }}
.tip-var {{ font-size: 9.2pt; }}
.dense table {{ font-size: 8.8pt; }}
.dense td {{ padding: 2mm 2mm 2mm 0; }}
/* capa */
.cover .content {{ padding-top: 30mm; }}
.cover-title {{ font-size: 104pt; line-height: .8; margin: 4mm 0 6mm; }}
.cover-title span {{ display: inline-block; margin-left: 22mm; }}
.cover-title.small {{ font-size: 72pt; text-align: center; transform: rotate(-3deg); transform-origin: center; max-width: none; }}
.cover-title.small span {{ margin-left: 0; }}
.cover-grid {{ display: grid; grid-template-columns: 1fr 100mm; gap: 4mm; align-items: center; margin-top: 6mm; }}
.cover-illu svg {{ width: 100%; }}
.cover-promise {{ font-size: 13pt; line-height: 1.45; margin-top: 10mm; }}
.cover-sub {{ font-size: 10pt; max-width: 120mm; }}
.cover-author {{ position: absolute; bottom: 22mm; left: 24mm; font-size: 8pt; letter-spacing: .3em; color: {JADE}; }}
.back .content {{ display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }}
.back-illu {{ width: 110mm; margin-bottom: 8mm; }}
.back .cover-promise {{ max-width: none; }}
/* sumário */
.toc-list li {{ margin-bottom: 4.6mm; }}
.toc-list li {{ display: flex; gap: 2mm; }}
.toc-name {{ flex: none; max-width: 120mm; }}
.toc-dots {{ flex: 1; border-bottom: 1.4px dotted {JADE_DARK}; transform: translateY(-1mm); align-self: end; }}
.toc-num {{ flex: none; }}
"""

html = f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cozinha Mamede</title>
<style>{CSS}</style></head>
<body>
{''.join(out)}
</body></html>"""

Path(__file__).with_name("ebook-cozinha-mamede.html").write_text(html, encoding="utf-8")
print(f"{len(out)} páginas geradas")
