export type SupportedCurrency = 'EUR' | 'SEK' | 'DKK' | 'NOK' | 'USD' | 'GBP';

export const supportedCurrencies: SupportedCurrency[] = ['EUR', 'SEK', 'DKK', 'NOK', 'USD', 'GBP'];

export const currencyLabels: Record<SupportedCurrency, string> = {
  EUR: 'Euro',
  SEK: 'Swedish krona',
  DKK: 'Danish krone',
  NOK: 'Norwegian krone',
  USD: 'US dollar',
  GBP: 'British pound',
};

export const currencySymbols: Record<SupportedCurrency, string> = {
  EUR: '€',
  SEK: 'kr',
  DKK: 'kr.',
  NOK: 'kr',
  USD: '$',
  GBP: '£',
};

/**
 * Static demo rates using EUR as the reference currency.
 * In production, replace this with live exchange rates from your backend.
 */
const eurRates: Record<SupportedCurrency, number> = {
  EUR: 1,
  SEK: 11.3,
  DKK: 7.46,
  NOK: 11.6,
  USD: 1.08,
  GBP: 0.85,
};

export function convertCurrency(
  amount: number,
  fromCurrency: SupportedCurrency,
  toCurrency: SupportedCurrency,
) {
  if (fromCurrency === toCurrency) return amount;

  const amountInEur = amount / eurRates[fromCurrency];
  return amountInEur * eurRates[toCurrency];
}

export function formatCurrency(
  amount: number,
  currency: SupportedCurrency = 'EUR',
  locale = 'en-US',
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function formatConvertedCurrency(
  amount: number,
  fromCurrency: SupportedCurrency,
  toCurrency: SupportedCurrency,
  locale = 'en-US',
) {
  const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
  return formatCurrency(convertedAmount, toCurrency, locale);
}