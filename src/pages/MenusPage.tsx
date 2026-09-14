import { MenuCard } from '@/components/marketplace/MenuCard';
import { menuItems } from '@/data/mock';

export function MenusPage() {
  return (
    <section className="container-page py-12">
      <div className="premium-shell p-7 sm:p-10">
        <p className="eyebrow">Menu discovery</p>
        <h1 className="section-title mt-3">Curated dishes, drinks, and tasting products</h1>
        <p className="section-copy mt-4">A public menu layer for dishes, drinks, tasting products, dietary tags, translations, and QR-friendly browsing.</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">{menuItems.map(i=><MenuCard key={i.id} item={i}/>)}</div>
    </section>
  );
}
