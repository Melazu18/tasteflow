export type Locale = 'en' | 'sv' | 'fr' | 'es';

export const localeNames: Record<Locale, string> = {
  en: 'English', sv: 'Svenska', fr: 'Français', es: 'Español'
};

export const messages: Record<Locale, Record<string, string>> = {
  en: {
    home: 'Home', discover: 'Discover', menus: 'Menus', events: 'Events', pricing: 'Pricing',
    about: 'About', contact: 'Contact', dashboard: 'Dashboard', register: 'Register business',
    heroTitle: 'Hospitality discovery, menus, offers, and tasting events in one premium platform.',
    heroText: 'TasteFlow helps restaurants, hotels, bars, cafés, brands, and tasting organizers reach nearby guests and tourists with beautiful business pages, menus, events, campaigns, and local discovery.',
    explore: 'Explore marketplace', start: 'Start business profile'
  },
  sv: {
    home: 'Hem', discover: 'Upptäck', menus: 'Menyer', events: 'Event', pricing: 'Priser',
    about: 'Om', contact: 'Kontakt', dashboard: 'Panel', register: 'Registrera företag',
    heroTitle: 'Hospitality-discovery, menyer, erbjudanden och tasting events i en premiumplattform.',
    heroText: 'TasteFlow hjälper restauranger, hotell, barer, caféer, varumärken och arrangörer att nå gäster och turister i närheten.',
    explore: 'Utforska marknaden', start: 'Starta företagsprofil'
  },
  fr: {
    home: 'Accueil', discover: 'Découvrir', menus: 'Menus', events: 'Événements', pricing: 'Tarifs',
    about: 'À propos', contact: 'Contact', dashboard: 'Tableau de bord', register: 'Inscrire une entreprise',
    heroTitle: 'Découverte hospitality, menus, offres et dégustations dans une plateforme premium.',
    heroText: 'TasteFlow aide restaurants, hôtels, bars, cafés et marques à atteindre clients et touristes à proximité.',
    explore: 'Explorer', start: 'Créer un profil'
  },
  es: {
    home: 'Inicio', discover: 'Descubrir', menus: 'Menús', events: 'Eventos', pricing: 'Precios',
    about: 'Acerca de', contact: 'Contacto', dashboard: 'Panel', register: 'Registrar negocio',
    heroTitle: 'Descubrimiento hospitality, menús, ofertas y catas en una plataforma premium.',
    heroText: 'TasteFlow ayuda a restaurantes, hoteles, bares, cafés y marcas a llegar a clientes y turistas cercanos.',
    explore: 'Explorar', start: 'Crear perfil'
  }
};
