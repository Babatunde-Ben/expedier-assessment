"use client";

import { usePathname } from "next/navigation";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  ChevronDown,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { primaryNavItems, secondaryNavItems } from "@/constants/navigation";
import NotificationFilled from "@/assets/icons/notification-filled.svg";

interface TopbarProps {
  businessName?: string;
  initials?: string;
  onMenuClick?: () => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}

export function Topbar({
  businessName = "Business Name",
  initials = "BN",
  onMenuClick,
  collapsed = false,
  onToggleCollapsed,
}: TopbarProps) {
  const pathname = usePathname();
  const currentPage = [...primaryNavItems, ...secondaryNavItems].find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  const pageLabel = currentPage?.label ?? "Dashboard";
  const ToggleIcon = collapsed ? ArrowRightToLine : ArrowLeftToLine;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-30 flex h-nav-h items-center justify-between",
        "border-b border-border bg-card px-4 md:pl-10 md:pr-9",
        "transition-[left] duration-300 ease-in-out",
        collapsed ? "lg:left-sidebar-collapsed-w" : "lg:left-sidebar-w",
      )}
    >
      {/* Left: menu / breadcrumb */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex size-[33px] items-center justify-center rounded-sm border border-border text-muted-foreground hover:bg-muted transition-colors lg:hidden"
        >
          <Menu className="size-[18px]" />
        </button>
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-pressed={collapsed}
          className="hidden size-[33px] items-center justify-center rounded-sm border border-border text-muted-foreground hover:bg-muted transition-colors lg:flex"
        >
          <ToggleIcon className="size-[18px]" />
        </button>
        <span className="font-semibold text-black truncate">{pageLabel}</span>
      </div>

      {/* Right: notification + user */}
      <div className="flex items-center gap-2 md:gap-7">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 md:size-11 items-center justify-center rounded-full border border-border bg-[#f5f5f5] hover:bg-muted transition-colors"
        >
          <NotificationFilled className="size-5 md:size-6 text-muted-foreground" />
          <span
            aria-label="1 unread notification"
            className="absolute right-2.5 top-2 size-2 rounded-full bg-destructive outline-2 outline-[#f5f5f5]"
          />
        </button>

        <div
          className="hidden h-[21px] w-[2px] bg-black md:block"
          aria-hidden="true"
        />

        <button
          type="button"
          className="flex items-center gap-2 md:gap-3 "
          aria-label={`User menu for ${businessName}`}
        >
          <div className="flex size-10 md:size-[46px] items-center justify-center rounded-full bg-primary font-bold text-primary-foreground select-none">
            {initials}
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="font-medium text-black max-w-[120px] truncate">
              {businessName}
            </span>
            <ChevronDown className="size-4 text-black" aria-hidden="true" />
          </div>
        </button>
      </div>
    </header>
  );
}
