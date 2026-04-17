export type CardGradientVariant = "purple-blue" | "blue" | "dark";

export interface PaymentCard {
  id: string;
  label: string;
  cardNumber: string; // masked e.g. "**** **** **** 4567"
  expDate: string;    // "MM/YY"
  balance: number;
  currency: string;
  gradient: CardGradientVariant;
  isDefault?: boolean;
  cardType?: "mastercard" | "visa";
}

/** Normalized shape consumed by CardCarousel */
export interface CardData {
  id: string;
  label: string;        // e.g. "Default Card"
  number: string;       // masked e.g. "**** **** **** 4567"
  expiry: string;       // MM/YY
  balance: number;      // numeric balance
  currency?: string;    // default "$"
  gradient: CardGradientVariant;
}

export type BillerFrequency = "once" | "daily" | "weekly" | "monthly" | "yearly";

export interface PayBillFormValues {
  amount: string;
  currency: string;
  billerId: string;
  frequency: BillerFrequency;
  date: string;
}

export interface Biller {
  id: string;
  name: string;
  category: string;
}
