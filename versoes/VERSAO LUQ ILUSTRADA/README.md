# Versão LUQ Ilustrada

O conteúdo da **VERSAO LUQ** (5 ingredientes, 15 transformações, com O Ingrediente, Antes da Panela, O Pulo do Chef, Não Tem Isso?, Aproveita Isso Também e o bônus Os 10 Pulos do Mamede) com a identidade visual da **VERSAO YOUTUBE**: fundo creme, verde floresta, cenoura, tomate, sol e kiwi; títulos em Barlow Condensed, texto em Short Stack, traçados soltos, círculos numerados, quadro amarelo "Segredo de chef" e ilustrações chapadas.

- `Cozinha-Mamede.pdf`: ebook diagramado (A4, 42 páginas)
- `Cozinha-Mamede-Canva.pptx`: versão editável para o Canva (Criar design → Importar arquivo)
- `PROMPT-IMAGENS-CHATGPT.md`: comando para criar as 35 ilustrações no ChatGPT, no mesmo estilo do primeiro prompt
- `imagens/`: salve aqui as imagens do ChatGPT com os nomes da lista (capa.png, cap1.png, r1-1.png…); elas substituem sozinhas as ilustrações provisórias
- `conteudo.js`: todo o texto (o mesmo da VERSAO LUQ)
- `ilustracoes.js`: ilustrações provisórias em SVG
- `estilo.css`: cores, fontes e layout
- `build.js`: gera o HTML e o PDF e avisa se alguma página estourou
- `canva.js`: gera o `.pptx` do Canva a partir do HTML
- `fonts/` e `canva/fontes/`: fontes (licença SIL Open Font License); se o Canva trocar alguma fonte, envie os TTF de `canva/fontes/` em Marca → Fontes

Para regerar (precisa de Node e Playwright): `npm install && node build.js && node canva.js`
