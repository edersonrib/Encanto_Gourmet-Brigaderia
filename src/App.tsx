import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { Benefits } from './components/Benefits';
import { Events } from './components/Events';
import { InstagramGallery } from './components/InstagramGallery';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { OrderModal } from './components/OrderModal';
import { BrigadeiroProduct } from './types';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<BrigadeiroProduct | null>(null);
  const [preselectedBox, setPreselectedBox] = useState<{
    boxSize: number;
    selectedFlavors: { product: BrigadeiroProduct; count: number }[];
    ribbonColor: string;
    totalPrice: number;
  } | null>(null);

  const handleOpenGeneralOrder = () => {
    setPreselectedProduct(null);
    setPreselectedBox(null);
    setIsOrderModalOpen(true);
  };

  const handleSelectProductToOrder = (product: BrigadeiroProduct) => {
    setPreselectedProduct(product);
    setPreselectedBox(null);
    setIsOrderModalOpen(true);
  };

  const handleOrderCustomBox = (
    boxSize: number,
    selectedFlavors: { product: BrigadeiroProduct; count: number }[],
    ribbonColor: string,
    totalPrice: number
  ) => {
    setPreselectedBox({
      boxSize,
      selectedFlavors,
      ribbonColor,
      totalPrice,
    });
    setPreselectedProduct(null);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1A14] font-sans selection:bg-[#D4AF37]/20 selection:text-[#2C1A14]">
      {/* Top Header Navigation */}
      <Navbar onOpenOrderModal={handleOpenGeneralOrder} />

      {/* Main Page Sections */}
      <main>
        <Hero onOpenOrderModal={handleOpenGeneralOrder} />
        
        <About />
        
        <Products
          onSelectProductToOrder={handleSelectProductToOrder}
          onOrderCustomBox={handleOrderCustomBox}
        />
        
        <Benefits />
        
        <Events onOpenEventModal={handleOpenGeneralOrder} />
        
        <InstagramGallery />
        
        <Testimonials />
        
        <CTA onOpenOrderModal={handleOpenGeneralOrder} />
      </main>

      {/* Footer */}
      <Footer onOpenOrderModal={handleOpenGeneralOrder} />

      {/* Mobile-first Floating WhatsApp Button */}
      <WhatsAppFloatingButton onOpenOrderModal={handleOpenGeneralOrder} />

      {/* Order Modal Drawer */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        preselectedProduct={preselectedProduct}
        preselectedBox={preselectedBox}
      />
    </div>
  );
}
