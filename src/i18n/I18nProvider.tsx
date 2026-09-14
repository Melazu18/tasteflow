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
    menus: 'Menus',
    events: 'Events',
    pricing: 'Pricing',
    about: 'About',
    dashboard: 'Dashboard',
    register: 'Register business',
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
  },

  sv: {
    discover: 'Upptäck',
    palate: 'Palat-DNA',
    concierge: 'Concierge',
    blendLab: 'Blandningslabb',
    menus: 'Menyer',
    events: 'Evenemang',
    pricing: 'Priser',
    about: 'Om oss',
    dashboard: 'Instrumentpanel',
    register: 'Registrera företag',
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
  },

  fr: {
    discover: 'Découvrir',
    palate: 'ADN du palais',
    concierge: 'Concierge',
    blendLab: 'Laboratoire',
    menus: 'Menus',
    events: 'Événements',
    pricing: 'Tarifs',
    about: 'À propos',
    dashboard: 'Tableau de bord',
    register: 'Inscrire une entreprise',
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
  },

  es: {
    discover: 'Descubrir',
    palate: 'ADN del paladar',
    concierge: 'Concierge',
    blendLab: 'Laboratorio',
    menus: 'Menús',
    events: 'Eventos',
    pricing: 'Precios',
    about: 'Acerca de',
    dashboard: 'Panel',
    register: 'Registrar negocio',
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
