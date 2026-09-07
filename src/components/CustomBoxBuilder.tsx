import React, { useState, useEffect } from 'react';
import { BRIGADEIRO_PRODUCTS } from '../data/products';
import { BrigadeiroProduct, BoxSizeOption } from '../types';
import { fetchActiveBoxOptions, DEFAULT_BOX_OPTIONS } from '../services/boxSettings';
import { ProductImage } from './common/ProductImage';
import { Plus, Minus, Check, Gift, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';

interface CustomBoxBuilderProps {
  products?: BrigadeiroProduct[];
  onOrderCustomBox: (boxSize: number, selectedFlavors: { product: BrigadeiroProduct; count: number }[], ribbonColor: string, totalPrice: number) => void;
}

export const CustomBoxBuilder: React.FC<CustomBoxBuilderProps> = ({ products, onOrderCustomBox }) => {
  const availableProducts = products && products.length > 0 ? products : BRIGADEIRO_PRODUCTS;
  const [boxOptions, setBoxOptions] = useState<BoxSizeOption[]>(DEFAULT_BOX_OPTIONS);
  const [boxSize, setBoxSize] = useState<number>(9);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchActiveBoxOptions().then(options => {
      if (options && options.length > 0) {
        setBoxOptions(options);
        // If current boxSize is not in the active options, select the first available
        if (!options.some(o => o.size === boxSize)) {
          setBoxSize(options[0].size);
        }
      }
    });
  }, []);

  const totalSelected: number = (Object.values(counts) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);

  const currentBoxOption = boxOptions.find(b => b.size === boxSize) || boxOptions[0] || { size: boxSize, label: `Caixa (${boxSize} unid.)`, basePrice: 48 };

  const handleIncrement = (id: string) => {
    if (totalSelected >= boxSize) return;
    setCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleDecrement = (id: string) => {
    if (!counts[id] || counts[id] <= 0) return;
    setCounts(prev => {
      const next = { ...prev, [id]: prev[id] - 1 };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  };

  const handleReset = () => {
    setCounts({});
  };

  const selectedItems = Object.entries(counts)
    .map(([id, count]: [string, number]) => {
      const product = availableProducts.find(p => p.id === id);
      return product ? { product, count } : null;
    })
    .filter((item): item is { product: BrigadeiroProduct; count: number } => item !== null && Number(item.count) > 0);

  // Calculate real total price based on products from database
  const calculatedItemsTotal = selectedItems.reduce((acc, curr) => {
    const itemPrice = curr.product.price !== undefined && curr.product.price !== null
      ? Number(curr.product.price)
      : (curr.product.unitPriceEstimate ?? 5.0);
    return acc + (itemPrice * curr.count);
  }, 0);

  const estimatedPrice = totalSelected > 0 ? calculatedItemsTotal : (currentBoxOption.basePrice || 0);

  const handleFinishBox = () => {
    onOrderCustomBox(boxSize, selectedItems, 'Embalagem Especial Ateliê', estimatedPrice);
  };

  return (
    <div className="bg-[#1F120E] text-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
      
      {/* Header of Configurator */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs text-[#E5C378] font-semibold tracking-widest uppercase mb-3">
          <Gift className="w-3.5 h-3.5 mr-1" /> Montar Sua Caixa Personalizada
        </span>
        <h3 className="font-serif-display text-3xl sm:text-4xl text-[#FAF7F2] font-light">
          Monte o seu presente ideal
        </h3>
        <p className="text-sm text-[#E8DFD5]/80 mt-2 font-light">
          Escolha o tamanho da caixa e selecione seus brigadeiros favoritos para compor o presente perfeito.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Step 1: Dynamic Box Size Selection */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">
              1. Selecione o tamanho da caixa
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {boxOptions.map((opt) => (
                <button
                  key={opt.id || opt.size}
                  onClick={() => {
                    setBoxSize(opt.size);
                    if (totalSelected > opt.size) {
                      setCounts({});
                    }
                  }}
                  className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                    boxSize === opt.size
                      ? 'bg-gradient-to-b from-[#D4AF37]/20 to-[#1F120E] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-[#2C1A14]/60 border-[#2C1A14] hover:border-[#D4AF37]/40 text-[#FAF7F2]/70'
                  }`}
                >
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-[#D4AF37] mb-1">
                    {opt.size} <span className="text-xs font-normal text-[#FAF7F2]">unid.</span>
                  </span>
                  <span className="block text-[11px] text-[#E8DFD5] font-medium leading-tight">
                    {opt.label.split('(')[0].trim()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Flavor Picking Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                2. Escolha os sabores ({totalSelected} / {boxSize} selecionados)
              </label>
              {totalSelected > 0 && (
                <button
                  onClick={handleReset}
                  className="text-xs text-[#E8DFD5]/60 hover:text-[#D4AF37] underline transition-colors"
                >
                  Limpar seleção
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#2C1A14] rounded-full overflow-hidden mb-6 border border-[#D4AF37]/20">
              <div
                className={`h-full transition-all duration-500 ${
                  totalSelected === boxSize
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C378]'
                    : 'bg-[#D4AF37]/60'
                }`}
                style={{ width: `${Math.min((totalSelected / boxSize) * 100, 100)}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
              {availableProducts.map((product) => {
                const count: number = Number(counts[product.id] || 0);
                const unitPrice = product.price !== undefined && product.price !== null
                  ? Number(product.price)
                  : (product.unitPriceEstimate ?? 5.0);

                return (
                  <div
                    key={product.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                      count > 0
                        ? 'bg-[#2C1A14] border-[#D4AF37]/60'
                        : 'bg-[#2C1A14]/40 border-[#2C1A14] hover:border-[#D4AF37]/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <ProductImage
                        src={product.image}
                        alt={product.alt || `Brigadeiro Gourmet ${product.name}`}
                        className="w-11 h-11 rounded-lg object-cover border border-[#D4AF37]/30"
                      />
                      <div>
                        <h4 className="text-xs font-serif font-bold text-[#FAF7F2] line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center space-x-1.5 text-[10px] text-[#E8DFD5]/70">
                          <span className="line-clamp-1">{product.tag || 'Gourmet'}</span>
                          <span>•</span>
                          <span className="text-[#D4AF37] font-semibold whitespace-nowrap">
                            R$ {unitPrice.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Counter Buttons */}
                    <div className="flex items-center space-x-2 bg-[#1F120E] p-1 rounded-lg border border-[#D4AF37]/20">
                      <button
                        onClick={() => handleDecrement(product.id)}
                        disabled={count <= 0}
                        className="w-6 h-6 rounded flex items-center justify-center text-xs text-[#FAF7F2] disabled:opacity-30 hover:bg-[#D4AF37]/20"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-semibold text-[#D4AF37]">
                        {count}
                      </span>
                      <button
                        onClick={() => handleIncrement(product.id)}
                        disabled={totalSelected >= boxSize}
                        className="w-6 h-6 rounded flex items-center justify-center text-xs text-[#FAF7F2] disabled:opacity-30 hover:bg-[#D4AF37]/20"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Live Box Summary Card */}
        <div className="lg:col-span-4 bg-[#2C1A14] p-6 rounded-2xl border border-[#D4AF37]/30 flex flex-col justify-between sticky top-28">
          <div>
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-4">
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="font-serif text-lg text-[#FAF7F2] font-semibold">Resumo da Caixa</h4>
              </div>
              <span className="text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-1 rounded-full font-semibold">
                {boxSize} Unidades
              </span>
            </div>

            {/* List of items selected */}
            <div className="space-y-2 mb-6 max-h-[220px] overflow-y-auto custom-scrollbar">
              {Object.keys(counts).length === 0 ? (
                <p className="text-xs italic text-[#E8DFD5]/60 text-center py-6">
                  Nenhum sabor selecionado. Adicione os brigadeiros desejados na lista.
                </p>
              ) : (
                Object.entries(counts).map(([id, count]: [string, number]) => {
                  const p = availableProducts.find(item => item.id === id);
                  if (!p || count <= 0) return null;
                  const itemPrice = p.price !== undefined && p.price !== null
                    ? Number(p.price)
                    : (p.unitPriceEstimate ?? 5.0);

                  return (
                    <div key={id} className="flex justify-between items-center text-xs py-1 text-[#E8DFD5]">
                      <span className="truncate max-w-[140px]">{p.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] text-[#FAF7F2]/60">
                          R$ {(itemPrice * count).toFixed(2).replace('.', ',')}
                        </span>
                        <span className="font-semibold text-[#D4AF37]">{count}x</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-t border-[#D4AF37]/20 pt-4 space-y-2 text-xs text-[#E8DFD5]">
              <div className="flex justify-between">
                <span>Embalagem presenteável:</span>
                <span className="text-emerald-400 font-medium">Inclusa</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-serif border-t border-[#FAF7F2]/10">
                <span className="font-semibold text-[#FAF7F2]">Valor Total:</span>
                <span className="font-bold text-[#D4AF37]">R$ {estimatedPrice.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4">
            {totalSelected < boxSize && (
              <p className="text-[11px] text-amber-300/80 mb-3 flex items-center justify-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1 inline" />
                Faltam {boxSize - totalSelected} brigadeiros para completar a caixa.
              </p>
            )}

            <button
              onClick={handleFinishBox}
              disabled={totalSelected === 0}
              id="custom-box-order-btn"
              className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-[#E5C378] via-[#D4AF37] to-[#C59B27] text-[#1F120E] rounded-xl shadow-lg hover:shadow-[#D4AF37]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pedir Caixa via WhatsApp</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};


