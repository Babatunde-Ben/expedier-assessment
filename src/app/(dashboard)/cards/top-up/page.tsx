import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

export const metadata: Metadata = {
  title: "Top-up Card",
  description: "Add funds to your Expedier card.",
  alternates: { canonical: "/cards/top-up" },
  robots: { index: false, follow: true },
};

export default function TopUpCardPage() {
  return <ComingSoonPanel label="Top-up Card" />;
}
