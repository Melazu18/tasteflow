import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CurrencySwitcher } from '@/components/CurrencySwitcher';
import { useI18n } from '@/i18n/I18nProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

const links = [
  ['discover', '/discover'],
  ['menus', '/menus'],
  ['events', '/events'],
  ['pricing', '/pricing'],
  ['about', '/about'],
];

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

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
            className="h-9 w-auto object-contain sm:h-10 xl:h-11"
          />
        </Link>

        <nav className="mx-auto hidden items-center rounded-full border border-[rgb(var(--border))]/70 bg-white/50 p-1 shadow-innerGlow backdrop-blur-xl dark:bg-white/5 lg:flex">
          {links.map(([key, to]) => (
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
          {links.map(([key, to]) => (
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
