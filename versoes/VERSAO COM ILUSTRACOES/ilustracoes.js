// Ilustrações chapadas no estilo da primeira versão ilustrada (traço de xilogravura,
// cores sólidas, linhas "vazadas" na cor do fundo). Todas em viewBox 300 × 250.

const SOL = "#FFC926";
const CREME = "#F3E8CC";
const CENOURA = "#F96015";
const TOMATE = "#D52518";
const FLORESTA = "#18542A";
const KIWI = "#9ABC05";

const svg = (corpo) => `<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">${corpo}</svg>`;
const rep = (pts, f) => pts.map((p) => f(...p)).join("");

// ── peças reaproveitadas da primeira versão ilustrada
const tigela = () => `
  <path d="M26 118 L274 118 C272 182 226 216 150 216 C74 216 28 182 26 118 Z" fill="${FLORESTA}"/>
  <path d="M34 128 C110 138 190 138 266 128" stroke="${CREME}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M44 158 c11 -20 33 -20 42 0 c11 -20 33 -20 42 0 c11 -20 33 -20 42 0 c11 -20 33 -20 42 0 c11 -20 33 -20 42 0" stroke="${CREME}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M74 186 c8 -14 24 -14 30 0 c8 -14 24 -14 30 0 c8 -14 24 -14 30 0 c8 -14 24 -14 30 0" stroke="${CREME}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M84 158 q2 10 6 14 M126 158 q2 10 6 14 M168 158 q2 10 6 14 M210 158 q2 10 6 14" stroke="${CREME}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M110 212 L190 212 L183 236 L117 236 Z" fill="${FLORESTA}"/>
  <path d="M120 224 L180 224" stroke="${CREME}" stroke-width="2.5" stroke-linecap="round"/>`;

const tampaTigela = () => `<path d="M48 118 C54 68 106 50 150 50 C196 50 246 68 252 118 Z" fill="${CREME}" stroke="${FLORESTA}" stroke-width="4"/>`;

const vapor = (xs, y = 52) => xs.map((x) => `<path d="M${x} ${y} c-10 -12 8 -18 0 -30 c-7 -10 7 -15 2 -24" stroke="${CENOURA}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join("");

const folhas = (pts) => rep(pts, (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="5" fill="${FLORESTA}" transform="rotate(${r} ${x} ${y})"/>`);

