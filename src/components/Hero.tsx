import React from 'react';
import { ArrowRight, Sparkles, Heart, Award } from 'lucide-react';

interface HeroProps {
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#1F120E]">
      
      {/* Background Image with Luxury Vignette & Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/encanto_hero_brigadeiros_1786355634397.jpg"
          alt="Brigadeiros Gourmet Encanto Gourmet"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
          referrerPolicy="no-referrer"
        />
        {/* Soft dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F120E] via-[#1F120E]/70 to-[#1F120E]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#1F120E]/40 to-[#1F120E]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FAF7F2] my-auto">
        
        {/* Top Tagline / Discrete Badges */}
        <div className="inline-flex items-center space-x-2 sm:space-x-4 px-4 py-1.5 rounded-full bg-[#FAF7F2]/10 backdrop-blur-md border border-[#D4AF37]/30 text-xs sm:text-sm font-light tracking-widest text-[#E8DFD5] mb-8 animate-fadeIn">
          <span className="flex items-center"><Award className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" /> Artesanal</span>
          <span className="text-[#D4AF37]">•</span>
          <span className="flex items-center"><Sparkles className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" /> Gourmet</span>
          <span className="text-[#D4AF37]">•</span>
          <span className="flex items-center"><Heart className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" /> Feito com carinho</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#FAF7F2] leading-[1.08] tracking-tight mb-6">
          Pequenos momentos <br className="hidden sm:block" />
          <span className="italic font-normal text-[#E5C378]">de encanto.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-light text-[#E8DFD5]/90 leading-relaxed tracking-wide mb-10">
          Brigadeiros gourmet feitos artesanalmente para transformar momentos especiais em experiências inesquecíveis.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onOpenOrderModal}
            id="hero-cta-encomendar"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#1F120E] bg-gradient-to-r from-[#E5C378] via-[#D4AF37] to-[#C59B27] rounded-full shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-3 group"
          >
            <span>Encomendar agora</span>
            <ArrowRight className="w-4 h-4 text-[#1F120E] group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#produtos"
            id="hero-cta-conhecer"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#FAF7F2] bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#FAF7F2]/30 rounded-full transition-all duration-300 hover:border-[#D4AF37] text-center"
          >
            Conhecer os brigadeiros
          </a>
        </div>

        {/* Subtle Decorative Line */}
        <div className="mt-16 flex justify-center items-center space-x-3 text-[#D4AF37]/60">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
          <span className="text-xs font-serif italic tracking-widest text-[#E5C378]">Encanto Gourmet</span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
        </div>

      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <a
        href="#sobre"
        aria-label="Rolar para baixo"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#FAF7F2]/60 hover:text-[#D4AF37] transition-colors animate-bounce"
      >
        <div className="w-6 h-10 rounded-full border border-[#FAF7F2]/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
        </div>
      </a>

    </section>
  );
};
