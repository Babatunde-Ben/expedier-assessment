import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

export const metadata: Metadata = {
  title: "Transfer Money from Card",
  description: "Move funds from your Expedier card to another account.",
  alternates: { canonical: "/cards/transfer" },
  robots: { index: false, follow: true },
};

export default function TransferMoneyPage() {
  return <ComingSoonPanel label="Transfer Money from Card" />;
}
