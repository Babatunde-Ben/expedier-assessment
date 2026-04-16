import type React from "react";
import Grid from "@/assets/icons/grid.svg";
import TransactionHistory from "@/assets/icons/transaction-history.svg";
import Wallet from "@/assets/icons/wallet.svg";
import CreditCard from "@/assets/icons/credit-card.svg";
import Award from "@/assets/icons/award.svg";
import PriceTag from "@/assets/icons/price-tag.svg";
import Settings from "@/assets/icons/settings.svg";
import Support from "@/assets/icons/support.svg";

export interface NavItem {
  label: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface NavSection {
  items: NavItem[];
}

export interface CardSubNavItem {
  label: string;
  href: string;
  variant?: "destructive";
}

export const primaryNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Grid },
  { label: "Transactions", href: "/transactions", icon: TransactionHistory },
  { label: "Payments", href: "/payments", icon: Wallet },
  { label: "Cards", href: "/cards", icon: CreditCard },
  { label: "Rewards", href: "/rewards", icon: Award },
  { label: "Pricing", href: "/pricing", icon: PriceTag },
];

export const secondaryNavItems: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Contact Us", href: "/contact", icon: Support },
];

export const cardSubNavItems: CardSubNavItem[] = [
  { label: "Card Info", href: "/cards/info" },
  { label: "Top-up Card", href: "/cards/top-up" },
  { label: "Pay Bills with Card", href: "/cards/pay-bills" },
  { label: "Transfer Money from Card", href: "/cards/transfer" },
  { label: "Invite Team Member", href: "/cards/invite" },
  { label: "Set Card Limit", href: "/cards/limit" },
  { label: "Remove Cards", href: "/cards/remove", variant: "destructive" },
];
