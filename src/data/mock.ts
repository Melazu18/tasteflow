import type { SupportedCurrency } from '@/lib/currency';
import type { TastingScores } from '@/lib/palate';

export type BusinessType =
  | 'Restaurant'
  | 'Hotel'
  | 'Wine bar'
  | 'Café'
  | 'Food brand'
  | 'Beverage brand'
  | 'Event organizer';

export type Venue = {
  id: string;
  name: string;
  type: BusinessType;
  city: string;
  country: string;
  rating: number;
  reviews: number;
  distanceKm: number;
  price: string;
  averagePrice: number;
  currency: SupportedCurrency;
  tags: string[];
  description: string;
  offer: string;
  website?: string;
  coordinates: [number, number];
};

export type MenuItem = {
  id: string;
  venueId: string;
  businessId?: string;
  businessName?: string;
  locale?: 'en' | 'sv' | 'fr' | 'es';
  name: string;
  category: string;
  price: number;
  currency: SupportedCurrency;
  dietary: string[];
  allergens?: string[];
  cuisine?: string[];
  drinkType?: string[];
  mealOccasion?: string[];
  description: string;
  imageUrl?: string;
  isAvailable?: boolean;
  availability?: Array<{
    day: string;
    start: string;
    end: string;
    available: boolean;
  }>;
  flavor: TastingScores;
};

export type Event = {
  id: string;
  venueId: string;
  title: string;
  date: string;
  recurrence?: string;
  address?: string;
  seats: number;
  price: number;
  currency: SupportedCurrency;
  theme: string;
};

export const venues: Venue[] = [
  {
    id: 'nordic-harbor',
    name: 'Nordic Harbor Kitchen',
    type: 'Restaurant',
    city: 'Stockholm',
    country: 'Sweden',
    rating: 4.8,
    reviews: 284,
    distanceKm: 0.8,
    price: '€€€',
    averagePrice: 420,
    currency: 'SEK',
    tags: ['Seafood', 'Nordic', 'Tourist friendly'],
    description: 'Elegant waterfront restaurant with seasonal tasting menus and multilingual menus.',
    offer: 'Lunch tasting -20%',
    coordinates: [59.3293, 18.0686],
  },
  {
    id: 'teal-room',
    name: 'The Teal Room Hotel Bar',
    type: 'Hotel',
    city: 'Copenhagen',
    country: 'Denmark',
    rating: 4.7,
    reviews: 192,
    distanceKm: 1.4,
    price: '€€',
    averagePrice: 295,
    currency: 'DKK',
    tags: ['Cocktails', 'Hotel guests', 'Live tasting'],
    description: 'A hotel bar that packages local spirits, small plates, and curated experiences.',
    offer: 'Two-for-one aperitivo',
    coordinates: [55.6761, 12.5683],
  },
  {
    id: 'terra-beans',
    name: 'Terra Beans Café',
    type: 'Café',
    city: 'Malmö',
    country: 'Sweden',
    rating: 4.6,
    reviews: 141,
    distanceKm: 0.5,
    price: '€',
    averagePrice: 95,
    currency: 'SEK',
    tags: ['Coffee', 'Bakery', 'Remote work'],
    description: 'A calm café with roast flights, pastry pairings, and tourist discovery offers.',
    offer: 'Free pastry pairing',
    coordinates: [55.605, 13.0038],
  },
  {
    id: 'verde-cellar',
    name: 'Verde Cellar',
    type: 'Wine bar',
    city: 'Barcelona',
    country: 'Spain',
    rating: 4.9,
    reviews: 421,
    distanceKm: 2.2,
    price: '€€€',
    averagePrice: 65,
    currency: 'EUR',
    tags: ['Wine', 'Tapas', 'Sommelier'],
    description: 'Premium wine bar for curated flights, producer stories, and tasting events.',
    offer: 'Reserve a cellar flight',
    coordinates: [41.3874, 2.1686],
  },
  {
    id: 'tropinord',
    name: 'TropiNord',
    type: 'Beverage brand',
    city: 'Trollhättan',
    country: 'Sweden',
    rating: 5,
    reviews: 0,
    distanceKm: 0,
    price: '€€',
    averagePrice: 145,
    currency: 'SEK',
    tags: ['Premium tea', 'Tea tasting', 'Trollhättan'],
    description: 'Premium teas and guided tasting sessions hosted with local cafés in Trollhättan.',
    offer: 'Tea tasting sessions every month',
    website: 'https://www.tropinord.com',
    coordinates: [58.2837, 12.2886],
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 'm1',
    venueId: 'nordic-harbor',
    businessId: 'nordic-harbor',
    businessName: 'Nordic Harbor Kitchen',
    locale: 'en',
    name: 'Sea buckthorn scallop',
    category: 'Tasting',
    price: 185,
    currency: 'SEK',
    dietary: ['Pescatarian'],
    allergens: ['Shellfish', 'Dairy'],
    cuisine: ['Nordic'],
    drinkType: ['Wine'],
    mealOccasion: ['Dinner', 'Tasting'],
    description: 'Scallop, sea buckthorn beurre blanc, dill oil.',
    imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
    isAvailable: true,
    availability: [
      { day: 'Mon', start: '17:00', end: '22:00', available: true },
      { day: 'Tue', start: '17:00', end: '22:00', available: true },
      { day: 'Wed', start: '17:00', end: '22:00', available: true },
    ],
    flavor: { acidity: 4, body: 3, tannin: 1, sweetness: 2, aroma: 4 },
  },
  {
    id: 'm2',
    venueId: 'nordic-harbor',
    businessId: 'nordic-harbor',
    businessName: 'Nordic Harbor Kitchen',
    locale: 'en',
    name: 'Nordic garden menu',
    category: 'Menu',
    price: 795,
    currency: 'SEK',
    dietary: ['Vegetarian'],
    allergens: ['Gluten', 'Sesame'],
    cuisine: ['Nordic', 'Seasonal'],
    drinkType: ['Tea'],
    mealOccasion: ['Dinner', 'Chef tasting'],
    description: 'A five-course plant-forward seasonal menu.',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    isAvailable: true,
    flavor: { acidity: 3, body: 3, tannin: 1, sweetness: 2, aroma: 4 },
  },
  {
    id: 'm3',
    venueId: 'teal-room',
    businessId: 'teal-room',
    businessName: 'The Teal Room Hotel Bar',
    locale: 'en',
    name: 'Local spirits flight',
    category: 'Drinks',
    price: 245,
    currency: 'DKK',
    dietary: [],
    allergens: ['None'],
    cuisine: ['Cocktail'],
    drinkType: ['Cocktail'],
    mealOccasion: ['Evening', 'Hotel bar'],
    description: 'Three local spirits with small bites and origin stories.',
    imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
    isAvailable: true,
    flavor: { acidity: 2, body: 4, tannin: 3, sweetness: 2, aroma: 5 },
  },
  {
    id: 'm4',
    venueId: 'terra-beans',
    businessId: 'terra-beans',
    businessName: 'Terra Beans Café',
    locale: 'en',
    name: 'Roast discovery tray',
    category: 'Coffee',
    price: 145,
    currency: 'SEK',
    dietary: ['Vegan option'],
    allergens: ['None'],
    cuisine: ['Cafe'],
    drinkType: ['Coffee'],
    mealOccasion: ['Breakfast', 'Brunch'],
    description: 'Three roasts, aroma notes, and pastry pairing.',
    imageUrl: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=900&q=80',
    isAvailable: true,
    flavor: { acidity: 4, body: 3, tannin: 1, sweetness: 2, aroma: 5 },
  },
  {
    id: 'm5',
    venueId: 'tropinord',
    businessId: 'tropinord',
    businessName: 'TropiNord',
    locale: 'en',
    name: 'TropiNord Signature Tea Collection',
    category: 'Premium tea',
    price: 245,
    currency: 'SEK',
    dietary: ['Vegan'],
    allergens: ['None'],
    cuisine: ['Tea'],
    drinkType: ['Tea'],
    mealOccasion: ['Afternoon', 'Tasting'],
    description: 'A curated collection of high-quality teas selected for aroma, balance, and memorable tasting sessions.',
    imageUrl: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80',
    isAvailable: true,
    flavor: { acidity: 2, body: 3, tannin: 2, sweetness: 3, aroma: 5 },
  },
  {
    id: 'm6',
    venueId: 'tropinord',
    businessId: 'tropinord',
    businessName: 'TropiNord',
    locale: 'en',
    name: 'Nordic Botanical Infusion',
    category: 'Tea blend',
    price: 165,
    currency: 'SEK',
    dietary: ['Caffeine-free', 'Vegan'],
    allergens: ['None'],
    cuisine: ['Tea'],
    drinkType: ['Tea'],
    mealOccasion: ['Afternoon'],
    description: 'A fragrant botanical blend created for slow afternoons and guided sensory exploration.',
    imageUrl: 'https://images.unsplash.com/photo-1466669424601-7a17c3416d41?auto=format&fit=crop&w=900&q=80',
    isAvailable: true,
    flavor: { acidity: 1, body: 2, tannin: 1, sweetness: 4, aroma: 5 },
  },
];

