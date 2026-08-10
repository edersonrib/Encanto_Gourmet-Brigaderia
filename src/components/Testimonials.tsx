import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-24 bg-[#1F120E] text-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-2">
            Avaliações de Clientes
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-light text-[#FAF7F2]">
            Quem prova, se encanta.
          </h2>
          <p className="text-xs text-[#E8DFD5]/60 mt-2 italic">
            Feedback e experiências vivenciadas por nossos clientes em datas especiais.
          </p>
          <div className="mt-4 w-12 h-[1px] bg-[#D4AF37] mx-auto" />
        </div>

        {/* 3 Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#2C1A14] p-8 rounded-2xl border border-[#D4AF37]/20 shadow-xl flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/30 absolute top-6 right-6" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4 text-[#D4AF37]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm font-light text-[#E8DFD5] leading-relaxed italic mb-6">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#FAF7F2]">
                    {item.author}
                  </h3>
                  <span className="text-[11px] text-[#D4AF37] block font-medium">
                    {item.eventType}
                  </span>
                </div>
                <span className="text-[10px] text-[#E8DFD5]/50 uppercase tracking-wider">
                  {item.date}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
