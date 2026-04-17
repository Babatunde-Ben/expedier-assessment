import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

export const metadata: Metadata = {
  title: "Card Info",
  description: "View your Expedier card details including number, expiry, and status.",
  alternates: { canonical: "/cards/info" },
  robots: { index: false, follow: true },
};

export default function CardInfoPage() {
  return <ComingSoonPanel label="Card Info" />;
}
