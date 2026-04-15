const DEFAULT_URL = "https://expedier-assessment.vercel.app";

export const siteConfig = {
  name: "Expedier Business",
  shortName: "Expedier",
  title: "Expedier Business — Multi-currency Wallets for Businesses",
  description:
    "Manage business wallets across USD, CAD and NGN. Send, receive, swap funds, pay bills with cards, and track spending in one dashboard.",
  keywords: [
    "multi-currency wallet",
    "business banking",
    "international payments",
    "virtual cards",
    "pay bills",
    "USD CAD NGN",
    "expedier",
    "fintech dashboard",
  ],
  authors: [{ name: "Expedier", url: DEFAULT_URL }],
  creator: "Expedier",
  publisher: "Expedier",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_URL).replace(/\/$/, ""),
  locale: "en_US",
  themeColor: "#007bff",
  twitterHandle: "@expedier",
  ogImage: "/opengraph-image",
} as const;

export type SiteConfig = typeof siteConfig;
