// Gera dois PDFs a partir do ebook.html e avisa se alguma coluna de texto estourou:
//   Cozinha-Mamede.pdf          → uma página A4 por folha (para ler na tela ou imprimir)
//   Cozinha-Mamede-spreads.pdf  → páginas duplas lado a lado (420 × 297 mm), como o livro aberto
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1700, height: 1200 } });
  await page.goto('file://' + path.resolve(__dirname, 'ebook.html'));
  await page.evaluate(() => document.fonts.ready);
  const estouros = await page.$$eval('.coluna', cs => cs.map((c, i) =>
    c.scrollHeight > c.clientHeight + 1 ? `página ${i + 1}: +${c.scrollHeight - c.clientHeight}px` : null).filter(Boolean));
  console.log(estouros.length ? 'ESTOURO\n' + estouros.join('\n') : 'Nenhuma coluna estourou');

  await page.pdf({ path: path.resolve(__dirname, 'Cozinha-Mamede.pdf'), preferCSSPageSize: true, printBackground: true });

  // versão em páginas duplas: cada spread vira uma folha de 420 mm
  await page.addStyleTag({ content: `
    @page { size: 420mm 297mm; margin: 0; }
    @media print {
      .spread { display: flex !important; width: 420mm; height: 297mm; break-after: page; }
      .spread.so-direita { padding-left: 210mm; background: #CFC5A6; }
      .pagina { break-after: auto; }
    }` });
  await page.pdf({ path: path.resolve(__dirname, 'Cozinha-Mamede-spreads.pdf'), preferCSSPageSize: true, printBackground: true });
  await browser.close();
})();
