# Versão editável para o Canva

`cozinha-mamede-canva.pptx`: as 34 páginas do ebook em A4, prontas para importar no Canva.

Em cada página:
- **Textos**: caixas de texto editáveis, com fonte, tamanho e cor do ebook
- **Ilustrações**: imagens soltas (dá para mover, redimensionar, trocar ou apagar)
- **Traçados laranja**: uma imagem por página, por cima do fundo
- **Fundo**: imagem com a cor creme, os círculos numerados, o quadro amarelo do "Segredo de chef" e as faixas das tabelas (travado no PowerPoint)

## Como importar

1. No Canva, clique em **Criar design → Importar arquivo** (ou arraste o `.pptx` para a página inicial).
2. Espere a conversão; o arquivo abre como um design de 34 páginas.

## Fontes

O ebook usa **Barlow Condensed** (títulos) e **Short Stack** (texto). Se o Canva trocar alguma por outra:
- Procure pelo nome no seletor de fontes do Canva, ou
- Envie os arquivos da pasta `fontes/` em **Marca → Fontes** (recurso do Canva Pro) e importe o `.pptx` de novo.

As fontes são gratuitas (licença SIL Open Font License, arquivos `OFL-*.txt`).

## Como regerar

Na pasta `VERSAO YOUTUBE`: `python3 build.py`, depois `node canva-export.js <pasta-temporária>` e `python3 canva_pptx.py <pasta-temporária>`.
