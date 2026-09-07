import { BrigadeiroProduct, Testimonial, InstagramPost } from '../types';

/**
 * Base URL for brigadeiro product images.
 * By default, it points to local static assets in /images/brigadeiros/ (served from /public).
 * In the future, to use Supabase Storage, this constant can simply be updated to:
 * 'https://<your-project>.supabase.co/storage/v1/object/public/products'
 */
export const BRIGADEIRO_IMAGES_BASE_URL = '/images/brigadeiros';

/**
 * Fallback image when a product image fails to load or is not found.
 */
export const BRIGADEIRO_PLACEHOLDER_IMAGE = '/images/brigadeiros/placeholder-brigadeiro.webp';

/**
 * Resolves the full URL/path for a product image.
 * Supports:
 * - Direct HTTP/HTTPS URLs (Supabase Storage, Cloudinary, CDN)
 * - Absolute paths starting with '/'
 * - Simple filenames (e.g., 'brigadeiro-01.webp' -> '/images/brigadeiros/brigadeiro-01.webp')
 */
export const resolveProductImageUrl = (imagePathOrName?: string | null): string => {
  if (!imagePathOrName) {
    return BRIGADEIRO_PLACEHOLDER_IMAGE;
  }
  if (imagePathOrName.startsWith('http://') || imagePathOrName.startsWith('https://')) {
    return imagePathOrName;
  }
  if (imagePathOrName.startsWith('/')) {
    return imagePathOrName;
  }
  return `${BRIGADEIRO_IMAGES_BASE_URL}/${imagePathOrName}`;
};

export const BRIGADEIRO_PRODUCTS: BrigadeiroProduct[] = [
  {
    id: 'belga-tradicional',
    name: 'Brigadeiro Belga Tradicional',
    tag: 'O Clássico Incomparável',
    description: 'Aveludado brigadeiro de cacau nobre envolto em granulados de chocolate ao leite Callebaut 33.6%. Cremoso e nostálgico.',
    priceNote: 'A partir de R$ 5,00/unid (Caixas de 4, 9, 16 ou 25)',
    unitPriceEstimate: 5.00,
    image: '/images/brigadeiros/brigadeiro-01.webp',
    alt: 'Brigadeiro Gourmet Belga Tradicional enrolado à mão com confeitos de chocolate Callebaut',
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
    image: '/images/brigadeiros/brigadeiro-02.webp',
    alt: 'Brigadeiro Gourmet de Pistache Aveludado coberto com lâminas de pistache siciliano tostado',
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
    image: '/images/brigadeiros/brigadeiro-03.webp',
    alt: 'Brigadeiro Gourmet Intense Dark 70% cacau com finalização aveludada de cacau velvet',
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
    image: '/images/brigadeiros/brigadeiro-04.webp',
    alt: 'Brigadeiro Gourmet de Leite Ninho com recheio cremoso de Nutella original',
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
    image: '/images/brigadeiros/brigadeiro-05.webp',
    alt: 'Brigadeiro Gourmet de Doce de Leite artesanal com canela e sabor acolhedor de churros',
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
    image: '/images/brigadeiros/brigadeiro-06.webp',
    alt: 'Brigadeiro Gourmet de Amêndoa e baunilha com crosta de lâminas douradas crocantes',
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
    image: '/images/brigadeiros/brigadeiro-07.webp',
    alt: 'Brigadeiro Gourmet de Frutas Vermelhas com redução artesanal e pérolas de chocolate Ruby',
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
    image: '/images/brigadeiros/brigadeiro-08.webp',
    alt: 'Brigadeiro Gourmet de Café Espresso com infusão aromática e toque sutil de flor de sal',
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
    imageUrl: '/images/instagram/instagram-01.webp',
    caption: 'Detalhes que encantam a alma e o paladar. Nosso brigadeiro Belga Tradicional com flocos de chocolate nobre. ✨',
    likes: '248',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  },
  {
    id: 'post-2',
    imageUrl: '/images/instagram/instagram-02.webp',
    caption: 'Caixa de presentes artesanais pronta para surpreender em uma data inesquecível. Quem gostaria de receber essa caixa? 🎁',
    likes: '312',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  },
  {
    id: 'post-3',
    imageUrl: '/images/instagram/instagram-03.webp',
    caption: 'O segredo do nosso brigadeiro de pistache: pasta 100% pura e carinho em cada etapa artesanal. 💚',
    likes: '195',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  },
  {
    id: 'post-4',
    imageUrl: '/images/instagram/instagram-04.webp',
    caption: 'Mesa de doces montada para um casamento inesquecível. O encanto dos brigadeiros gourmet em cada celebração. 🕊️',
    likes: '420',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  },
  {
    id: 'post-5',
    imageUrl: '/images/instagram/instagram-05.webp',
    caption: 'Textura cremosa, brilho natural e aroma incomparável. Um verdadeiro momento de indulgência.',
    likes: '280',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  },
  {
    id: 'post-6',
    imageUrl: '/images/instagram/instagram-06.webp',
    caption: 'A doçura perfeita para adoçar a sua semana. Qual o seu sabor favorito da Encanto Gourmet?',
    likes: '341',
    url: 'https://www.instagram.com/encantogourmet_brigadeiria/'
  }
];

export const INSTAGRAM_HANDLE = '@encantogourmet_brigadeiria';
export const INSTAGRAM_URL = 'https://www.instagram.com/encantogourmet_brigadeiria/';
export const WHATSAPP_NUMBER_PLACEHOLDER = '351960158850';
export const WHATSAPP_DISPLAY_NUMBER = '+351 960 158 850';

