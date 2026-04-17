import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

export const metadata: Metadata = {
  title: "Remove Cards",
  description: "Permanently remove cards from your Expedier Business account.",
  alternates: { canonical: "/cards/remove" },
  robots: { index: false, follow: true },
};

export default function RemoveCardsPage() {
  return <ComingSoonPanel label="Remove Cards" />;
}
