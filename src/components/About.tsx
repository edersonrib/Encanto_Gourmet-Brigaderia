import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-[#FAF7F2] text-[#2C1A14] relative overflow-hidden">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8DFD5]/40 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Composition with Artisanal Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FFFDF9]">
                <img
                  src="/src/assets/images/encanto_about_craft_1786355649467.jpg"
                  alt="Preparo artesanal do brigadeiro Encanto Gourmet"
                  className="w-full h-[420px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A14]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2]">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Processo Manual</span>
                  <p className="font-serif italic text-lg mt-1">"Cada unidade enrolada à mão com precisão e carinho."</p>
                </div>
              </div>

              {/* Floating Badge Card */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-[#1F120E] text-[#FAF7F2] p-5 rounded-2xl shadow-2xl border border-[#D4AF37]/30 max-w-[220px]">
                <div className="flex items-center space-x-3 mb-1">
                  <div className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-2xl font-semibold text-[#D4AF37]">100%</span>
                </div>
                <p className="text-xs text-[#E8DFD5] leading-snug">Chocolates e Ingredientes Nobres Selecionados</p>
              </div>

              {/* Decorative Frame Line */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#D4AF37]/30 rounded-2xl -z-10 hidden sm:block" />
            </div>
          </div>

          {/* Right Column: Editorial Copy & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-block">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-2">
                O Nosso Encanto
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-light text-[#2C1A14] leading-tight">
                Mais do que brigadeiros. <br />
                <span className="italic text-[#6E473B]">Uma experiência.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#523C33] leading-relaxed font-light">
              Acreditamos que um doce pode fazer muito mais do que adoçar um momento. Pode criar memórias, celebrar conquistas, aproximar pessoas e transformar ocasiões especiais em momentos inesquecíveis.
            </p>

            <p className="text-sm sm:text-base text-[#6E574F] leading-relaxed font-light">
              Na Encanto Gourmet, fugimos do industrializado para resgatar a verdadeira essência da confecção artesanal. Trabalhamos exclusivamente com chocolares de origem, leites nobres e embalagens que parecem verdadeiras caixas de joias.
            </p>

            {/* Micro Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8DFD5]">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-full bg-[#E8DFD5]/60 text-[#2C1A14] mt-0.5">
                  <HeartHandshake className="w-4 h-4 text-[#6E473B]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#2C1A14]">Afeto em Cada Detalhe</h3>
                  <p className="text-xs text-[#6E574F]">Produção em pequenos lotes diários para garantir o máximo de frescor.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-full bg-[#E8DFD5]/60 text-[#2C1A14] mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#6E473B]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#2C1A14]">Qualidade sem Concessões</h3>
                  <p className="text-xs text-[#6E574F]">Sem conservantes artificiais ou aromatizantes sintéticos.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#produtos"
                className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-[#2C1A14] hover:text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1 transition-colors group"
              >
                <span>Descobrir Nossos Sabores Exclusivos</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
