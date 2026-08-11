import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';
import { fetchAllProductsAdmin, toggleProductActive, deleteProduct } from '../services/products';
import { BrigadeiroProduct } from '../types';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowUpDown
} from 'lucide-react';

export const AdminProductsList: React.FC = () => {
  const [products, setProducts] = useState<BrigadeiroProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'featured'>('all');
  const [deleteModalProduct, setDeleteModalProduct] = useState<BrigadeiroProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProductsAdmin();
      setProducts(data);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Erro ao carregar lista de produtos.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await toggleProductActive(id, !currentActive);
      setProducts(prev =>
        prev.map(p => (p.id === id ? { ...p, active: !currentActive } : p))
      );
      setMessage({
        type: 'success',
        text: `Status do produto alterado para ${!currentActive ? 'Ativo' : 'Inativo'}.`
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Erro ao alterar status.' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModalProduct) return;
    setIsDeleting(true);

    try {
      await deleteProduct(deleteModalProduct.id, deleteModalProduct.image_path);
      setProducts(prev => prev.filter(p => p.id !== deleteModalProduct.id));
      setMessage({ type: 'success', text: `Produto "${deleteModalProduct.name}" excluído com sucesso.` });
      setDeleteModalProduct(null);
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Erro ao excluir produto.' });
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.flavorCategory && p.flavorCategory.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === 'active') return p.active !== false;
    if (statusFilter === 'inactive') return p.active === false;
    if (statusFilter === 'featured') return Boolean(p.featured);

    return true;
  });

  return (
    <AdminLayout
      title="Gerenciamento de Produtos"
      subtitle="Cadastre, edite, ative/desative e controle a ordem dos brigadeiros no catálogo."
    >
      {/* Action Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#E8DFD5]/40" />
          <input
            type="text"
            placeholder="Buscar por nome, descrição ou categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#170D0B] border border-[#2C1A14] focus:border-[#D4AF37] rounded-xl py-2.5 pl-10 pr-4 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/30 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Pills & Add Button */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="inline-flex p-1 bg-[#170D0B] border border-[#2C1A14] rounded-xl text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'all'
                  ? 'bg-[#2C1A14] text-[#D4AF37] font-semibold'
                  : 'text-[#E8DFD5]/60 hover:text-[#FAF7F2]'
              }`}
            >
              Todos ({products.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'active'
                  ? 'bg-[#2C1A14] text-[#D4AF37] font-semibold'
                  : 'text-[#E8DFD5]/60 hover:text-[#FAF7F2]'
              }`}
            >
              Ativos
            </button>
            <button
              onClick={() => setStatusFilter('inactive')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'inactive'
                  ? 'bg-[#2C1A14] text-[#D4AF37] font-semibold'
                  : 'text-[#E8DFD5]/60 hover:text-[#FAF7F2]'
              }`}
            >
              Inativos
            </button>
            <button
              onClick={() => setStatusFilter('featured')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'featured'
                  ? 'bg-[#2C1A14] text-[#D4AF37] font-semibold'
                  : 'text-[#E8DFD5]/60 hover:text-[#FAF7F2]'
              }`}
            >
              Destaques
            </button>
          </div>

          <Link
            to="/admin/products/new"
            className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#C59B27] text-[#1F120E] font-semibold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Produto</span>
          </Link>

        </div>

      </div>

      {/* Alert Notification */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/80 border border-red-500/40 text-red-200'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* Products Table Container */}
      <div className="bg-[#170D0B] border border-[#2C1A14] rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#2C1A14]/50 border-b border-[#2C1A14] text-[#D4AF37] uppercase tracking-wider text-[10px] font-semibold">
                <th className="py-3.5 px-4">Imagem</th>
                <th className="py-3.5 px-4">Produto</th>
                <th className="py-3.5 px-4">Categoria</th>
                <th className="py-3.5 px-4">Preço Est.</th>
                <th className="py-3.5 px-4 text-center">Destaque</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Ordem</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C1A14]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#E8DFD5]/60">
                    Carregando catálogo do Supabase...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#E8DFD5]/60">
                    Nenhum produto encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-[#1F120E]/80 transition-colors group"
                  >
                    {/* Thumbnail Image */}
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#1F120E] border border-[#D4AF37]/20 shrink-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    </td>

                    {/* Product Name & Tag */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#FAF7F2] text-xs">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-[#D4AF37] italic">
                        {p.tag || 'Sabor Gourmet'}
                      </div>
                      {p.badge && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#2C1A14] text-[#D4AF37] text-[9px] uppercase font-semibold border border-[#D4AF37]/30">
                          {p.badge}
                        </span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-[#E8DFD5]/80 capitalize">
                      {p.flavorCategory.replace('_', ' ')}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-mono text-[#FAF7F2]">
                      {p.priceNote || `€ ${(p.price || 5.0).toFixed(2)}`}
                    </td>

                    {/* Featured */}
                    <td className="py-3 px-4 text-center">
                      {p.featured ? (
                        <span className="inline-flex items-center text-amber-400" title="Produto em destaque">
                          <Star className="w-4 h-4 fill-amber-400" />
                        </span>
                      ) : (
                        <span className="text-[#E8DFD5]/30">—</span>
                      )}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(p.id, Boolean(p.active))}
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                          p.active !== false
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/80'
                            : 'bg-red-950/80 text-red-300 border border-red-500/30 hover:bg-red-900/80'
                        }`}
                      >
                        {p.active !== false ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Ativo</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Oculto</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Display Order */}
                    <td className="py-3 px-4 text-center font-mono text-[#E8DFD5]/70">
                      {p.display_order ?? 0}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Link
                          to={`/admin/products/${p.id}/edit`}
                          className="p-2 text-[#E8DFD5]/70 hover:text-[#D4AF37] hover:bg-[#2C1A14] rounded-lg transition-colors"
                          title="Editar informações e foto"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteModalProduct(p)}
                          className="p-2 text-[#E8DFD5]/70 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                          title="Excluir produto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Deletar Produto */}
      {deleteModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#170D0B] border border-red-500/40 rounded-2xl max-w-md w-full p-6 text-left shadow-2xl relative">
            <div className="flex items-center space-x-3 text-red-400 mb-4">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif text-lg font-bold text-[#FAF7F2]">
                Confirmar Exclusão de Produto
              </h3>
            </div>

            <p className="text-xs text-[#E8DFD5]/90 leading-relaxed mb-4">
              Tem certeza que deseja excluir permanentemente o produto <strong>"{deleteModalProduct.name}"</strong>?
            </p>

            <p className="text-[11px] text-[#E8DFD5]/60 bg-[#1F120E] p-3 rounded-xl border border-[#2C1A14] mb-6">
              ⚠️ Esta ação removerá os dados no banco e apagará a imagem correspondente no Supabase Storage. Esta operação não pode ser desfeita.
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setDeleteModalProduct(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs text-[#E8DFD5]/70 hover:text-[#FAF7F2]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all disabled:opacity-50"
              >
                {isDeleting ? 'Excluindo...' : 'Sim, Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};
