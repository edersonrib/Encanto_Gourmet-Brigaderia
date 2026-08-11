export const BRAND_CONFIG = {
  name: 'Encanto Gourmet',
  tagline: 'Brigadeiria & Ateliê Gourmet',
  whatsappNumber: '351960158850', // E.164 formatted without plus sign (e.g., 351960158850)
  whatsappDisplay: '+351 960 158 850',
  instagramHandle: '@encantogourmet_brigadeiria',
  instagramUrl: 'https://www.instagram.com/encantogourmet_brigadeiria/',
  email: 'contacto@encantogourmet.pt',
  address: 'Portugal (Ateliê com retiradas e entregas sob agendamento)',
  businessHours: 'Segunda a Sábado: 09:00 - 19:00',
  city: 'Portugal',
};

export const getWhatsAppLink = (messageText: string, customNumber?: string): string => {
  const targetNumber = (customNumber || localStorage.getItem('encanto_store_whatsapp') || BRAND_CONFIG.whatsappNumber).replace(/\D/g, '');
  const encodedText = encodeURIComponent(messageText);
  return `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodedText}`;
};
