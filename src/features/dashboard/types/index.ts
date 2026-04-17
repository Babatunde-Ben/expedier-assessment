export type CurrencyCode = "USD" | "NGN" | "CAD" | "GBP" | "EUR";

export interface WalletBalance {
  currency: CurrencyCode;
  amount: number;
  formatted: string;
}

export interface ExchangeRate {
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  display: string; // e.g. "1 USD → 1670 NGN"
}

export interface SpendingTrendPoint {
  day: string;
  moneyIn: number;
  moneyOut: number;
}

export interface AmazingOffer {
  id: string;
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
  imageUrl?: string;
}

export interface DashboardData {
  greeting: string;
  date: string;
  balances: WalletBalance[];
  activeCurrency: CurrencyCode;
  exchangeRates: ExchangeRate[];
  spendingTrend: SpendingTrendPoint[];
  offers: AmazingOffer[];
}
