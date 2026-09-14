import { localeNames, type Locale } from '@/i18n/messages';
import { useI18n } from '@/i18n/I18nProvider';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="rounded-full border border-[rgb(var(--border))]/80 bg-white/55 px-3 py-2 text-sm font-semibold shadow-innerGlow backdrop-blur outline-none transition focus:ring-4 focus:ring-turquoise/15 dark:bg-white/5"
    >
      {Object.entries(localeNames).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
    </select>
  );
}
