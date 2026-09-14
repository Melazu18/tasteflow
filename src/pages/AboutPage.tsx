import { Card, CardText, CardTitle } from '@/components/ui/Card';

export function AboutPage(){
  return (
    <section className="container-page py-12">
      <div className="premium-shell p-7 sm:p-10">
        <p className="eyebrow">About</p>
        <h1 className="section-title mt-3">TasteFlow is hospitality infrastructure, not just event software</h1>
        <p className="section-copy mt-4">TasteFlow combines B2B onboarding, marketplace discovery, merchant dashboards, event publishing, offers, menu management, and local tourism visibility in a refined product surface.</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {['Etsy-style business ownership','Booking-style discovery','TripAdvisor-style trust'].map(t=><Card key={t}><CardTitle>{t}</CardTitle><CardText className="mt-2">Front-end modules are ready to connect to APIs, authentication, billing, database services, and real map providers.</CardText></Card>)}
      </div>
    </section>
  );
}
