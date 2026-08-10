import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Instagram, Phone } from 'lucide-react';
import { INSTAGRAM_URL } from '../data/products';

interface NavbarProps {
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Brigadeiros', href: '#produtos' },
    { name: 'Sobre nós', href: '#sobre' },
    { name: 'Encomendas', href: '#eventos' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#1F120E]/95 backdrop-blur-md py-3 shadow-xl border-b border-[#D4AF37]/20 text-[#FAF7F2]'
          : 'bg-gradient-to-b from-[#1F120E]/80 via-[#1F120E]/40 to-transparent py-5 text-[#FAF7F2]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#hero"
            className="group flex flex-col items-start focus:outline-none"
            id="logo-brand"
          >
            <span className="font-serif-display text-2xl sm:text-3xl font-light tracking-wider text-[#FAF7F2] group-hover:text-[#D4AF37] transition-colors">
              ENCANTO
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans text-[#D4AF37] -mt-1 font-semibold">
              BRIGADEIRIA GOURMET
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-[#FAF7F2]/90 hover:text-[#D4AF37] transition-colors duration-200 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors"
              title="Instagram Encanto Gourmet"
              id="nav-instagram-link"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <button
              onClick={onOpenOrderModal}
              id="nav-cta-button"
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#1F120E] bg-gradient-to-r from-[#E5C378] via-[#D4AF37] to-[#C59B27] rounded-full shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group overflow-hidden"
            >
              <ShoppingBag className="w-4 h-4 mr-2 text-[#1F120E]" />
              <span>Fazer encomenda</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={onOpenOrderModal}
              className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#1F120E] bg-[#D4AF37] rounded-full shadow-md"
              id="mobile-nav-cta"
            >
              Encomendar
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#FAF7F2] hover:text-[#D4AF37] focus:outline-none"
              aria-label="Abrir Menu"
              id="mobile-hamburger-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1F120E] border-b border-[#D4AF37]/20 px-4 pt-4 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif text-[#FAF7F2] hover:text-[#D4AF37] py-2 border-b border-[#2C1A14] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-sm text-[#D4AF37] py-2"
            >
              <Instagram className="w-4 h-4" />
              <span>@encantogourmet_brigadeiria</span>
            </a>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full mt-2 py-3 px-4 text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-[#E5C378] to-[#D4AF37] text-[#1F120E] rounded-full shadow-md text-center flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Fazer Encomenda pelo WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
