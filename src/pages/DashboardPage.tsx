import { Megaphone, Plus, QrCode, Settings, Utensils } from 'lucide-react';
import { DashboardSection } from '@/components/dashboard/DashboardSection';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { Button } from '@/components/ui/Button';
import { Input, Label, Select, Textarea } from '@/components/ui/Input';
import { events, menuItems } from '@/data/mock';
import { useCurrency } from '@/currency/CurrencyProvider';
import { formatConvertedCurrency } from '@/lib/currency';
import { useI18n } from '@/i18n/I18nProvider';

export function DashboardPage(){
  const { currency } = useCurrency();
  const { t } = useI18n();
  return (
    <section className="container-page py-12">
      <div className="premium-shell flex flex-col justify-between gap-6 p-7 sm:p-10 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Merchant workspace</p>
          <h1 className="section-title mt-3">{t('dashboardTitle')}</h1>
          <p className="section-copy mt-4">{t('dashboardText')}</p>
        </div>
        <Button><Plus size={18}/> New campaign</Button>
      </div>
      <div className="mt-8"><MetricsGrid/></div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <DashboardSection title="Business profile" description="Storefront settings for marketplace and map discovery.">
          <div className="grid gap-4"><Label>Headline</Label><Input defaultValue="Premium Nordic seafood and tasting menus"/><Label>Business category</Label><Select defaultValue="Restaurant"><option>Restaurant</option><option>Hotel</option><option>Bar</option><option>Café</option><option>Food brand</option></Select><Label>Description</Label><Textarea defaultValue="Elegant hospitality profile with menus, events, offers, and tourist-friendly discovery."/><Button className="w-fit"><Settings size={18}/> Save profile</Button></div>
        </DashboardSection>
        <DashboardSection title="Menu manager" description="Create, translate, price, and tag menu items.">
          <div className="grid gap-3">{menuItems.map(i=><div key={i.id} className="flex items-center justify-between rounded-2xl border border-[rgb(var(--border))]/80 bg-white/45 p-3 text-sm shadow-innerGlow dark:bg-white/5"><span className="flex items-center gap-2"><Utensils size={16}/>{i.name}</span><span className="font-semibold">{formatConvertedCurrency(i.price, i.currency, currency)}</span></div>)}<Button variant="secondary" className="w-fit"><Plus size={18}/> Add menu item</Button></div>
        </DashboardSection>
        <DashboardSection title="Tasting events" description="Publish events, manage seats, pricing, and QR check-in.">
          <div className="grid gap-3">{events.map(e=><div key={e.id} className="rounded-2xl border border-[rgb(var(--border))]/80 bg-white/45 p-4 shadow-innerGlow dark:bg-white/5"><strong>{e.title}</strong><p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">{e.date} · {e.seats} seats · QR check-in enabled</p></div>)}<Button variant="secondary" className="w-fit"><QrCode size={18}/> Create event</Button></div>
        </DashboardSection>
        <DashboardSection title="Offers & marketing" description="Promote menus, tasting events, and nearby tourist campaigns.">
          <div className="grid gap-4"><Label>Campaign goal</Label><Select><option>Nearby tourists</option><option>Lunch traffic</option><option>Hotel guests</option><option>Wine tasting leads</option></Select><Label>Offer</Label><Input defaultValue="Lunch tasting -20%"/><Button className="w-fit"><Megaphone size={18}/> Publish offer</Button></div>
        </DashboardSection>
      </div>
    </section>
  );
}
