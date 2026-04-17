"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { cardSubNavItems } from "@/constants/navigation";

export function CardSubNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Card management">
      <p className="mb-3 lg:mb-4 font-medium text-black border-b border-border pb-3">
        Manage Cards
      </p>
      <ul
        className="flex gap-1 overflow-x-auto px-1 lg:px-0 lg:flex-col lg:gap-3 scrollbar-none"
        role="list"
      >
        {cardSubNavItems.map((item) => {
          const isActive = pathname === item.href;
          const isDestructive = item.variant === "destructive";

          return (
            <li key={item.href} className="shrink-0 lg:shrink">
              <Link
                href={item.href}
                className={cn(
                  "block whitespace-nowrap rounded-md px-3 py-2.5 lg:py-3 text-sm transition-colors",
                  isActive && !isDestructive
                    ? "bg-tertiary text-primary"
                    : isDestructive
                      ? "text-destructive hover:bg-destructive/10"
                      : "text-muted-foreground hover:bg-muted",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
