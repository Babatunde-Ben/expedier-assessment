import type { ReactNode } from "react";
import { DashboardShell } from "@/components/organisms/DashboardShell";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardShell businessName="Business Name" initials="BN">
      {children}
    </DashboardShell>
  );
}
