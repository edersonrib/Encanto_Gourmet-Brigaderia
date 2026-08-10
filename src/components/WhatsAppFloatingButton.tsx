import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppFloatingButtonProps {
  onOpenOrderModal: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ onOpenOrderModal }) => {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-3">
      {/* Tooltip Badge */}
      {tooltipVisible && (
        <div className="hidden sm:flex items-center space-x-2 bg-[#1F120E] text-[#FAF7F2] text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-[#D4AF37]/40 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-medium text-[#FAF7F2]">Faça sua encomenda no WhatsApp</span>
          <button
            onClick={() => setTooltipVisible(false)}
            className="text-[#E8DFD5]/60 hover:text-white ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={onOpenOrderModal}
        id="floating-whatsapp-btn"
        className="group relative p-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
        aria-label="Fazer pedido pelo WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <MessageCircle className="w-6 h-6 fill-white text-[#128C7E]" />
      </button>
    </div>
  );
};
