//HomePage.tsx
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  ConciergeBell,
  Megaphone,
  ShoppingBag,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardText, CardTitle } from '@/components/ui/Card';
import { VenueCard } from '@/components/marketplace/VenueCard';
import { venues } from '@/data/mock';
import { useI18n } from '@/i18n/I18nProvider';

const features: Array<[string, string, typeof Building2]> = [
  [
    'Merchant storefronts',
    'Elegant business pages for restaurants, hotels, bars, cafés, brands, and tourism partners.',
    Building2,
  ],
  [
    'Menu publishing',
    'Multilingual menus with tasting notes, dietary labels, pricing, QR access, and discovery metadata.',
    Utensils,
  ],
  [
    'Campaign studio',
    'Local offers, seasonal campaigns, featured placements, and tourist-facing promotions.',
    Megaphone,
  ],
  [
    'Marketplace discovery',
    'Category browsing, trust signals, location surfaces, nearby offers, and tasting experiences.',
    ShoppingBag,
  ],
];

const stats = [
  ['4.8', 'average venue score'],
  ['18k', 'monthly local impressions'],
  ['7', 'hospitality categories'],
];

const discoveryRows = [
  ['Nordic Harbor Kitchen', 'Restaurant · 0.8 km · Seafood tasting menu'],
  ['The Teal Room Hotel Bar', 'Hotel bar · 1.4 km · Cocktail flight'],
  ['Terra Beans Café', 'Café · 0.5 km · Coffee and pastry pairing'],
];

export function HomePage() {
  const { t } = useI18n();

  return (
    <>
      <section className="container-page py-8 lg:py-12">
        <div className="premium-shell grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="chip w-fit">
              <Sparkles size={14} /> B2B hospitality marketplace
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-[4.85rem]">
              The premium marketplace for hospitality discovery
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[rgb(var(--muted-foreground))]">
              TasteFlow gives restaurants, hotels, bars, cafés, and tasting brands a polished way to publish menus,
              promote offers, host events, and be discovered by nearby guests and tourists.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/discover">
                <Button className="w-full sm:w-auto">
                  {t('explore')} <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/business/register">
                <Button variant="outline" className="w-full sm:w-auto">
                  {t('start')}
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-[rgb(var(--border))]/70 bg-white/55 p-4 shadow-innerGlow backdrop-blur dark:bg-white/5"
                >
                  <strong className="text-2xl font-semibold tracking-[-0.04em]">{value}</strong>
                  <p className="mt-1 text-xs leading-5 text-[rgb(var(--muted-foreground))]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-premium backdrop-blur dark:border-white/10 dark:bg-slatebrand/80">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(15,118,110,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lagoon/15 blur-3xl" />
              <div className="absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-turquoise/20 blur-3xl" />

              <div className="relative">
                <div className="mb-6 inline-flex rounded-full border border-brass/25 bg-cream/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-lagoon">
                  Live local discovery
                </div>

                <h2 className="max-w-md text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                  Concierge-grade discovery for nearby guests
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Surface the right venue, menu, offer, or tasting experience based on location, intent, and
                  hospitality category.
                </p>

                <div className="mt-8 grid gap-3">
                  {discoveryRows.map(([name, meta]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/80 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/10"
                    >
                      <div>
                        <p className="font-semibold text-slate-950 dark:text-white">{name}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{meta}</p>
                      </div>
                      <span className="rounded-full bg-lagoon/10 px-3 py-1 text-xs font-bold text-lagoon dark:bg-turquoise/10 dark:text-turquoise">
                        Live
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {['Menus', 'Offers', 'Events', 'Maps', 'Tourists'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/10">
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                    <ConciergeBell size={16} /> Concierge-ready discovery
                  </p>
                  <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">
                    Menus · offers · events · maps · nearby guests
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow">Platform depth</p>
          <h2 className="section-title mt-3">Built for hospitality businesses, not just events</h2>
          <p className="section-copy mt-4">
            TasteFlow combines venue storefronts, multilingual menus, campaign tools, tasting experiences, and
            location-based discovery in one commercial platform.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, text, Icon]) => (
            <Card key={title} className="min-h-56">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[rgb(var(--secondary))] text-lagoon dark:text-turquoise">
                <Icon />
              </span>
              <CardTitle className="mt-5">{title}</CardTitle>
              <CardText className="mt-2">{text}</CardText>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Curated discovery</p>
            <h2 className="section-title mt-3">Featured hospitality businesses</h2>
            <p className="section-copy mt-3">
              Curated venues, menus, offers, and experiences designed for guests already nearby.
            </p>
          </div>

          <Link className="hidden font-semibold text-lagoon hover:text-turquoise sm:block" to="/discover">
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {venues.slice(0, 3).map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </div>
      </section>
    </>
  );
}