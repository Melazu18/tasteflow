import { Link, useParams } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardText, CardTitle } from '@/components/ui/Card';
import { EventCard } from '@/components/marketplace/EventCard';
import { MenuCard } from '@/components/marketplace/MenuCard';
import { events, menuItems, venues } from '@/data/mock';

export function VenuePage() {
  const { venueId }=useParams();
  const venue=venues.find(v=>v.id===venueId) ?? venues[0];
  const items=menuItems.filter(i=>i.venueId===venue.id);
  const evs=events.filter(e=>e.venueId===venue.id);
  return (
    <section className="container-page py-12">
      <div className="premium-shell overflow-hidden">
        <div className="relative h-72 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,.85),transparent_18%),linear-gradient(135deg,rgba(13,102,96,.98),rgba(18,171,157,.56)_52%,rgba(180,136,71,.34))]" />
        <div className="p-6 md:p-9">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <Badge>{venue.type}</Badge>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">{venue.name}</h1>
              <p className="mt-3 flex items-center gap-2 text-[rgb(var(--muted-foreground))]"><MapPin size={18}/>{venue.city}, {venue.country} · {venue.distanceKm} km nearby</p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[rgb(var(--muted-foreground))]">{venue.description}</p>
            </div>
            <Card className="min-w-64 bg-white/70 dark:bg-white/5">
              <CardText>Public trust score</CardText>
              <p className="mt-2 flex items-center gap-2 text-3xl font-semibold"><Star className="fill-current text-brass"/> {venue.rating}</p>
              <CardText className="mt-1">{venue.reviews} reviews · {venue.offer}</CardText>
              <Button className="mt-5 w-full">Contact business</Button>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div><h2 className="text-2xl font-semibold tracking-[-0.04em]">Published menu</h2><div className="mt-5 grid gap-4">{items.length ? items.map(i=><MenuCard key={i.id} item={i}/>) : <Card><CardTitle>No menu items yet</CardTitle><CardText>This business can publish multilingual menus from the dashboard.</CardText></Card>}</div></div>
        <div><h2 className="text-2xl font-semibold tracking-[-0.04em]">Upcoming events</h2><div className="mt-5 grid gap-4">{evs.length ? evs.map(e=><EventCard key={e.id} event={e}/>) : <Card><CardTitle>No upcoming event</CardTitle><CardText>Create tasting events and publish them to nearby guests.</CardText><Link to="/events"><Button className="mt-4">Browse events</Button></Link></Card>}</div></div>
      </div>
    </section>
  );
}
