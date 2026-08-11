import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { BrigadeiroProduct, DatabaseProductRow } from '../types';
import { BRIGADEIRO_PRODUCTS } from '../data/products';
import { deleteProductImage } from './storage';

// Helper to convert DB row to BrigadeiroProduct interface
export const mapDbRowToProduct = (row: DatabaseProductRow): BrigadeiroProduct => {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug || row.id,
    tag: row.tag || 'Sabor Especial',
    description: row.description || '',
    price: Number(row.price) || 0,
    priceNote: row.price_note || (row.price ? `€ ${Number(row.price).toFixed(2)}/unid` : 'Sob consulta'),
    unitPriceEstimate: Number(row.price) || 5.0,
    image: row.image_url || '/src/assets/images/encanto_hero_brigadeiros_1786355634397.jpg',
    image_path: row.image_path,
    badge: row.badge,
    ingredients: row.ingredients || 'Ingredientes selecionados e cacau nobre.',
    flavorCategory: row.category || 'tradicionais',
    featured: Boolean(row.featured),
    active: Boolean(row.active),
    display_order: row.display_order ?? 0,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
};

// Helper to convert BrigadeiroProduct to DB row payload
export const mapProductToDbPayload = (product: Partial<BrigadeiroProduct>) => {
  return {
    name: product.name,
    slug: product.slug || (product.name ? product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : `produto-${Date.now()}`),
    description: product.description || '',
    price: product.price ?? product.unitPriceEstimate ?? 5.0,
    image_url: product.image,
    image_path: product.image_path || null,
    category: product.flavorCategory || 'tradicionais',
    badge: product.badge || null,
    ingredients: product.ingredients || '',
    price_note: product.priceNote || null,
    tag: product.tag || 'Sabor Gourmet',
    featured: product.featured ?? false,
    active: product.active ?? true,
    display_order: product.display_order ?? 0,
    updated_at: new Date().toISOString(),
  };
};

// Fetch active products for the Landing Page
export const fetchActiveProducts = async (): Promise<BrigadeiroProduct[]> => {
  if (!isSupabaseConfigured()) {
    return BRIGADEIRO_PRODUCTS;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch active products warning:', error.message);
      return BRIGADEIRO_PRODUCTS;
    }

    if (!data || data.length === 0) {
      return BRIGADEIRO_PRODUCTS;
    }

    return data.map(mapDbRowToProduct);
  } catch (err) {
    console.error('Error fetching products from Supabase:', err);
    return BRIGADEIRO_PRODUCTS;
  }
};

// Fetch all products for Admin CMS
export const fetchAllProductsAdmin = async (): Promise<BrigadeiroProduct[]> => {
  if (!isSupabaseConfigured()) {
    // Return mock local products if Supabase isn't configured yet
    return BRIGADEIRO_PRODUCTS.map((p, idx) => ({
      ...p,
      active: true,
      featured: p.badge ? true : false,
      display_order: idx + 1,
    }));
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Erro ao buscar produtos: ${error.message}`);
  }

  return (data || []).map(mapDbRowToProduct);
};

// Create Product
export const createProduct = async (productData: Partial<BrigadeiroProduct>): Promise<BrigadeiroProduct> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase não configurado. Adicione VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no Vercel ou .env');
  }

  const payload = mapProductToDbPayload(productData);
  const { data, error } = await supabase
    .from('products')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao criar produto: ${error.message}`);
  }

  return mapDbRowToProduct(data);
};

// Update Product
export const updateProduct = async (id: string, productData: Partial<BrigadeiroProduct>): Promise<BrigadeiroProduct> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase não configurado.');
  }

  const payload = mapProductToDbPayload(productData);
  const { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao atualizar produto: ${error.message}`);
  }

  return mapDbRowToProduct(data);
};

// Delete Product
export const deleteProduct = async (id: string, imagePath?: string): Promise<void> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase não configurado.');
  }

  // Delete product row first
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Erro ao apagar produto: ${error.message}`);
  }

  // Cleanup orphaned image in storage if path exists
  if (imagePath) {
    try {
      await deleteProductImage(imagePath);
    } catch (e) {
      console.warn('Incapaz de remover imagem antiga do storage:', e);
    }
  }
};

// Toggle Active Status
export const toggleProductActive = async (id: string, active: boolean): Promise<void> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase não configurado.');
  }

  const { error } = await supabase
    .from('products')
    .update({ active, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    throw new Error(`Erro ao alterar estado do produto: ${error.message}`);
  }
};
