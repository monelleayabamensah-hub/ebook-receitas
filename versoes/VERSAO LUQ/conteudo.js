// Conteúdo do ebook Cozinha Mamede.
// Edite os textos aqui e rode `node build.js` para gerar o PDF de novo.
// Medidas: xícara = 240 ml · colher de sopa = 15 ml · colher de chá = 5 ml.

module.exports = {
  titulo: "Cozinha Mamede",
  subtitulo: "5 ingredientes. 15 transformações. Um novo jeito de olhar para a sua cozinha.",
  autor: "Chef Allan Mamede",

  proposta: [
    "Pare de fazer sempre a mesma comida do mesmo jeito. Você não precisa encher o carrinho com ingredientes caros ou exóticos para sair da rotina: o segredo está em aprender a enxergar novas possibilidades com aquilo que já compra toda semana.",
    "Este é um guia prático para transformar 5 ingredientes cotidianos em 15 preparações completamente diferentes, unindo técnica profissional, sabor afetivo e aproveitamento integral.",
    "Aqui você não vai encontrar receitas soltas. Cada capítulo é dedicado a um ingrediente e mostra o caminho inteiro: como escolher no mercado, como guardar, como cortar, como cozinhar de três jeitos que você talvez nunca tenha imaginado e, no fim, o que fazer com a casca, a rama, o osso e a sobra.",
    "Leia com calma, cozinhe com tempo e, principalmente, prove tudo pelo caminho. É assim que a gente aprende a cozinhar de verdade.",
  ],

  fundamentos: [
    { nome: "Afeto", texto: "Comida acolhedora, generosa e com memória de casa, sem afetações desnecessárias nem gastronomia distante da realidade." },
    { nome: "Técnica", texto: "Decisões simples de chef (ponto de frigideira, cortes, descanso da carne, acidez e texturas) que mudam radicalmente o resultado final." },
    { nome: "Aproveitamento", texto: "Um olhar inteligente para cascas, talos, ramas e ossos, transformando o que iria para o lixo em sabor e textura." },
  ],

  jornada: [
    { nome: "O Ingrediente", texto: "O olhar do chef para expandir as possibilidades de uso daquele insumo." },
    { nome: "Antes da Panela", texto: "Como escolher no mercado, como armazenar e como cortar." },
    { nome: "3 Transformações", texto: "Três caminhos culinários completamente distintos para aquela sensação de “nunca pensei nisso”." },
    { nome: "O Pulo do Chef", texto: "Um erro frequente, desmistificado, com a técnica exata para corrigi-lo." },
    { nome: "Não Tem Isso?", texto: "Substituições inteligentes para você cozinhar sem travar." },
    { nome: "Aproveita Isso Também", texto: "Cascas, talos, ramas e aparas transformados em preparações saborosas." },
  ],

  capitulos: [
    // ───────────────────────────── 1. ABÓBORA
    {
      nome: "Abóbora Cabotiá",
      apelido: "ou abóbora japonesa",
      cor: "#C8692A",
      icone: "abobora",
      porQue: "Versátil, barata e símbolo de comida afetiva. E 100% aproveitável, da casca à semente: exatamente o que pede o consumo consciente.",
      ingrediente: [
        "A cabotiá é a abóbora mais generosa da feira. Tem polpa densa, pouca água e doçura natural, e é justamente isso que permite levá-la do nhoque ao doce de colher sem perder identidade.",
        "O erro mais comum é tratá-la sempre do mesmo jeito: cozida na água, no refogado, como acompanhamento. Quando você assa a cabotiá, a água evapora, os açúcares caramelizam e o sabor se concentra. É outra abóbora.",
        "E tem mais: a casca é comestível e as sementes viram petisco. Da cabotiá, quase nada vai para o lixo.",
      ],
      antes: {
        escolha: [
          "Pegue na mão: ela deve parecer pesada para o tamanho. Isso indica polpa densa e pouca água.",
          "Casca firme, sem partes moles, rachaduras ou manchas úmidas.",
          "Cabinho seco e bem preso. Se estiver verde e úmido, ela foi colhida cedo demais.",
          "Comprando em pedaço: procure polpa laranja intensa e sementes bem formadas.",
        ],
        armazenamento: [
          "Inteira: em local fresco, seco e arejado, fora da geladeira, por até 1 a 2 meses.",
          "Cortada: retire as sementes, envolva em filme e guarde na geladeira por até 5 dias.",
          "Assada ou cozida: em porções no freezer por até 3 meses.",
        ],
        cortes: [
          "Estabilize primeiro: corte uma fatia fina da base para ela não rolar na tábua.",
          "Use a faca mais pesada que você tiver e corte ao meio, de cima para baixo. Retire as sementes com uma colher.",
          "Gomos com casca para assar; cubos de 2 cm para refogar e cozinhar; ralada para bolinhos e massas.",
          "Para descascar, apoie o gomo deitado na tábua e corte a casca com a faca, de cima para baixo.",
        ],
      },
      receitas: [
        {
          rotulo: "O Clássico Afetivo",
          nome: "Nhoque de abóbora tostado na manteiga de garrafa e sálvia",
          subtitulo: "conforto refinado",
          rende: "4 porções", tempo: "1h15",
          ingredientes: [
            { grupo: "Massa", itens: [
              "800 g de abóbora cabotiá com casca (cerca de 600 g de polpa)",
              "1 gema",
              "50 g de parmesão ralado fino",
              "180 a 220 g de farinha de trigo (mais um pouco para polvilhar)",
              "Sal e noz-moscada ralada na hora",
            ]},
            { grupo: "Para finalizar", itens: [
              "4 colheres (sopa) de manteiga de garrafa",
              "12 folhas de sálvia fresca",
              "Pimenta-do-reino e parmesão a gosto",
            ]},
          ],
          preparo: [
            "Corte a abóbora em gomos, sem tirar a casca, e asse a 200 °C por 35 a 40 minutos, até ficar bem macia. <b>Assar, e não cozinhar na água</b>, é o que garante um nhoque leve.",
            "Raspe a polpa da casca e passe pelo espremedor (ou amasse muito bem com um garfo). Espalhe o purê numa travessa e deixe esfriar descoberto, para o vapor ir embora.",
            "Junte a gema, o parmesão, sal e noz-moscada. Acrescente a farinha aos poucos, misturando com as mãos só até a massa ficar macia e soltar dos dedos. Ela pode continuar levemente úmida.",
            "Faça um teste: modele uma bolinha e cozinhe em água fervente. Se desmanchar, acrescente mais 1 ou 2 colheres de farinha.",
            "Divida a massa, faça rolinhos de 2 cm de espessura sobre a bancada enfarinhada e corte em pedaços de 2 cm.",
            "Cozinhe em água fervente com sal, em levas. Quando os nhoques subirem, conte 30 segundos e retire com escumadeira.",
            "Numa frigideira grande, aqueça a manteiga de garrafa e frite as folhas de sálvia até ficarem crocantes. Junte os nhoques escorridos e deixe dourar 2 minutos sem mexer. Vire, finalize com pimenta e parmesão e sirva na hora.",
          ],
          dica: "Os nhoques podem ser congelados crus, espalhados numa assadeira enfarinhada. Depois de firmes, passe para um saco. Cozinhe direto do congelador, sem descongelar.",
        },
        {
          rotulo: "O Inusitado",
          nome: "Hambúrguer ou bolinho cremoso assado de abóbora com especiarias e queijo coalho",
          subtitulo: "o lado salgado que ninguém espera",
          rende: "12 bolinhos ou 6 hambúrgueres", tempo: "1h (mais 30 min de geladeira)",
          ingredientes: [
            { itens: [
              "500 g de abóbora cabotiá assada e amassada (veja o passo 1 do nhoque)",
              "150 g de queijo coalho em cubinhos",
              "1 ovo",
              "6 colheres (sopa) de farinha de rosca (ou de aveia em flocos finos)",
              "½ cebola picada bem miúda",
              "1 dente de alho picado",
              "1 colher (chá) de cominho em pó",
              "1 colher (chá) de páprica defumada",
              "2 colheres (sopa) de cheiro-verde picado",
              "Sal, pimenta-do-reino e azeite",
            ]},
          ],
          preparo: [
            "Refogue a cebola e o alho num fio de azeite até ficarem macios. Junte o cominho e a páprica e mexa por 30 segundos, só para despertar o aroma das especiarias.",
            "Numa tigela, misture o purê de abóbora, o refogado, o ovo, a farinha de rosca e o cheiro-verde. Tempere com sal e pimenta. Por último, incorpore o queijo coalho.",
            "Cubra e leve à geladeira por 30 minutos. A massa firma e fica muito mais fácil de modelar.",
            "Com as mãos untadas, modele bolinhos ou discos de hambúrguer. Disponha numa assadeira com papel-manteiga e pincele azeite por cima.",
            "Asse a 200 °C por 25 a 30 minutos, virando na metade do tempo, até dourar. Para hambúrgueres, também dá para dourar numa frigideira bem quente, 4 minutos de cada lado.",
          ],
          dica: "O queijo coalho derrete só em parte e cria um coração cremoso, com pontos tostados por fora. Sirva com um molho de iogurte, limão e hortelã.",
        },
        {
          rotulo: "O Lado Doce",
          nome: "Crepúsculo: doce de abóbora cremoso de colher com coco e raspas de laranja",
          subtitulo: "uma sobremesa de memória afetiva",
          rende: "cerca de 1 kg", tempo: "1h10",
          ingredientes: [
            { itens: [
              "1 kg de polpa de abóbora cabotiá em cubos",
              "300 g de açúcar",
              "½ xícara de água",
              "200 ml de leite de coco",
              "50 g de coco ralado",
              "1 pau de canela e 3 cravos-da-índia",
              "Raspas de 1 laranja",
              "1 pitada de sal",
            ]},
          ],
          preparo: [
            "Numa panela de fundo grosso, cozinhe a abóbora com a água, tampada, em fogo médio, até ficar bem macia (cerca de 15 minutos).",
            "Amasse a abóbora na própria panela. Junte o açúcar, a canela e os cravos.",
            "Cozinhe em fogo baixo, mexendo com frequência, até o doce começar a desgrudar do fundo da panela, por 30 a 40 minutos. Cuidado: ele espirra. Use uma colher de cabo longo.",
            "Acrescente o leite de coco e o coco ralado e cozinhe por mais 10 minutos, mexendo.",
            "Desligue o fogo, retire a canela e os cravos e só então junte as raspas de laranja e a pitada de sal.",
            "Ponto certo: ao passar a colher no fundo, o doce abre um caminho que demora a se fechar. Lembre que ele engrossa bastante ao esfriar.",
          ],
          dica: "Raspas de cítricos vão sempre no final, com o fogo desligado: o calor prolongado evapora os óleos aromáticos da casca. A pitada de sal não salga, ela faz o doce parecer mais doce e menos enjoativo.",
        },
      ],
      pulo: {
        titulo: "Nhoque de abóbora que vira chiclete",
        erro: "Cozinhar a abóbora na água. Ela absorve líquido, a massa fica mole e a única saída parece ser jogar mais e mais farinha. O resultado é um nhoque pesado, borrachudo e com gosto de farinha, em vez de gosto de abóbora.",
        tecnica: [
          "<b>Asse</b> a abóbora em vez de cozinhar: a água evapora e o sabor concentra.",
          "<b>Deixe o vapor sair:</b> espalhe o purê numa travessa e espere amornar antes de juntar a farinha.",
          "<b>Farinha aos poucos:</b> pare assim que a massa deixar de grudar. Massa de nhoque é úmida mesmo.",
          "<b>Não sove:</b> misture só o necessário. Quanto mais você trabalha a massa, mais elástica ela fica.",
        ],
      },
      substituicoes: [
        ["Abóbora cabotiá", "Abóbora-paulista ou moranga (têm mais água: asse por mais tempo e escorra o purê numa peneira) ou batata-doce."],
        ["Manteiga de garrafa", "Ghee ou manteiga comum com um fio de azeite (que evita que ela queime)."],
        ["Sálvia fresca", "Alecrim ou tomilho frescos."],
        ["Queijo coalho", "Queijo meia-cura ou muçarela em cubos."],
        ["Leite de coco", "200 ml de leite com 2 colheres (sopa) a mais de coco ralado."],
        ["Laranja", "Tangerina, ou metade da quantidade de raspas de limão-taiti."],
      ],
      aproveita: [
        {
          nome: "Casca: chips crocantes temperados",
          texto: "Quando a receita pedir abóbora descascada, tire a casca em tiras finas com um descascador de legumes. Misture com um fio de azeite, sal e páprica e espalhe sem amontoar. Leve à airfryer a 180 °C por 8 a 12 minutos, chacoalhando na metade, ou ao forno a 160 °C por 20 a 25 minutos. Elas ficam crocantes ao esfriar.",
        },
        {
          nome: "Sementes: snack crocante com páprica e sal",
          texto: "Lave as sementes numa peneira, separando as fibras, e seque muito bem com um pano. Tempere com um fio de azeite, sal e páprica defumada e asse a 160 °C por 20 a 25 minutos, mexendo de vez em quando, até dourarem e estalarem. Use como petisco ou para dar crocância a saladas, sopas e ao próprio nhoque.",
        },
      ],
    },

    // ───────────────────────────── 2. BANANA-DA-TERRA
    {
      nome: "Banana-da-Terra",
      apelido: "ou banana-prata firme",
      cor: "#B8892A",
      icone: "banana",
      porQue: "O ingrediente nacional por excelência. Transita entre o salgado e o doce e leva sofisticação ao prato sem pesar no bolso.",
      ingrediente: [
        "A banana-da-terra é uma banana de cozinhar. Crua, ela é dura e pouco agradável; no fogo, vira outra coisa: macia, caramelizada, cheia de sabor.",
        "O segredo está no estágio de maturação. Verde, ela é rica em amido e se comporta quase como uma batata. Amarela com pintinhas pretas, fica no ponto mais versátil: doce, mas firme. Com a casca quase toda preta, está doce e macia, perfeita para purês e sobremesas.",
        "Aprender a ler a casca é aprender a escolher o que fazer com ela. E, no fim, a própria casca ainda vira recheio.",
      ],
      antes: {
        escolha: [
          "Escolha pelo uso: amarela com pintas para as receitas deste capítulo; mais verde se for fritar em chips; bem madura para doces.",
          "A fruta deve estar firme ao toque, sem partes afundadas.",
          "Evite pontas com bolor ou casca rachada, por onde a fruta resseca.",
        ],
        armazenamento: [
          "Fora da geladeira, de preferência penduradas, longe de outras frutas.",
          "Para amadurecer mais rápido, guarde num saco de papel fechado.",
          "Para frear o amadurecimento, leve à geladeira: a casca escurece, mas a polpa se mantém.",
          "Maduras demais? Descasque, corte e congele em saco fechado por até 3 meses.",
        ],
        cortes: [
          "Para descascar a banana-da-terra: corte as duas pontas, faça um talho raso ao longo da casca e solte-a com o polegar.",
          "Rodelas grossas em diagonal (2 cm) para frigideira e moqueca.",
          "Lâminas no comprimento para grelhar e flambar.",
        ],
      },
      receitas: [
        {
          rotulo: "A Rápida de Frigideira",
          nome: "Moqueca expressa de frigideira com banana, leite de coco e pimenta",
          subtitulo: "sem peixe, mas cheia de sabor",
          rende: "3 porções", tempo: "30 min",
          ingredientes: [
            { itens: [
              "3 bananas-da-terra maduras e firmes, em rodelas diagonais de 2 cm",
              "2 colheres (sopa) de azeite de dendê",
              "1 cebola em rodelas",
              "1 pimentão vermelho em tiras",
              "2 tomates em rodelas",
              "2 dentes de alho picados",
              "200 ml de leite de coco",
              "1 pimenta dedo-de-moça (ou pimenta-de-cheiro) picada, sem sementes",
              "Suco de ½ limão",
              "Coentro (ou cheiro-verde) e sal a gosto",
            ]},
          ],
          preparo: [
            "Aqueça 1 colher de dendê numa frigideira grande. Doure as rodelas de banana, 2 minutos de cada lado, sem mexer. Tempere com uma pitada de sal e reserve.",
            "Na mesma frigideira, com o restante do dendê, refogue a cebola, o pimentão e o alho por 3 minutos.",
            "Junte o tomate e a pimenta e cozinhe até o tomate começar a desmanchar.",
            "Acrescente o leite de coco e deixe ferver por 5 minutos, até engrossar levemente. Acerte o sal.",
            "Volte as bananas para a frigideira e cozinhe só por 3 a 4 minutos, para aquecerem no molho sem desmanchar.",
            "Desligue o fogo, regue com o suco de limão e finalize com coentro.",
          ],
          dica: "Dourar a banana antes é o que dá estrutura e sabor à moqueca. Sirva com arroz branco e farofa de dendê.",
        },
        {
          rotulo: "A Textura Surpreendente",
          nome: "Purê aveludado de banana grelhada com noz-moscada",
          subtitulo: "para acompanhar carnes ou legumes assados",
          rende: "4 porções como acompanhamento", tempo: "25 min",
          ingredientes: [
            { itens: [
              "3 bananas-da-terra maduras",
              "2 colheres (sopa) de manteiga",
              "150 ml de leite quente (ou caldo de frango)",
              "Noz-moscada ralada na hora",
              "Sal, pimenta-do-reino e algumas gotas de limão",
            ]},
          ],
          preparo: [
            "Descasque as bananas e corte em lâminas no sentido do comprimento.",
            "Aqueça 1 colher de manteiga numa frigideira e grelhe as lâminas em fogo médio-alto até ficarem bem douradas dos dois lados. É essa caramelização que dá profundidade ao purê.",
            "Transfira para uma panela, junte o leite quente e amasse bem com um garfo ou espremedor, em fogo baixo.",
            "Acrescente a manteiga restante e mexa até ficar aveludado. Se quiser mais liso, passe por uma peneira.",
            "Tempere com sal, pimenta e noz-moscada. Se estiver doce demais, equilibre com algumas gotas de limão.",
          ],
          dica: "É um acompanhamento salgado de respeito: fica perfeito com carne de sol, frango assado ou peixe grelhado.",
        },
        {
          rotulo: "A Sobremesa de Chef",
          nome: "Bananas flambadas no rum ou na cachaça com crosta de açúcar mascavo e canela",
          subtitulo: "a sobremesa de restaurante feita em casa",
          rende: "4 porções", tempo: "15 min",
          ingredientes: [
            { itens: [
              "2 bananas-da-terra ou 4 bananas-prata firmes",
              "3 colheres (sopa) de açúcar mascavo",
              "1 colher (chá) de canela em pó",
              "2 colheres (sopa) de manteiga",
              "50 ml de rum ou cachaça",
              "Suco de 1 laranja",
              "1 pitada de sal",
              "Sorvete de creme para servir",
            ]},
          ],
          preparo: [
            "Corte as bananas ao meio no sentido do comprimento (e ao meio na largura, se forem grandes).",
            "Misture o açúcar mascavo com a canela e o sal e polvilhe sobre o lado cortado das bananas, pressionando.",
            "Aqueça a manteiga numa frigideira até espumar. Coloque as bananas com o lado do açúcar para baixo e não mexa por 2 a 3 minutos, até formar uma crosta. Vire com cuidado.",
            "Flambe com segurança: desligue o fogo, coloque o rum medido num copinho e despeje na frigideira. Afaste o rosto, religue o fogo e incline levemente a frigideira (ou acenda com um fósforo longo). Deixe a chama apagar sozinha.",
            "Junte o suco de laranja e deixe borbulhar por 1 minuto, até formar uma calda.",
            "Sirva as bananas quentes com a calda e uma bola de sorvete.",
          ],
          dica: "Nunca despeje a bebida direto da garrafa perto do fogo, e desligue o exaustor durante a flambagem. Flambar queima o álcool e deixa só o aroma da bebida na calda.",
        },
      ],
      pulo: {
        titulo: "Banana que vira papa na frigideira",
        erro: "Colocar a banana em frigideira morna e ficar mexendo. Ela solta líquido, cozinha no próprio vapor e desmancha antes de dourar.",
        tecnica: [
          "<b>Frigideira quente de verdade</b>, com a gordura já brilhando, antes de a banana entrar.",
          "<b>Espaço:</b> não amontoe. Se precisar, doure em duas levas.",
          "<b>Não mexa:</b> deixe 2 minutos parada e vire uma única vez.",
          "<b>Banana no ponto:</b> amarela com pintinhas. Preta demais desmancha; verde demais não carameliza.",
        ],
      },
      substituicoes: [
        ["Banana-da-terra", "Banana-prata firme (cozinha mais rápido: reduza os tempos pela metade)."],
        ["Azeite de dendê", "Azeite comum com 1 colher (chá) de colorau ou páprica doce."],
        ["Leite de coco", "Creme de leite com 2 colheres (sopa) de coco ralado."],
        ["Rum ou cachaça", "Conhaque ou uísque. Sem álcool: dobre o suco de laranja e pule a flambagem."],
        ["Açúcar mascavo", "Açúcar demerara, ou açúcar comum com 1 colher (chá) de melado."],
        ["Noz-moscada", "Uma pitada de canela ou de cravo em pó."],
      ],
      aproveita: [
        {
          nome: "Casca: “carne” vegetal desfiada e temperada",
          texto: "Funciona melhor com cascas de banana-prata ou nanica, maduras e bem lavadas (a da banana-da-terra é mais grossa: cozinhe antes por 15 minutos em água). Corte as pontas e desfie as cascas no comprimento com um garfo. Deixe de molho em água com limão por 10 minutos e escorra. Refogue cebola, alho e tomate, junte as cascas, cominho, páprica e colorau e cozinhe em fogo baixo, tampado, por 15 a 20 minutos, pingando água se secar. Ajuste o sal e finalize com cheiro-verde.",
        },
        {
          nome: "Onde usar",
          texto: "Recheio de pastel, tapioca e torta; fricassê com creme de leite e queijo gratinado; refogado para servir com arroz e feijão. Com as cascas de 5 bananas você faz recheio para uns 10 pastéis.",
        },
      ],
    },

    // ───────────────────────────── 3. SOBRECOXA
    {
      nome: "Sobrecoxa de Frango",
      apelido: "com osso e pele",
      cor: "#A3442A",
      icone: "frango",
      porQue: "A proteína é um dos itens que mais pesam no orçamento da família. A sobrecoxa é muito mais saborosa, suculenta e barata que o peito, e com técnica de chef você passa a dominá-la.",
      ingrediente: [
        "Se existe um corte que perdoa, é a sobrecoxa. Por ser carne escura, tem mais gordura e mais colágeno: aguenta mais tempo de fogo, continua suculenta e tem muito mais sabor que o peito.",
        "E ela vem com dois presentes que quase todo mundo joga fora. A pele, que bem trabalhada fica crocante como um torresmo. E o osso, que vira um caldo capaz de transformar qualquer arroz, molho ou sopa.",
        "Neste capítulo, a mesma peça vai para a frigideira, para a panela e para o forno, cada vez com uma técnica e um resultado diferentes.",
      ],
      antes: {
        escolha: [
          "Pele inteira, de cor clara e uniforme, sem manchas escuras.",
          "Pouco líquido na bandeja e nenhum cheiro forte.",
          "Congelada: sem cristais grossos de gelo, que indicam que ela descongelou e congelou de novo.",
        ],
        armazenamento: [
          "Na geladeira, na prateleira de baixo, por até 2 dias.",
          "No freezer, em porções achatadas dentro de sacos, por até 3 meses.",
          "Descongele sempre na geladeira, de um dia para o outro. Nunca na pia.",
        ],
        cortes: [
          "<b>Seque bem</b> com papel-toalha antes de qualquer preparo. Pele molhada não fica crocante.",
          "<b>Para desossar:</b> com a pele para baixo, faça um corte ao longo do osso, raspe a carne em volta com a ponta da faca e solte a articulação. Guarde o osso no freezer para o caldo.",
          "<b>Salga antecipada:</b> 1 colher (chá) de sal para cada 500 g, de 1 hora até 24 horas antes, na geladeira e descoberta. A carne fica mais temperada e a pele, mais seca.",
        ],
      },
      receitas: [
        {
          rotulo: "A Técnica da Frigideira",
          nome: "Sobrecoxa desossada com pele ultracrocante ao molho rústico de limão e alho",
          subtitulo: "a pele mais crocante que você já fez",
          rende: "2 a 4 porções", tempo: "35 min",
          ingredientes: [
            { grupo: "Frango", itens: [
              "4 sobrecoxas desossadas, com pele",
              "Sal e pimenta-do-reino",
              "1 colher (chá) de óleo",
            ]},
            { grupo: "Molho", itens: [
              "4 dentes de alho fatiados",
              "100 ml de caldo de frango (ou água)",
              "Suco e raspas de 1 limão",
              "2 colheres (sopa) de manteiga gelada",
              "Salsinha picada",
            ]},
          ],
          preparo: [
            "Seque muito bem as sobrecoxas e tempere com sal e pimenta dos dois lados.",
            "Coloque o óleo numa frigideira de fundo grosso e disponha as sobrecoxas com a pele para baixo, ainda com a frigideira fria. Ligue em fogo médio.",
            "Coloque um peso por cima (uma panela menor com água, por exemplo) e deixe por 12 a 15 minutos <b>sem mexer</b>. A gordura da pele derrete aos poucos e ela frita na própria gordura até ficar dourada e crocante.",
            "Vire e cozinhe por mais 4 a 6 minutos, até o centro atingir 75 °C ou o suco sair transparente ao furar.",
            "Transfira para uma grade ou prato, com a pele para cima, e deixe descansar 5 minutos.",
            "Retire o excesso de gordura da frigideira, deixando cerca de 1 colher. Em fogo baixo, doure o alho por 1 minuto.",
            "Junte o caldo e raspe bem o fundo com uma colher de pau. Deixe reduzir à metade. Desligue o fogo, junte o suco e as raspas de limão e a manteiga gelada, mexendo até o molho engrossar e brilhar. Finalize com salsinha.",
            "Sirva o molho no fundo do prato e o frango por cima, para a pele continuar crocante.",
          ],
          dica: "Aquele fundo grudado na frigideira é sabor puro. Soltá-lo com um líquido (deglaçar) transforma o que iria para a pia no melhor molho do prato.",
        },
        {
          rotulo: "O Cozimento Lento",
          nome: "Frango desfiado suculento ao molho de tomate caseiro e ervas",
          subtitulo: "para massas, tortas e sanduíches",
          rende: "6 porções", tempo: "1h20 (ou 40 min na pressão)",
          ingredientes: [
            { itens: [
              "6 sobrecoxas com osso e pele (cerca de 1 kg)",
              "Sal e pimenta-do-reino",
              "1 colher (sopa) de azeite",
              "1 cebola picada",
              "3 dentes de alho picados",
              "1 cenoura ralada",
              "1 colher (sopa) de extrato de tomate",
              "6 tomates bem maduros picados (ou 1 lata de tomate pelado)",
              "1 folha de louro",
              "300 ml de caldo de frango ou água",
              "Orégano, manjericão e cheiro-verde a gosto",
            ]},
          ],
          preparo: [
            "Seque e tempere as sobrecoxas com sal e pimenta. Doure no azeite, com a pele para baixo, por 6 a 8 minutos, até ficarem bem douradas. Vire, doure o outro lado por 2 minutos e reserve.",
            "Na gordura que ficou na panela, refogue a cebola, o alho e a cenoura até ficarem macios.",
            "Junte o extrato de tomate e mexa por 1 minuto, até ele escurecer levemente. Isso tira o gosto ácido de lata e aprofunda o sabor.",
            "Acrescente os tomates, o louro e o caldo, raspando o fundo. Volte o frango para a panela.",
            "Tampe e cozinhe em fogo baixo por 50 a 60 minutos (ou 20 minutos na panela de pressão), até a carne soltar do osso.",
            "Retire os ossos e a pele (guarde os ossos para o caldo). Desfie a carne com dois garfos dentro do próprio molho.",
            "Cozinhe destampado até o molho envolver o frango. Finalize com as ervas e acerte o sal.",
          ],
          dica: "Desfiar dentro do molho faz a carne absorver o líquido e continuar suculenta. Use em sanduíches, massas, tortas, panquecas ou sobre polenta mole.",
        },
        {
          rotulo: "O Assado Tecnológico",
          nome: "Sobrecoxa marinada no iogurte com especiarias, assada até dourar",
          subtitulo: "maciez extrema, no forno ou na airfryer",
          rende: "4 a 6 porções", tempo: "50 min (mais 2 h de marinada)",
          ingredientes: [
            { grupo: "Marinada", itens: [
              "170 g de iogurte natural integral (1 pote)",
              "3 dentes de alho ralados",
              "1 colher (chá) de gengibre ralado",
              "1 colher (chá) de páprica doce",
              "1 colher (chá) de cominho em pó",
              "½ colher (chá) de cúrcuma",
              "Suco e raspas de ½ limão",
              "1 colher (chá) de sal",
              "1 colher (sopa) de azeite",
            ]},
            { grupo: "Frango", itens: [
              "6 sobrecoxas com osso e pele",
            ]},
          ],
          preparo: [
            "Misture todos os ingredientes da marinada numa tigela.",
            "Faça 2 cortes rasos em cada sobrecoxa, do lado da pele, e envolva bem na marinada. Cubra e leve à geladeira por no mínimo 2 horas, idealmente de um dia para o outro.",
            "Retire o excesso de marinada e disponha as sobrecoxas com a pele para cima, sobre uma grade apoiada na assadeira (ou sobre papel-manteiga), bem espaçadas.",
            "<b>No forno:</b> asse a 220 °C por 35 a 40 minutos. Nos últimos 5 minutos, ligue o grill, se o seu forno tiver, para formar manchas tostadas.",
            "<b>Na airfryer:</b> 180 °C por 15 minutos, vire, e mais 8 a 10 minutos a 200 °C.",
            "Deixe descansar 5 minutos antes de servir.",
          ],
          dica: "O ácido suave do iogurte amacia a carne sem deixá-la farinhenta (como acontece com marinadas muito ácidas), e os açúcares do leite ajudam a dourar. Sirva com arroz, salada de pepino e um molho de iogurte com hortelã.",
        },
      ],
      pulo: {
        titulo: "Pele borrachuda e frango seco",
        erro: "Tirar o frango molhado da embalagem direto para a frigideira, mexer o tempo todo e cortar assim que sai do fogo. A pele cozinha no vapor e fica mole; a carne perde o suco na tábua.",
        tecnica: [
          "<b>Seque e salgue antes:</b> papel-toalha e, se der, sal com antecedência na geladeira, descoberto.",
          "<b>Pele para baixo e paciência:</b> fogo médio, peso por cima e nada de mexer até ela soltar sozinha da frigideira.",
          "<b>Ponto pela temperatura:</b> sobrecoxa fica melhor entre 75 °C e 80 °C. Um termômetro culinário custa menos que uma pizza e acaba com o achismo.",
          "<b>Descanso:</b> 5 minutos antes de cortar, para os sucos se redistribuírem.",
        ],
      },
      substituicoes: [
        ["Sobrecoxa", "Coxa (aumente um pouco o tempo) ou peito (reduza bastante o tempo e retire do fogo a 65 °C: ele resseca fácil)."],
        ["Iogurte natural", "Coalhada seca, ou leite com suco de limão descansado por 10 minutos."],
        ["Caldo de frango", "Água com as aparas e um ramo de cheiro-verde."],
        ["Tomate fresco", "Tomate pelado em lata ou passata."],
        ["Manteiga gelada no molho", "Azeite (o molho fica mais fino, mas igualmente saboroso)."],
        ["Cúrcuma", "Uma pitada de açafrão-da-terra ou de curry."],
      ],
      aproveita: [
        {
          nome: "Ossos e aparas: fundo caseiro ultra-aromático",
          texto: "Junte os ossos, peles e aparas de 6 a 8 sobrecoxas (pode ir guardando no freezer). Para um caldo mais escuro e intenso, asse os ossos antes a 200 °C por 30 minutos. Coloque numa panela com 1 cebola cortada ao meio com casca, 1 cenoura com casca, talos de salsinha, 1 folha de louro, 6 grãos de pimenta e 2 litros de água fria.",
        },
        {
          nome: "O ponto do caldo",
          texto: "Leve ao fogo baixo e nunca deixe ferver forte: a fervura turva o caldo. Retire a espuma que subir. Cozinhe por 2 a 3 horas, coe e leve à geladeira. A gordura endurece por cima: retire e guarde, ela é ótima para refogar. Congele o caldo em forminhas de gelo por até 3 meses e use um cubo para enriquecer arroz, feijão, molhos e sopas, como o caldo de mandioca do próximo capítulo. É o seu caldo caseiro, sem cubinhos industrializados.",
        },
      ],
    },

    // ───────────────────────────── 4. MANDIOCA
    {
      nome: "Mandioca",
      apelido: "aipim, macaxeira",
      cor: "#7D6247",
      icone: "mandioca",
      porQue: "A raiz do Brasil: rica em amido, acessível e um coringa técnico. Une sustentabilidade e brasilidade num ingrediente só.",
      ingrediente: [
        "Poucos ingredientes são tão brasileiros e tão subestimados. A mandioca costuma ficar presa a dois papéis: cozida na manteiga ou frita como acompanhamento.",
        "Mas é justamente o amido dela que a torna um coringa técnico. Ralada crua, ela se une sozinha e fica crocante na frigideira. Cozida e batida, vira um creme aveludado sem precisar de creme de leite. Misturada com queijo, vira biscoito.",
        "Um aviso importante: a mandioca vendida no mercado e na feira é a mandioca mansa, de mesa. Mesmo assim, ela deve ser sempre bem cozida antes de comer. Nunca consuma mandioca crua.",
      ],
      antes: {
        escolha: [
          "Casca marrom, que se solta com facilidade, e ponta que estala ao quebrar.",
          "Polpa branca ou amarelada, uniforme, sem estrias escuras, azuladas ou pontos moles.",
          "Raízes médias costumam ser mais macias que as muito grossas.",
          "Mandioca boa cozinha rápido. Se demorar demais, o problema é a raiz, não você.",
        ],
        armazenamento: [
          "Com casca, fora da geladeira, ela estraga em 2 ou 3 dias.",
          "O melhor caminho: descasque, lave, corte em pedaços e congele crua em sacos por até 3 meses. Ela cozinha ainda melhor depois de congelada.",
          "Cozida: na geladeira por até 3 dias, coberta pela própria água do cozimento.",
        ],
        cortes: [
          "Corte em toras de 8 a 10 cm. Faça um talho no comprimento e solte a casca marrom junto com a entrecasca rosada, de uma vez.",
          "Depois de cozida, abra ao meio e retire o fio central, que é fibroso.",
          "Corte sempre em pedaços de tamanho parecido, para tudo cozinhar por igual.",
        ],
      },
      receitas: [
        {
          rotulo: "A Crocância Perfeita",
          nome: "Rösti de mandioca recheado na frigideira",
          subtitulo: "crosta dourada por fora, cremoso por dentro",
          rende: "1 rösti grande (2 a 4 porções)", tempo: "45 min",
          ingredientes: [
            { grupo: "Massa", itens: [
              "500 g de mandioca crua descascada",
              "Sal e pimenta-do-reino",
              "3 colheres (sopa) de manteiga (ou metade manteiga, metade óleo)",
            ]},
            { grupo: "Recheio (escolha um)", itens: [
              "150 g de carne-seca dessalgada, cozida e desfiada, refogada com cebola",
              "ou 150 g de muçarela com 3 colheres (sopa) de requeijão cremoso",
            ]},
          ],
          preparo: [
            "Rale a mandioca crua no lado grosso do ralador.",
            "Coloque num pano de prato limpo e torça com força para retirar o máximo de líquido. Descarte o líquido. <b>Este é o passo que garante a crocância.</b>",
            "Tempere a mandioca ralada com sal e pimenta.",
            "Aqueça metade da manteiga numa frigideira antiaderente de 20 a 22 cm, em fogo médio. Espalhe metade da mandioca, pressionando com uma espátula para formar uma base compacta.",
            "Distribua o recheio, deixando 1 cm livre na borda. Cubra com o restante da mandioca, pressione e feche bem as bordas.",
            "Tampe e cozinhe em fogo médio-baixo por 12 a 15 minutos, até a base ficar dourada e firme (dá para levantar a borda com a espátula para conferir).",
            "Deslize o rösti para um prato, cubra com outro prato, vire e devolva à frigideira com o restante da manteiga. Cozinhe destampado por mais 12 a 15 minutos, até dourar.",
          ],
          dica: "Fogo alto doura por fora e deixa a mandioca crua por dentro. O segredo é fogo médio-baixo e tempo: por fora ela fica dourada, por dentro, cremosa.",
        },
        {
          rotulo: "A Culinária Acolhedora",
          nome: "Caldo aveludado de mandioca com gengibre e bacon (ou cogumelos)",
          subtitulo: "abraço em forma de prato",
          rende: "4 a 6 porções", tempo: "45 min (ou 25 min na pressão)",
          ingredientes: [
            { itens: [
              "800 g de mandioca descascada, em pedaços",
              "150 g de bacon em cubinhos (ou 200 g de cogumelos fatiados, na versão vegetariana)",
              "1 cebola picada",
              "3 dentes de alho picados",
              "1 colher (sopa) de gengibre fresco ralado",
              "1,2 litro de caldo de frango (capítulo 3) ou de legumes",
              "Sal, pimenta-do-reino e algumas gotas de limão",
              "Cebolinha picada e azeite para finalizar",
            ]},
          ],
          preparo: [
            "Numa panela, doure o bacon em fogo médio até ficar crocante. Retire com escumadeira e reserve, deixando a gordura na panela. (Na versão com cogumelos, doure-os em 1 colher de manteiga e reserve.)",
            "Na mesma panela, refogue a cebola até ficar transparente. Junte o alho e o gengibre e refogue por 1 minuto.",
            "Acrescente a mandioca e o caldo. Cozinhe tampado até a mandioca começar a desmanchar: 25 a 30 minutos na panela comum ou 12 minutos na pressão.",
            "Retire os fios centrais da mandioca. Bata no liquidificador, em levas e com a tampa entreaberta coberta por um pano (o vapor empurra a tampa). Bata só até ficar liso.",
            "Volte à panela, ajuste a consistência com mais caldo, se precisar, e tempere com sal, pimenta e gotas de limão.",
            "Sirva com o bacon (ou os cogumelos) crocante por cima, cebolinha e um fio de azeite.",
          ],
          dica: "O gengibre e as gotas de limão no final são o que tiram o caldo do “pesado” e levam ao “aconchegante”. A crocância por cima faz contraste com o creme.",
        },
        {
          rotulo: "A Surpresa",
          nome: "Biscoito de polvilho e mandioca de assadeira",
          subtitulo: "rápido para o lanche da tarde",
          rende: "cerca de 30 biscoitos", tempo: "50 min",
          ingredientes: [
            { itens: [
              "300 g de mandioca cozida, sem os fios, amassada ainda quente",
              "120 g de polvilho azedo",
              "80 g de queijo meia-cura ou parmesão ralado",
              "1 ovo",
              "3 colheres (sopa) de óleo",
              "1 colher (chá) rasa de sal",
              "Leite, se precisar",
            ]},
          ],
          preparo: [
            "Preaqueça o forno a 200 °C e forre uma assadeira com papel-manteiga.",
            "Amasse a mandioca ainda quente até virar um purê liso. Junte o óleo e o sal e misture.",
            "Acrescente o polvilho e misture bem (o calor da mandioca escalda o polvilho e deixa a massa elástica).",
            "Junte o ovo e o queijo e amasse até formar uma massa macia que não grude nas mãos. Se ficar seca, pingue leite, uma colher por vez.",
            "Modele palitos de 8 cm ou bolinhas e disponha na assadeira com espaço entre eles.",
            "Asse por 25 a 30 minutos, até dourarem. Não abra o forno nos primeiros 15 minutos.",
          ],
          dica: "É um ótimo destino para a mandioca que sobrou do almoço. A massa crua pode ser congelada já modelada e assada direto do freezer (acrescente 5 a 10 minutos).",
        },
      ],
      pulo: {
        titulo: "Mandioca que não cozinha (ou que desmancha o rösti)",
        erro: "Comprar sem critério, cortar em pedaços de tamanhos diferentes e insistir no fogo por horas. E, no rösti, ralar e levar direto para a frigideira, com toda a água da raiz.",
        tecnica: [
          "<b>Escolha bem:</b> ponta que estala e polpa uniforme. Raiz velha ou fibrosa não amolece, não importa o tempo.",
          "<b>Congele crua:</b> os cristais de gelo rompem as fibras e ela cozinha mais rápido e fica mais macia.",
          "<b>Pedaços iguais</b> e panela de pressão quando a pressa bater.",
          "<b>Esprema a mandioca ralada</b> no pano: menos água, mais crocância e um rösti que não desmancha.",
          "<b>Não amoleceu?</b> Não jogue fora: ela ainda serve para o caldo batido.",
        ],
      },
      substituicoes: [
        ["Mandioca fresca", "Mandioca congelada já descascada (funciona muito bem nas três receitas)."],
        ["Bacon", "Linguiça calabresa em cubinhos ou cogumelos dourados."],
        ["Polvilho azedo", "Polvilho doce (o biscoito fica menos aerado e mais macio)."],
        ["Queijo meia-cura", "Parmesão ou queijo canastra."],
        ["Gengibre fresco", "Pimenta-do-reino moída na hora e raspas de limão."],
        ["Carne-seca", "Frango desfiado (capítulo 3) ou linguiça refogada."],
      ],
      aproveita: [
        {
          nome: "Água do cozimento, rica em amido",
          texto: "A água em que a mandioca cozinhou fica rica em amido. Guarde (na geladeira por até 2 dias) e use para dar ponto e cremosidade a molhos, ensopados e ao próprio caldo, no lugar da água ou de parte do creme de leite.",
        },
        {
          nome: "“Fariña” crocante de frigideira com as aparas",
          texto: "Pontas, pedaços quebrados e sobras de mandioca já cozida viram crocância. Rale fino e espalhe numa frigideira com 1 colher de manteiga. Toste em fogo médio, mexendo de vez em quando, até ficar dourada e soltinha. Tempere com sal e use como uma farofa fresca sobre o caldo, saladas, feijão ou ovos.",
        },
        {
          nome: "E as cascas?",
          texto: "As cascas da mandioca não são comestíveis. Mande para a compostagem.",
        },
      ],
    },

    // ───────────────────────────── 5. CENOURA
    {
      nome: "Cenoura",
      apelido: "da raiz à rama",
      cor: "#D0592A",
      icone: "cenoura",
      porQue: "Está em quase toda geladeira, mas costuma ficar presa à salada ralada ou ao bolo de sempre. Aqui ela vira protagonista.",
      ingrediente: [
        "A cenoura está em quase todo refogado, quase toda salada e quase todo lanche da tarde. E quase sempre como coadjuvante.",
        "Ela tem açúcar natural de sobra e, quando encontra calor seco, carameliza e ganha um sabor profundo, quase de castanha. Ralada e bem refogada, vira a base de um hambúrguer. E, num bolo, ela é que garante a umidade.",
        "Nada se perde: a casca é fina e comestível, e a rama, aquelas folhas que quase sempre vão para o lixo, é um tempero fresco e potente.",
      ],
      antes: {
        escolha: [
          "Firme, lisa, de cor laranja intensa, sem rachaduras nem brotos.",
          "Evite cenouras moles ou com a parte de cima esverdeada.",
          "Se encontrar com rama, compre: rama verde e viçosa é sinal de cenoura fresca, e ainda vira pesto.",
        ],
        armazenamento: [
          "Separe a rama assim que chegar em casa: ela puxa a umidade da raiz.",
          "Raiz: em pote fechado com papel-toalha, na geladeira, por 3 a 4 semanas.",
          "Rama: lavada, bem seca e enrolada em papel-toalha, por 3 a 4 dias.",
        ],
        cortes: [
          "Não precisa descascar: escove bem sob água corrente. Se descascar, guarde as cascas.",
          "Rodelas em diagonal têm mais superfície e caramelizam mais.",
          "Palitos e meia-lua para assar; ralada fina para bolinhos; em fitas (com o descascador) para saladas cruas.",
        ],
      },
      receitas: [
        {
          rotulo: "O Assado Intenso",
          nome: "Cenouras assadas inteiras, caramelizadas no mel ou melaço com azeite e tomilho",
          subtitulo: "doçura natural levada ao máximo",
          rende: "4 porções", tempo: "45 min",
          ingredientes: [
            { itens: [
              "8 cenouras médias (cerca de 600 g)",
              "3 colheres (sopa) de azeite",
              "2 colheres (sopa) de mel (ou melaço)",
              "4 ramos de tomilho fresco",
              "Sal grosso e pimenta-do-reino",
              "1 colher (sopa) de vinagre de maçã ou suco de limão",
              "Opcional: iogurte temperado com sal e limão, e amendoim picado",
            ]},
          ],
          preparo: [
            "Preaqueça o forno a 220 °C. Escove bem as cenouras. Se forem grossas, corte ao meio no sentido do comprimento.",
            "Numa assadeira grande, envolva as cenouras com o azeite, sal e pimenta. Deixe espaço entre elas: amontoadas, cozinham no vapor e não caramelizam.",
            "Asse por 25 minutos, até começarem a dourar.",
            "Regue com o mel, junte o tomilho, chacoalhe a assadeira e volte ao forno por mais 10 a 15 minutos, até as pontas tostarem e o mel virar uma camada brilhante.",
            "Retire do forno e regue com o vinagre ou limão ainda quente.",
            "Sirva sobre o iogurte, com amendoim picado por cima.",
          ],
          dica: "O mel entra só no final: se for desde o início, queima antes de a cenoura ficar macia. O toque ácido no final equilibra o doce e acende todos os sabores.",
        },
        {
          rotulo: "O Prato Principal",
          nome: "Hambúrguer rústico ou bolinho de cenoura com aveia e especiarias",
          subtitulo: "saboroso e nutritivo",
          rende: "6 hambúrgueres", tempo: "45 min (mais 20 min de geladeira)",
          ingredientes: [
            { itens: [
              "3 cenouras médias raladas (cerca de 300 g)",
              "1 cebola pequena picada",
              "2 dentes de alho picados",
              "1 colher (chá) de cominho em pó",
              "½ colher (chá) de páprica defumada",
              "1 xícara (90 g) de aveia em flocos",
              "1 ovo",
              "50 g de queijo ralado (opcional)",
              "2 colheres (sopa) de cheiro-verde picado",
              "Sal, pimenta e azeite",
            ]},
          ],
          preparo: [
            "Numa frigideira com um fio de azeite, refogue a cebola e o alho. Junte a cenoura ralada, o cominho e a páprica e refogue por cerca de 8 minutos, até a cenoura murchar e perder a água.",
            "Transfira para uma tigela e deixe amornar.",
            "Junte a aveia, o ovo, o queijo e o cheiro-verde. Tempere com sal e pimenta e misture bem.",
            "Deixe a massa descansar por 15 minutos, para a aveia hidratar e dar liga.",
            "Modele 6 hambúrgueres com as mãos úmidas e leve à geladeira por 20 minutos.",
            "Doure numa frigideira com azeite, em fogo médio, por 4 minutos de cada lado, virando com cuidado. Ou asse a 200 °C por 20 minutos, virando na metade.",
          ],
          dica: "Refogar a cenoura antes é o passo que separa um hambúrguer firme e saboroso de um que desmancha na frigideira. Sirva no pão com o pesto de rama (página “Aproveita Isso Também”).",
        },
        {
          rotulo: "A Sobremesa de Respeito",
          nome: "Bolo de cenoura da vovó com técnica de chef e calda de chocolate espelhada",
          subtitulo: "massa fofíssima que não sola",
          rende: "1 assadeira de 20 × 30 cm", tempo: "1h10",
          ingredientes: [
            { grupo: "Massa", itens: [
              "3 cenouras médias (cerca de 300 g), em rodelas",
              "4 ovos",
              "240 ml de óleo",
              "300 g de açúcar",
              "300 g de farinha de trigo, peneirada",
              "1 colher (sopa) de fermento químico em pó",
              "1 pitada de sal",
            ]},
            { grupo: "Calda espelhada", itens: [
              "150 g de chocolate meio amargo picado",
              "1 caixinha (200 g) de creme de leite",
              "1 colher (sopa) de mel",
              "1 colher (sopa) de manteiga",
            ]},
          ],
          preparo: [
            "Preaqueça o forno a 180 °C e unte e enfarinhe a assadeira.",
            "No liquidificador, bata a cenoura, os ovos, o óleo, o açúcar e o sal por 3 a 4 minutos, até ficar um creme bem liso e claro.",
            "Despeje numa tigela. Junte a farinha peneirada em três partes, misturando com um fouet ou espátula <b>só até sumir</b>. Por último, incorpore o fermento delicadamente.",
            "Asse por 35 a 40 minutos, até o palito sair limpo. Não abra o forno nos primeiros 25 minutos.",
            "<b>Calda:</b> aqueça o creme de leite até quase ferver e despeje sobre o chocolate picado. Espere 1 minuto e mexa do centro para fora até ficar liso. Junte o mel e a manteiga.",
            "Com o bolo morno, despeje a calda de uma vez no centro e deixe que ela escorra sozinha, espalhando o mínimo possível, para manter o brilho.",
          ],
          dica: "Bolo que sola tem três culpados: farinha batida demais, fermento misturado com força e forno aberto cedo. Por isso o liquidificador cuida só da emulsão (cenoura, ovos e óleo), a farinha entra à mão, o fermento vai por último e o forno fica fechado nos primeiros 25 minutos. O mel na calda é o que dá o efeito espelhado.",
        },
      ],
      pulo: {
        titulo: "Cenoura cozida na água, sem graça",
        erro: "Cozinhar a cenoura em muita água e escorrer. O açúcar e o sabor dela vão embora pelo ralo da pia, junto com a água.",
        tecnica: [
          "<b>Glaçagem, a técnica do chef:</b> cenoura em rodelas numa frigideira, água só até a metade da altura, 1 colher de manteiga, 1 pitada de açúcar e outra de sal.",
          "<b>Fogo médio e panela destampada:</b> a cenoura cozinha enquanto a água evapora.",
          "<b>Quando a água secar</b>, a manteiga e o açúcar viram uma película brilhante que envolve cada rodela. Mexa por 1 minuto e pronto.",
          "<b>Resultado:</b> cenoura macia, brilhante e com todo o sabor dentro dela, não na água.",
        ],
      },
      substituicoes: [
        ["Mel", "Melaço, xarope de bordo ou 1 colher de açúcar mascavo."],
        ["Tomilho fresco", "Alecrim, orégano fresco ou ½ colher (chá) de tomilho seco."],
        ["Aveia em flocos", "Farinha de rosca ou farinha de mandioca fina."],
        ["Chocolate meio amargo", "Chocolate ao leite com 1 colher (sopa) de cacau em pó."],
        ["Creme de leite", "Leite integral (a calda fica mais fina)."],
        ["Amendoim (no pesto)", "Castanha-de-caju, castanha-do-pará ou sementes de girassol."],
      ],
      aproveita: [
        {
          nome: "Cascas: chips assados",
          texto: "Se descascar as cenouras, guarde as cascas. Seque bem, misture com um fio de azeite, sal e uma pitada de cominho e espalhe sem amontoar. Leve à airfryer a 170 °C por 6 a 8 minutos ou ao forno a 150 °C por 15 a 20 minutos, de olho: elas são finas e passam do ponto rápido.",
        },
        {
          nome: "Ramas (folhas): pesto com amendoim ou castanha",
          texto: "Separe as folhas e os talos finos de 1 maço de rama (cerca de 60 g). Mergulhe por 10 segundos em água fervente e depois em água com gelo: isso fixa a cor e suaviza o amargor. Esprema bem. Bata no processador ou pilão com 50 g de amendoim torrado sem sal, 1 dente de alho, 40 g de parmesão, suco de ½ limão e sal, acrescentando cerca de 120 ml de azeite aos poucos. Use em massas, no hambúrguer de cenoura, sobre as cenouras assadas ou no pão. Dura 5 dias na geladeira, coberto por uma camada de azeite.",
        },
      ],
    },
  ],

  pulos: [
    { titulo: "Seque antes de dourar", texto: "Umidade é inimiga da crosta. Carne, frango, legumes: tudo passa pelo papel-toalha antes de ir para a frigideira. Enquanto houver água, a comida cozinha no vapor em vez de dourar." },
    { titulo: "Frigideira quente de verdade", texto: "Espere a frigideira aquecer antes de colocar a gordura e a gordura brilhar antes de colocar o alimento. Uma gota de água deve chiar e evaporar na hora." },
    { titulo: "Não lote a panela", texto: "Comida amontoada solta líquido e esfria a panela. Deixe espaço entre os pedaços e, se precisar, trabalhe em levas. É mais rápido do que parece." },
    { titulo: "Não mexa: deixe a crosta se formar", texto: "Selar não “fecha os sucos”, como se dizia. Selar cria sabor. E a crosta só se forma se você deixar o alimento quieto. Quando estiver pronto para virar, ele solta sozinho da frigideira." },
    { titulo: "Sal com antecedência e em camadas", texto: "Salgar carnes com horas de antecedência tempera por dentro. Nas preparações, tempere um pouco em cada etapa, em vez de tudo no final. E sempre prove antes de acrescentar mais." },
    { titulo: "Acidez no final", texto: "Algumas gotas de limão ou vinagre no final acordam um prato “sem graça” muitas vezes melhor do que mais sal. Antes de salgar de novo, experimente acidez." },
    { titulo: "Respeite o descanso", texto: "Carnes descansam antes de cortar; massas descansam antes de modelar; bolos descansam antes de desenformar. Esperar 5 minutos também é técnica." },
    { titulo: "O fundo da panela é ouro", texto: "Aquele grudado escuro no fundo da frigideira é sabor concentrado. Solte com um pouco de água, caldo ou vinho (deglaçar) e você terá um molho em 2 minutos." },
    { titulo: "Contraste de texturas", texto: "Todo prato memorável tem algo cremoso e algo crocante. Sementes tostadas, farofa, chips de casca e pele crocante existem para isso." },
    { titulo: "Organize antes de ligar o fogo", texto: "Leia a receita inteira, separe, corte e meça tudo antes de começar (é o que os chefs chamam de mise en place). Cozinhar fica mais calmo, e o fogo nunca espera por você." },
  ],

  encerramento: [
    "Se você chegou até aqui, já percebeu: não foram 15 receitas novas. Foram 5 ingredientes que você já conhecia, olhados de outro jeito.",
    "Agora o convite é levar esse olhar para o resto da sua cozinha. Antes de cozinhar qualquer coisa, pergunte: como escolher, como guardar, como cortar? Que técnica muda o resultado? E o que dá para aproveitar da casca, do talo, do osso?",
    "Cozinhe com afeto, com técnica e sem desperdício. Esse é o Jeito Mamede.",
  ],
};
