export interface ExchangeRate {
  from: string;
  to: string;
}

export const EXCHANGE_RATES: ExchangeRate[] = [
  { from: "1 CAD", to: "1218 NGN" },
  { from: "1254 NGN", to: "1 CAD" },
  { from: "1 USD", to: "1670 NGN" },
  { from: "1740 NGN", to: "1 USD" },
  { from: "1 USD", to: "1.344 CAD" },
  { from: "1 CAD", to: "0.72 USD" },
];
