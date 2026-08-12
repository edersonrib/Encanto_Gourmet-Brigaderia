-- ==============================================================================
-- ENCANTO GOURMET - SCRIPT DE CONFIGURAÇÃO DO SUPABASE (DATABASE, STORAGE & RLS)
-- ==============================================================================
-- Execute este script no SQL Editor do seu Dashboard no Supabase
-- (Supabase Dashboard -> SQL Editor -> New Query -> Run)
-- ==============================================================================

-- 1. EXTENSÕES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABELA DE PERFIS DE USUÁRIO (PROFILES & ROLES)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Habilitar RLS na tabela de perfis
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Função helper SECURITY DEFINER para checar se o usuário é admin/editor sem causar recursão RLS
CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role IN ('admin', 'editor')
  );
END;
$$;

-- Remover políticas antigas se existirem para evitar conflitos
DROP POLICY IF EXISTS "Permitir leitura de perfil proprio ou por admins" ON public.profiles;

-- Politica para leitura de perfis sem recursão
CREATE POLICY "Permitir leitura de perfil proprio ou por admins"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id OR public.is_admin_or_editor()
  );

-- Trigger para criar perfil automaticamente na criação do usuário no Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'admin')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 3. TABELA DE PRODUTOS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 5.00,
  image_url TEXT NOT NULL,
  image_path TEXT,
  category TEXT NOT NULL DEFAULT 'tradicionais',
  badge TEXT,
  ingredients TEXT,
  price_note TEXT,
  tag TEXT DEFAULT 'Sabor Gourmet',
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now());
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- 4. POLÍTICAS DE SEGURANÇA (ROW LEVEL SECURITY - RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem para recriar de forma limpa
DROP POLICY IF EXISTS "Produtos ativos sao visiveis para todos" ON public.products;
DROP POLICY IF EXISTS "Somente administradores podem criar produtos" ON public.products;
DROP POLICY IF EXISTS "Somente administradores podem atualizar produtos" ON public.products;
DROP POLICY IF EXISTS "Somente administradores podem deletar produtos" ON public.products;

-- Visitantes e público geral podem visualizar produtos ativos; admins/editores veem todos
CREATE POLICY "Produtos ativos sao visiveis para todos"
  ON public.products
  FOR SELECT
  USING (
    active = true OR public.is_admin_or_editor()
  );

-- Somente Administradores/Editores autenticados podem INSERIR produtos
CREATE POLICY "Somente administradores podem criar produtos"
  ON public.products
  FOR INSERT
  WITH CHECK (
    public.is_admin_or_editor()
  );

-- Somente Administradores/Editores autenticados podem ATUALIZAR produtos
CREATE POLICY "Somente administradores podem atualizar produtos"
  ON public.products
  FOR UPDATE
  USING (
    public.is_admin_or_editor()
  );

-- Somente Administradores/Editores autenticados podem DELETAR produtos
CREATE POLICY "Somente administradores podem deletar produtos"
  ON public.products
  FOR DELETE
  USING (
    public.is_admin_or_editor()
  );


-- 5. CONFIGURAÇÃO DO BUCKET DE STORAGE ('products')
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products', 
  'products', 
  true, 
  5242880, -- 5 MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Politica do Storage: Leitura pública das imagens
CREATE POLICY "Imagens de produtos sao visiveis publicamente"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

-- Politica do Storage: Upload exclusivo para administradores autenticados
CREATE POLICY "Somente administradores podem fazer upload de imagens"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'products' AND 
    auth.role() = 'authenticated'
  );

-- Politica do Storage: Atualização e Exclusão para administradores
CREATE POLICY "Somente administradores podem alterar ou deletar imagens"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Somente administradores podem remover imagens"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'products' AND auth.role() = 'authenticated');


-- 6. CARGA INICIAL DE DEMONSTRAÇÃO (SEED DATA)
INSERT INTO public.products (
  name, slug, description, price, image_url, category, badge, ingredients, price_note, tag, featured, active, display_order
) VALUES
(
  'Brigadeiro Belga Tradicional',
  'belga-tradicional',
  'Aveludado brigadeiro de cacau nobre envolto em granulados de chocolate ao leite Callebaut 33.6%. Cremoso e nostálgico.',
  5.00,
  'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
  'tradicionais',
  'Mais Pedido',
  'Leite condensado artesanal, manteiga extra, Chocolate Ao Leite Callebaut.',
  'A partir de R$ 5,00/unid (Caixas de 4, 9, 16 ou 25)',
  'O Clássico Incomparável',
  true, true, 1
),
(
  'Brigadeiro de Pistache Aveludado',
  'pistache-aveludado',
  'Brigadeiro de chocolate branco puro infusado com pasta de pistache puro e coberto com lâminas de pistache siciliano tostado.',
  6.50,
  'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
  'gourmet_intenso',
  'Assinatura',
  'Pistache italiano 100% puro, chocolate branco nobre e flor de sal.',
  'A partir de R$ 6,50/unid (Sob encomenda)',
  'Sofisticação Italiana',
  true, true, 2
),
(
  'Brigadeiro Intense Dark 70%',
  'intense-dark',
  'Gourmet de chocolate amargo 70% cacau com toque de baunilha de Madagascar e finalizado com cacau em pó holandês velvet.',
  5.50,
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
  'gourmet_intenso',
  'Cacau Premium',
  'Cacau 70% amargo, cacau velvet em pó e manteiga de cacau.',
  'A partir de R$ 5,50/unid',
  'Para Apreciadores de Cacau',
  false, true, 3
),
(
  'Brigadeiro Ninho com Nutella',
  'ninho-nutella',
  'Massa cremosa de Leite Ninho puro com recheio generoso e aveludado de Nutella original. Suavidade em cada mordida.',
  6.00,
  'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
  'tradicionais',
  'Favorito',
  'Leite Ninho, Nutella original, Leite condensado gourmet.',
  'A partir de R$ 6,00/unid',
  'Combinação Irresistível',
  true, true, 4
)
ON CONFLICT (slug) DO NOTHING;
