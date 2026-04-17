import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for Expedier Business wallets, cards, and transfers.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing | Expedier Business",
    description:
      "Transparent pricing for Expedier Business wallets, cards, and transfers.",
    url: "/pricing",
  },
};

export default function Page() {
  return <ComingSoonPanel label="Pricing" />;
}
