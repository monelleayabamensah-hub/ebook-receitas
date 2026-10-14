# Versão em páginas duplas (spreads)

O ebook rediagramado em páginas duplas assimétricas, como na referência:

- **Coluna de texto** em cor sólida no lado de fora de cada página (esquerda nas páginas pares, direita nas ímpares), com cantos arredondados do lado da dobra.
- **Área de imagem** neutra (#F0ECE5) com uma borda fina verde-petróleo. A foto é um prato redondo com aro da mesma cor, que encosta na dobra: na página dupla, os pratos das duas páginas se encontram no meio.
- **Texto de apoio**, curto e em maiúsculas, em cima de cada imagem.
- **Número de página** nos cantos externos, numa etiqueta verde-petróleo com um fio dourado acima.
- **Tipografia:** Outfit (títulos, leve e geométrica) e DM Sans (texto), ambas na SIL Open Font License, em `fontes/`.

**Cores das colunas:** cacau (abertura e fechamento), abóbora, banana caramelizada, vinho (frango), oliva (mandioca), rosa-cenoura e verde-petróleo (bônus).

**Capa:** a arte `capa-design.jpg` (azulejos com abóbora, banana, frango, mandioca e cenoura, e o título COZINHA MAMEDE na vertical), ocupando a página inteira. Para trocar, substitua o arquivo, de preferência exportado do Canva em PNG ou JPG no tamanho A4 ou maior, e rode `python3 build.py && node pdf.js`.

**Estrutura (81 páginas):** capa sozinha à direita e, depois, uma página dupla para cada assunto:

| Página dupla | Esquerda | Direita |
|---|---|---|
| Abertura | Cinco ingredientes | Quem é Chef Allan Mamede? |
| | Sumário (com a numeração nova) | Introdução |
| | O jeito Mamede de cozinhar | Como usar este guia |
| Cada capítulo (7 páginas duplas) | Abertura do capítulo | 3 transformações |
| | O ingrediente | Antes da panela |
| | Receita: título, tempos e ingredientes (×3) | Receita: modo de preparo e segredo de chef |
| | O pulo do chef | Não tem isso? |
| | Aproveita isso também | Aproveita isso também (continuação) |
| Fechamento | Os 10 pulos do Mamede | Mais 5 pulos do Mamede |
| | Para seguir cozinhando | Contracapa |

Todo o texto do ebook está presente. Não entraram só as repetições da versão anterior: a página de transformações do capítulo 1 duplicada, a segunda capa no meio do capítulo 1, a divisória do sumário e a lista de ingredientes que aparecia duas vezes em cada receita. O sumário e as listas de transformações apontam para as páginas novas.

As fotos são as 28 de `fotos/`. Nas páginas da direita e nas de apoio, a mesma foto aparece ampliada num detalhe (close-up), para os dois pratos da página dupla conversarem.

- `Cozinha-Mamede.pdf`: uma página A4 por folha (ler na tela, enviar, imprimir)
- `Cozinha-Mamede-spreads.pdf`: páginas duplas lado a lado (420 × 297 mm), como o livro aberto
- `ebook.html`: na tela mostra as páginas duplas, e no celular as páginas ficam uma embaixo da outra. Ao imprimir sai uma página A4 por folha
- `build.py`: gera o `ebook.html` (cores, frases de apoio e ordem das páginas)
- `pdf.js`: gera os dois PDFs e avisa se alguma coluna de texto estourou

Para regerar: `python3 build.py && node pdf.js` (precisa de Playwright).
