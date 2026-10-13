# Versão com hierarquia visual

O texto do PDF do Canva (`Cozinha-Mamede-Canva_3`), sem nenhuma palavra alterada e com as mesmas famílias de fonte (Barlow Condensed, Arimo e A Day Without Sun). Foi reformatado com uma escala única de títulos e corpo: H1 2,2em, H2 1,5em, H3 1,2em e corpo 1em com entrelinha 1,5, tudo alinhado à esquerda.

- `ebook.html`: o ebook em HTML, com `<h1>`, `<h2>`, `<h3>` e `<p>` e os estilos no topo do arquivo
- `Cozinha-Mamede.pdf`: o mesmo ebook em PDF (A4, 63 páginas, na mesma ordem do Canva)
- `GUIA-FORMATACAO.md`: as medidas convertidas para o Canva (tamanho, peso, entrelinha e espaçamentos) e qual nível usar em cada página
- `conteudo.py`: o texto, transcrito do PDF
- `build.py`: gera o `ebook.html`
- `pdf.js`: gera o PDF e avisa se alguma página estourou

A Day Without Sun é uma fonte comercial e não vem junto. No HTML ela é chamada pelo nome e aparece se estiver instalada. Sem ela, o navegador usa Arimo. As fotos não foram incluídas: esta versão trata só do texto.

Para regerar: `python3 build.py && node pdf.js` (precisa de Playwright).
