"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { primaryNavItems, secondaryNavItems } from "@/constants/navigation";
import ExpedierBusinessLogo from "@/assets/icons/expedier-business-logo.svg";
import ExpedierBusinessLogoMobile from "@/assets/icons/expedier-business-logo-mobile.svg";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  collapsed?: boolean;
}

export function Sidebar({
  mobileOpen = false,
  onMobileClose,
  collapsed = false,
}: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onMobileClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-[width,transform] duration-300 ease-in-out",
          "w-sidebar-w",
          collapsed && "lg:w-sidebar-collapsed-w",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Primary navigation"
      >
        {/* Logo + mobile close */}
        <div
          className={cn(
            "flex h-nav-h items-center border-b border-border px-6",
            collapsed
              ? "lg:justify-center lg:px-2"
              : "lg:px-10 justify-between",
          )}
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
            onClick={onMobileClose}
            aria-label="Expedier Business home"
          >
            {collapsed ? (
              <>
                <ExpedierBusinessLogo className="size-44 lg:hidden" />
                <ExpedierBusinessLogoMobile className="hidden size-12 lg:block" />
              </>
            ) : (
              <ExpedierBusinessLogo className="size-44" />
            )}
          </Link>
          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close navigation"
            className="flex size-9 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted transition-colors lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Primary Nav */}
        <nav
          className={cn(
            "flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden py-8",
            collapsed ? "lg:px-2" : "px-5",
          )}
        >
          <ul className="flex flex-col gap-4 md:gap-5" role="list">
            {primaryNavItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              const link = (
                <Link
                  href={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    "flex h-12 items-center gap-3 rounded-md px-4 font-medium transition-colors",
                    collapsed && "lg:justify-center lg:px-0",
                    isActive
                      ? "bg-nav-item-active text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      "size-6 shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                    aria-hidden="true"
                  />
                  <span className={cn(collapsed && "lg:hidden")}>
                    {item.label}
                  </span>
                </Link>
              );
              return (
                <li key={item.href}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>{link}</TooltipTrigger>
                      <TooltipContent side="right" className="hidden lg:block">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    link
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Secondary Nav */}
        <div className={cn("py-6", collapsed ? "lg:px-2" : "px-5")}>
          <ul className="flex flex-col gap-4 md:gap-5" role="list">
            {secondaryNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              const link = (
                <Link
                  href={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    "flex h-12 items-center gap-3 rounded-sm px-4 font-medium transition-colors",
                    collapsed && "lg:justify-center lg:px-0",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={collapsed ? item.label : undefined}
                >
                  <Icon className="size-6 shrink-0" aria-hidden="true" />
                  <span className={cn(collapsed && "lg:hidden")}>
                    {item.label}
                  </span>
                </Link>
              );
              return (
                <li key={item.href}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>{link}</TooltipTrigger>
                      <TooltipContent side="right" className="hidden lg:block">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    link
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
