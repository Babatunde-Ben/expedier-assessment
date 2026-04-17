import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AmazingOffersCard } from "@/features/dashboard/components/AmazingOffersCard";

describe("AmazingOffersCard", () => {
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
      configurable: true,
    });
  });

  it("renders the referral copy and link", () => {
    render(<AmazingOffersCard />);
    expect(
      screen.getByText(/invite friends and earn/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/expedier.com\/invite/i),
    ).toBeInTheDocument();
  });

  it("shows a copied confirmation when the button is pressed", async () => {
    const user = userEvent.setup();
    render(<AmazingOffersCard />);

    const copyBtn = screen.getByRole("button", { name: /copy referral link/i });
    await user.click(copyBtn);

    await waitFor(() => {
      expect(screen.getByText(/copied/i)).toBeInTheDocument();
    });
    // The component may use navigator.clipboard or the execCommand fallback;
    // either path confirms via the visible "Copied" label.
  });
});
