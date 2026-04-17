"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import CashGIF from "@/assets/gif/cash.gif";
import { Button } from "@/components/ui/button";

const REFERRAL_LINK = "https://expedier.com/invite/ih/kennethokafor";

export function AmazingOffersCard() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    const fallbackCopy = () => {
      const input = document.createElement("input");
      input.value = REFERRAL_LINK;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(input);
      }
    };

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(REFERRAL_LINK);
      } else {
        fallbackCopy();
      }
    } catch {
      fallbackCopy();
    }

    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <p className="text-base mb-3.5 font-semibold text-black md:text-lg">
        Amazing Offers
      </p>

      <div className="flex items-center gap-2.5 rounded-md border border-border px-6 py-4.5">
        {/* Offer image */}
        <Image
          src={CashGIF}
          alt="Cash"
          className="size-10 shrink-0 rounded-md bg-muted flex items-center justify-center md:size-15"
        />

        <div className="min-w-0 flex-1">
          <p className="font-bold text-muted-foreground mb-1">
            Invite friends and earn <span className="text-primary">$20</span>
          </p>
          <p className="text-sm text-black font-bold mb-1">Share your Link</p>

          {/* Referral link */}
          <div className="flex w-full min-w-0 max-w-md items-center gap-2 overflow-hidden rounded-sm border border-black/15 bg-input px-2 py-2.5">
            <span className="min-w-0 flex-1 truncate text-xs text-black/70">
              {REFERRAL_LINK}
            </span>

            <Button
              type="button"
              variant="secondary"
              onClick={handleCopy}
              aria-label={copied ? "Link copied" : "Copy referral link"}
              aria-live="polite"
              className="h-6.5 w-12.5 shrink-0 gap-1 text-xs font-bold underline transition-colors"
            >
              {copied ? (
                <>
                  <Check className="size-3" aria-hidden="true" />
                  Copied
                </>
              ) : (
                "Copy"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
