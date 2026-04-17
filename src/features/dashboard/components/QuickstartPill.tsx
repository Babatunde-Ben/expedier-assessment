"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Zap from "@/assets/icons/zap.svg";

export function QuickstartPill() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="absolute top-2 right-4 flex justify-end md:right-9">
      <div className="inline-flex items-center text-xs gap-1 rounded-full bg-brand-dark px-2 py-1 font-medium text-white shadow-xs sm:text-sm md:gap-1.5 md:text-base md:py-2.5 ">
        <Zap className="size-4 md:size-6" aria-hidden="true" />
        <span>Quick start</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss quickstart"
          className="ml-1 shrink-0 flex size-7 items-center justify-center rounded-full text-white/80 bg-white/5 hover:bg-white/10 hover:text-white transition-colors sm:ml-2 md:ml-4"
        >
          <X className="size-3.5 md:size-4.5" />
        </button>
      </div>
    </div>
  );
}
