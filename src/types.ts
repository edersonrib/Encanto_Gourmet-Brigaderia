export interface BrigadeiroProduct {
  id: string;
  name: string;
  tag: string;
  description: string;
  priceNote?: string; // e.g. "Preço estimativo sob consulta ou caixa com 4/9/16 unid."
  unitPriceEstimate?: number; // e.g. 5.50
  image: string;
  badge?: string;
  ingredients: string;
  flavorCategory: 'tradicionais' | 'gourmet_intenso' | 'frutados_especiais' | 'crocantes';
}

export interface CustomBoxFlavor {
  productId: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  author: string;
  eventType: string;
  quote: string;
  rating: number;
  date: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: string;
  url: string;
}

export interface EventInquiry {
  name: string;
  phone: string;
  eventType: string;
  eventDate: string;
  estimatedGuests: string;
  notes: string;
}
