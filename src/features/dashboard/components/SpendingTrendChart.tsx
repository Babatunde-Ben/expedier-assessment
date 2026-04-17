"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SpendingDatum {
  day: string;
  moneyIn: number;
  moneyOut: number;
}

interface SpendingTrendChartProps {
  data: SpendingDatum[];
}

const axisTickStyle = {
  fill: "var(--muted-foreground)",
  fontSize: 12,
};

const formatCurrency = (value: number) => `C$ ${value.toLocaleString()}`;

interface YAxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: number };
  textAnchor?: "start" | "middle" | "end" | "inherit";
}

function YAxisTick({ x, y, payload, textAnchor }: YAxisTickProps) {
  if (!payload) return null;
  return (
    <text
      x={x}
      y={y}
      dy={4}
      textAnchor={textAnchor ?? "end"}
      fill="var(--muted-foreground)"
      fontSize={12}
    >
      {formatCurrency(payload.value)}
    </text>
  );
}

const TOOLTIP_COLORS: Record<string, string> = {
  moneyIn: "var(--muted-foreground)",
  moneyOut: "var(--primary)",
};

interface ChartTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<{ name?: string; value?: number; dataKey?: string }>;
}

function ChartTooltip({ active, label, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-medium text-foreground">{label}</p>
      <ul className="flex flex-col gap-1">
        {payload.map((item) => {
          const color =
            TOOLTIP_COLORS[item.dataKey ?? ""] ?? "var(--foreground)";
          return (
            <li
              key={item.dataKey}
              className="flex items-center gap-2"
              style={{ color }}
            >
              <span
                className="size-2 rounded-full"
                style={{ background: color }}
                aria-hidden="true"
              />
              <span className="font-medium">{item.name}:</span>
              <span className="tabular-nums">
                {formatCurrency(Number(item.value ?? 0))}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SpendingTrendChart({ data }: SpendingTrendChartProps) {
  return (
    <div
      className="h-[380px] w-full bg-accent rounded-lg"
      aria-label="Spending trend bar chart"
    >
      <ResponsiveContainer width="100%" height="100%" className="py-8 px-5">
        <BarChart
          data={data}
          margin={{ top: 20, right: 8, left: 0, bottom: 8 }}
          barCategoryGap="25%"
          barGap={6}
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeDasharray="0"
            syncWithTicks
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={axisTickStyle}
            tickMargin={12}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={<YAxisTick />}
            tickMargin={8}
            domain={[0, 2200]}
            ticks={[0, 1000, 2000]}
            allowDataOverflow={false}
            interval={0}
            width={70}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)", opacity: 0.4 }}
            content={<ChartTooltip />}
          />
          <Bar
            dataKey="moneyIn"
            name="Money In"
            fill="var(--tertiary)"
            radius={[4, 4, 0, 0]}
            barSize={27}
          />
          <Bar
            dataKey="moneyOut"
            name="Money Out"
            fill="var(--primary)"
            radius={[4, 4, 0, 0]}
            barSize={27}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