export const events: Event[] = [
  {
    id: 'e1',
    venueId: 'verde-cellar',
    title: 'Catalan natural wine night',
    date: '2026-07-02',
    seats: 18,
    price: 59,
    currency: 'EUR',
    theme: 'Wine tasting',
  },
  {
    id: 'e2',
    venueId: 'nordic-harbor',
    title: 'New Nordic seafood preview',
    date: '2026-07-09',
    seats: 24,
    price: 895,
    currency: 'SEK',
    theme: 'Restaurant tasting',
  },
  {
    id: 'e3',
    venueId: 'terra-beans',
    title: 'Coffee origin cupping',
    date: '2026-07-13',
    seats: 12,
    price: 240,
    currency: 'SEK',
    theme: 'Coffee workshop',
  },
  {
    id: 'e4',
    venueId: 'tropinord',
    title: 'TropiNord tea tasting at 12 Knots Coffee Roasters AB',
    date: '2026-09-26',
    recurrence: 'Every last Saturday · 12:00',
    address: 'Österlånggatan 42, 46130 Trollhättan, Sweden',
    seats: 20,
    price: 0,
    currency: 'SEK',
    theme: 'Tea tasting',
  },
  {
    id: 'e5',
    venueId: 'tropinord',
    title: 'TropiNord tea tasting at Restaurang Västan',
    date: '2026-09-24',
    recurrence: 'Every last Thursday · 12:00',
    address: 'Högskolan Väst (University West), Gustava Melins Gata 2, 461 32 Trollhättan, Sweden',
    seats: 20,
    price: 0,
    currency: 'SEK',
    theme: 'Tea tasting',
  },
];

export const metrics = [
  {
    label: 'Nearby impressions',
    value: '18.4k',
    delta: '+22%',
  },
  {
    label: 'Menu scans',
    value: '2,913',
    delta: '+15%',
  },
  {
    label: 'Event bookings',
    value: '148',
    delta: '+31%',
  },
  {
    label: 'Offer redemptions',
    value: '396',
    delta: '+12%',
  },
];