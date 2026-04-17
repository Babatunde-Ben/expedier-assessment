import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Recharts uses ResponsiveContainer which needs real dimensions — stub it to avoid
// jsdom flakiness while still exercising the chart component tree.
vi.mock("recharts", async () => {
  const actual = await vi.importActual<typeof import("recharts")>("recharts");
  return {
    ...actual,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="chart-container" style={{ width: 800, height: 400 }}>
        {children}
      </div>
    ),
  };
});

import { DashboardView } from "@/features/dashboard/components/DashboardView";

describe("DashboardView", () => {
  it("renders the primary dashboard regions", () => {
    render(<DashboardView />);

    expect(
      screen.getByRole("heading", { name: /welcome, rccg church/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/spending trend/i)).toBeInTheDocument();
    expect(screen.getByText(/amazing offers/i)).toBeInTheDocument();
    expect(screen.getByText(/expedier rate/i)).toBeInTheDocument();
  });

  it("renders the exchange-rate rows", () => {
    render(<DashboardView />);
    expect(screen.getByText("1218 NGN")).toBeInTheDocument();
    expect(screen.getByText("0.72 USD")).toBeInTheDocument();
  });
});
