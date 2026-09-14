import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardText, CardTitle } from '@/components/ui/Card';
import { type Venue } from '@/data/mock';
import { useI18n } from '@/i18n/I18nProvider';

export function VenueCard({ venue }: { venue: Venue }) {
  const { t } = useI18n();
  return (
    <Card className="group overflow-hidden p-0">
      <div className="relative h-48 overflow-hidden bg-[rgb(var(--secondary))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.92),transparent_22%),linear-gradient(135deg,rgba(13,102,96,.92),rgba(18,171,157,.42)_48%,rgba(180,136,71,.28))]" />
        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
          <Badge className="bg-white/75 backdrop-blur">{venue.type}</Badge>
          <span className="rounded-full bg-slatebrand/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{venue.price}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{venue.name}</CardTitle>
            <CardText>{venue.city} · {venue.country}</CardText>
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">{venue.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">{venue.tags.slice(0,3).map(t=><span className="chip normal-case tracking-normal" key={t}>{t}</span>)}</div>
        <div className="mt-5 flex items-center justify-between text-sm font-medium">
          <span className="flex items-center gap-1"><Star size={16} className="fill-current text-brass"/> {venue.rating} <span className="text-[rgb(var(--muted-foreground))]">({venue.reviews})</span></span>
          <span className="flex items-center gap-1 text-[rgb(var(--muted-foreground))]"><MapPin size={16}/>{venue.distanceKm} km</span>
        </div>
        <Link to={`/venues/${venue.id}`} className="mt-5 block rounded-full bg-[rgb(var(--primary))] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(13,102,96,.24)]">{t('viewBusinessPage')}</Link>
      </div>
    </Card>
  );
}
