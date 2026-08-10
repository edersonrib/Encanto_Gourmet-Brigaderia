import React from 'react';
import { ChefHat, Gem, Gift, PartyPopper, Sparkles } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: ChefHat,
      title: 'Feito artesanalmente',
      description: 'Cada brigadeiro é preparado individualmente à mão, com técnicas de alta confeitaria, fogo brando e paciência.',
    },
    {
      icon: Gem,
      title: 'Ingredientes selecionados',
      description: 'Chocolates belgas de origem nobre, manteiga pura de primeira qualidade e pastas concentradas de frutas e oleaginosas.',
    },
    {
      icon: Gift,
      title: 'Apresentação impecável',
      description: 'Embalagens rígidas personalizadas com laços acetinados. Porque uma verdadeira experiência começa pelos olhos.',
    },
    {
      icon: PartyPopper,
      title: 'Feito para celebrar',
      description: 'O toque doce e inesquecível ideal para presentes corporativos, casamentos, datas comemorativas e momentos a dois.',
    },
  ];

  return (
    <section className="py-24 bg-[#1F120E] text-[#FAF7F2] relative overflow-hidden border-y border-[#D4AF37]/20">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-2">
            A Nossa Experiência
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-light text-[#FAF7F2]">
            Por que a Encanto Gourmet é única?
          </h2>
          <div className="mt-4 w-16 h-[1px] bg-[#D4AF37] mx-auto" />
        </div>

        {/* 4 Benefits Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-[#2C1A14]/60 p-8 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#1F120E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#FAF7F2] mb-3 group-hover:text-[#E5C378] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#E8DFD5]/80 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#FAF7F2]/10 flex items-center justify-between text-[10px] uppercase tracking-widest text-[#D4AF37]">
                  <span>Padrão Gourmet</span>
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
