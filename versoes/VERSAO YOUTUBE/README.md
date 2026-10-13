# Versão YouTube

Ebook **COZINHA MAMEDE: 5 Ingredientes. 15 Transformações.** no estilo YouTube: ritmo rápido, frases curtas, conteúdo escaneável.

Design inspirado em ficha de receita ilustrada: paleta Jade Ascent: azul safira, verde jade (claro e escuro) e dourado sobre fundo off-white, títulos em caligrafia (Allison), texto em fonte mono (Sometype Mono), círculos numerados, traçados soltos e ilustrações em SVG.

- `ebook-cozinha-mamede.pdf`: ebook diagramado, pronto para enviar (A4, 34 páginas)
- `ebook-cozinha-mamede.html`: mesma versão em HTML (abre no navegador)
- `ebook-cozinha-mamede.md`: texto completo em Markdown
- `build.py`: gera o HTML (conteúdo, ilustrações e estilos ficam aqui)
- `render.js`: gera o PDF a partir do HTML e avisa se alguma página estourou
- `fonts/`: fontes usadas (licença SIL Open Font License)

Para regerar: `python3 build.py && node render.js`
