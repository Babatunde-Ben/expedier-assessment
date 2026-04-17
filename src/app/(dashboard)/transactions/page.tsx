import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Review all wallet transactions, transfers, and card payments.",
  alternates: { canonical: "/transactions" },
};

export default function Page() {
  return <ComingSoonPanel label="Transactions" />;
}
