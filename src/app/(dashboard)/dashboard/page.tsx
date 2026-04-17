import type { Metadata } from "next";
import { DashboardView } from "@/features/dashboard/components/DashboardView";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Overview of your Expedier Business wallets, spending trends and exchange rates.",
  alternates: { canonical: "/dashboard" },
  openGraph: {
    title: "Dashboard | Expedier Business",
    description:
      "Overview of your Expedier Business wallets, spending trends and exchange rates.",
    url: "/dashboard",
  },
  twitter: {
    title: "Dashboard | Expedier Business",
    description:
      "Overview of your Expedier Business wallets, spending trends and exchange rates.",
  },
};

export default function DashboardPage() {
  return <DashboardView />;
}
