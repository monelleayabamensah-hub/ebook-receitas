# Versão com estampas

A mesma diagramação da `VERSAO FUNDOS ILUSTRADOS` (63 páginas, mesmo texto, as 28 fotos), agora com as estampas em estilo xilogravura (verde-floresta, mostarda, laranja queimado e creme) e a capa de azulejos.

| Fundo | Onde | Tratamento |
|---|---|---|
| `capa-design.jpg` | capa | arte pronta, página inteira |
| `fundos/estampa-vagens.jpg` | aberturas de capítulo, segunda capa do capítulo 1, página final | texto num painel verde-floresta sólido; foto do capítulo embaixo |
| `fundos/estampa-geometrica.jpg` | "Cinco ingredientes", divisória do sumário, transformações do capítulo 1, abertura de cada receita | texto num painel verde-floresta; ingredientes num cartão claro dentro do painel |
| `fundos/creme-laranja.jpg` | páginas de leitura e receitas | cartão claro centralizado sobre o creme, com as folhagens laranja nos cantos |

As estampas são cheias, então o texto nunca fica direto sobre o desenho: vai sempre num painel sólido. Cada estampa é esticada para cobrir a página inteira, em vez de repetida, porque a repetição deixava emendas à mostra.

- `ebook.html`: o ebook em HTML/CSS (A4, com quebra de página)
- `Cozinha-Mamede.pdf`: o mesmo ebook em PDF
- `Cozinha-Mamede-Canva.pptx`: versão editável para o Canva (Criar design → Importar arquivo → escolha o .pptx). Cada texto é uma caixa editável; cartões, painéis e bordas são formas; as fotos são imagens redondas; a estampa de cada página é o fundo do slide (a capa inteira também). Se o Canva trocar alguma fonte, envie os arquivos de `fontes/` (Fraunces e DM Sans) em Marca → Fontes
- `canva.js`: gera o `.pptx` a partir do HTML
- `build.py`: gera o `ebook.html`
- `pdf.js`: gera o PDF e avisa se algo estourou

Para trocar um fundo ou a capa, substitua o arquivo com o mesmo nome e rode `npm install && python3 build.py && node pdf.js && node canva.js` (precisa de Playwright).
