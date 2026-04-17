import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

export const metadata: Metadata = {
  title: "Invite Team Member",
  description: "Invite a teammate to share access to this Expedier card.",
  alternates: { canonical: "/cards/invite" },
  robots: { index: false, follow: true },
};

export default function InviteTeamMemberPage() {
  return <ComingSoonPanel label="Invite Team Member" />;
}
