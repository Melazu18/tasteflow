import { MapPin, Navigation } from 'lucide-react';
import { venues } from '@/data/mock';

export function MapPreview() {
  return (
    <div className="premium-shell relative min-h-[390px] overflow-hidden bg-gradient-to-br from-porcelain via-mint to-turquoise/15 p-6 dark:from-slatebrand dark:via-[#173A38] dark:to-turquoise/10">
      <div className="glass-map absolute inset-0 opacity-80" />
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brass/20 blur-3xl" />
      <div className="relative z-10 max-w-sm">
        <div className="chip">Live local discovery</div>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.045em]">Nearby businesses, tourist offers, and tasting events</h3>
        <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-foreground))]">A map-ready surface for venues, menus, campaigns, local experiences, and proximity signals.</p>
      </div>
      {venues.map((v,i)=>(
        <div key={v.id} className="absolute z-10 rounded-full border border-white/70 bg-white/85 p-2 shadow-premium backdrop-blur dark:border-white/10 dark:bg-slatebrand/90" style={{left:`${16+i*18}%`, top:`${46+(i%2)*21}%`}} title={v.name}>
          <MapPin className="text-lagoon dark:text-turquoise" />
        </div>
      ))}
      <div className="absolute bottom-6 right-6 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/10">
        <p className="flex items-center gap-2 text-sm font-semibold"><Navigation size={16}/> Stockholm radius</p>
        <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">2.4 km · 14 active offers</p>
      </div>
    </div>
  );
}
