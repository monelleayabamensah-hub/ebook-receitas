# Comando para criar as imagens no ChatGPT

São **28 fotos**: capa, boas-vindas, 5 aberturas de capítulo, 15 receitas, 5 do "Aproveita Isso Também" e o agradecimento.

**Como usar**
1. Abra uma conversa nova no ChatGPT (com geração de imagens ativa).
2. Copie todo o bloco abaixo e cole. Se tiver, anexe junto a imagem de referência do layout.
3. O ChatGPT cria a imagem 1. Para cada imagem seguinte, responda **"próxima"**.
4. Baixe cada imagem e salve na pasta `fotos/` com o **nome do arquivo** indicado (ex.: `r1-1.jpg`).
5. Rode `node build.js && node canva.js`: as fotos entram sozinhas no PDF e no arquivo do Canva, no lugar dos pratos ilustrados.

> As imagens aparecem no ebook recortadas em **círculo**. Por isso todas são quadradas, vistas de cima, com o prato centralizado ocupando quase todo o quadro.

---

```
Você é um fotógrafo de culinária editorial. Vai criar TODAS as fotos do ebook de receitas "COZINHA MAMEDE: 5 ingredientes. 15 transformações. Um novo jeito de olhar para a sua cozinha", do Chef Allan Mamede.

SOBRE O EBOOK
Um guia prático que ensina a transformar 5 ingredientes do dia a dia (abóbora cabotiá, banana-da-terra, sobrecoxa de frango, mandioca e cenoura) em 15 preparações diferentes, com técnica de chef, comida afetiva, com memória de casa, e aproveitamento integral (casca, semente, rama e osso viram comida). É comida brasileira de verdade, generosa e caseira, mas fotografada com capricho, sem frescura gourmet.

ESTILO OBRIGATÓRIO EM TODAS AS FOTOS
- Fotografia de comida realista, editorial, de livro de receitas.
- Formato QUADRADO (1:1).
- Vista de cima, a 90 graus (flat lay), câmera bem centralizada.
- O prato, tigela ou tábua é REDONDO, fica no centro e ocupa cerca de 85% do quadro. A foto será recortada em círculo no ebook, então nada importante pode ficar nos cantos.
- Luz natural suave vinda de uma janela lateral, sombras leves, aparência fresca e apetitosa.
- Louça de cerâmica artesanal em tons de creme, areia e off-white; fundo de linho cru ou madeira clara.
- Paleta da série: creme (#F7F2EA), verde-oliva (#4E5B38) e terracota (#C2552D). Use esses tons em detalhes como guardanapo de linho verde-oliva, folhas de ervas frescas e pratinhos de cerâmica terracota.
- Ervas frescas e alguns ingredientes crus espalhados com naturalidade, sem exagero.
- Comida bonita, mas real e caseira, porções generosas.
- SEM texto, SEM letras, SEM logotipo, SEM marca d'água, SEM mãos, SEM pessoas.
- Mantenha a mesma luz, o mesmo ângulo, o mesmo tipo de louça e a mesma paleta em todas as imagens, para formarem uma série coerente.

COMO TRABALHAR
Crie UMA imagem por vez, na ordem da lista. Antes de cada imagem, escreva só o número e o nome do arquivo (ex.: "Imagem 7 — r1-1.jpg"). Depois de cada imagem, espere eu responder "próxima". Não pule nenhuma e não junte duas numa só.

LISTA DE IMAGENS

1. capa.jpg — Uma tábua redonda de madeira com os 5 ingredientes estrela crus, arrumados de forma bonita: meia abóbora cabotiá com a polpa laranja e as sementes à mostra, bananas-da-terra maduras (amarelas com pintinhas pretas), sobrecoxas de frango cruas com pele, mandioca com casca e um pedaço descascado mostrando a polpa branca, e cenouras com a rama verde. Ramos de tomilho e sálvia.

2. boas-vindas.jpg — Prato fundo de cerâmica creme com nhoque de abóbora dourado na manteiga, folhas de sálvia crocantes e parmesão ralado por cima. Guardanapo de linho verde-oliva ao lado.

CAPÍTULO 1: ABÓBORA CABOTIÁ
3. cap1.jpg — Abóbora cabotiá (japonesa, casca verde-escura) cortada ao meio sobre uma tábua redonda: uma metade com as sementes, outra limpa, e alguns gomos com casca. Ramos de sálvia.
4. r1-1.jpg — Nhoque de abóbora tostado na manteiga de garrafa e sálvia (conforto refinado): nhoques laranja-claros dourados, folhas de sálvia fritas e crocantes, parmesão e pimenta-do-reino, num prato raso de cerâmica.
5. r1-2.jpg — Hambúrgueres e bolinhos cremosos assados de abóbora com especiarias e queijo coalho: discos dourados com pontinhos de cominho e páprica, um deles partido mostrando o queijo coalho derretido no meio, com potinho de molho de iogurte com hortelã.
6. r1-3.jpg — Crepúsculo: doce de abóbora cremoso de colher com coco e raspas de laranja (uma sobremesa de memória afetiva), numa tigela de cerâmica, brilhante e alaranjado, com coco ralado e raspas de laranja por cima, um pau de canela e uma colher ao lado.
7. aproveita1.jpg — Duas tigelinhas lado a lado sobre uma tábua redonda: chips crocantes de casca de abóbora temperados com páprica e sementes de abóbora tostadas, douradas e salpicadas de sal grosso.

CAPÍTULO 2: BANANA-DA-TERRA
8. cap2.jpg — Penca de bananas-da-terra em tábua redonda, em três estágios de maturação (uma mais verde, uma amarela com pintinhas, uma bem madura de casca escura), uma delas descascada e cortada em rodelas diagonais.
9. r2-1.jpg — Moqueca expressa de frigideira com banana, leite de coco e pimenta (sem peixe, mas cheia de sabor): frigideira redonda de ferro com rodelas de banana-da-terra douradas num molho alaranjado de dendê e leite de coco, com tiras de pimentão vermelho, tomate, coentro fresco e pimenta dedo-de-moça.
10. r2-2.jpg — Purê aveludado de banana grelhada com noz-moscada, para acompanhar carnes ou legumes assados: purê dourado-claro e liso, espalhado em ondas no prato, com noz-moscada ralada por cima, um fio de manteiga derretida e lâminas de banana grelhada com marcas douradas.
11. r2-3.jpg — Bananas flambadas no rum ou na cachaça com crosta de açúcar mascavo e canela: metades de banana caramelizadas e brilhantes num prato raso, com calda âmbar, canela em pó e uma bola de sorvete de creme derretendo levemente.
12. aproveita2.jpg — "Carne" vegetal de casca de banana: frigideira com cascas de banana desfiadas e refogadas com tomate, cebola e cheiro-verde, parecendo carne desfiada, com alguns pastéis dourados ao lado, um deles aberto mostrando o recheio.

CAPÍTULO 3: SOBRECOXA DE FRANGO
13. cap3.jpg — Sobrecoxas de frango cruas, com osso e pele, numa tábua redonda, temperadas com sal grosso, pimenta, dentes de alho e limão cortado ao meio. Ramos de tomilho.
14. r3-1.jpg — Sobrecoxa desossada com pele ultracrocante ao molho rústico de limão e alho: pedaços com a pele bem dourada e crocante virada para cima, sobre um molho brilhante com lâminas de alho douradas, raspas de limão e salsinha.
15. r3-2.jpg — Frango desfiado suculento ao molho de tomate caseiro e ervas (para massas, tortas e sanduíches): panela redonda com frango desfiado num molho de tomate vermelho e encorpado, folhas de manjericão e orégano fresco.
16. r3-3.jpg — Sobrecoxa marinada no iogurte com especiarias, assada até dourar (maciez extrema): sobrecoxas com pele alaranjada de páprica e cúrcuma, com manchas bem tostadas, numa assadeira redonda, com limão e um potinho de molho de iogurte com pepino.
17. aproveita3.jpg — Panela com caldo caseiro de frango dourado e translúcido, com ossos, cebola com casca, cenoura, louro e talos de salsinha, e ao lado uma forminha de gelo com cubos de caldo congelado.

CAPÍTULO 4: MANDIOCA
18. cap4.jpg — Mandiocas inteiras com a casca marrom numa tábua redonda, uma cortada em toras mostrando a polpa branca e outra descascada, com a casca saindo em uma só tira.
19. r4-1.jpg — Rösti de mandioca recheado na frigideira (crosta dourada por fora, cremoso por dentro): disco grande e bem dourado de mandioca ralada, com uma fatia cortada mostrando o recheio de carne-seca desfiada e queijo derretido.
20. r4-2.jpg — Caldo aveludado de mandioca com gengibre e bacon: tigela funda com creme claro e liso, bacon crocante em cubinhos, cebolinha picada e um fio de azeite por cima.
21. r4-3.jpg — Biscoito de polvilho e mandioca de assadeira (rápido para o lanche da tarde): palitos e bolinhas dourados, crocantes por fora, numa assadeira redonda forrada com papel-manteiga, um biscoito partido mostrando o miolo macio e uma xícara de café ao lado.
22. aproveita4.jpg — "Fariña" crocante de frigideira: frigideira com farofa fresca de mandioca dourada e soltinha, e ao lado uma jarrinha com a água do cozimento da mandioca, levemente turva.

CAPÍTULO 5: CENOURA
23. cap5.jpg — Maço de cenouras frescas com a rama verde e viçosa numa tábua redonda, algumas cortadas em rodelas diagonais e em palitos.
24. r5-1.jpg — Cenouras assadas inteiras, caramelizadas no mel com azeite e tomilho: cenouras com as pontas tostadas e brilhantes de mel, ramos de tomilho, sobre uma camada de iogurte, com amendoim picado por cima.
25. r5-2.jpg — Hambúrguer rústico e bolinhos de cenoura com aveia e especiarias (saboroso e nutritivo): discos alaranjados dourados na frigideira, com flocos de aveia visíveis, e um potinho de pesto verde ao lado.
26. r5-3.jpg — Bolo de cenoura da vovó com técnica de chef e calda de chocolate espelhada (massa fofíssima que não sola): bolo retangular cortado em quadrados, visto de cima numa travessa, com calda de chocolate lisa e muito brilhante, e um quadrado separado mostrando a massa alaranjada e fofa.
27. aproveita5.jpg — Pote de pesto verde-vivo de rama de cenoura com amendoim, e ao lado uma tigelinha de chips crocantes de casca de cenoura e algumas folhas de rama fresca.

FECHAMENTO
28. obrigado.jpg — Mesa posta com vários dos pratos do ebook vistos de cima (nhoque de abóbora, moqueca de banana, sobrecoxa crocante, caldo de mandioca e bolo de cenoura com calda), com guardanapos de linho verde-oliva, como um almoço de família.

Comece agora pela imagem 1 (capa.jpg).
```
