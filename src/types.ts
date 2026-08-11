export interface BrigadeiroProduct {
  id: string;
  name: string;
  slug?: string;
  tag: string;
  description: string;
  price?: number; // numeric price
  priceNote?: string; // e.g. "Preço estimativo sob consulta ou caixa com 4/9/16 unid."
  unitPriceEstimate?: number; // e.g. 5.50
  image: string; // image_url
  image_path?: string; // Supabase storage path for deletion
  badge?: string;
  ingredients: string;
  flavorCategory: 'tradicionais' | 'gourmet_intenso' | 'frutados_especiais' | 'crocantes' | string;
  featured?: boolean;
  active?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseProductRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  image_path?: string;
  category: string;
  badge?: string;
  ingredients?: string;
  price_note?: string;
  tag?: string;
  featured: boolean;
  active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  created_at?: string;
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
