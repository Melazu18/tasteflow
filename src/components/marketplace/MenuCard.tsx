import { Heart, ImageIcon, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardText, CardTitle } from '@/components/ui/Card';
import { useCurrency } from '@/currency/CurrencyProvider';
import { formatConvertedCurrency } from '@/lib/currency';
import { saveFavoriteIdsToStorage } from '@/lib/menuCatalog';

type MenuCardProps = {
  item: {
    id: string;
    businessId?: string;
    businessName?: string;
    name: string;
    description: string;
    price: number;
    currency: 'EUR' | 'SEK' | 'DKK' | 'NOK' | 'USD' | 'GBP';
    dietaryTags?: string[];
    dietary?: string[];
    allergens?: string[];
    cuisine?: string[];
    drinkType?: string[];
    mealOccasion?: string[];
    imageUrl?: string;
    isAvailable?: boolean;
    category: string;
    isFavorite?: boolean;
  };
  showDetails?: boolean;
};

export function MenuCard({ item, showDetails = true }: MenuCardProps) {
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const dietaryTags = item.dietaryTags ?? item.dietary ?? [];
  const allergens = item.allergens ?? ['None'];
  const cuisine = item.cuisine ?? [];
  const mealOccasion = item.mealOccasion ?? [];
  const isAvailable = item.isAvailable ?? true;
  const businessName = item.businessName ?? 'TasteFlow Venue';

  function toggleFavorite() {
    const saved = JSON.parse(window.localStorage.getItem('tasteflow.favorite-menu-items') ?? '[]') as string[];
    const next = saved.includes(item.id) ? saved.filter((id) => id !== item.id) : [...saved, item.id];
    saveFavoriteIdsToStorage(next);
    window.dispatchEvent(new Event('tasteflow-favorites-changed'));
  }

  function openDetails() {
    navigate(`/venues/${item.businessId ?? item.id}`);
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-44 overflow-hidden bg-[rgb(var(--secondary))]">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="h-full w-full bg-white object-contain p-2" />
        ) : (
          <div className="flex h-full items-center justify-center text-[rgb(var(--muted-foreground))]">
            <ImageIcon size={28} />
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <Badge>{item.category}</Badge>
          <button
            type="button"
            aria-label={item.isFavorite ? 'Remove favorite' : 'Save favorite'}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/70 bg-white/80 text-[rgb(var(--primary))] shadow-soft backdrop-blur dark:border-white/10 dark:bg-slatebrand/80"
            onClick={toggleFavorite}
          >
            <Heart size={16} className={item.isFavorite ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--muted-foreground))]">{businessName}</p>
            <CardTitle className="mt-2 text-xl">{item.name}</CardTitle>
          </div>
          <p className="rounded-2xl bg-white/55 px-3 py-2 text-sm font-semibold shadow-innerGlow dark:bg-white/5">
            {formatConvertedCurrency(item.price, item.currency, currency)}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${isAvailable ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'}`}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
          {mealOccasion.slice(0, 2).map((occasion) => (
            <span key={occasion} className="rounded-full bg-[rgb(var(--secondary))] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--primary))]">
              {occasion}
            </span>
          ))}
        </div>

        <CardText className="mt-4 text-sm leading-6">{item.description}</CardText>

        <div className="mt-4 flex flex-wrap gap-2">
          {dietaryTags.map((d) => (
            <span className="chip normal-case tracking-normal" key={d}>{d}</span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {allergens.length > 0 && allergens[0] !== 'None' && allergens.map((allergen) => (
            <span key={allergen} className="rounded-full border border-[rgb(var(--border))] bg-white/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgb(var(--muted-foreground))] dark:bg-white/5">
              {allergen}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[rgb(var(--border))]/70 pt-4">
          <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--muted-foreground))]">
            {cuisine.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          {showDetails && (
            <Button type="button" variant="secondary" className="h-10 px-4 text-xs" onClick={openDetails}>
              <Sparkles size={14} /> Details
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
