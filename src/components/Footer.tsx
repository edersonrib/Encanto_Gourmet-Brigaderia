import React from 'react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/products';
import { Instagram, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onOpenOrderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderModal }) => {
  return (
    <footer id="contacto" className="bg-[#170D0B] text-[#E8DFD5] pt-16 pb-12 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2C1A14]">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <a href="#hero" className="inline-block">
              <span className="font-serif-display text-2xl font-light tracking-wider text-[#FAF7F2]">
                ENCANTO
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#D4AF37] block -mt-1 font-semibold">
                BRIGADEIRIA GOURMET
              </span>
            </a>
            <p className="text-xs text-[#E8DFD5]/80 leading-relaxed font-light">
              Brigadeiros gourmet artesanais feitos para transformar momentos especiais em experiências inesquecíveis.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2C1A14] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1F120E] transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenOrderModal}
                className="w-9 h-9 rounded-full bg-[#2C1A14] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1F120E] transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#FAF7F2] mb-4 text-[#D4AF37]">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#hero" className="hover:text-[#D4AF37] transition-colors">Início</a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-[#D4AF37] transition-colors">Brigadeiros & Caixas</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#D4AF37] transition-colors">O Nosso Encanto</a>
              </li>
              <li>
                <a href="#eventos" className="hover:text-[#D4AF37] transition-colors">Eventos & Encomendas</a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-[#D4AF37] transition-colors">Depoimentos</a>
              </li>
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#FAF7F2] mb-4 text-[#D4AF37]">
              Contacto & Atendimento
            </h4>
            <ul className="space-y-3 text-xs font-light text-[#E8DFD5]">
              <li className="flex items-start space-x-2.5">
                <MessageCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>WhatsApp: <strong className="text-[#FAF7F2] font-normal">[Telefone / WhatsApp oficial]</strong></span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Instagram className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Instagram: <strong className="text-[#FAF7F2] font-normal">{INSTAGRAM_HANDLE}</strong></span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>E-mail: <strong className="text-[#FAF7F2] font-normal">[E-mail oficial]</strong></span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Localização: <strong className="text-[#FAF7F2] font-normal">[Cidade / Estado - Retiradas sob agendamento]</strong></span>
              </li>
            </ul>
          </div>

          {/* Hours & Orders Note */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#FAF7F2] mb-4 text-[#D4AF37]">
              Horário de Atendimento
            </h4>
            <p className="text-xs text-[#E8DFD5]/80 font-light leading-relaxed mb-3">
              Atendimento sob agendamento prévio para encomendas personalizadas e eventos.
            </p>
            <div className="p-3 bg-[#2C1A14] rounded-xl border border-[#D4AF37]/20 text-[11px] text-[#D4AF37]">
              ✨ Encomendas com pelo menos 24h a 48h de antecedência.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-light text-[#E8DFD5]/60 space-y-4 sm:space-y-0">
          <p>© 2026 Encanto Gourmet. Todos os direitos reservados.</p>
          <p className="text-[11px] italic">Brigadeiria Gourmet Artesanal • Elegância & Sabor</p>
        </div>

      </div>
    </footer>
  );
};
