import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { MenuCard } from '@/components/marketplace/MenuCard';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { useI18n } from '@/i18n/I18nProvider';
import { getFavoriteIdsFromStorage, getMenuCatalog } from '@/lib/menuCatalog';

const dietaryOptions = ['Vegetarian', 'Vegan', 'Pescatarian', 'Caffeine-free', 'Vegan option'];
const cuisineOptions = ['Nordic', 'Seasonal', 'Tea', 'Cafe', 'Cocktail'];
const drinkOptions = ['Coffee', 'Tea', 'Wine', 'Cocktail'];
const occasionOptions = ['Breakfast', 'Brunch', 'Dinner', 'Tasting', 'Afternoon'];

export function MenusPage() {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [dietary, setDietary] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [drinkType, setDrinkType] = useState<string[]>([]);
  const [occasion, setOccasion] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'newest'>('recommended');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavoriteIdsFromStorage());
    const onFavoritesChange = () => setFavorites(getFavoriteIdsFromStorage());
    window.addEventListener('tasteflow-favorites-changed', onFavoritesChange);
    return () => window.removeEventListener('tasteflow-favorites-changed', onFavoritesChange);
  }, []);

  const items = useMemo(
    () =>
      getMenuCatalog({
        query,
        dietary,
        cuisine,
        drinkType,
        occasion,
        minPrice,
        maxPrice,
        sortBy,
      }).map((item) => ({ ...item, isFavorite: favorites.includes(item.id) })),
    [query, dietary, cuisine, drinkType, occasion, minPrice, maxPrice, sortBy, favorites],
  );

  function toggleTag(current: string[], nextTag: string) {
    return current.includes(nextTag) ? current.filter((tag) => tag !== nextTag) : [...current, nextTag];
  }

  return (
    <section className="container-page py-12">
      <div className="premium-shell p-7 sm:p-10">
        <p className="eyebrow">Menu discovery</p>
        <h1 className="section-title mt-3">{t('menusTitle')}</h1>
        <p className="section-copy mt-4">{t('menusText')}</p>
      </div>

      <div className="mt-8 premium-shell p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1.6fr_220px_180px]">
          <label className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            <Input className="pl-11" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search menus, dishes, cuisines..." />
          </label>
          <Select value={sortBy} onChange={(event) => setSortBy(event.target.value as 'recommended' | 'price_asc' | 'price_desc' | 'newest')}>
            <option value="recommended">Recommended</option>
            <option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
            <option value="newest">Newest</option>
          </Select>
          <div className="flex items-center gap-2 rounded-2xl border border-[rgb(var(--border))] bg-white/55 px-3 py-2 text-sm font-medium dark:bg-white/5">
            <SlidersHorizontal size={16} className="text-[rgb(var(--muted-foreground))]" />
            <span>{items.length} items</span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_280px]">
          <div className="grid gap-5 md:grid-cols-2">{items.map((item) => <MenuCard key={item.id} item={item} />)}</div>

          <aside className="rounded-[1.5rem] border border-[rgb(var(--border))] bg-white/45 p-4 shadow-soft dark:bg-white/5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(var(--muted-foreground))]">Filters</p>

            <div className="mt-5 space-y-5">
              <div>
                <p className="mb-2 text-sm font-semibold">Dietary</p>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${dietary.includes(tag) ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]' : 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]'}`}
                      onClick={() => setDietary((current) => toggleTag(current, tag))}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Cuisine</p>
                <div className="flex flex-wrap gap-2">
                  {cuisineOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${cuisine.includes(tag) ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]' : 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]'}`}
                      onClick={() => setCuisine((current) => toggleTag(current, tag))}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Drink type</p>
                <div className="flex flex-wrap gap-2">
                  {drinkOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${drinkType.includes(tag) ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]' : 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]'}`}
                      onClick={() => setDrinkType((current) => toggleTag(current, tag))}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Meal occasion</p>
                <div className="flex flex-wrap gap-2">
                  {occasionOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${occasion.includes(tag) ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]' : 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]'}`}
                      onClick={() => setOccasion((current) => toggleTag(current, tag))}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Price range</p>
                <div className="grid gap-3">
                  <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-[rgb(var(--muted-foreground))]">
                    Min
                    <input type="range" min={0} max={1000} value={minPrice} onChange={(event) => setMinPrice(Number(event.target.value))} />
                  </label>
                  <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-[rgb(var(--muted-foreground))]">
                    Max
                    <input type="range" min={0} max={1000} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
                  </label>
                  <div className="flex justify-between text-sm text-[rgb(var(--muted-foreground))]">
                    <span>{minPrice} kr</span>
                    <span>{maxPrice} kr</span>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setQuery('');
                  setDietary([]);
                  setCuisine([]);
                  setDrinkType([]);
                  setOccasion([]);
                  setMinPrice(0);
                  setMaxPrice(1000);
                  setSortBy('recommended');
                }}
              >
                Clear filters
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
