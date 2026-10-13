# Versão com fotografias

Ebook **COZINHA MAMEDE: 5 ingredientes. 15 transformações.** com a estrutura completa do método: em cada capítulo, O Ingrediente, Antes da Panela, 3 Transformações, O Pulo do Chef, Não Tem Isso? e Aproveita Isso Também, mais o bônus Os 10 Pulos do Mamede.

Capítulos: Abóbora Cabotiá, Banana-da-Terra, Sobrecoxa de Frango, Mandioca e Cenoura.

Design: fundo creme com verde-oliva e terracota, títulos em Playfair Display, texto em Montserrat, assinatura em Allura (as três existem no Canva).

- `Cozinha-Mamede.pdf`: ebook diagramado (A4, 41 páginas)
- `Cozinha-Mamede-Canva.pptx`: versão editável para o Canva (Criar design → Importar arquivo)
- `ebook.html`: mesma versão em HTML
- `conteudo.js`: todo o texto do ebook (edite aqui)
- `estilo.css`: cores, fontes e layout
- `build.js`: gera o HTML e o PDF e avisa se alguma página estourou
- `canva.js`: gera o `.pptx` do Canva a partir do HTML
- `fontes/`: fontes usadas (licença SIL Open Font License)
- `PROMPT-IMAGENS-CHATGPT.md`: comando para criar as 28 fotos no ChatGPT
- `fotos/`: salve aqui as fotos com os nomes da lista (capa.jpg, cap1.jpg, r1-1.jpg…); elas entram sozinhas no PDF e no Canva

Para regerar (precisa de Node e Playwright): `npm install && node build.js && node canva.js`
