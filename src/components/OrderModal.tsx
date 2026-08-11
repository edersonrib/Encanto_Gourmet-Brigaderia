import React, { useState, useEffect } from 'react';
import { BrigadeiroProduct } from '../types';
import { BRIGADEIRO_PRODUCTS, WHATSAPP_NUMBER_PLACEHOLDER } from '../data/products';
import { X, MessageCircle, ShoppingBag, Gift, Calendar, User, Phone, MapPin, CheckCircle2, Copy, Check, Settings2 } from 'lucide-react';

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

  // Store target WhatsApp configuration
  const [storeWhatsapp, setStoreWhatsapp] = useState<string>(() => {
    const saved = localStorage.getItem('encanto_store_whatsapp');
    if (!saved || saved === '5500000000000' || saved.length < 9) {
      localStorage.setItem('encanto_store_whatsapp', WHATSAPP_NUMBER_PLACEHOLDER);
      return WHATSAPP_NUMBER_PLACEHOLDER;
    }
    return saved;
  });
  const [showPhoneConfig, setShowPhoneConfig] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);

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

  const buildMessageText = () => {
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
    return messageText;
  };

  const handleCopySummary = () => {
    const text = buildMessageText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendWhatsApp = () => {
    // Sanitize store phone number
    const targetPhoneDigits = (storeWhatsapp || WHATSAPP_NUMBER_PLACEHOLDER).replace(/\D/g, '');

    // Check if target phone is placeholder 5500000000000 or invalid
    if (!targetPhoneDigits || targetPhoneDigits === '5500000000000' || targetPhoneDigits.length < 9) {
      setPhoneError(true);
      setShowPhoneConfig(true);
      return;
    }

    setPhoneError(false);
    // Save valid store number to localStorage for future orders
    localStorage.setItem('encanto_store_whatsapp', targetPhoneDigits);

    const messageText = buildMessageText();
    const encodedText = encodeURIComponent(messageText);
    
    // Direct WhatsApp link that opens WhatsApp app or WhatsApp Web
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhoneDigits}&text=${encodedText}`;
    
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
            Preencha os detalhes e envie o resumo do seu pedido diretamente para o WhatsApp do nosso ateliê.
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

          {/* Store WhatsApp Target Input Section */}
          <div className="pt-2 border-t border-[#2C1A14]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-[#D4AF37] flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                Destinatário do Pedido: <strong className="text-[#FAF7F2] ml-1">+{storeWhatsapp.replace(/\D/g, '')}</strong>
              </span>
              <button
                type="button"
                onClick={() => setShowPhoneConfig(!showPhoneConfig)}
                className="text-[10px] text-[#E8DFD5]/60 hover:text-[#D4AF37] underline flex items-center"
              >
                <Settings2 className="w-3 h-3 mr-1" />
                {showPhoneConfig ? 'Ocultar' : 'Configurar número'}
              </button>
            </div>

            {(showPhoneConfig || phoneError) && (
              <div className="mb-3 p-3 rounded-xl bg-[#2C1A14] border border-[#D4AF37]/40 space-y-2 animate-fadeIn text-left">
                <label className="block text-[10px] text-[#E8DFD5]/80">
                  Número do WhatsApp da Encanto Gourmet (com código de país, ex: 351960158850):
                </label>
                <div className="flex space-x-2">
                  <input
                    type="tel"
                    placeholder="Ex: 351960158850"
                    value={storeWhatsapp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setStoreWhatsapp(val);
                      localStorage.setItem('encanto_store_whatsapp', val);
                      setPhoneError(false);
                    }}
                    className="flex-1 bg-[#1F120E] border border-[#D4AF37]/40 rounded-lg p-2 text-xs text-[#FAF7F2] placeholder-[#E8DFD5]/40 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setStoreWhatsapp(WHATSAPP_NUMBER_PLACEHOLDER);
                      localStorage.setItem('encanto_store_whatsapp', WHATSAPP_NUMBER_PLACEHOLDER);
                      setPhoneError(false);
                    }}
                    className="px-2.5 py-1 text-[10px] bg-[#1F120E] hover:bg-[#D4AF37] text-[#FAF7F2] hover:text-[#1F120E] border border-[#D4AF37]/40 rounded-lg transition-colors shrink-0"
                  >
                    Restaurar Padrão
                  </button>
                </div>
                {phoneError && (
                  <p className="text-[10px] text-amber-300">
                    ⚠️ Por favor, informe um número de WhatsApp válido (ex: 351960158850).
                  </p>
                )}
              </div>
            )}

            {/* Note explaining WhatsApp self-chat behavior */}
            <div className="mb-3 p-2.5 rounded-xl bg-[#2C1A14]/70 border border-[#D4AF37]/20 text-[10.5px] text-[#E8DFD5]/80 leading-relaxed">
              💡 <strong>Dica de Teste:</strong> Se estiver a testar no próprio telemóvel registado com o número <strong>+351 960 158 850</strong>, o WhatsApp abre a conversa com <i>Você (consigo mesmo)</i>. Quando um <strong>cliente real</strong> clica no botão, o WhatsApp abre o chat direto com o seu ateliê!
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                id="modal-send-whatsapp-btn"
                className="sm:col-span-8 py-3.5 px-4 text-xs font-semibold uppercase tracking-widest text-[#1F120E] bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#128C7E] rounded-xl shadow-xl hover:shadow-[#25D366]/30 transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 fill-[#1F120E] text-transparent" />
                <span>Enviar Pedido para WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleCopySummary}
                className="sm:col-span-4 py-3.5 px-3 text-xs font-medium text-[#FAF7F2] bg-[#2C1A14] hover:bg-[#D4AF37] hover:text-[#1F120E] border border-[#D4AF37]/30 rounded-xl transition-all flex items-center justify-center space-x-1.5"
                title="Copiar o texto formatado da encomenda"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
              </button>
            </div>

            <p className="text-[10px] text-center text-[#E8DFD5]/50 mt-2">
              Você também pode copiar o resumo do pedido e colar diretamente no chat do WhatsApp.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

