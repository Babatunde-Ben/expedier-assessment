"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("text-sm", className)}
      classNames={{
        months: "flex flex-col gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex items-center justify-center h-9",
        caption_label: "text-sm font-semibold text-foreground",
        nav: "flex items-center justify-between absolute top-1 left-0 right-0 px-1",
        button_previous:
          "inline-flex size-7 items-center justify-center rounded-sm hover:bg-muted text-muted-foreground",
        button_next:
          "inline-flex size-7 items-center justify-center rounded-sm hover:bg-muted text-muted-foreground",
        weekdays: "grid grid-cols-7",
        weekday:
          "text-xs font-medium text-muted-foreground text-center py-1",
        week: "grid grid-cols-7",
        day: "size-9 p-0 text-center",
        day_button:
          "size-9 rounded-sm font-normal aria-selected:opacity-100 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
        today: "font-semibold text-primary",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary",
        outside: "text-muted-foreground/50",
        disabled: "text-muted-foreground/30 cursor-not-allowed",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: cn2, ...rest }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className={cn("size-4", cn2)} {...rest} />;
        },
      }}
      {...props}
    />
  );
}
