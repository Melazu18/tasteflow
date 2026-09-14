import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CurrencySwitcher } from '@/components/CurrencySwitcher';
import { useI18n } from '@/i18n/I18nProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

const primaryLinks = [
  ['discover', '/discover'],
  ['menus', '/menus'],
  ['events', '/events'],
];

const aiLinks = [
  ['palate', '/palate'],
  ['concierge', '/concierge'],
  ['blendLab', '/blend-lab'],
];

const secondaryLinks = [
  ['pricing', '/pricing'],
  ['about', '/about'],
];

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<'ai' | 'more' | null>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeMenu(event: PointerEvent) {
      if (!desktopMenuRef.current?.contains(event.target as Node)) setMenu(null);
    }

    document.addEventListener('pointerdown', closeMenu);
    return () => document.removeEventListener('pointerdown', closeMenu);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))]/70 bg-[rgb(var(--background))]/82 backdrop-blur-2xl">
      <div className="container-page flex h-20 items-center gap-5">
        <Link
          to="/"
          className="flex min-w-fit items-center"
          aria-label="TasteFlow home"
          onClick={() => setOpen(false)}
        >
          <img
            src="/TasteFlow_Logo.png"
            alt="TasteFlow"
            className="h-9 w-auto object-contain sm:h-10 xl:h-11 dark:brightness-0 dark:invert"
          />
        </Link>

        <nav ref={desktopMenuRef} className="mx-auto hidden min-w-0 items-center rounded-full border border-[rgb(var(--border))]/70 bg-white/50 p-1 shadow-innerGlow backdrop-blur-xl dark:bg-white/5 lg:flex">
          {primaryLinks.map(([key, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] shadow-sm'
                    : 'text-[rgb(var(--muted-foreground))] hover:bg-white/70 hover:text-[rgb(var(--foreground))] dark:hover:bg-white/10'
                }`
              }
            >
              {t(key)}
            </NavLink>
          ))}
          <div className="relative">
            <button type="button" onClick={() => setMenu(menu === 'ai' ? null : 'ai')} className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-[rgb(var(--muted-foreground))] hover:bg-white/70 hover:text-[rgb(var(--foreground))] dark:hover:bg-white/10">
              {t('aiTools')}
            </button>
            {menu === 'ai' && <div className="absolute left-0 top-full z-50 mt-2 grid min-w-48 gap-1 rounded-2xl border border-[rgb(var(--border))]/80 bg-[rgb(var(--card))] p-2 shadow-premium">
              {aiLinks.map(([key, to]) => <NavLink key={to} to={to} onClick={() => setMenu(null)} className="rounded-xl px-3 py-2 text-sm font-semibold text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--foreground))]">{t(key)}</NavLink>)}
            </div>}
          </div>
          <div className="relative">
            <button type="button" onClick={() => setMenu(menu === 'more' ? null : 'more')} className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-[rgb(var(--muted-foreground))] hover:bg-white/70 hover:text-[rgb(var(--foreground))] dark:hover:bg-white/10">
              {t('more')}
            </button>
            {menu === 'more' && <div className="absolute right-0 top-full z-50 mt-2 grid min-w-36 gap-1 rounded-2xl border border-[rgb(var(--border))]/80 bg-[rgb(var(--card))] p-2 shadow-premium">
              {secondaryLinks.map(([key, to]) => <NavLink key={to} to={to} onClick={() => setMenu(null)} className="rounded-xl px-3 py-2 text-sm font-semibold text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--secondary))] hover:text-[rgb(var(--foreground))]">{t(key)}</NavLink>)}
            </div>}
          </div>
        </nav>

        <div className="hidden min-w-fit items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <CurrencySwitcher />
          <ThemeToggle />

          <Link to="/business/dashboard">
            <Button variant="outline" className="h-11 whitespace-nowrap px-5">
              {t('dashboard')}
            </Button>
          </Link>

          <Link to="/business/register">
            <Button className="h-11 whitespace-nowrap px-5">{t('register')}</Button>
          </Link>
        </div>

        <button
          className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-[rgb(var(--border))] bg-white/60 shadow-innerGlow backdrop-blur lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="container-page grid gap-2 pb-5 lg:hidden">
          {[...primaryLinks, ...aiLinks, ...secondaryLinks].map(([key, to]) => (
            <Link
              key={to}
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-[rgb(var(--border))]/80 bg-white/70 px-4 py-3 font-semibold shadow-soft dark:bg-white/5"
              to={to}
            >
              {t(key)}
            </Link>
          ))}

          <div className="grid grid-cols-3 gap-2">
            <LanguageSwitcher />
            <CurrencySwitcher />
            <ThemeToggle />
          </div>

          <Link to="/business/dashboard" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full">
              {t('dashboard')}
            </Button>
          </Link>

          <Link to="/business/register" onClick={() => setOpen(false)}>
            <Button className="w-full">{t('register')}</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
