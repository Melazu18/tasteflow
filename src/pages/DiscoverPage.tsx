import { useMemo, useState } from 'react';
import { DiscoveryFilters } from '@/components/marketplace/DiscoveryFilters';
import { MapPreview } from '@/components/marketplace/MapPreview';
import { VenueCard } from '@/components/marketplace/VenueCard';
import { venues } from '@/data/mock';

export function DiscoverPage() {
  const [query,setQuery]=useState('');
  const [type,setType]=useState('all');
  const filtered=useMemo(()=>venues.filter(v=>(type==='all'||v.type===type)&&`${v.name} ${v.city} ${v.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())),[query,type]);
  return (
    <section className="container-page py-12">
      <div className="max-w-3xl">
        <p className="eyebrow">Marketplace</p>
        <h1 className="section-title mt-3">Discover premium hospitality businesses</h1>
        <p className="section-copy mt-4">Search by business type, menu, offer, distance, rating, city, and tourist relevance with an editorial marketplace feel.</p>
      </div>
      <div className="mt-8"><DiscoveryFilters query={query} setQuery={setQuery} type={type} setType={setType}/></div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="grid gap-5 md:grid-cols-2">{filtered.map(v=><VenueCard key={v.id} venue={v}/>)}</div>
        <div className="lg:sticky lg:top-28 lg:h-fit"><MapPreview/></div>
      </div>
    </section>
  );
}
