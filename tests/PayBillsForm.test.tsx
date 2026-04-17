import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { PayBillsForm } from "@/features/cards/components/PayBillsForm";

describe("PayBillsForm", () => {
  it("renders all fields and action buttons", () => {
    render(<PayBillsForm />);
    expect(screen.getByLabelText(/enter amount/i)).toBeInTheDocument();
    expect(screen.getByText(/select biller/i)).toBeInTheDocument();
    expect(screen.getByText(/frequency/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pay now/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("surfaces validation errors when submitting empty required fields", async () => {
    const user = userEvent.setup();
    render(<PayBillsForm />);

    await user.click(screen.getByRole("button", { name: /pay now/i }));

    await waitFor(() => {
      expect(screen.getByText(/please enter an amount/i)).toBeInTheDocument();
      expect(screen.getByText(/please choose a biller/i)).toBeInTheDocument();
    });
  });

  it("rejects non-positive amounts", async () => {
    const user = userEvent.setup();
    render(<PayBillsForm />);

    await user.type(screen.getByLabelText(/enter amount/i), "0");
    await user.click(screen.getByRole("button", { name: /pay now/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/amount must be a positive number/i),
      ).toBeInTheDocument();
    });
  });

  it("clears the amount field when Cancel is pressed", async () => {
    const user = userEvent.setup();
    render(<PayBillsForm />);
    const amount = screen.getByLabelText(/enter amount/i) as HTMLInputElement;

    await user.type(amount, "25.50");
    expect(amount.value).toBe("25.50");

    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(amount.value).toBe("");
  });

  it("clears amount error when amount is valid but biller still required", async () => {
    const user = userEvent.setup();
    render(<PayBillsForm />);

    await user.type(screen.getByLabelText(/enter amount/i), "100");
    await user.click(screen.getByRole("button", { name: /pay now/i }));

    await waitFor(() => {
      expect(screen.getByText(/please choose a biller/i)).toBeInTheDocument();
    });
    expect(
      screen.queryByText(/please enter an amount/i),
    ).not.toBeInTheDocument();
  });
});
