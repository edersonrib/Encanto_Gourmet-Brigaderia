import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';
import { createProduct, updateProduct, fetchAllProductsAdmin } from '../services/products';
import { uploadProductImage } from '../services/storage';
import { BrigadeiroProduct } from '../types';
import {
  Upload,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

export const AdminProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(5.0);
  const [category, setCategory] = useState<string>('tradicionais');
  const [tag, setTag] = useState('');
  const [badge, setBadge] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [priceNote, setPriceNote] = useState('');
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState<number>(1);

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [existingImageUrl, setExistingImageUrl] = useState<string>('');
  const [existingImagePath, setExistingImagePath] = useState<string | undefined>(undefined);

  // UI state
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(isEditing);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Load existing product if editing
  useEffect(() => {
    if (isEditing && id) {
      setLoadingInitial(true);
      fetchAllProductsAdmin()
        .then(products => {
          const prod = products.find(p => p.id === id);
          if (prod) {
            setName(prod.name);
            setSlug(prod.slug || '');
            setDescription(prod.description);
            setPrice(prod.price ?? prod.unitPriceEstimate ?? 5.0);
            setCategory(prod.flavorCategory);
            setTag(prod.tag || '');
            setBadge(prod.badge || '');
            setIngredients(prod.ingredients || '');
            setPriceNote(prod.priceNote || '');
            setFeatured(Boolean(prod.featured));
            setActive(prod.active !== false);
            setDisplayOrder(prod.display_order ?? 1);
            setExistingImageUrl(prod.image);
            setExistingImagePath(prod.image_path);
            setImagePreview(prod.image);
          } else {
            setErrorMsg('Produto não encontrado.');
          }
        })
        .catch(err => {
          setErrorMsg(err.message || 'Erro ao buscar detalhes do produto.');
        })
        .finally(() => {
          setLoadingInitial(false);
        });
    }
  }, [id, isEditing]);

  // Auto-generate slug when name changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isEditing || !slug) {
      const generatedSlug = newName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  // Handle image file selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg(`A imagem selecionada é muito grande (${(file.size / (1024 * 1024)).toFixed(1)} MB). O limite máximo é 5 MB.`);
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Formato de imagem inválido. Escolha um arquivo JPG, PNG ou WEBP.');
      return;
    }

    setErrorMsg('');
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor, informe o nome do produto.');
      return;
    }

    if (!imageFile && !existingImageUrl) {
      setErrorMsg('Por favor, selecione uma imagem para o produto.');
      return;
    }

    setLoading(true);

    try {
      let finalImageUrl = existingImageUrl;
      let finalImagePath = existingImagePath;

      // 1. Upload new image if selected
      if (imageFile) {
        const uploadResult = await uploadProductImage(imageFile, slug || 'produto');
        finalImageUrl = uploadResult.publicUrl;
        finalImagePath = uploadResult.imagePath;
      }

      // 2. Prepare payload
      const productPayload: Partial<BrigadeiroProduct> = {
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/\s+/g, '-'),
        description: description.trim(),
        price: Number(price) || 5.0,
        unitPriceEstimate: Number(price) || 5.0,
        flavorCategory: category,
        tag: tag.trim() || 'Sabor Gourmet',
        badge: badge.trim() || undefined,
        ingredients: ingredients.trim(),
        priceNote: priceNote.trim() || `€ ${Number(price).toFixed(2)}/unid`,
        image: finalImageUrl,
        image_path: finalImagePath,
        featured,
        active,
        display_order: Number(displayOrder) || 0,
      };

      // 3. Save to Supabase
      if (isEditing && id) {
        await updateProduct(id, productPayload);
        setSuccessMsg('Produto atualizado com sucesso!');
      } else {
        await createProduct(productPayload);
        setSuccessMsg('Produto criado e publicado no catálogo!');
      }

      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);

    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao salvar produto. Verifique sua conexão ou configurações do Supabase.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingInitial) {
    return (
      <AdminLayout title="Carregando Produto..." subtitle="Aguarde um instante">
        <div className="py-20 text-center text-xs text-[#E8DFD5]/60">
          Buscando detalhes do produto no Supabase...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={isEditing ? `Editar Produto: ${name}` : 'Cadastrar Novo Produto'}
      subtitle="Preencha os detalhes e selecione a foto oficial para exibir na landing page."
    >
      <div className="max-w-4xl mx-auto">

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/admin/products"
            className="inline-flex items-center text-xs text-[#E8DFD5]/70 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Voltar para a lista de produtos</span>
          </Link>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMsg} Redirecionando...</span>
          </div>
        )}

        {/* Error Banner */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/90 border border-red-500/50 text-xs text-red-200 flex items-start space-x-2 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-[#170D0B] border border-[#2C1A14] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Left Column: Text Information */}
            <div className="md:col-span-8 space-y-4">
              
              {/* Product Name */}
              <div>
                <label className="block text-xs font-medium text-[#FAF7F2] mb-1.5">
                  Nome do Produto: <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ex: Brigadeiro Belga Tradicional"
                  value={name}
                  onChange={handleNameChange}
                  required
                  className="w-full bg-[#1F120E] border border-[#2C1A14] focus:border-[#D4AF37] rounded-xl py-2.5 px-3.5 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/30 focus:outline-none transition-colors"
                />
              </div>

              {/* Tag & Category in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#FAF7F2] mb-1.5">
                    Categoria: <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#1F120E] border border-[#2C1A14] focus:border-[#D4AF37] rounded-xl py-2.5 px-3 text-xs text-[#FAF7F2] focus:outline-none transition-colors"
                  >
                    <option value="tradicionais">Tradicionais & Clássicos</option>
                    <option value="gourmet_intenso">Gourmet & Cacau Intenso</option>
                    <option value="crocantes">Crocantes & Amêndoas</option>
                    <option value="frutados_especiais">Frutados & Especiais</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#FAF7F2] mb-1.5">
                    Subtítulo / Tag:
                  </label>
                  <input
                    type="text"
                    placeholder="ex: O Clássico Incomparável"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full bg-[#1F120E] border border-[#2C1A14] focus:border-[#D4AF37] rounded-xl py-2.5 px-3.5 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Price & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#FAF7F2] mb-1.5">
                    Preço Estimativo (€):
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    placeholder="5.00"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#1F120E] border border-[#2C1A14] focus:border-[#D4AF37] rounded-xl py-2.5 px-3.5 text-xs text-[#FAF7F2] focus:outline-none transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#FAF7F2] mb-1.5">
                    Selo de Destaque / Badge (Opcional):
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Mais Pedido, Assinatura, Favorito"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full bg-[#1F120E] border border-[#2C1A14] focus:border-[#D4AF37] rounded-xl py-2.5 px-3.5 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-[#FAF7F2] mb-1.5">
                  Descrição do Sabor: <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Descreva a textura, sabor, cacau e notas organolépticas do brigadeiro..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full bg-[#1F120E] border border-[#2C1A14] focus:border-[#D4AF37] rounded-xl p-3 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/30 focus:outline-none transition-colors"
                />
              </div>

              {/* Ingredients & Price Note */}
              <div>
                <label className="block text-xs font-medium text-[#FAF7F2] mb-1.5">
                  Ingredientes & Notas Gastronômicas:
                </label>
                <input
                  type="text"
                  placeholder="ex: Leite condensado artesanal, manteiga extra, Chocolate Ao Leite Callebaut."
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="w-full bg-[#1F120E] border border-[#2C1A14] focus:border-[#D4AF37] rounded-xl py-2.5 px-3.5 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/30 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#FAF7F2] mb-1.5">
                  Nota Explicativa de Preço:
                </label>
                <input
                  type="text"
                  placeholder="ex: A partir de R$ 5,00/unid (Caixas de 4, 9, 16 ou 25)"
                  value={priceNote}
                  onChange={(e) => setPriceNote(e.target.value)}
                  className="w-full bg-[#1F120E] border border-[#2C1A14] focus:border-[#D4AF37] rounded-xl py-2.5 px-3.5 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/30 focus:outline-none transition-colors"
                />
              </div>

            </div>

            {/* Right Column: Image Upload & Visibility Options */}
            <div className="md:col-span-4 space-y-6">
              
              {/* Image Upload Box */}
              <div>
                <label className="block text-xs font-medium text-[#FAF7F2] mb-1.5">
                  Foto do Produto: <span className="text-red-400">*</span>
                </label>

                <div className="border-2 border-dashed border-[#2C1A14] hover:border-[#D4AF37]/50 rounded-2xl p-4 text-center bg-[#1F120E] transition-colors relative">
                  
                  {imagePreview ? (
                    <div className="relative group">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full aspect-square object-cover rounded-xl border border-[#D4AF37]/30 shadow-md"
                      />
                      <div className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <label className="cursor-pointer px-3 py-1.5 bg-[#D4AF37] text-[#1F120E] font-semibold text-[10px] rounded-lg shadow-md hover:bg-[#C59B27] transition-colors">
                          Trocar Foto
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/jpg"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-8 space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-[#2C1A14] flex items-center justify-center text-[#D4AF37]">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="block text-xs font-medium text-[#FAF7F2]">
                        Clique para enviar foto
                      </span>
                      <span className="block text-[10px] text-[#E8DFD5]/50">
                        PNG, JPG ou WEBP (máx. 5 MB)
                      </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                  )}

                </div>
              </div>

              {/* Display Settings */}
              <div className="p-4 bg-[#1F120E] border border-[#2C1A14] rounded-2xl space-y-4">
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block border-b border-[#2C1A14] pb-2">
                  Configurações de Exibição
                </span>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#E8DFD5]">Produto Ativo:</span>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#E8DFD5]">Selo de Destaque:</span>
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#E8DFD5] mb-1">
                    Ordem de Exibição:
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#170D0B] border border-[#2C1A14] rounded-lg py-1.5 px-3 text-xs text-[#FAF7F2] font-mono"
                  />
                  <span className="text-[10px] text-[#E8DFD5]/50 mt-1 block">
                    Números menores aparecem primeiro.
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Form Action Buttons */}
          <div className="pt-6 border-t border-[#2C1A14] flex items-center justify-end space-x-3">
            <Link
              to="/admin/products"
              className="px-5 py-3 rounded-xl border border-[#2C1A14] hover:bg-[#2C1A14] text-xs font-semibold text-[#E8DFD5]/80 hover:text-[#FAF7F2] transition-colors"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B89428] hover:from-[#E5C148] hover:to-[#D4AF37] text-[#1F120E] font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Salvando no Supabase...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Salvar Alterações' : 'Publicar Produto'}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
};
