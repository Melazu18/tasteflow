import { EventCard } from '@/components/marketplace/EventCard';
import { events } from '@/data/mock';

export function EventsPage() {
  return (
    <section className="container-page py-12">
      <div className="premium-shell p-7 sm:p-10">
        <p className="eyebrow">Experiences</p>
        <h1 className="section-title mt-3">Tasting events with premium conversion surfaces</h1>
        <p className="section-copy mt-4">Restaurants, hotels, bars, cafés, and brands can publish bookable experiences and tasting campaigns.</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{events.map(e=><EventCard key={e.id} event={e}/>)}</div>
    </section>
  );
}
