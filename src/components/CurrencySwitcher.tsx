import { supportedCurrencies, currencySymbols } from '@/lib/currency';
import { useCurrency } from '@/currency/CurrencyProvider';

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(event) => setCurrency(event.target.value as typeof currency)}
      className="h-11 rounded-full border border-[rgb(var(--border))] bg-white/75 px-4 text-sm font-semibold text-[rgb(var(--foreground))] shadow-soft outline-none transition hover:bg-white focus:border-lagoon dark:bg-white/10"
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
