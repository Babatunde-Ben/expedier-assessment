import type { Metadata } from "next";
import { SettingsView } from "@/features/settings/components/SettingsView";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage your business profile, team members, security and preferences.",
  alternates: { canonical: "/settings" },
  openGraph: {
    title: "Settings | Expedier Business",
    description:
      "Manage your business profile, team members, security and preferences.",
    url: "/settings",
  },
  robots: { index: false, follow: true },
};

export default function SettingsPage() {
  return <SettingsView />;
}
