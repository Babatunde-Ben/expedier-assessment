import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

export const metadata: Metadata = {
  title: "Payments",
  description: "Schedule and manage outgoing payments from your Expedier wallets.",
  alternates: { canonical: "/payments" },
};

export default function Page() {
  return <ComingSoonPanel label="Payments" />;
}
