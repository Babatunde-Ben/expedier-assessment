import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startAddon, endAddon, ...props }, ref) => {
    if (startAddon || endAddon) {
      return (
        <div
          className={cn(
            "flex h-input-h items-center rounded-md border border-border bg-input shadow-xs overflow-hidden",
            className,
          )}
        >
          {startAddon && (
            <div className="flex h-full items-center border-r border-border bg-input px-4 shrink-0">
              {startAddon}
            </div>
          )}
          <input
            type={type}
            className="flex-1 h-full bg-transparent px-4  text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            ref={ref}
            {...props}
          />
          {endAddon && (
            <div className="flex h-full items-center border-l border-border bg-input px-4 shrink-0">
              {endAddon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-input-h w-full rounded-md border border-border bg-input px-6 py-[17px]  text-foreground placeholder:text-muted-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
