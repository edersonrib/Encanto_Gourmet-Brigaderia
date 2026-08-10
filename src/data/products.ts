import { BrigadeiroProduct, Testimonial, InstagramPost } from '../types';

export const BRIGADEIRO_PRODUCTS: BrigadeiroProduct[] = [
  {
    id: 'belga-tradicional',
    name: 'Brigadeiro Belga Tradicional',
    tag: 'O Clássico Incomparável',
    description: 'Aveludado brigadeiro de cacau nobre envolto em granulados de chocolate ao leite Callebaut 33.6%. Cremoso e nostálgico.',
    priceNote: 'A partir de R$ 5,00/unid (Caixas de 4, 9, 16 ou 25)',
    unitPriceEstimate: 5.00,
    image: '/src/assets/images/encanto_hero_brigadeiros_1786355634397.jpg',
    badge: 'Mais Pedido',
    ingredients: 'Leite condensado artesanal, manteiga extra, Chocolate Ao Leite Callebaut.',
    flavorCategory: 'tradicionais'
  },
  {
    id: 'pistache-aveludado',
    name: 'Brigadeiro de Pistache Aveludado',
    tag: 'Sofisticação Italiana',
    description: 'Brigadeiro de chocolate branco puro infusado com pasta de pistache puro e coberto com lâminas de pistache siciliano tostado.',
    priceNote: 'A partir de R$ 6,50/unid (Sob encomenda)',
    unitPriceEstimate: 6.50,
    image: '/src/assets/images/encanto_about_craft_1786355649467.jpg',
    badge: 'Assinatura',
    ingredients: 'Pistache italiano 100% puro, chocolate branco nobre e flor de sal.',
    flavorCategory: 'gourmet_intenso'
  },
  {
    id: 'intense-dark',
    name: 'Brigadeiro Intense Dark 70%',
    tag: 'Para Apreciadores de Cacau',
    description: 'Gourmet de chocolate amargo 70% cacau com toque de baunilha de Madagascar e finalizado com cacau em pó holandês velvet.',
    priceNote: 'A partir de R$ 5,50/unid',
    unitPriceEstimate: 5.50,
    image: '/src/assets/images/encanto_hero_brigadeiros_1786355634397.jpg',
    badge: 'Cacau Premium',
    ingredients: 'Cacau 70% amargo, cacau velvet em pó e manteiga de cacau.',
    flavorCategory: 'gourmet_intenso'
  },
  {
    id: 'ninho-nutella',
    name: 'Brigadeiro Ninho com Nutella',
    tag: 'Combinação Irresistível',
    description: 'Massa cremosa de Leite Ninho puro com recheio generoso e aveludado de Nutella original. Suavidade em cada mordida.',
    priceNote: 'A partir de R$ 6,00/unid',
    unitPriceEstimate: 6.00,
    image: '/src/assets/images/encanto_gift_box_1786355662704.jpg',
    badge: 'Favorito',
    ingredients: 'Leite Ninho, Nutella original, Leite condensado gourmet.',
    flavorCategory: 'tradicionais'
  },
  {
    id: 'churros-doce-de-leite',
    name: 'Brigadeiro Doce de Leite & Churros',
    tag: 'Sabor Aconchegante',
    description: 'Massa delicada com toque de canela do Ceilão, passado em açúcar refinado e recheado com Doce de Leite artesanal cremoso.',
    priceNote: 'A partir de R$ 5,50/unid',
    unitPriceEstimate: 5.50,
    image: '/src/assets/images/encanto_about_craft_1786355649467.jpg',
    badge: 'Artesanal',
    ingredients: 'Doce de leite cozido lentamente, canela pura, leite condensado.',
    flavorCategory: 'crocantes'
  },
  {
    id: 'amendoa-baunilha',
    name: 'Brigadeiro de Amêndoa com Baunilha',
    tag: 'Crocância Elegante',
    description: 'Chocolate branco gourmet com fava de baunilha natural de Madagascar e crosta de lâminas de amêndoas levemente douradas.',
    priceNote: 'A partir de R$ 6,00/unid',
    unitPriceEstimate: 6.00,
    image: '/src/assets/images/encanto_gift_box_1786355662704.jpg',
    badge: 'Especial',
    ingredients: 'Fava de baunilha, amêndoas tostadas, chocolate branco Callebaut.',
    flavorCategory: 'crocantes'
  },
  {
    id: 'frutas-vermelhas-ruby',
    name: 'Brigadeiro Frutas Vermelhas & Ruby',
    tag: 'Delicadeza Frutada',
    description: 'Brigadeiro levemente ácido infusado com redução artesanal de amoras e framboesas, finalizado com pérolas de chocolate Ruby.',
    priceNote: 'A partir de R$ 6,50/unid',
    unitPriceEstimate: 6.50,
    image: '/src/assets/images/encanto_event_table_1786355675509.jpg',
    badge: 'Edição Delicada',
    ingredients: 'Redução natural de framboesa, morango, mirtilo e chocolate Ruby.',
    flavorCategory: 'frutados_especiais'
  },
  {
    id: 'cafe-flor-de-sal',
    name: 'Brigadeiro de Café Express & Flor de Sal',
    tag: 'Equilíbrio Gastronômico',
    description: 'Base de chocolate 54% com infusão de grãos de café espresso especial e um toque sutil de flor de sal no topo.',
    priceNote: 'A partir de R$ 5,50/unid',
    unitPriceEstimate: 5.50,
    image: '/src/assets/images/encanto_hero_brigadeiros_1786355634397.jpg',
    badge: 'Harmonioso',
    ingredients: 'Café gourmet 100% arábica, chocolate meio amargo e flor de sal.',
    flavorCategory: 'gourmet_intenso'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: '[Nome do Cliente - Exemplo]',
    eventType: 'Aniversário de Casamento',
    quote: '"[Depoimento real de cliente: Os brigadeiros da Encanto Gourmet foram o grande destaque da nossa celebração. A apresentação das caixas e a cremosidade do brigadeiro de pistache deixaram todos os convidados maravilhados!]"',
    rating: 5,
    date: 'Recentemente'
  },
  {
    id: '2',
    author: '[Nome do Cliente - Exemplo]',
    eventType: 'Evento Corporativo',
    quote: '"[Depoimento real de cliente: Encomendamos as caixas presenteáveis para nossos clientes VIPs no final do ano. A elegância da embalagem e o sabor impecável transmitiram exatamente o carinho e o luxo que queríamos.]"',
    rating: 5,
    date: 'Recentemente'
  },
  {
    id: '3',
    author: '[Nome do Cliente - Exemplo]',
    eventType: 'Chá de Bebê',
    quote: '"[Depoimento real de cliente: Cada detalhe dos brigadeiros mostrou o cuidado e o amor com que foram feitos. O brigadeiro belga tradicional é incomparável, derrete na boca!]"',
    rating: 5,
    date: 'Recentemente'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    imageUrl: '/src/assets/images/encanto_hero_brigadeiros_1786355634397.jpg',
    caption: 'Detalhes que encantam a alma e o paladar. Nosso brigadeiro Belga Tradicional com flocos de chocolate nobre. ✨',
    likes: '248',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  },
  {
    id: 'post-2',
    imageUrl: '/src/assets/images/encanto_gift_box_1786355662704.jpg',
    caption: 'Caixa de presentes artesanais pronta para surpreender em uma data inesquecível. Quem gostaria de receber essa caixa? 🎁',
    likes: '312',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  },
  {
    id: 'post-3',
    imageUrl: '/src/assets/images/encanto_about_craft_1786355649467.jpg',
    caption: 'O segredo do nosso brigadeiro de pistache: pasta 100% pura e carinho em cada etapa artesanal. 💚',
    likes: '195',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  },
  {
    id: 'post-4',
    imageUrl: '/src/assets/images/encanto_event_table_1786355675509.jpg',
    caption: 'Mesa de doces montada para um casamento inesquecível. O encanto dos brigadeiros gourmet em cada celebração. 🕊️',
    likes: '420',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  },
  {
    id: 'post-5',
    imageUrl: '/src/assets/images/encanto_hero_brigadeiros_1786355634397.jpg',
    caption: 'Textura cremosa, brilho natural e aroma incomparável. Um verdadeiro momento de indulgência.',
    likes: '280',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  },
  {
    id: 'post-6',
    imageUrl: '/src/assets/images/encanto_gift_box_1786355662704.jpg',
    caption: 'A doçura perfeita para adoçar a sua semana. Qual o seu sabor favorito da Encanto Gourmet?',
    likes: '341',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  }
];

export const INSTAGRAM_HANDLE = '@encantogourmet_brigadeiria';
export const INSTAGRAM_URL = 'https://www.instagram.com/encantogourmet_brigadeiria/';
export const WHATSAPP_NUMBER_PLACEHOLDER = '5500000000000'; // Placeholder to be customized by brand owner
