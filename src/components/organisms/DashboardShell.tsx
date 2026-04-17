"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface DashboardShellProps {
  children: ReactNode;
  businessName?: string;
  initials?: string;
}

export function DashboardShell({
  children,
  businessName = "Business Name",
  initials = "BN",
}: DashboardShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-background">
        <Sidebar
          collapsed={desktopCollapsed}
          mobileOpen={mobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
        />
        <Topbar
          businessName={businessName}
          initials={initials}
          collapsed={desktopCollapsed}
          onToggleCollapsed={() => setDesktopCollapsed((v) => !v)}
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <main
          className={cn(
            "pt-nav-h min-h-screen transition-[margin] duration-300 ease-in-out",
            desktopCollapsed ? "lg:ml-sidebar-collapsed-w" : "lg:ml-sidebar-w",
          )}
          id="main-content"
          aria-label="Main content"
        >
          <div>{children}</div>
        </main>
      </div>
    </TooltipProvider>
  );
}
