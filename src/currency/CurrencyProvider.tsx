import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { SupportedCurrency } from '@/lib/currency';

type CurrencyContextValue = {
  currency: SupportedCurrency;
  setCurrency: (currency: SupportedCurrency) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const storageKey = 'tasteflow.currency';

function getInitialCurrency(): SupportedCurrency {
  if (typeof window === 'undefined') return 'EUR';

  const stored = window.localStorage.getItem(storageKey);

  if (
    stored === 'EUR' ||
    stored === 'SEK' ||
    stored === 'DKK' ||
    stored === 'NOK' ||
    stored === 'USD' ||
    stored === 'GBP'
  ) {
    return stored;
  }

  return 'EUR';
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>(getInitialCurrency);

  const value = useMemo<CurrencyContextValue>(() => {
    return {
      currency,
      setCurrency(nextCurrency) {
        setCurrencyState(nextCurrency);
        window.localStorage.setItem(storageKey, nextCurrency);
      },
    };
  }, [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error('useCurrency must be used inside CurrencyProvider');
  }

  return context;
}
