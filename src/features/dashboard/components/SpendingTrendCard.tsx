"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SpendingTrendChart } from "./SpendingTrendChart";
import USAFlag from "@/assets/icons/usa-flag.svg";
import CanadaFlag from "@/assets/icons/canada-flag.svg";
import NigeriaFlag from "@/assets/icons/nigeria-flag.svg";
import { CurrencyCode } from "../types";
import { WEEKLY_SPENDING as weeklyData } from "@/mocks/spending";

const currencies: { code: CurrencyCode; flag: React.ReactNode }[] = [
  { code: "USD", flag: <USAFlag /> },
  { code: "CAD", flag: <CanadaFlag /> },
  { code: "NGN", flag: <NigeriaFlag /> },
];

export function SpendingTrendCard() {
  const [period, setPeriod] = useState("weekly");
  const [currencyFilter, setCurrencyFilter] = useState("all");

  return (
    <div className="p-4 md:py-8 md:px-10 lg:border-r lg:border-border ">
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between mb-5 md:mb-10">
        <p className="text-base font-semibold text-black md:text-lg">
          Spending Trend
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="md:min-w-34">
              <SelectValue placeholder="Weekly" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
            <SelectTrigger className="md:min-w-34">
              <SelectValue placeholder="All Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Currency</SelectItem>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full">
                      {currency.flag}
                    </span>
                    {currency.code}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            className="text-sm h-10 px-3.5 border-border text-black"
          >
            See All <ArrowRight className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div>
        {/* Legend */}
        <div className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex flex-col bg-accent px-5 py-2.5 rounded-md">
            <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
              <span
                className="size-3 rounded-full bg-tertiary"
                aria-hidden="true"
              />
              Money In
            </div>
            <p className="mt-1.5 font-bold text-base sm:text-lg text-black">
              C$1,682.5
            </p>
          </div>
          <div className="flex flex-col bg-accent px-5 py-2.5 rounded-md">
            <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
              <span
                className="size-3 rounded-full bg-primary"
                aria-hidden="true"
              />
              Money Out
            </div>
            <p className="mt-1.5 font-bold text-base sm:text-lg text-black">
              C$2,682.5
            </p>
          </div>
        </div>

        {/* Bar chart */}
        <SpendingTrendChart data={weeklyData} />
      </div>
    </div>
  );
}
