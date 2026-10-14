# Versão com fundos ilustrados

O mesmo texto do ebook (63 páginas, na mesma ordem) com uma nova identidade baseada nos três fundos ilustrados.

**Fundos**

| Fundo | Onde | Por quê |
|---|---|---|
| `verde-caju.webp` | capa, aberturas de capítulo, página final | impacto: título grande em creme sobre o verde |
| `terracota.webp` | "Cinco ingredientes", divisória do sumário, transformações do capítulo 1 e a abertura de cada receita | impacto, com os ingredientes num cartão claro para leitura |
| `creme-mostarda.webp` | sumário, introdução, método, O Ingrediente, receitas, Pulo do Chef, Aproveita, bônus | leitura: o texto fica num cartão claro (96% opaco), centralizado sobre a moldura |

**Fotos (28):** cada uma entra na página em que o prato ou ingrediente é citado, recortada em círculo:

| Foto | Página |
|---|---|
| `capa` | capa (os 5 ingredientes) |
| `boas-vindas` | Introdução |
| `cap1` a `cap5` | abertura de cada capítulo (Abóbora, Banana, Frango, Mandioca, Cenoura) |
| `r1-1` a `r5-3` | abertura de cada receita (`r2-3` = capítulo 2, transformação 3: Bananas flambadas) |
| `aproveita1` a `aproveita5` | "Aproveita Isso Também" de cada capítulo |
| `obrigado` | página final |

Para trocar uma foto, salve a nova em `fotos/` com o mesmo nome (jpg, png ou webp) e rode `python3 build.py && node pdf.js`.

**Tipografia:** Fraunces (serifada com personalidade) nos títulos e DM Sans no corpo, ambas na SIL Open Font License, em `fontes/`.

**Receitas:** título e rótulo; preparo, cozimento e rendimento em três blocos; ingredientes com caixinhas de marcar, em duas colunas; modo de preparo com passos numerados; "Segredo de chef" num bloco verde.

- `ebook.html`: o ebook em HTML/CSS, A4, com quebra de página para impressão. Na tela fica responsivo
- `Cozinha-Mamede.pdf`: o mesmo ebook em PDF
- `conteudo.py`: o texto, o mesmo da `VERSAO HIERARQUIA VISUAL`
- `build.py`: gera o `ebook.html`
- `fotos/`: as 28 fotos (as mesmas da `VERSAO COM FOTOGRAFIAS`, reduzidas para 800 px)
- `fundos/`: os três fundos
- `pdf.js`: gera o PDF e avisa se algum cartão estourou a página

Para regerar: `python3 build.py && node pdf.js` (precisa de Playwright). Para exportar pelo navegador, abra o `ebook.html`, mande imprimir, escolha "Salvar como PDF" com margens "Nenhuma" e marque "Gráficos de fundo".
