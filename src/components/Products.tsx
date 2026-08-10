import React, { useState } from 'react';
import { BRIGADEIRO_PRODUCTS } from '../data/products';
import { BrigadeiroProduct } from '../types';
import { CustomBoxBuilder } from './CustomBoxBuilder';
import { ShoppingBag, Sparkles, Gift, Info, Check, ArrowUpRight } from 'lucide-react';

interface ProductsProps {
  onSelectProductToOrder: (product: BrigadeiroProduct) => void;
  onOrderCustomBox: (boxSize: number, selectedFlavors: { product: BrigadeiroProduct; count: number }[], ribbonColor: string, totalPrice: number) => void;
}

export const Products: React.FC<ProductsProps> = ({ onSelectProductToOrder, onOrderCustomBox }) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'box_builder'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<BrigadeiroProduct | null>(null);

  const categories = [
    { id: 'todos', name: 'Todos os Sabores' },
    { id: 'tradicionais', name: 'Tradicionais & Clássicos' },
    { id: 'gourmet_intenso', name: 'Gourmet & Cacau Intenso' },
    { id: 'crocantes', name: 'Crocantes & Amêndoas' },
    { id: 'frutados_especiais', name: 'Frutados & Especiais' },
  ];

  const filteredProducts = selectedCategory === 'todos'
    ? BRIGADEIRO_PRODUCTS
    : BRIGADEIRO_PRODUCTS.filter(p => p.flavorCategory === selectedCategory);

  return (
    <section id="produtos" className="py-24 bg-[#FAF7F2] text-[#2C1A14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-2">
            Catálogo Exclusivo
          </span>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-light text-[#2C1A14] mb-4">
            Conheça os nossos encantos.
          </h2>
          <p className="text-base sm:text-lg text-[#6E574F] font-light">
            Sua experiência gourmet começa aqui. Escolha seus sabores individuais ou monte uma caixa de presentes sob medida.
          </p>

          {/* Toggle between Menu View and Custom Gift Box Builder */}
          <div className="mt-8 inline-flex p-1.5 rounded-full bg-[#E8DFD5]/60 border border-[#D4AF37]/30 shadow-inner">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'catalog'
                  ? 'bg-[#1F120E] text-[#D4AF37] shadow-md'
                  : 'text-[#523C33] hover:text-[#2C1A14]'
              }`}
              id="tab-catalog"
            >
              Sabores Individuais
            </button>
            <button
              onClick={() => setActiveTab('box_builder')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'box_builder'
                  ? 'bg-[#1F120E] text-[#D4AF37] shadow-md'
                  : 'text-[#523C33] hover:text-[#2C1A14]'
              }`}
              id="tab-box-builder"
            >
              <Gift className="w-4 h-4 text-[#D4AF37]" />
              <span>Montar Caixa de Presente</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <div>
            
            {/* Category Filter Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-[#2C1A14] text-[#FAF7F2] shadow-sm'
                      : 'bg-white/80 text-[#6E574F] hover:bg-[#E8DFD5] border border-[#E8DFD5]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E8DFD5] hover:border-[#D4AF37]/60 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container with Badge */}
                    <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-[#1F120E]/90 text-[#D4AF37] text-[10px] uppercase font-semibold tracking-widest px-3 py-1 rounded-full border border-[#D4AF37]/30 backdrop-blur-sm">
                          {product.badge}
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedProductForDetail(product)}
                        className="absolute bottom-3 right-3 p-2 bg-white/90 text-[#2C1A14] rounded-full shadow-md hover:bg-[#2C1A14] hover:text-[#D4AF37] transition-colors"
                        title="Ver detalhes dos ingredientes"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <span className="text-[10px] uppercase font-semibold tracking-widest text-[#D4AF37] block mb-1">
                        {product.tag}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#2C1A14] mb-2 group-hover:text-[#6E473B] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#6E574F] font-light leading-relaxed line-clamp-3 mb-4">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Card */}
                  <div className="px-5 pb-5 pt-0 border-t border-[#FAF7F2] mt-auto">
                    <div className="text-[11px] font-medium text-[#8A7067] mb-3 italic">
                      {product.priceNote}
                    </div>
                    <button
                      onClick={() => onSelectProductToOrder(product)}
                      className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#2C1A14] hover:bg-[#D4AF37] hover:text-[#1F120E] rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Encomendar</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: CUSTOM BOX BUILDER */}
        {activeTab === 'box_builder' && (
          <CustomBoxBuilder onOrderCustomBox={onOrderCustomBox} />
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProductForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E8DFD5] shadow-2xl relative">
            <button
              onClick={() => setSelectedProductForDetail(null)}
              className="absolute top-4 right-4 text-[#6E574F] hover:text-[#2C1A14] p-1"
            >
              ✕
            </button>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={selectedProductForDetail.image}
                alt={selectedProductForDetail.name}
                className="w-20 h-20 rounded-xl object-cover border border-[#D4AF37]/30"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#D4AF37] tracking-widest">
                  {selectedProductForDetail.tag}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2C1A14]">
                  {selectedProductForDetail.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#523C33] leading-relaxed mb-4">
              {selectedProductForDetail.description}
            </p>

            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD5] mb-6 space-y-2">
              <span className="text-xs font-semibold uppercase text-[#2C1A14] tracking-wider block">
                Ingredientes & Notas Gastronômicas:
              </span>
              <p className="text-xs text-[#6E574F] italic">
                {selectedProductForDetail.ingredients}
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedProductForDetail(null)}
                className="px-4 py-2 text-xs font-semibold text-[#6E574F] hover:text-[#2C1A14]"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  const prod = selectedProductForDetail;
                  setSelectedProductForDetail(null);
                  onSelectProductToOrder(prod);
                }}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1F120E] bg-[#D4AF37] hover:bg-[#C59B27] rounded-xl shadow-md"
              >
                Encomendar Este Sabor
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
