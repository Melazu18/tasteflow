import { CalendarCheck, CalendarDays, Users } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardText, CardTitle } from '@/components/ui/Card';
import { type Event, venues } from '@/data/mock';
import { formatCurrency } from '@/lib/utils';
import { hasReservation, toggleReservation } from '@/lib/reservations';

export function EventCard({ event }: { event: Event }) {
  const venue=venues.find(v=>v.id===event.venueId);
  const [reserved, setReserved] = useState(() => hasReservation(event.id));

  function handleReservation() {
    setReserved(toggleReservation(event.id));
  }

  return (
    <Card className="overflow-hidden">
      <Badge>{event.theme}</Badge>
      <CardTitle className="mt-4">{event.title}</CardTitle>
      <CardText className="mt-1">{venue?.name} · {venue?.city}</CardText>
      <div className="mt-5 grid gap-2 rounded-3xl border border-[rgb(var(--border))]/80 bg-white/45 p-4 text-sm text-[rgb(var(--muted-foreground))] shadow-innerGlow dark:bg-white/5">
        <span className="flex items-center gap-2"><CalendarDays size={16}/>{event.date}</span>
        <span className="flex items-center gap-2"><Users size={16}/>{event.seats} seats</span>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3"><strong className="text-lg">{formatCurrency(event.price)}</strong><Button type="button" variant={reserved ? 'secondary' : 'primary'} onClick={handleReservation}>{reserved && <CalendarCheck size={18}/>} {reserved ? 'Reserved' : 'Reserve'}</Button></div>
    </Card>
  );
}