// ── abóbora cabotiá: uma inteira (casca verde) e uma metade com polpa e sementes
function abobora() {
  const sementes = rep([[150, 150, 20], [166, 158, -10], [136, 162, 40], [156, 172, 0], [176, 146, 60], [142, 140, -30]],
    (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3.5" fill="${CREME}" stroke="${CENOURA}" stroke-width="1.6" transform="rotate(${r} ${x} ${y})"/>`);
  return svg(`
  <ellipse cx="150" cy="226" rx="132" ry="14" fill="${FLORESTA}" opacity=".18"/>
  <g>
    <path d="M86 58 C46 54 18 86 20 128 C22 176 56 210 98 210 C134 210 150 178 150 132 C150 88 124 60 86 58 Z" fill="${FLORESTA}"/>
    <path d="M86 62 C70 92 68 170 92 206 M58 70 C40 104 42 170 66 198 M114 66 C128 98 130 168 114 202" stroke="${CREME}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M86 58 C84 44 90 34 100 28" stroke="${FLORESTA}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M100 28 C114 16 132 20 140 30" stroke="${KIWI}" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
  <g>
    <path d="M140 150 C140 104 172 82 206 82 C246 82 282 110 282 152 C282 196 248 220 208 220 C168 220 140 194 140 150 Z" fill="${FLORESTA}"/>
    <path d="M150 150 C150 112 176 94 206 94 C240 94 272 116 272 152 C272 190 242 210 208 210 C176 210 150 188 150 150 Z" fill="${CENOURA}"/>
    <path d="M176 152 C176 128 192 118 208 118 C228 118 246 132 246 152 C246 174 228 186 210 186 C190 186 176 174 176 152 Z" fill="${SOL}" stroke="${TOMATE}" stroke-width="2.5"/>
    ${sementes.replace(/cx="(\d+)" cy="(\d+)"/g, (m, x, y) => `cx="${+x + 54}" cy="${+y - 2}"`).replace(/rotate\((-?\d+) (\d+) (\d+)\)/g, (m, r, x, y) => `rotate(${r} ${+x + 54} ${+y - 2})`)}
    <path d="M164 118 C172 104 186 98 198 98" stroke="${CREME}" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
  ${folhas([[40, 44, -40], [56, 32, 20], [30, 60, 10]])}
  <path d="M26 74 C30 54 40 40 60 30" stroke="${FLORESTA}" stroke-width="3" fill="none" stroke-linecap="round"/>`);
}

// ── banana (da primeira versão ilustrada)
function banana() {
  const b = (tx, ty, rot, s = 1) => `
  <g transform="translate(${tx} ${ty}) rotate(${rot}) scale(${s})">
    <path d="M0 0 C10 70 70 120 170 112 C180 111 184 104 176 100 C92 100 40 62 24 -4 Z" fill="${SOL}" stroke="${FLORESTA}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M14 8 C26 60 70 94 150 104" stroke="${CENOURA}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M0 0 L4 -18 L24 -20 L24 -4 Z" fill="${FLORESTA}"/>
    <circle cx="178" cy="106" r="4" fill="${FLORESTA}"/>
  </g>`;
  return svg(`
  <path d="M20 200 C40 120 120 60 230 40 C200 110 120 180 20 200 Z" fill="${FLORESTA}"/>
  <path d="M24 196 C90 150 160 96 226 44 M70 168 l-10 -26 M110 140 l-8 -28 M150 110 l-6 -26 M90 154 l26 4 M132 124 l26 4 M172 92 l24 2" stroke="${CREME}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  ${b(60, 50, 4)}${b(70, 74, -6, 0.95)}${b(52, 96, -2, 0.9)}
  ${rep([[220, 214], [252, 222], [238, 192]], (x, y) => `<circle cx="${x}" cy="${y}" r="14" fill="${CREME}" stroke="${CENOURA}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="5" fill="none" stroke="${FLORESTA}" stroke-width="2"/>`)}`);
}

// ── frango (da primeira versão ilustrada)
function frango() {
  const coxa = (tx, ty, s, rot) => `
  <g transform="translate(${tx} ${ty}) rotate(${rot}) scale(${s})">
    <path d="M60 30 L118 -6" stroke="${FLORESTA}" stroke-width="18" stroke-linecap="round"/>
    <path d="M60 30 L118 -6" stroke="${CREME}" stroke-width="11" stroke-linecap="round"/>
    <circle cx="122" cy="-14" r="10" fill="${CREME}" stroke="${FLORESTA}" stroke-width="3.5"/>
    <circle cx="130" cy="-2" r="10" fill="${CREME}" stroke="${FLORESTA}" stroke-width="3.5"/>
    <path d="M124 -8 L114 -2" stroke="${CREME}" stroke-width="10"/>
    <path d="M-40 40 C-50 0 -10 -26 30 -10 C56 0 74 22 66 40 C58 62 26 74 -4 70 C-24 66 -36 56 -40 40 Z" fill="${CENOURA}" stroke="${TOMATE}" stroke-width="3"/>
    <path d="M-26 30 c10 -14 26 -20 44 -18 M-28 48 c14 -12 34 -16 56 -10 M-12 62 c12 -8 30 -10 46 -4 M-14 10 c8 -8 20 -12 34 -10" stroke="${CREME}" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>`;
  return svg(`
  <ellipse cx="150" cy="178" rx="138" ry="50" fill="${FLORESTA}"/>
  <ellipse cx="150" cy="174" rx="118" ry="38" fill="none" stroke="${CREME}" stroke-width="3"/>
  <path d="M44 186 c8 -10 20 -10 26 0 M230 186 c8 -10 20 -10 26 0 M120 214 c8 -8 20 -8 26 0 M160 214 c8 -8 20 -8 26 0" stroke="${CREME}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  ${coxa(110, 156, 0.95, -8)}${coxa(150, 122, 0.8, 14)}
  <path d="M236 150 A26 26 0 0 1 288 150 Z" fill="${SOL}" stroke="${CENOURA}" stroke-width="3"/>
  <path d="M262 150 L248 132 M262 150 L262 126 M262 150 L276 132" stroke="${CENOURA}" stroke-width="2" stroke-linecap="round"/>
  <path d="M40 120 C50 90 70 70 92 60" stroke="${FLORESTA}" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${folhas([[50, 98, -60], [62, 82, 20], [70, 74, -40], [84, 64, 30], [46, 112, 10]])}`);
}

// ── mandioca: duas raízes com casca e toras cortadas mostrando a polpa
function mandioca() {
  const raiz = (tx, ty, rot, s = 1) => `
  <g transform="translate(${tx} ${ty}) rotate(${rot}) scale(${s})">
    <path d="M0 0 C40 -16 110 -18 170 -6 C190 -2 196 10 186 16 C130 30 50 30 6 22 C-6 18 -8 4 0 0 Z" fill="${FLORESTA}"/>
    <path d="M20 4 l8 12 M52 -2 l6 14 M86 -4 l4 14 M120 -2 l2 14 M150 0 l0 12" stroke="${CREME}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M186 10 C204 8 214 4 224 -4" stroke="${FLORESTA}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </g>`;
  const tora = (x, y, r = 26) => `
  <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.92}" fill="${CREME}" stroke="${FLORESTA}" stroke-width="6"/>
  <ellipse cx="${x}" cy="${y}" rx="${r - 8}" ry="${(r - 8) * 0.92}" fill="none" stroke="${CENOURA}" stroke-width="2"/>
  <circle cx="${x}" cy="${y}" r="4" fill="${SOL}" stroke="${CENOURA}" stroke-width="1.6"/>
  <path d="M${x} ${y - 4} L${x} ${y - r + 10} M${x + 4} ${y} L${x + r - 10} ${y} M${x - 3} ${y + 3} L${x - r + 12} ${y + r - 14}" stroke="${CENOURA}" stroke-width="1.3" stroke-linecap="round"/>`;
  return svg(`
  <rect x="20" y="140" width="260" height="80" rx="16" fill="${CENOURA}"/>
  <path d="M34 160 L266 160 M34 200 L266 200" stroke="${CREME}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="10 8"/>
  <circle cx="262" cy="180" r="6" fill="${CREME}"/>
  ${raiz(36, 70, 8)}${raiz(60, 108, -4, 0.9)}
  ${tora(110, 176)}${tora(170, 182, 22)}${tora(222, 172, 24)}
  ${folhas([[238, 52, -30], [256, 40, 20], [266, 62, -60]])}
  <path d="M232 70 C244 60 256 50 272 46" stroke="${FLORESTA}" stroke-width="3" fill="none" stroke-linecap="round"/>`);
}

// ── cenoura: maço com rama e rodelas
function cenoura() {
  const c = (tx, ty, rot, s = 1) => `
  <g transform="translate(${tx} ${ty}) rotate(${rot}) scale(${s})">
    <path d="M0 -10 C40 -16 140 -8 196 0 C140 8 40 16 0 10 C-8 6 -8 -6 0 -10 Z" fill="${CENOURA}" stroke="${TOMATE}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M30 -8 l4 6 M66 -6 l3 6 M102 -3 l3 5 M138 -1 l2 4 M44 8 l4 -5 M84 6 l3 -5 M122 4 l3 -4" stroke="${CREME}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M-2 -4 C-30 -30 -46 -40 -64 -40 M-2 0 C-34 -4 -54 -12 -72 -24 M-2 4 C-28 22 -46 30 -66 30" stroke="${KIWI}" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${[[-64, -40], [-72, -24], [-66, 30], [-40, -30], [-46, 22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${KIWI}"/>`).join("")}
  </g>`;
  return svg(`
  <ellipse cx="150" cy="226" rx="130" ry="12" fill="${FLORESTA}" opacity=".18"/>
  ${c(96, 92, 14)}${c(92, 126, 4, 1.05)}${c(100, 160, -6, 0.95)}
  <path d="M60 128 C80 124 92 118 104 108 M60 128 C80 132 92 142 104 152" stroke="${FLORESTA}" stroke-width="7" fill="none" stroke-linecap="round"/>
  ${rep([[218, 206], [252, 196], [236, 228], [270, 222]], (x, y) => `<circle cx="${x}" cy="${y}" r="14" fill="${CENOURA}" stroke="${TOMATE}" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="6" fill="none" stroke="${SOL}" stroke-width="2.4"/>`)}`);
}

// ── tigela da capa com os 5 ingredientes
function tigelaCapa() {
  const rodelasBanana = rep([[226, 96], [242, 110], [212, 110]], (x, y) => `<circle cx="${x}" cy="${y}" r="11" fill="${SOL}" stroke="${CENOURA}" stroke-width="2.5"/><path d="M${x - 3} ${y - 2} l3 5 l3 -5" stroke="${CENOURA}" stroke-width="1.8" fill="none"/>`);
  const cubosAbobora = rep([[150, 98, 10], [168, 108, -15], [134, 110, 25]], (x, y, r) => `<rect x="${x - 9}" y="${y - 9}" width="18" height="18" rx="3" fill="${CENOURA}" stroke="${TOMATE}" stroke-width="2.2" transform="rotate(${r} ${x} ${y})"/>`);
  return svg(`
  ${tampaTigela()}
  <path d="M84 104 C80 72 116 58 146 66 C138 82 124 98 108 112 Z" fill="${CENOURA}" stroke="${TOMATE}" stroke-width="2.5"/>
  <path d="M96 98 C104 86 118 76 134 70 M104 106 C114 94 126 84 142 76" stroke="${CREME}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  ${cubosAbobora}
  ${rodelasBanana}
  <g transform="rotate(-24 196 78)"><path d="M168 78 C182 72 214 74 228 78 C214 82 182 84 168 78 Z" fill="${CENOURA}" stroke="${TOMATE}" stroke-width="2"/><path d="M168 78 C158 66 150 62 140 62 M168 78 C156 78 148 82 140 90" stroke="${KIWI}" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  ${rep([[70, 108], [88, 116]], (x, y) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="10" fill="${CREME}" stroke="${FLORESTA}" stroke-width="4"/><circle cx="${x}" cy="${y}" r="2.5" fill="${SOL}"/>`)}
  ${vapor([138, 160], 52)}
  ${tigela()}`);
}

// ── panela com caldo (para caldos e cozidos)
function panela() {
  return svg(`
  ${vapor([120, 150, 180], 70)}
  <path d="M42 128 C14 126 14 160 44 160" stroke="${FLORESTA}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M258 128 C286 126 286 160 256 160" stroke="${FLORESTA}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <ellipse cx="150" cy="102" rx="104" ry="16" fill="${SOL}"/>
  ${rep([[100, 100, 15], [130, 106, -20], [165, 98, 10], [196, 106, 30], [215, 98, 0], [85, 106, -30]], (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="5" fill="${CENOURA}" transform="rotate(${r} ${x} ${y})"/>`)}
  <path d="M48 106 L252 106 L244 206 C242 222 230 228 214 228 L86 228 C70 228 58 222 56 206 Z" fill="${FLORESTA}"/>
  <rect x="38" y="98" width="224" height="16" rx="8" fill="${FLORESTA}"/>
  <path d="M50 106 L250 106" stroke="${CREME}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M70 146 q15 -12 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" stroke="${CREME}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M74 178 q13 -10 26 0 t26 0 t26 0 t26 0 t26 0 t26 0" stroke="${CREME}" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${[86, 106, 126, 146, 166, 186, 206].map((x) => `<circle cx="${x}" cy="204" r="3.5" fill="${CREME}"/>`).join("")}
  <path d="M236 70 L206 118" stroke="${CENOURA}" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="244" cy="58" rx="16" ry="11" fill="${CENOURA}" transform="rotate(-30 244 58)"/>`);
}

// ── talheres (da primeira versão ilustrada)
function talheres() {
  return svg(`
  <g transform="rotate(-28 150 125)">
    <ellipse cx="110" cy="60" rx="24" ry="36" fill="${FLORESTA}"/>
    <ellipse cx="110" cy="56" rx="14" ry="24" fill="none" stroke="${CREME}" stroke-width="3"/>
    <path d="M110 96 L110 226" stroke="${FLORESTA}" stroke-width="12" stroke-linecap="round"/>
    <path d="M110 150 L110 214" stroke="${CREME}" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <g transform="rotate(26 150 125)">
    <path d="M176 24 L176 76 M190 24 L190 76 M204 24 L204 76 M218 24 L218 76" stroke="${CENOURA}" stroke-width="7" stroke-linecap="round"/>
    <path d="M170 70 C170 100 224 100 224 70" fill="${CENOURA}"/>
    <path d="M197 96 L197 226" stroke="${CENOURA}" stroke-width="12" stroke-linecap="round"/>
  </g>
  ${rep([[40, 200, 6, SOL], [262, 210, 5, FLORESTA], [56, 60, 4, CENOURA], [250, 50, 6, SOL]], (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`)}`);
}

// ── pote de conserva (da primeira versão ilustrada), para o aproveitamento
function pote() {
  return svg(`
  <rect x="88" y="30" width="124" height="28" rx="6" fill="${CENOURA}"/>
  <path d="M100 44 L200 44" stroke="${CREME}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="6 6"/>
  <path d="M96 58 L204 58 C232 70 236 96 236 120 L236 214 C236 228 226 236 212 236 L88 236 C74 236 64 228 64 214 L64 120 C64 96 68 70 96 58 Z" fill="${FLORESTA}"/>
  <rect x="92" y="120" width="116" height="70" rx="6" fill="${CREME}"/>
  <path d="M106 142 c10 -10 22 -10 30 0 c10 -10 22 -10 30 0 c10 -10 22 -10 30 0" stroke="${CENOURA}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M106 168 L194 168" stroke="${FLORESTA}" stroke-width="3" stroke-linecap="round"/>
  <path d="M80 100 C82 86 88 76 98 70" stroke="${CREME}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M30 220 C28 190 46 170 56 160 M22 232 C40 214 50 206 60 200" stroke="${CENOURA}" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${folhas([[254, 226, -20], [270, 210, 30], [262, 236, 10]])}`);
}

// ── frigideira (para o Pulo do Chef)
function frigideira() {
  return svg(`
  <path d="M206 112 L290 82" stroke="${FLORESTA}" stroke-width="18" stroke-linecap="round"/>
  <path d="M232 104 L280 86" stroke="${CREME}" stroke-width="3" stroke-linecap="round"/>
  <circle cx="126" cy="132" r="96" fill="${FLORESTA}"/>
  <circle cx="126" cy="132" r="80" fill="none" stroke="${CREME}" stroke-width="3"/>
  ${rep([[100, 116, 20], [136, 104, -10], [158, 134, 30], [112, 152, -20], [140, 160, 0]], (x, y, r) => `<g transform="rotate(${r} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="17" ry="11" fill="${CENOURA}" stroke="${TOMATE}" stroke-width="2.4"/><path d="M${x - 8} ${y - 2} q8 -5 16 0" stroke="${SOL}" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`)}
  ${vapor([110, 140], 34)}
  ${rep([[40, 210, 6, SOL], [262, 200, 5, CENOURA], [230, 230, 4, FLORESTA]], (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`)}`);
}

module.exports = {
  cores: { SOL, CREME, CENOURA, TOMATE, FLORESTA, KIWI },
  ILU: { abobora, banana, frango, mandioca, cenoura, tigelaCapa, panela, talheres, pote, frigideira },
};
