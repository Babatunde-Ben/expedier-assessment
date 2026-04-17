import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

export const metadata: Metadata = {
  title: "Rewards",
  description:
    "Earn and redeem rewards on your Expedier Business spending.",
  alternates: { canonical: "/rewards" },
};

export default function Page() {
  return <ComingSoonPanel label="Rewards" />;
}
