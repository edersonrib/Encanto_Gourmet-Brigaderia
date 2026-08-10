import React, { useState, useEffect } from 'react';
import { BrigadeiroProduct } from '../types';
import { BRIGADEIRO_PRODUCTS, WHATSAPP_NUMBER_PLACEHOLDER } from '../data/products';
import { X, MessageCircle, ShoppingBag, Gift, Calendar, User, Phone, MapPin, CheckCircle2 } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct: BrigadeiroProduct | null;
  preselectedBox: {
    boxSize: number;
    selectedFlavors: { product: BrigadeiroProduct; count: number }[];
    ribbonColor: string;
    totalPrice: number;
  } | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
  preselectedBox,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<'individual' | 'box' | 'event'>('individual');
  const [selectedProduct, setSelectedProduct] = useState<BrigadeiroProduct | null>(null);
  const [productQuantity, setProductQuantity] = useState<number>(9);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'retirada' | 'entrega'>('retirada');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (preselectedBox) {
      setOrderType('box');
    } else if (preselectedProduct) {
      setOrderType('individual');
      setSelectedProduct(preselectedProduct);
    } else {
      setSelectedProduct(BRIGADEIRO_PRODUCTS[0]);
    }
  }, [preselectedProduct, preselectedBox, isOpen]);

  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    let messageText = `Olá, Encanto Gourmet! Gostaria de fazer uma encomenda. ✨\n\n`;

    if (customerName) {
      messageText += `👤 *Nome:* ${customerName}\n`;
    }
    if (customerPhone) {
      messageText += `📱 *Telefone:* ${customerPhone}\n`;
    }

    messageText += `\n📦 *TIPO DE PEDIDO:* `;

    if (orderType === 'box' && preselectedBox) {
      messageText += `Caixa de Presente Personalizada (${preselectedBox.boxSize} unidades)\n`;
      messageText += `🎗️ *Acabamento do Laço:* ${preselectedBox.ribbonColor}\n`;
      messageText += `🍬 *Sabores Escolhidos:*\n`;
      preselectedBox.selectedFlavors.forEach(item => {
        messageText += `   • ${item.count}x ${item.product.name}\n`;
      });
      messageText += `💰 *Valor Estimado:* R$ ${preselectedBox.totalPrice.toFixed(2).replace('.', ',')}\n`;
    } else if (orderType === 'individual' && selectedProduct) {
      messageText += `Sabor em Destaque\n`;
      messageText += `🍬 *Sabor:* ${selectedProduct.name}\n`;
      messageText += `🔢 *Quantidade estimada:* ${productQuantity} unidades\n`;
    } else {
      messageText += `Encomenda Especial / Orçamento para Evento\n`;
    }

    if (deliveryDate) {
      messageText += `\n📅 *Data desejada:* ${deliveryDate}\n`;
    }
    messageText += `🚗 *Forma de Recebimento:* ${deliveryOption === 'retirada' ? 'Retirada no Ateliê' : 'Entrega por Delivery'}\n`;

    if (notes) {
      messageText += `✍️ *Observações / Mensagem para Cartão:* "${notes}"\n`;
    }

    messageText += `\nAguardo confirmação do pedido e dados para pagamento! Muito obrigado(a).`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER_PLACEHOLDER}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-[#1F120E] text-[#FAF7F2] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#D4AF37]/40 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#E8DFD5]/60 hover:text-[#FAF7F2] p-1.5 rounded-full bg-[#2C1A14] hover:bg-[#D4AF37] hover:text-[#1F120E] transition-colors"
          id="close-order-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center space-x-1 text-[10px] uppercase font-semibold text-[#D4AF37] tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30 mb-2">
            <ShoppingBag className="w-3 h-3 mr-1" /> Pedido via WhatsApp
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl text-[#FAF7F2] font-light">
            Finalize a sua encomenda
          </h3>
          <p className="text-xs text-[#E8DFD5]/80 mt-1">
            Preencha os detalhes e enviaremos o seu pedido diretamente para o WhatsApp do nosso ateliê.
          </p>
        </div>

        <div className="space-y-5">
          
          {/* Order Type Selector */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-2">
              Tipo de Encomenda
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('individual')}
                className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                  orderType === 'individual'
                    ? 'bg-[#2C1A14] border-[#D4AF37] text-[#FAF7F2]'
                    : 'bg-[#2C1A14]/30 border-[#2C1A14] text-[#E8DFD5]/60 hover:border-[#D4AF37]/30'
                }`}
              >
                Sabor Individual
              </button>
              <button
                type="button"
                onClick={() => setOrderType('box')}
                className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                  orderType === 'box'
                    ? 'bg-[#2C1A14] border-[#D4AF37] text-[#FAF7F2]'
                    : 'bg-[#2C1A14]/30 border-[#2C1A14] text-[#E8DFD5]/60 hover:border-[#D4AF37]/30'
                }`}
              >
                Caixa Presente
              </button>
              <button
                type="button"
                onClick={() => setOrderType('event')}
                className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                  orderType === 'event'
                    ? 'bg-[#2C1A14] border-[#D4AF37] text-[#FAF7F2]'
                    : 'bg-[#2C1A14]/30 border-[#2C1A14] text-[#E8DFD5]/60 hover:border-[#D4AF37]/30'
                }`}
              >
                Evento / Festa
              </button>
            </div>
          </div>

          {/* Conditional Order Summary */}
          {orderType === 'box' && preselectedBox && (
            <div className="p-4 rounded-xl bg-[#2C1A14] border border-[#D4AF37]/40 text-xs space-y-1">
              <span className="text-[#D4AF37] font-semibold block">Caixa Configurada ({preselectedBox.boxSize} unid.):</span>
              <p className="text-[#E8DFD5]">Laço: {preselectedBox.ribbonColor}</p>
              <p className="text-[#E8DFD5] italic line-clamp-2">
                Sabores: {preselectedBox.selectedFlavors.map(f => `${f.count}x ${f.product.name}`).join(', ')}
              </p>
              <p className="font-bold text-[#D4AF37] pt-1">
                Total Estimado: R$ {preselectedBox.totalPrice.toFixed(2).replace('.', ',')}
              </p>
            </div>
          )}

          {orderType === 'individual' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#E8DFD5] mb-1">Selecione o Sabor:</label>
                <select
                  value={selectedProduct?.id || ''}
                  onChange={(e) => {
                    const p = BRIGADEIRO_PRODUCTS.find(x => x.id === e.target.value);
                    if (p) setSelectedProduct(p);
                  }}
                  className="w-full bg-[#2C1A14] border border-[#D4AF37]/30 rounded-xl p-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#D4AF37]"
                >
                  {BRIGADEIRO_PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#E8DFD5] mb-1">Quantidade aproximada:</label>
                <select
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(Number(e.target.value))}
                  className="w-full bg-[#2C1A14] border border-[#D4AF37]/30 rounded-xl p-2.5 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value={4}>4 unidades (Caixa Mini)</option>
                  <option value={9}>9 unidades (Caixa Degustação)</option>
                  <option value={16}>16 unidades (Caixa Presente)</option>
                  <option value={25}>25 unidades (Caixa Festa)</option>
                  <option value={50}>50 unidades (Cento parcial)</option>
                  <option value={100}>100 unidades (1 Cento)</option>
                </select>
              </div>
            </div>
          )}

          {/* Customer Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-[#E8DFD5] mb-1">Seu Nome:</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: Maria Silva"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#2C1A14] border border-[#D4AF37]/30 rounded-xl p-2.5 pl-8 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/40 focus:outline-none focus:border-[#D4AF37]"
                />
                <User className="w-3.5 h-3.5 text-[#D4AF37] absolute left-2.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#E8DFD5] mb-1">Seu Telefone / WhatsApp:</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Ex: (11) 99999-9999"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#2C1A14] border border-[#D4AF37]/30 rounded-xl p-2.5 pl-8 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/40 focus:outline-none focus:border-[#D4AF37]"
                />
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] absolute left-2.5 top-3" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-[#E8DFD5] mb-1">Data Desejada:</label>
              <div className="relative">
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full bg-[#2C1A14] border border-[#D4AF37]/30 rounded-xl p-2.5 pl-8 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#D4AF37]"
                />
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37] absolute left-2.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#E8DFD5] mb-1">Forma de Recebimento:</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setDeliveryOption('retirada')}
                  className={`py-2 px-2 rounded-xl text-[11px] border text-center transition-all ${
                    deliveryOption === 'retirada'
                      ? 'bg-[#D4AF37] text-[#1F120E] font-semibold border-[#D4AF37]'
                      : 'bg-[#2C1A14] text-[#E8DFD5]/60 border-[#2C1A14]'
                  }`}
                >
                  Retirada
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryOption('entrega')}
                  className={`py-2 px-2 rounded-xl text-[11px] border text-center transition-all ${
                    deliveryOption === 'entrega'
                      ? 'bg-[#D4AF37] text-[#1F120E] font-semibold border-[#D4AF37]'
                      : 'bg-[#2C1A14] text-[#E8DFD5]/60 border-[#2C1A14]'
                  }`}
                >
                  Delivery
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-[#E8DFD5] mb-1">Observações ou mensagem para cartão presente:</label>
            <textarea
              rows={2}
              placeholder="Escreva detalhes de personalização, alergias ou mensagem para o cartão de presente..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#2C1A14] border border-[#D4AF37]/30 rounded-xl p-2.5 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/40 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleSendWhatsApp}
              id="modal-send-whatsapp-btn"
              className="w-full py-4 px-6 text-xs font-semibold uppercase tracking-widest text-[#1F120E] bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#128C7E] rounded-xl shadow-xl hover:shadow-[#25D366]/30 transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 fill-[#1F120E] text-transparent" />
              <span>Enviar Pedido para WhatsApp</span>
            </button>
            <p className="text-[10px] text-center text-[#E8DFD5]/50 mt-2">
              Você será redirecionado para o WhatsApp com a sua mensagem pré-formatada.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
