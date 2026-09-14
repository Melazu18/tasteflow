import { Search, SlidersHorizontal } from 'lucide-react';
import { Input, Select } from '@/components/ui/Input';

export function DiscoveryFilters({ query, setQuery, type, setType }: { query: string; setQuery: (v:string)=>void; type: string; setType: (v:string)=>void }) {
 return (
  <div className="premium-shell grid gap-3 p-3 md:grid-cols-[1fr_220px_190px]">
    <label className="relative">
      <Search className="absolute left-4 top-3.5 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
      <Input className="pl-11" placeholder="Search restaurants, hotels, menus, offers..." value={query} onChange={(e)=>setQuery(e.target.value)} />
    </label>
    <Select value={type} onChange={(e)=>setType(e.target.value)}>
      <option value="all">All business types</option><option>Restaurant</option><option>Hotel</option><option>Wine bar</option><option>Café</option><option>Food brand</option><option>Beverage brand</option><option>Event organizer</option>
    </Select>
    <label className="relative">
      <SlidersHorizontal className="absolute left-4 top-3.5 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
      <Select className="pl-11"><option>Nearby first</option><option>Best rated</option><option>Tourist offers</option><option>Upcoming events</option></Select>
    </label>
  </div>
 );
}
