import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../components/admin/AdminLayout';
import { fetchAllProductsAdmin, toggleProductActive } from '../services/products';
import { BrigadeiroProduct } from '../types';
import {
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  PlusCircle,
  Eye,
  Edit,
  ArrowRight,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<BrigadeiroProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProductsAdmin();
      setProducts(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao carregar produtos.');
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
    } catch (err: any) {
      alert(`Erro: ${err.message}`);
    }
  };

  const totalCount = products.length;
  const activeCount = products.filter(p => p.active !== false).length;
  const featuredCount = products.filter(p => p.featured).length;

  return (
    <AdminLayout
      title="Visão Geral"
      subtitle="Acompanhe os produtos ativos e cadastrados no catálogo da Encanto Gourmet."
    >
      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-[#170D0B] border border-[#2C1A14] rounded-2xl p-6 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-semibold text-[#E8DFD5]/70 tracking-wider">
              Total de Produtos
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#2C1A14] flex items-center justify-center text-[#D4AF37]">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#FAF7F2] mb-1">
            {loading ? '...' : totalCount}
          </div>
          <p className="text-[11px] text-[#E8DFD5]/60">
            Cadastrados no catálogo
          </p>
        </div>

        <div className="bg-[#170D0B] border border-[#2C1A14] rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-semibold text-[#E8DFD5]/70 tracking-wider">
              Produtos Ativos
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#FAF7F2] mb-1">
            {loading ? '...' : activeCount}
          </div>
          <p className="text-[11px] text-emerald-400/80">
            Visíveis na Landing Page
          </p>
        </div>

        <div className="bg-[#170D0B] border border-[#2C1A14] rounded-2xl p-6 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-semibold text-[#E8DFD5]/70 tracking-wider">
              Em Destaque
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#2C1A14] flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#FAF7F2] mb-1">
            {loading ? '...' : featuredCount}
          </div>
          <p className="text-[11px] text-[#D4AF37]/80">
            Com selo exclusivo
          </p>
        </div>

      </div>

      {/* Quick Action Banner */}
      <div className="bg-gradient-to-r from-[#2C1A14] to-[#1F120E] border border-[#D4AF37]/30 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#FAF7F2] flex items-center">
            <Sparkles className="w-5 h-5 text-[#D4AF37] mr-2" />
            Adicionar Novo Produto ao Catálogo
          </h3>
          <p className="text-xs text-[#E8DFD5]/80 mt-1 font-light">
            Cadastre novos sabores de brigadeiros, insira a descrição e envie uma foto em alta definição.
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C59B27] text-[#1F120E] font-semibold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center space-x-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Cadastrar Sabor</span>
        </Link>
      </div>

      {/* Recent Products List */}
      <div className="bg-[#170D0B] border border-[#2C1A14] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2C1A14]">
          <h3 className="font-serif text-base font-bold text-[#FAF7F2]">
            Catálogo Recente
          </h3>
          <Link
            to="/admin/products"
            className="text-xs text-[#D4AF37] hover:underline flex items-center space-x-1"
          >
            <span>Ver Todos ({totalCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8 text-xs text-[#E8DFD5]/60">
            Carregando produtos do Supabase...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#E8DFD5]/60">
            Nenhum produto cadastrado até o momento.
          </div>
        ) : (
          <div className="space-y-3">
            {products.slice(0, 5).map((prod) => (
              <div
                key={prod.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#1F120E] border border-[#2C1A14] hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-12 h-12 rounded-lg object-cover border border-[#D4AF37]/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-medium text-xs text-[#FAF7F2] truncate">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-[#E8DFD5]/60 truncate">
                      {prod.flavorCategory} • {prod.priceNote || `€ ${(prod.price || 5).toFixed(2)}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    onClick={() => handleToggleActive(prod.id, Boolean(prod.active))}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                      prod.active
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-950/80 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {prod.active ? 'Ativo' : 'Inativo'}
                  </button>

                  <Link
                    to={`/admin/products/${prod.id}/edit`}
                    className="p-1.5 text-[#E8DFD5]/70 hover:text-[#D4AF37] hover:bg-[#2C1A14] rounded-lg transition-colors"
                    title="Editar produto"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </AdminLayout>
  );
};
