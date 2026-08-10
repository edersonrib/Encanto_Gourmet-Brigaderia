import React from 'react';
import { INSTAGRAM_URL } from '../data/products';
import { MessageCircle, Instagram, Sparkles } from 'lucide-react';

interface CTAProps {
  onOpenOrderModal: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenOrderModal }) => {
  return (
    <section className="py-24 bg-[#1F120E] text-[#FAF7F2] relative overflow-hidden border-t border-[#D4AF37]/30">
      
      {/* Background Lighting Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#382119]/60 via-[#1F120E] to-[#1F120E]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs uppercase tracking-widest text-[#D4AF37] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atendimento Personalizado</span>
        </div>

        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-[#FAF7F2] mb-6">
          Pronto para experimentar <br />
          <span className="italic text-[#E5C378]">o seu momento de encanto?</span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg font-light text-[#E8DFD5] leading-relaxed mb-10">
          Faça a sua encomenda e descubra o sabor de um brigadeiro feito para surpreender você e seus convidados.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onOpenOrderModal}
            id="cta-final-whatsapp-btn"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#1F120E] bg-gradient-to-r from-[#E5C378] via-[#D4AF37] to-[#C59B27] rounded-full shadow-2xl hover:shadow-[#D4AF37]/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <MessageCircle className="w-4 h-4 text-[#1F120E]" />
            <span>Fazer encomenda pelo WhatsApp</span>
          </button>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-final-instagram-btn"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#FAF7F2] bg-white/10 hover:bg-white/20 border border-[#FAF7F2]/30 rounded-full transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Instagram className="w-4 h-4 text-[#D4AF37]" />
            <span>Conhecer o Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
};
