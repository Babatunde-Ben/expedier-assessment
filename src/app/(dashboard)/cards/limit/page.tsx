import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

export const metadata: Metadata = {
  title: "Set Card Limit",
  description: "Configure spending limits for your Expedier card.",
  alternates: { canonical: "/cards/limit" },
  robots: { index: false, follow: true },
};

export default function SetCardLimitPage() {
  return <ComingSoonPanel label="Set Card Limit" />;
}
