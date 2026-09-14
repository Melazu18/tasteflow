import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[rgb(var(--border))]/70 py-12">
      <div className="container-page">
        <div className="premium-shell grid gap-8 p-7 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
          <div>
            <img src="/TasteFlow_Logo.png" alt="TasteFlow" className="h-12 w-auto object-contain" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-[rgb(var(--muted-foreground))]">A premium marketplace for hospitality discovery, menus, events, offers, and B2B growth.</p>
          </div>
          {['Marketplace','Business','Company'].map((h,i)=>(
            <div key={h}>
              <p className="eyebrow">{h}</p>
              <div className="mt-4 grid gap-2 text-sm font-medium text-[rgb(var(--muted-foreground))]">
                <Link to="/discover" className="hover:text-[rgb(var(--foreground))]">Discover</Link>
                <Link to="/menus" className="hover:text-[rgb(var(--foreground))]">Menus</Link>
                <Link to={i===1?'/business/dashboard':'/pricing'} className="hover:text-[rgb(var(--foreground))]">{i===1?'Dashboard':'Pricing'}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
