import React from 'react';
import { Calendar, Users, Heart, Briefcase, Gift, GlassWater, ArrowRight } from 'lucide-react';

interface EventsProps {
  onOpenEventModal: () => void;
}

export const Events: React.FC<EventsProps> = ({ onOpenEventModal }) => {
  const eventTypes = [
    { icon: Heart, name: 'Casamentos & Noivados', desc: 'Mesas de doces inesquecíveis e lembrancinhas sofisticadas.' },
    { icon: Calendar, name: 'Aniversários & Bodas', desc: 'Celebre a vida com caixas degustação e combinações exclusivas.' },
    { icon: GlassWater, name: 'Batizados & Chá de Bebê', desc: 'Delicadeza visual e sabores suaves para saudar novas vidas.' },
    { icon: Briefcase, name: 'Eventos Corporativos', desc: 'Kits institucionais personalizados para clientes e colaboradores VIP.' },
    { icon: Gift, name: 'Presentes & Datas Especiais', desc: 'Dia dos Namorados, Páscoa, Natal e momentos espontâneos de carinho.' },
    { icon: Users, name: 'Reuniões & Petit Comité', desc: 'Pequenas recepções intimistas que exigem um toque de gastronomia.' },
  ];

  return (
    <section id="eventos" className="py-24 bg-[#FAF7F2] text-[#2C1A14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card Container */}
        <div className="bg-[#1F120E] text-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Text & Occasions Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D4AF37] block mb-3">
                Encomendas Especiais & Eventos
              </span>
              <h2 className="font-serif-display text-3xl sm:text-5xl font-light leading-tight text-[#FAF7F2] mb-4">
                Seu momento merece um toque de encanto.
              </h2>
              <p className="text-sm sm:text-base font-light text-[#E8DFD5] leading-relaxed mb-8">
                Daquela pequena celebração aos grandes momentos, criamos doces artesanais que harmonizam com a atmosfera da sua ocasião.
              </p>

              {/* Event Possibilities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {eventTypes.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-[#2C1A14]/60 border border-[#D4AF37]/20">
                      <div className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-serif text-sm font-semibold text-[#FAF7F2]">{item.name}</h3>
                        <p className="text-[11px] text-[#E8DFD5]/70 line-clamp-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <button
                onClick={onOpenEventModal}
                id="events-cta-btn"
                className="inline-flex items-center space-x-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#1F120E] bg-gradient-to-r from-[#E5C378] via-[#D4AF37] to-[#C59B27] rounded-full shadow-xl hover:shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <span>Fazer uma encomenda para evento</span>
                <ArrowRight className="w-4 h-4 text-[#1F120E] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column Photo */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
            <img
              src="/src/assets/images/encanto_event_table_1786355675509.jpg"
              alt="Mesa de doces Encanto Gourmet em evento de gala"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F120E] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#1F120E] lg:via-transparent lg:to-transparent" />
            <div className="absolute bottom-6 right-6 bg-[#1F120E]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-[#D4AF37]/30 text-right">
              <span className="text-[10px] uppercase font-semibold text-[#D4AF37] tracking-widest block">Consultoria de Doces</span>
              <span className="text-xs font-serif italic text-[#FAF7F2]">Atendimento sob medida para festas</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
