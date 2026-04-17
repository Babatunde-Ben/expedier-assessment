import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { QuickstartPill } from "@/features/dashboard/components/QuickstartPill";

describe("QuickstartPill", () => {
  it("renders a Quickstart pill on mount", () => {
    render(<QuickstartPill />);
    expect(screen.getByText(/quick/i)).toBeInTheDocument();
  });

  it("disappears when dismissed", async () => {
    const user = userEvent.setup();
    render(<QuickstartPill />);

    await user.click(screen.getByRole("button", { name: /dismiss quickstart/i }));

    expect(screen.queryByText(/quick/i)).not.toBeInTheDocument();
  });
});
