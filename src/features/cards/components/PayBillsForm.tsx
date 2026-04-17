"use client";

import { useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import USAFlag from "@/assets/icons/usa-flag.svg";
import CanadaFlag from "@/assets/icons/canada-flag.svg";
import NigeriaFlag from "@/assets/icons/nigeria-flag.svg";

const DATE_FORMAT = "MMM d, yyyy";

const CURRENCIES = ["USD", "CAD", "NGN"] as const;
type CurrencyCode = (typeof CURRENCIES)[number];

type CurrencyOption = {
  code: CurrencyCode;
  flag: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: "USD", flag: USAFlag },
  { code: "CAD", flag: CanadaFlag },
  { code: "NGN", flag: NigeriaFlag },
];

const payBillsSchema = z.object({
  amount: z
    .string()
    .min(1, "Please enter an amount")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, {
      message: "Amount must be a positive number",
    }),
  currency: z.enum(CURRENCIES),
  biller: z.string().min(1, "Please choose a biller"),
  frequency: z.enum(["once", "daily", "weekly", "monthly", "yearly"]),
  date: z
    .string()
    .min(1, "Please select a date")
    .refine(
      (v) => isValid(parse(v, DATE_FORMAT, new Date())),
      { message: "Please select a valid date" },
    ),
});

export type PayBillsValues = z.infer<typeof payBillsSchema>;

const defaultValues: PayBillsValues = {
  amount: "",
  currency: "USD",
  biller: "",
  frequency: "once",
  date: format(new Date(), DATE_FORMAT),
};

interface PayBillsFormProps {
  onSubmit?: (values: PayBillsValues) => void;
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="text-xs font-medium text-destructive"
    >
      {message}
    </p>
  );
}

export function PayBillsForm({ onSubmit }: PayBillsFormProps = {}) {
  const amountErrorId = useId();
  const billerErrorId = useId();
  const frequencyErrorId = useId();
  const dateErrorId = useId();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PayBillsValues>({
    resolver: zodResolver(payBillsSchema),
    defaultValues,
    mode: "onBlur",
  });

  const submitHandler = handleSubmit((values) => {
    onSubmit?.(values);
  });

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-6 w-full max-w-[538px]"
      noValidate
    >
      {/* Enter Amount + Currency */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="amount">Enter Amount</Label>
        <Input
          id="amount"
          type="text"
          placeholder="How Much?"
          inputMode="decimal"
          aria-invalid={!!errors.amount}
          aria-describedby={errors.amount ? amountErrorId : undefined}
          {...register("amount")}
          startAddon={
            <Controller
              control={control}
              name="currency"
              render={({ field }) => {
                const active =
                  CURRENCY_OPTIONS.find((c) => c.code === field.value) ??
                  CURRENCY_OPTIONS[0];
                const ActiveFlag = active.flag;
                return (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      type="button"
                      className="flex items-center gap-1.5 text-sm font-semibold text-foreground whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                      aria-label={`Currency: ${active.code}`}
                    >
                      <ActiveFlag aria-hidden="true" />
                      {active.code}
                      <ChevronDown
                        className="size-3 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuRadioGroup
                        value={field.value}
                        onValueChange={(v) =>
                          field.onChange(v as CurrencyCode)
                        }
                      >
                        {CURRENCY_OPTIONS.map(({ code, flag: Flag }) => (
                          <DropdownMenuRadioItem key={code} value={code}>
                            <Flag aria-hidden="true" />
                            <span className="font-medium">{code}</span>
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }}
            />
          }
        />
        <FieldError id={amountErrorId} message={errors.amount?.message} />
      </div>

      {/* Select Biller */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="biller">Select Biller</Label>
        <Controller
          control={control}
          name="biller"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="biller"
                ref={field.ref}
                onBlur={field.onBlur}
                aria-invalid={!!errors.biller}
                aria-describedby={errors.biller ? billerErrorId : undefined}
                className="bg-input h-input-h w-full px-6"
              >
                <SelectValue placeholder="Choose a biller" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electricity">Electricity</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="internet">Internet</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError id={billerErrorId} message={errors.biller?.message} />
      </div>

      {/* Frequency */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="frequency">Frequency</Label>
        <Controller
          control={control}
          name="frequency"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="frequency"
                ref={field.ref}
                onBlur={field.onBlur}
                aria-invalid={!!errors.frequency}
                aria-describedby={
                  errors.frequency ? frequencyErrorId : undefined
                }
                className="bg-input h-input-h w-full px-6"
              >
                <SelectValue placeholder="Once" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once">Once</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError
          id={frequencyErrorId}
          message={errors.frequency?.message}
        />
      </div>

      {/* Date — popover + calendar */}
      <div className="flex flex-col gap-3 mb-10">
        <Label htmlFor="date">Date</Label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => {
            const parsed = field.value
              ? parse(field.value, DATE_FORMAT, new Date())
              : undefined;
            const selected = parsed && isValid(parsed) ? parsed : undefined;
            return (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    id="date"
                    type="button"
                    ref={field.ref}
                    onBlur={field.onBlur}
                    aria-describedby={errors.date ? dateErrorId : undefined}
                    className={cn(
                      "flex h-input-h w-full items-center justify-between rounded-md border border-border bg-input px-6 text-left text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      !field.value && "text-muted-foreground",
                      errors.date && "border-destructive",
                    )}
                  >
                    {field.value || "Select date"}
                    <CalendarIcon
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-3">
                  <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={(date) => {
                      if (!date) return;
                      field.onChange(format(date, DATE_FORMAT));
                    }}
                    defaultMonth={selected}
                  />
                </PopoverContent>
              </Popover>
            );
          }}
        />
        <FieldError id={dateErrorId} message={errors.date?.message} />
      </div>

      {/* Divider */}
      <div className="h-px bg-border" aria-hidden="true" />

      {/* Actions */}
      <div className="flex flex-col gap-[14px]">
        <Button type="submit" className="w-full h-13" disabled={isSubmitting}>
          Pay Now
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full h-13"
          onClick={() => reset(defaultValues)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
