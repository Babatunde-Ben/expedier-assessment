"use client";
import { Plus, ArrowRight, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CurrencyCode } from "../types";
import Swap from "@/assets/icons/swap.svg";
import { useState } from "react";
import { QuickstartPill } from "./QuickstartPill";
import USAFlag from "@/assets/icons/usa-flag.svg";
import CanadaFlag from "@/assets/icons/canada-flag.svg";
import NigeriaFlag from "@/assets/icons/nigeria-flag.svg";

interface BalanceSectionProps {
  businessName: string;
  date: string;
  balance: number;
}

const currencies: { code: CurrencyCode; flag: React.ReactNode }[] = [
  { code: "USD", flag: <USAFlag /> },
  { code: "CAD", flag: <CanadaFlag /> },
  { code: "NGN", flag: <NigeriaFlag /> },
];

export function BalanceSection({
  businessName,
  date,
  balance,
}: BalanceSectionProps) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  return (
    <section aria-label="Account balance">
      {/* Header row */}
      <div className="p-4 border-b border-border md:py-8 md:pl-10 md:pr-9 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between md:items-center">
        <div>
          <h1 className="font-medium text-lg mb-1.5 sm:text-xl text-black lg:text-2xl">
            Welcome, {businessName}!
          </h1>
          <p className=" font-medium text-muted-foreground">{date}</p>
        </div>
        <Button variant="outline" className="gap-2 text-xs">
          <Swap className="size-4" />
          Create Wallet
        </Button>
      </div>

      {/* Balance card */}
      <div className="border-b border-border relative p-4 md:py-8 md:pl-10 md:pr-9">
        <QuickstartPill />
        {/* Currency tabs */}
        <div className="mb-4 md:mb-6">
          <p className="mb-3 text-sm font-medium text-black lg:text-base">
            Account
          </p>
          <div className="flex flex-wrap gap-2">
            {currencies.map(({ code, flag }) => (
              <button
                key={code}
                type="button"
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  code === currency
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-black hover:bg-muted"
                }`}
                aria-pressed={code === currency}
                onClick={() => setCurrency(code)}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full text-[22px] leading-none"
                >
                  {flag}
                </span>
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Balance display */}
        <div className="mb-1 flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <p className="font-medium text-2xl sm:text-3xl text-foreground leading-none break-words mb-1 md:text-4xl lg:text-5xl">
                <span className="text-muted-foreground">{currency} </span>
                {(() => {
                  const [intPart, decimalPart] = balance
                    .toLocaleString("en-US", { minimumFractionDigits: 2 })
                    .split(".");
                  return (
                    <>
                      {intPart}.
                      <span className="text-muted-foreground">
                        {decimalPart}
                      </span>
                    </>
                  );
                })()}
              </p>
            </div>

            <p className="text-xs text-muted-foreground font-medium">
              Available Balance
            </p>
          </div>
          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-3 md:gap-4">
            <Button className="w-full text-xs sm:max-w-44">
              <Plus className="size-6" aria-hidden="true" />
              Add Funds
            </Button>
            <Button variant="secondary" className="w-full text-xs sm:max-w-44">
              <ArrowRight className="size-6" aria-hidden="true" />
              Send Funds
            </Button>
            <Button variant="secondary" className="w-full text-xs sm:max-w-44">
              <Swap className="size-6" aria-hidden="true" />
              Swap Funds
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="More actions"
              className="border-border text-muted-foreground shrink-0"
            >
              <MoreVertical className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
