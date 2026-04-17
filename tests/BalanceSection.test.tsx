import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { BalanceSection } from "@/features/dashboard/components/BalanceSection";

describe("BalanceSection", () => {
  const props = {
    businessName: "RCCG Church",
    date: "Monday, October 14, 2024",
    balance: 10000,
  };

  it("renders the greeting, date and balance", () => {
    render(<BalanceSection {...props} />);
    expect(
      screen.getByRole("heading", { name: /welcome, rccg church/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(props.date)).toBeInTheDocument();
    expect(screen.getByText(/10,000/)).toBeInTheDocument();
  });

  it("switches the displayed currency when a tab is pressed", async () => {
    const user = userEvent.setup();
    render(<BalanceSection {...props} />);

    // USD starts selected
    expect(screen.getByRole("button", { name: "USD" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("button", { name: "CAD" }));

    expect(screen.getByRole("button", { name: "CAD" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "USD" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("exposes the expected action buttons", () => {
    render(<BalanceSection {...props} />);
    expect(
      screen.getByRole("button", { name: /add funds/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send funds/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /swap funds/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create wallet/i }),
    ).toBeInTheDocument();
  });
});
