// Gera Cozinha-Mamede.pdf a partir do ebook.html e avisa se algum conteúdo estourou a área da página.
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1200 } });
  await page.goto('file://' + path.resolve(__dirname, 'ebook.html'));
  await page.evaluate(() => document.fonts.ready);
  const estouros = await page.$$eval('.pagina', ps => ps.map((p, i) => {
    const area = p.querySelector('.cartao, .abertura');
    let limite, fundo;
    if (area.classList.contains('cartao')) {
      // o cartão cresce com o conteúdo até 12 mm do pé da página (max-height); passou disso, estourou
      limite = area.clientHeight + 1;
      fundo = area.scrollHeight;
    } else {
      const r = area.getBoundingClientRect();
      limite = r.bottom - parseFloat(getComputedStyle(area).paddingBottom);
      fundo = Math.max(...[...area.children].map(c => c.getBoundingClientRect().bottom));
    }
    // foto redonda no pé da página: o texto precisa terminar 4 px antes dela
    const fotoPe = p.querySelector('.foto-rodape');
    if (fotoPe && !area.classList.contains('cartao')) limite = Math.min(limite, fotoPe.getBoundingClientRect().top - 4);
    return fundo > limite ? `página ${i + 1}: +${Math.round(fundo - limite)}px` : null;
  }).filter(Boolean));
  console.log(estouros.length ? 'ESTOURO\n' + estouros.join('\n') : 'Nenhuma página estourou');
  await page.pdf({ path: path.resolve(__dirname, 'Cozinha-Mamede.pdf'), preferCSSPageSize: true, printBackground: true });
  await browser.close();
})();
