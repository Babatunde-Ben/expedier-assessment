import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

describe("ComingSoonPanel", () => {
  it("renders the provided label", () => {
    render(<ComingSoonPanel label="Card Info" />);
    expect(screen.getByText("Card Info")).toBeInTheDocument();
  });

  it("uses the default description when none is given", () => {
    render(<ComingSoonPanel label="Profile" />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });

  it("allows overriding the description", () => {
    render(
      <ComingSoonPanel label="Billing" description="Available next quarter" />,
    );
    expect(screen.getByText("Available next quarter")).toBeInTheDocument();
  });
});
