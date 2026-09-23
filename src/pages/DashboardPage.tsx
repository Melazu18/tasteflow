import { useState } from 'react';
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
  const [campaignComposerOpen, setCampaignComposerOpen] = useState(false);
  const [campaignName, setCampaignName] = useState('Lunch tasting -20%');
  const [campaignGoal, setCampaignGoal] = useState('Nearby tourists');
  const [campaigns, setCampaigns] = useState<string[]>(['Lunch tasting -20%', 'Weekend sea-food intro']);

  function handleCreateCampaign() {
    const trimmedName = campaignName.trim();
    if (!trimmedName) return;

    setCampaigns((current) => [trimmedName, ...current]);
    setCampaignName('');
    setCampaignGoal('Nearby tourists');
    setCampaignComposerOpen(false);
  }

  return (
    <section className="container-page py-12">
      <div className="premium-shell flex flex-col justify-between gap-6 p-7 sm:p-10 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Merchant workspace</p>
          <h1 className="section-title mt-3">{t('dashboardTitle')}</h1>
          <p className="section-copy mt-4">{t('dashboardText')}</p>
        </div>
        <Button type="button" onClick={() => setCampaignComposerOpen((open) => !open)}><Plus size={18}/> {campaignComposerOpen ? 'Close campaign' : 'New campaign'}</Button>
      </div>

      {campaignComposerOpen && (
        <div className="premium-shell mt-8 p-6 sm:p-8">
          <div className="mb-5">
            <p className="eyebrow">Campaign composer</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Create a new marketing campaign</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label>Campaign name</Label>
              <Input value={campaignName} onChange={(event) => setCampaignName(event.target.value)} placeholder="Lunch tasting -20%" />
            </div>
            <div>
              <Label>Campaign goal</Label>
              <Select value={campaignGoal} onChange={(event) => setCampaignGoal(event.target.value)}>
                <option>Nearby tourists</option>
                <option>Lunch traffic</option>
                <option>Hotel guests</option>
                <option>Wine tasting leads</option>
              </Select>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="button" onClick={handleCreateCampaign}><Megaphone size={18}/> Save campaign</Button>
            <Button type="button" variant="secondary" onClick={() => setCampaignComposerOpen(false)}>Cancel</Button>
          </div>
        </div>
      )}

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
          <div className="grid gap-4">
            <div>
              <Label>Campaign goal</Label>
              <Select value={campaignGoal} onChange={(event) => setCampaignGoal(event.target.value)}>
                <option>Nearby tourists</option>
                <option>Lunch traffic</option>
                <option>Hotel guests</option>
                <option>Wine tasting leads</option>
              </Select>
            </div>
            <div>
              <Label>Offer</Label>
              <Input value={campaignName || 'Lunch tasting -20%'} onChange={(event) => setCampaignName(event.target.value)} />
            </div>
            <div className="rounded-2xl border border-[rgb(var(--border))]/80 bg-white/45 p-3 text-sm shadow-innerGlow dark:bg-white/5">
              <p className="font-semibold">Active campaigns</p>
              <ul className="mt-2 space-y-2 text-[rgb(var(--muted-foreground))]">
                {campaigns.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
            <Button className="w-fit" onClick={handleCreateCampaign}><Megaphone size={18}/> Publish offer</Button>
          </div>
        </DashboardSection>
      </div>
    </section>
  );
}
