"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CardSubNav } from "@/features/cards/components/CardSubNav";
import { cardSubNavItems } from "@/constants/navigation";

export default function CardsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activeItem = cardSubNavItems.find((item) => item.href === pathname);
  const sectionLabel = activeItem?.label ?? "Cards";

  return (
    <div className="">
      {/* Page heading */}
      <h1 className="p-4 border-b border-border text-lg font-medium text-black sm:text-xl md:py-8 md:pl-10 md:pr-9 lg:text-2xl">
        Cards
      </h1>

      {/* Layout: sub-nav on left (desktop) / top (mobile) + content */}
      <div className="flex flex-col lg:flex-row overflow-hidden lg:min-h-[calc(100vh-200px)]">
        {/* Sub-nav */}
        <div className="shrink-0 border-b border-border p-4 md:py-6 lg:w-[270px] lg:border-b-0 lg:border-r">
          <CardSubNav />
        </div>

        {/* Content — min-w-0 so wide children (e.g. Swiper) don’t expand the flex row on desktop */}
        <div className="flex min-w-0 flex-1 flex-col p-4 lg:px-12">
          {/* Section header */}

          <h2 className="font-bold text-lg text-foreground border-b border-border pb-4 text-center">
            {sectionLabel}
          </h2>

          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
