import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Locale = 'en' | 'sv' | 'fr' | 'es';

type Dictionary = Record<string, string>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    discover: 'Discover',
    palate: 'Palate DNA',
    concierge: 'Concierge',
    blendLab: 'Blend Lab',
    aiTools: 'TasteFlow AI',
    more: 'More',
    menus: 'Menus',
    events: 'Events',
    pricing: 'Pricing',
    about: 'About', contact: 'Contact Us',
    dashboard: 'Dashboard',
    register: 'Register business',
    marketplaceFooter: 'Marketplace', businessFooter: 'Business', companyFooter: 'Company',
    explore: 'Explore marketplace',
    start: 'Start business profile',

    heroBadge: 'B2B hospitality marketplace',
    heroTitle: 'The premium marketplace for hospitality discovery',
    heroText:
      'TasteFlow gives restaurants, hotels, bars, cafés, and tasting brands a polished way to publish menus, promote offers, host events, and be discovered by nearby guests and tourists.',

    statVenueScore: 'average venue score',
    statMonthlyImpressions: 'monthly local impressions',
    statHospitalityCategories: 'hospitality categories',

    liveDiscovery: 'Live local discovery',
    conciergeDiscoveryTitle: 'Concierge-grade discovery for nearby guests',
    conciergeDiscoveryText:
      'Surface the right venue, menu, offer, or tasting experience based on location, intent, and hospitality category.',
    conciergeReady: 'Concierge-ready discovery',
    conciergeMeta: 'Menus · offers · events · maps · nearby guests',

    platformDepth: 'Platform depth',
    platformTitle: 'Built for hospitality businesses, not just events',
    platformText:
      'TasteFlow combines venue storefronts, multilingual menus, campaign tools, tasting experiences, and location-based discovery in one commercial platform.',

    featureStorefrontsTitle: 'Merchant storefronts',
    featureStorefrontsText:
      'Elegant business pages for restaurants, hotels, bars, cafés, brands, and tourism partners.',
    featureMenusTitle: 'Menu publishing',
    featureMenusText:
      'Multilingual menus with tasting notes, dietary labels, pricing, QR access, and discovery metadata.',
    featureCampaignsTitle: 'Campaign studio',
    featureCampaignsText:
      'Local offers, seasonal campaigns, featured placements, and tourist-facing promotions.',
    featureMarketplaceTitle: 'Marketplace discovery',
    featureMarketplaceText:
      'Category browsing, trust signals, location surfaces, nearby offers, and tasting experiences.',

    curatedDiscovery: 'Curated discovery',
    featuredBusinesses: 'Featured hospitality businesses',
    featuredBusinessesText:
      'Curated venues, menus, offers, and experiences designed for guests already nearby.',
    viewAll: 'View all',
    viewBusinessPage: 'View business page',
    avg: 'Avg.',
    live: 'Live',
    premiumLocalPartner: 'Premium local partner',

    restaurant: 'Restaurant',
    hotel: 'Hotel',
    cafe: 'Café',
    wineBar: 'Wine bar',
    discoverTitle: 'Discover premium hospitality businesses', discoverText: 'Search by business type, menu, offer, distance, rating, city, and tourist relevance with an editorial marketplace feel.',
    menusTitle: 'Curated dishes, drinks, and tasting products', menusText: 'A public menu layer for dishes, drinks, tasting products, dietary tags, translations, and QR-friendly browsing.',
    eventsTitle: 'Tasting events with premium conversion surfaces', eventsText: 'Restaurants, hotels, bars, cafés, and brands can publish bookable experiences and tasting campaigns.',
    pricingTitle: 'Subscription plans for hospitality growth', pricingText: 'Stripe-ready plan cards for SaaS billing, feature gating, marketplace boosts, and multi-location business tools.', choosePlan: 'Choose', planSelected: 'Selected', contactAboutPlan: 'Contact us about this plan',
    aboutTitle: 'A hospitality operating layer for discovery and growth', contactTitle: 'Talk to the TasteFlow team', contactEyebrow: 'Contact us', contactText: 'Do you have a suggestion or want to collaborate with us? We would be glad to hear from you.', emailUs: 'Email us', contactPrompt: 'Share an idea, partnership opportunity, sponsorship proposal, or question with our team.', contactFormTitle: 'Start a conversation', contactFormText: 'Tell us a little about yourself and how we can work together.', nameLabel: 'Name', namePlaceholder: 'Your name', emailLabel: 'Email address', requestLabel: 'How can we help?', businessOption: 'Business onboarding', collaborationOption: 'Collaboration proposal', sponsorOption: 'Sponsorship opportunity', supportOption: 'Product support', messageLabel: 'Message', messagePlaceholder: 'Write your message...', sendMessage: 'Send message', emailReady: 'Your email draft is ready.', dashboardTitle: 'Business dashboard', dashboardText: 'Manage profile, menus, events, offers, campaigns, analytics, subscriptions, and map visibility.',
    registerTitle: 'Register your hospitality business', registerText: 'Create a premium profile for restaurants, hotels, bars, cafés, food and beverage brands, event organizers, and tourism partners.',
  },

  sv: {
    discover: 'Upptäck',
    palate: 'Palat-DNA',
    concierge: 'Concierge',
    blendLab: 'Blandningslabb',
    aiTools: 'TasteFlow AI',
    more: 'Mer',
    menus: 'Menyer',
    events: 'Evenemang',
    pricing: 'Priser',
    about: 'Om oss', contact: 'Kontakta oss',
    dashboard: 'Instrumentpanel',
    register: 'Registrera företag',
    marketplaceFooter: 'Marknadsplats', businessFooter: 'Företag', companyFooter: 'Företag',
    explore: 'Utforska marknadsplatsen',
    start: 'Starta företagsprofil',

    heroBadge: 'B2B-marknadsplats för hospitality',
    heroTitle: 'Den premium marknadsplatsen för hospitality-upptäckt',
    heroText:
      'TasteFlow ger restauranger, hotell, barer, kaféer och smakvarumärken ett elegant sätt att publicera menyer, marknadsföra erbjudanden, arrangera evenemang och bli upptäckta av gäster och turister i närheten.',

    statVenueScore: 'genomsnittligt betyg',
    statMonthlyImpressions: 'lokala visningar per månad',
    statHospitalityCategories: 'hospitality-kategorier',

    liveDiscovery: 'Lokal upptäckt i realtid',
    conciergeDiscoveryTitle: 'Concierge-nivå för gäster i närheten',
    conciergeDiscoveryText:
      'Visa rätt plats, meny, erbjudande eller smakupplevelse baserat på plats, intention och hospitality-kategori.',
    conciergeReady: 'Concierge-klar upptäckt',
    conciergeMeta: 'Menyer · erbjudanden · evenemang · kartor · gäster i närheten',

    platformDepth: 'Plattformsdjup',
    platformTitle: 'Byggt för hospitality-företag, inte bara evenemang',
    platformText:
      'TasteFlow kombinerar företagsprofiler, flerspråkiga menyer, kampanjverktyg, smakupplevelser och platsbaserad upptäckt i en kommersiell plattform.',

    featureStorefrontsTitle: 'Företagsprofiler',
    featureStorefrontsText:
      'Eleganta företagssidor för restauranger, hotell, barer, kaféer, varumärken och turismpartners.',
    featureMenusTitle: 'Menypublicering',
    featureMenusText:
      'Flerspråkiga menyer med smaknoter, kostetiketter, priser, QR-åtkomst och upptäcktsmetadata.',
    featureCampaignsTitle: 'Kampanjstudio',
    featureCampaignsText:
      'Lokala erbjudanden, säsongskampanjer, utvalda placeringar och turistinriktade kampanjer.',
    featureMarketplaceTitle: 'Marknadsplatsupptäckt',
    featureMarketplaceText:
      'Kategoribläddring, förtroendesignaler, platsytor, erbjudanden i närheten och smakupplevelser.',

    curatedDiscovery: 'Kurerad upptäckt',
    featuredBusinesses: 'Utvalda hospitality-företag',
    featuredBusinessesText:
      'Kurerade platser, menyer, erbjudanden och upplevelser för gäster som redan är i närheten.',
    viewAll: 'Visa alla',
    viewBusinessPage: 'Visa företagssida',
    avg: 'Snitt',
    live: 'Live',
    premiumLocalPartner: 'Premium lokal partner',

    restaurant: 'Restaurang',
    hotel: 'Hotell',
    cafe: 'Kafé',
    wineBar: 'Vinbar',
    discoverTitle: 'Upptäck premiumföretag inom hospitality', discoverText: 'Sök efter företagstyp, meny, erbjudande, avstånd, betyg, stad och turistintresse.',
    menusTitle: 'Utvalda rätter, drycker och smakprodukter', menusText: 'En offentlig menyyta för rätter, drycker, smakprodukter, kostetiketter, översättningar och QR-visning.',
    eventsTitle: 'Smakevenemang med premiumkonvertering', eventsText: 'Restauranger, hotell, barer, kaféer och varumärken kan publicera bokningsbara upplevelser och smakskampanjer.',
    pricingTitle: 'Abonnemang för hospitality-tillväxt', pricingText: 'Planer för SaaS-fakturering, funktioner, marknadsplatsplaceringar och flera verksamheter.', choosePlan: 'Välj', planSelected: 'Vald', contactAboutPlan: 'Kontakta oss om denna plan',
    aboutTitle: 'Ett hospitality-lager för upptäckt och tillväxt', contactTitle: 'Kontakta TasteFlow-teamet', contactEyebrow: 'Kontakta oss', contactText: 'Har du ett förslag eller vill du samarbeta med oss? Vi hör gärna från dig.', emailUs: 'Mejla oss', contactPrompt: 'Dela en idé, ett partnerskap, sponsringsförslag eller en fråga med vårt team.', contactFormTitle: 'Starta en dialog', contactFormText: 'Berätta lite om dig själv och hur vi kan samarbeta.', nameLabel: 'Namn', namePlaceholder: 'Ditt namn', emailLabel: 'E-postadress', requestLabel: 'Hur kan vi hjälpa?', businessOption: 'Företagsonboarding', collaborationOption: 'Samarbetsförslag', sponsorOption: 'Sponsringsmöjlighet', supportOption: 'Produktsupport', messageLabel: 'Meddelande', messagePlaceholder: 'Skriv ditt meddelande...', sendMessage: 'Skicka meddelande', emailReady: 'Ditt e-postutkast är klart.', dashboardTitle: 'Företagspanel', dashboardText: 'Hantera profil, menyer, evenemang, erbjudanden, kampanjer, analys, abonnemang och kartvisning.',
    registerTitle: 'Registrera ditt hospitality-företag', registerText: 'Skapa en premiumprofil för restauranger, hotell, barer, kaféer, mat- och dryckesvarumärken, arrangörer och turismpartners.',
  },

  fr: {
    discover: 'Découvrir',
    palate: 'ADN du palais',
    concierge: 'Concierge',
    blendLab: 'Laboratoire',
    aiTools: 'TasteFlow AI',
    more: 'Plus',
    menus: 'Menus',
    events: 'Événements',
    pricing: 'Tarifs',
    about: 'À propos', contact: 'Contactez-nous',
    dashboard: 'Tableau de bord',
    register: 'Inscrire une entreprise',
    marketplaceFooter: 'Marketplace', businessFooter: 'Entreprise', companyFooter: 'Entreprise',
    explore: 'Explorer la marketplace',
    start: 'Créer un profil professionnel',

    heroBadge: 'Marketplace B2B pour l’hospitalité',
    heroTitle: 'La marketplace premium pour la découverte hospitality',
    heroText:
      'TasteFlow offre aux restaurants, hôtels, bars, cafés et marques de dégustation une façon élégante de publier des menus, promouvoir des offres, organiser des événements et être découverts par les clients et touristes à proximité.',

    statVenueScore: 'note moyenne des lieux',
    statMonthlyImpressions: 'impressions locales mensuelles',
    statHospitalityCategories: 'catégories hospitality',

    liveDiscovery: 'Découverte locale en direct',
    conciergeDiscoveryTitle: 'Découverte de niveau concierge pour les clients proches',
    conciergeDiscoveryText:
      'Présentez le bon lieu, menu, offre ou expérience de dégustation selon la localisation, l’intention et la catégorie.',
    conciergeReady: 'Découverte prête pour concierge',
    conciergeMeta: 'Menus · offres · événements · cartes · clients proches',

    platformDepth: 'Profondeur de plateforme',
    platformTitle: 'Conçu pour les entreprises hospitality, pas seulement les événements',
    platformText:
      'TasteFlow combine vitrines professionnelles, menus multilingues, outils de campagne, expériences de dégustation et découverte géolocalisée dans une plateforme commerciale.',

    featureStorefrontsTitle: 'Vitrines professionnelles',
    featureStorefrontsText:
      'Pages élégantes pour restaurants, hôtels, bars, cafés, marques et partenaires touristiques.',
    featureMenusTitle: 'Publication de menus',
    featureMenusText:
      'Menus multilingues avec notes de dégustation, labels alimentaires, prix, accès QR et métadonnées de découverte.',
    featureCampaignsTitle: 'Studio de campagnes',
    featureCampaignsText:
      'Offres locales, campagnes saisonnières, placements mis en avant et promotions touristiques.',
    featureMarketplaceTitle: 'Découverte marketplace',
    featureMarketplaceText:
      'Navigation par catégories, signaux de confiance, surfaces locales, offres proches et expériences de dégustation.',

    curatedDiscovery: 'Découverte sélectionnée',
    featuredBusinesses: 'Entreprises hospitality à la une',
    featuredBusinessesText:
      'Lieux, menus, offres et expériences sélectionnés pour les clients déjà à proximité.',
    viewAll: 'Tout voir',
    viewBusinessPage: 'Voir la page entreprise',
    avg: 'Moy.',
    live: 'Live',
    premiumLocalPartner: 'Partenaire local premium',

    restaurant: 'Restaurant',
    hotel: 'Hôtel',
    cafe: 'Café',
    wineBar: 'Bar à vin',
    discoverTitle: 'Découvrir les entreprises hospitality premium', discoverText: 'Recherchez par type, menu, offre, distance, note, ville et pertinence touristique.',
    menusTitle: 'Plats, boissons et produits de dégustation sélectionnés', menusText: 'Une couche de menus publics avec produits, étiquettes alimentaires, traductions et accès QR.',
    eventsTitle: 'Événements de dégustation et conversion premium', eventsText: 'Les restaurants, hôtels, bars, cafés et marques peuvent publier des expériences réservables.',
    pricingTitle: 'Plans pour la croissance hospitality', pricingText: 'Des plans pour la facturation SaaS, les fonctionnalités, la visibilité et les établissements multiples.', choosePlan: 'Choisir', planSelected: 'Sélectionné', contactAboutPlan: 'Nous contacter au sujet de ce plan',
    aboutTitle: 'Une couche hospitality pour la découverte et la croissance', contactTitle: 'Contacter l’équipe TasteFlow', contactEyebrow: 'Contactez-nous', contactText: 'Vous avez une suggestion ou souhaitez collaborer avec nous ? Nous serons ravis de vous entendre.', emailUs: 'Nous écrire', contactPrompt: 'Partagez une idée, une opportunité de partenariat, une proposition de sponsoring ou une question.', contactFormTitle: 'Commençons une conversation', contactFormText: 'Présentez-vous et expliquez-nous comment nous pourrions travailler ensemble.', nameLabel: 'Nom', namePlaceholder: 'Votre nom', emailLabel: 'Adresse e-mail', requestLabel: 'Comment pouvons-nous vous aider ?', businessOption: 'Inscription d’entreprise', collaborationOption: 'Proposition de collaboration', sponsorOption: 'Opportunité de sponsoring', supportOption: 'Assistance produit', messageLabel: 'Message', messagePlaceholder: 'Écrivez votre message...', sendMessage: 'Envoyer le message', emailReady: 'Votre brouillon d’e-mail est prêt.', dashboardTitle: 'Tableau de bord professionnel', dashboardText: 'Gérez profil, menus, événements, offres, campagnes, analyses, abonnements et visibilité cartographique.',
    registerTitle: 'Inscrire votre entreprise hospitality', registerText: 'Créez un profil premium pour restaurants, hôtels, bars, cafés, marques, organisateurs et partenaires touristiques.',
  },

  es: {
    discover: 'Descubrir',
    palate: 'ADN del paladar',
    concierge: 'Concierge',
    blendLab: 'Laboratorio',
    aiTools: 'TasteFlow AI',
    more: 'Más',
    menus: 'Menús',
    events: 'Eventos',
    pricing: 'Precios',
    about: 'Acerca de', contact: 'Contáctanos',
    dashboard: 'Panel',
    register: 'Registrar negocio',
    marketplaceFooter: 'Marketplace', businessFooter: 'Negocio', companyFooter: 'Empresa',
    explore: 'Explorar marketplace',
    start: 'Crear perfil de negocio',

    heroBadge: 'Marketplace B2B de hospitality',
    heroTitle: 'El marketplace premium para descubrir hospitality',
    heroText:
      'TasteFlow ofrece a restaurantes, hoteles, bares, cafeterías y marcas de degustación una forma elegante de publicar menús, promocionar ofertas, organizar eventos y ser descubiertos por clientes y turistas cercanos.',

    statVenueScore: 'puntuación media del local',
    statMonthlyImpressions: 'impresiones locales mensuales',
    statHospitalityCategories: 'categorías hospitality',

    liveDiscovery: 'Descubrimiento local en vivo',
    conciergeDiscoveryTitle: 'Descubrimiento de nivel concierge para clientes cercanos',
    conciergeDiscoveryText:
      'Muestra el local, menú, oferta o experiencia de degustación adecuada según ubicación, intención y categoría.',
    conciergeReady: 'Descubrimiento listo para concierge',
    conciergeMeta: 'Menús · ofertas · eventos · mapas · clientes cercanos',

    platformDepth: 'Profundidad de plataforma',
    platformTitle: 'Creado para negocios hospitality, no solo eventos',
    platformText:
      'TasteFlow combina escaparates de negocio, menús multilingües, herramientas de campaña, experiencias de degustación y descubrimiento basado en ubicación en una plataforma comercial.',

    featureStorefrontsTitle: 'Escaparates comerciales',
    featureStorefrontsText:
      'Páginas elegantes para restaurantes, hoteles, bares, cafeterías, marcas y socios turísticos.',
    featureMenusTitle: 'Publicación de menús',
    featureMenusText:
      'Menús multilingües con notas de degustación, etiquetas dietéticas, precios, acceso QR y metadatos de descubrimiento.',
    featureCampaignsTitle: 'Estudio de campañas',
    featureCampaignsText:
      'Ofertas locales, campañas de temporada, posiciones destacadas y promociones para turistas.',
    featureMarketplaceTitle: 'Descubrimiento marketplace',
    featureMarketplaceText:
      'Exploración por categorías, señales de confianza, superficies locales, ofertas cercanas y experiencias de degustación.',

    curatedDiscovery: 'Descubrimiento curado',
    featuredBusinesses: 'Negocios hospitality destacados',
    featuredBusinessesText:
      'Locales, menús, ofertas y experiencias seleccionadas para clientes que ya están cerca.',
    viewAll: 'Ver todo',
    viewBusinessPage: 'Ver página del negocio',
    avg: 'Prom.',
    live: 'Live',
    premiumLocalPartner: 'Socio local premium',

    restaurant: 'Restaurante',
    hotel: 'Hotel',
    cafe: 'Cafetería',
    wineBar: 'Bar de vinos',
    discoverTitle: 'Descubre negocios hospitality premium', discoverText: 'Busca por tipo de negocio, menú, oferta, distancia, valoración, ciudad y relevancia turística.',
    menusTitle: 'Platos, bebidas y productos de degustación seleccionados', menusText: 'Una capa pública de menús con productos, etiquetas dietéticas, traducciones y acceso QR.',
    eventsTitle: 'Eventos de degustación con conversión premium', eventsText: 'Restaurantes, hoteles, bares, cafés y marcas pueden publicar experiencias reservables.',
    pricingTitle: 'Planes para el crecimiento hospitality', pricingText: 'Planes preparados para facturación SaaS, funciones, visibilidad y múltiples ubicaciones.', choosePlan: 'Elegir', planSelected: 'Seleccionado', contactAboutPlan: 'Contacta con nosotros sobre este plan',
    aboutTitle: 'Una capa hospitality para descubrimiento y crecimiento', contactTitle: 'Habla con el equipo de TasteFlow', contactEyebrow: 'Contáctanos', contactText: '¿Tienes una sugerencia o quieres colaborar con nosotros? Estaremos encantados de escucharte.', emailUs: 'Escríbenos', contactPrompt: 'Comparte una idea, una oportunidad de colaboración, una propuesta de patrocinio o una pregunta.', contactFormTitle: 'Iniciemos una conversación', contactFormText: 'Cuéntanos un poco sobre ti y cómo podemos trabajar juntos.', nameLabel: 'Nombre', namePlaceholder: 'Tu nombre', emailLabel: 'Correo electrónico', requestLabel: '¿Cómo podemos ayudarte?', businessOption: 'Registro de negocio', collaborationOption: 'Propuesta de colaboración', sponsorOption: 'Oportunidad de patrocinio', supportOption: 'Soporte del producto', messageLabel: 'Mensaje', messagePlaceholder: 'Escribe tu mensaje...', sendMessage: 'Enviar mensaje', emailReady: 'Tu borrador de correo está listo.', dashboardTitle: 'Panel del negocio', dashboardText: 'Gestiona perfil, menús, eventos, ofertas, campañas, analítica, suscripciones y visibilidad en mapas.',
    registerTitle: 'Registra tu negocio hospitality', registerText: 'Crea un perfil premium para restaurantes, hoteles, bares, cafés, marcas, organizadores y socios turísticos.',
  },
};

const localeStorageKey = 'tasteflow.locale';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  const stored = window.localStorage.getItem(localeStorageKey);

  if (stored === 'en' || stored === 'sv' || stored === 'fr' || stored === 'es') {
    return stored;
  }

  return 'en';
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const value = useMemo<I18nContextValue>(() => {
    return {
      locale,
      setLocale(nextLocale) {
        setLocaleState(nextLocale);
        window.localStorage.setItem(localeStorageKey, nextLocale);
        document.documentElement.lang = nextLocale;
      },
      t(key) {
        return dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
      },
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }

  return context;
}

export const locales: Array<{ code: Locale; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'sv', label: 'Svenska' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
];
