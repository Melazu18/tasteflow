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
  coordinates: [number, number];
};

export type MenuItem = {
  id: string;
  venueId: string;
  name: string;
  category: string;
  price: number;
  currency: SupportedCurrency;
  dietary: string[];
  description: string;
  flavor: TastingScores;
};

export type Event = {
  id: string;
  venueId: string;
  title: string;
  date: string;
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
];

export const menuItems: MenuItem[] = [
  {
    id: 'm1',
    venueId: 'nordic-harbor',
    name: 'Sea buckthorn scallop',
    category: 'Tasting',
    price: 185,
    currency: 'SEK',
    dietary: ['Pescatarian'],
    description: 'Scallop, sea buckthorn beurre blanc, dill oil.',
    flavor: { acidity: 4, body: 3, tannin: 1, sweetness: 2, aroma: 4 },
  },
  {
    id: 'm2',
    venueId: 'nordic-harbor',
    name: 'Nordic garden menu',
    category: 'Menu',
    price: 795,
    currency: 'SEK',
    dietary: ['Vegetarian'],
    description: 'A five-course plant-forward seasonal menu.',
    flavor: { acidity: 3, body: 3, tannin: 1, sweetness: 2, aroma: 4 },
  },
  {
    id: 'm3',
    venueId: 'teal-room',
    name: 'Local spirits flight',
    category: 'Drinks',
    price: 245,
    currency: 'DKK',
    dietary: [],
    description: 'Three local spirits with small bites and origin stories.',
    flavor: { acidity: 2, body: 4, tannin: 3, sweetness: 2, aroma: 5 },
  },
  {
    id: 'm4',
    venueId: 'terra-beans',
    name: 'Roast discovery tray',
    category: 'Coffee',
    price: 145,
    currency: 'SEK',
    dietary: ['Vegan option'],
    description: 'Three roasts, aroma notes, and pastry pairing.',
    flavor: { acidity: 4, body: 3, tannin: 1, sweetness: 2, aroma: 5 },
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