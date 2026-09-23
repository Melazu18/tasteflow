import { menuItems } from '@/data/mock';
import type { SupportedCurrency } from '@/lib/currency';

export type MenuCatalogFilters = {
  query?: string;
  dietary?: string[];
  cuisine?: string[];
  drinkType?: string[];
  occasion?: string[];
  minPrice?: number;
  maxPrice?: number;
  locale?: string;
  sortBy?: 'recommended' | 'price_asc' | 'price_desc' | 'newest';
};

export type CatalogMenuItem = {
  id: string;
  businessId: string;
  businessName: string;
  name: string;
  description: string;
  price: number;
  currency: SupportedCurrency;
  dietaryTags: string[];
  allergens: string[];
  cuisine: string[];
  drinkType: string[];
  mealOccasion: string[];
  imageUrl?: string;
  isAvailable: boolean;
  isFavorite?: boolean;
  category: string;
};

function normalizeText(value: string) {
  return value.toLowerCase();
}

export function getMenuCatalog(filters: MenuCatalogFilters = {}): CatalogMenuItem[] {
  const normalizedQuery = normalizeText(filters.query ?? '');
  const dietary = filters.dietary ?? [];
  const cuisine = filters.cuisine ?? [];
  const drinkType = filters.drinkType ?? [];
  const occasion = filters.occasion ?? [];

  const filtered = menuItems.filter((item) => {
    const haystack = [
      item.name,
      item.description,
      item.category,
      item.businessName ?? '',
      ...(item.dietary ?? []),
      ...(item.cuisine ?? []),
      ...(item.drinkType ?? []),
      ...(item.mealOccasion ?? []),
    ]
      .join(' ')
      .toLowerCase();

    const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
    const matchesDietary = dietary.length === 0 || dietary.every((tag) => item.dietary.includes(tag));
    const matchesCuisine = cuisine.length === 0 || cuisine.every((tag) => (item.cuisine ?? []).includes(tag));
    const matchesDrinkType = drinkType.length === 0 || drinkType.every((tag) => (item.drinkType ?? []).includes(tag));
    const matchesOccasion = occasion.length === 0 || occasion.every((tag) => (item.mealOccasion ?? []).includes(tag));
    const matchesMinPrice = typeof filters.minPrice === 'number' ? item.price >= filters.minPrice : true;
    const matchesMaxPrice = typeof filters.maxPrice === 'number' ? item.price <= filters.maxPrice : true;

    return matchesQuery && matchesDietary && matchesCuisine && matchesDrinkType && matchesOccasion && matchesMinPrice && matchesMaxPrice;
  });

  const sorted = [...filtered];

  switch (filters.sortBy) {
    case 'price_asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      sorted.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case 'recommended':
    default:
      sorted.sort((a, b) => (b.flavor.aroma ?? 0) - (a.flavor.aroma ?? 0));
      break;
  }

  return sorted.map((item) => ({
    id: item.id,
    businessId: item.businessId ?? item.venueId,
    businessName: item.businessName ?? 'TasteFlow Venue',
    name: item.name,
    description: item.description,
    price: item.price,
    currency: item.currency,
    dietaryTags: item.dietary,
    allergens: item.allergens ?? ['None'],
    cuisine: item.cuisine ?? [],
    drinkType: item.drinkType ?? [],
    mealOccasion: item.mealOccasion ?? [],
    imageUrl: item.imageUrl,
    isAvailable: item.isAvailable ?? true,
    category: item.category,
  }));
}

export function getFavoriteIdsFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem('tasteflow.favorite-menu-items') ?? '[]');
  } catch {
    return [];
  }
}

export function saveFavoriteIdsToStorage(ids: string[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('tasteflow.favorite-menu-items', JSON.stringify(ids));
}
