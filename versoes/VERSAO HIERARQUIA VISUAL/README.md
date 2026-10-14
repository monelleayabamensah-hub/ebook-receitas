# Versão com hierarquia visual

O texto do PDF do Canva (`Cozinha-Mamede-Canva_3`), sem nenhuma palavra alterada e com as mesmas famílias de fonte (Barlow Condensed, Arimo e A Day Without Sun). Foi reformatado com uma escala única de títulos e corpo: H1 2,2em, H2 1,5em, H3 1,2em e corpo 1em com entrelinha 1,5, tudo alinhado à esquerda.

- `ebook.html`: o ebook em HTML, com `<h1>`, `<h2>`, `<h3>` e `<p>` e os estilos no topo do arquivo
- `Cozinha-Mamede.pdf`: o mesmo ebook em PDF (A4, 63 páginas, na mesma ordem do Canva)
- `Cozinha-Mamede-Canva.pptx`: versão editável para o Canva (Criar design → Importar arquivo → escolha o .pptx). Cada bloco de texto é uma caixa editável, já com os tamanhos, pesos e entrelinhas da nova hierarquia
- `canva-fontes/`: Barlow Condensed e Arimo em TTF. Se o Canva trocar alguma fonte, envie estes arquivos em Marca → Fontes
- `GUIA-FORMATACAO.md`: as medidas convertidas para o Canva (tamanho, peso, entrelinha e espaçamentos) e qual nível usar em cada página
- `conteudo.py`: o texto, transcrito do PDF
- `build.py`: gera o `ebook.html`
- `pdf.js`: gera o PDF e avisa se alguma página estourou
- `canva.js`: gera o `.pptx` do Canva a partir do HTML

A Day Without Sun é uma fonte comercial e não vem junto. No HTML ela é chamada pelo nome e aparece se estiver instalada. Sem ela, o navegador usa Arimo. As fotos não foram incluídas: esta versão trata só do texto.

Para regerar: `npm install && python3 build.py && node pdf.js && node canva.js` (precisa de Playwright).

Licenças das fontes: Barlow Condensed (SIL Open Font License, em `canva-fontes/`) e Arimo (Apache 2.0).
