import { supportedCurrencies, currencySymbols } from '@/lib/currency';
import { useCurrency } from '@/currency/CurrencyProvider';

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(event) => setCurrency(event.target.value as typeof currency)}
      className="h-11 min-w-0 w-full rounded-full border border-[rgb(var(--border))] bg-white/75 px-4 text-sm font-semibold text-[rgb(var(--foreground))] shadow-soft outline-none transition hover:bg-white focus:border-lagoon dark:border-[rgb(var(--border))] dark:bg-[rgb(var(--card))] dark:text-[rgb(var(--foreground))] sm:w-auto"
      aria-label="Select currency"
    >
      {supportedCurrencies.map((item) => (
        <option key={item} value={item}>
          {currencySymbols[item]} {item}
        </option>
      ))}
    </select>
  );
}
