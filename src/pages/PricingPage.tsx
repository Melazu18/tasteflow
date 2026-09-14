import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardText, CardTitle } from '@/components/ui/Card';

const plans: Array<[string, string, string[], string]> = [
  ['Starter', '49', ['Business profile','Menu publishing','Basic discovery','Email leads'], 'For single venues getting started'],
  ['Growth', '129', ['Everything in Starter','Offers & campaigns','Tasting events','Map boosts','Analytics'], 'Best for active restaurants, bars, and hotels'],
  ['Pro', '299', ['Multi-location dashboard','Featured placements','Tourist targeting','Advanced analytics','Priority support'], 'For groups, brands, and tourism partners'],
];

export function PricingPage(){
  return (
    <section className="container-page py-12">
      <div className="premium-shell p-7 sm:p-10">
        <p className="eyebrow">Commercial plans</p>
        <h1 className="section-title mt-3">Subscription plans for hospitality growth</h1>
        <p className="section-copy mt-4">Stripe-ready plan cards for SaaS billing, feature gating, marketplace boosts, and multi-location business tools.</p>
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {plans.map(([name,price,features,subtitle])=>(
          <Card key={name} className={name==='Growth'?'relative overflow-hidden ring-2 ring-turquoise/70':''}>
            {name==='Growth' && <span className="absolute right-5 top-5 rounded-full bg-brass px-3 py-1 text-xs font-semibold text-white">Recommended</span>}
            <CardTitle>{name}</CardTitle>
            <CardText className="mt-2">{subtitle}</CardText>
            <p className="mt-7 text-5xl font-semibold tracking-[-0.05em]">€{price}<span className="text-base font-normal tracking-normal text-[rgb(var(--muted-foreground))]">/mo</span></p>
            <div className="my-7 luxury-divider" />
            <div className="grid gap-3">{features.map(f=><p className="flex items-center gap-2 text-sm font-medium" key={f}><Check size={16} className="text-lagoon"/>{f}</p>)}</div>
            <Button className="mt-8 w-full" variant={name==='Growth'?'primary':'outline'}>Choose {name}</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
