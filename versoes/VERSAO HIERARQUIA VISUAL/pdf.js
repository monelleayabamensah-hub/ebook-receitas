// Gera Cozinha-Mamede.pdf a partir do ebook.html e avisa se alguma página estourou.
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(__dirname, 'ebook.html'));
  await page.evaluate(() => document.fonts.ready);
  const estouros = await page.$$eval('.pagina', ps => ps.map((p, i) => {
    const rod = p.querySelector('.rodape');
    // limite: 8px acima do rodapé ou, sem rodapé, a margem inferior da página
    const limite = rod ? rod.getBoundingClientRect().top - 8 : p.getBoundingClientRect().bottom - 20 * 3.78;
    const ult = [...p.children].filter(c => c !== rod).pop();
    const fundo = ult ? ult.getBoundingClientRect().bottom : 0;
    return fundo > limite ? `página ${i + 1}: +${Math.round(fundo - limite)}px` : null;
  }).filter(Boolean));
  console.log(estouros.length ? 'ESTOURO\n' + estouros.join('\n') : 'Nenhuma página estourou');
  await page.pdf({ path: path.resolve(__dirname, 'Cozinha-Mamede.pdf'), preferCSSPageSize: true, printBackground: true });
  await browser.close();
})();
