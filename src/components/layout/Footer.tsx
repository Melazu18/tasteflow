import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';

const footerLinks = [
  [
    ['discover', '/discover'],
    ['menus', '/menus'],
    ['events', '/events'],
  ],
  [
    ['dashboard', '/business/dashboard'],
    ['register', '/business/register'],
  ],
  [
    ['pricing', '/pricing'],
    ['about', '/about'],
    ['contact', '/contact'],
  ],
];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-[rgb(var(--border))]/70 py-12">
      <div className="container-page">
        <div className="premium-shell grid gap-8 p-7 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
          <div>
            <img src="/TasteFlow_Logo.png" alt="TasteFlow" className="h-12 w-auto object-contain dark:brightness-0 dark:invert" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-[rgb(var(--muted-foreground))]">A premium marketplace for hospitality discovery, menus, events, offers, and B2B growth.</p>
          </div>
          {['marketplaceFooter','businessFooter','companyFooter'].map((h, i) => (
            <div key={h}>
              <p className="eyebrow">{t(h)}</p>
              <div className="mt-4 grid gap-2 text-sm font-medium text-[rgb(var(--muted-foreground))]">
                {footerLinks[i].map(([key, to]) => (
                  <Link key={to} to={to} className="hover:text-[rgb(var(--foreground))]">
                    {t(key)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
