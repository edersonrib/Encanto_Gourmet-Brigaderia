import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UploadResult {
  publicUrl: string;
  imagePath: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const uploadProductImage = async (file: File, folderName: string = 'catalog'): Promise<UploadResult> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase não está configurado. Configure as variáveis de ambiente no .env');
  }

  // File size validation
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`O tamanho do arquivo (${(file.size / (1024 * 1024)).toFixed(1)} MB) excede o limite máximo permitido de 5 MB.`);
  }

  // MIME type validation
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error('Formato de arquivo inválido. Por favor, envie uma imagem no formato JPG, PNG ou WEBP.');
  }

  // Create clean filename with timestamp to avoid cache collision
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'webp';
  const cleanFolderName = folderName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'general';
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `${cleanFolderName}/${fileName}`;

  // Upload to bucket 'products'
  const { error: uploadError } = await supabase.storage
    .from('products')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(`Erro ao fazer upload da imagem para o Supabase Storage: ${uploadError.message}`);
  }

  // Get public URL
  const { data } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  if (!data?.publicUrl) {
    throw new Error('Não foi possível obter a URL pública da imagem enviada.');
  }

  return {
    publicUrl: data.publicUrl,
    imagePath: filePath,
  };
};

export const deleteProductImage = async (imagePath: string): Promise<void> => {
  if (!isSupabaseConfigured() || !imagePath) return;

  const { error } = await supabase.storage
    .from('products')
    .remove([imagePath]);

  if (error) {
    console.warn('Aviso ao remover imagem do Supabase Storage:', error.message);
  }
};
