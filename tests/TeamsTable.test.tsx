import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { TeamsTable } from "@/features/settings/components/TeamsTable";

describe("TeamsTable", () => {
  it("renders column headers and at least one team-member row", () => {
    render(<TeamsTable />);
    const table = screen.getByRole("table", { name: /team members/i });
    ["Name", "Email Address", "Phone Number", "Employee Role", "Action"].forEach(
      (col) => {
        expect(
          within(table).getByRole("columnheader", { name: col }),
        ).toBeInTheDocument();
      },
    );
    expect(within(table).getAllByRole("row").length).toBeGreaterThan(1);
  });

  it("first row exposes Edit Limits; others expose Remove", () => {
    render(<TeamsTable />);
    // Both desktop table + mobile card list render in jsdom (no real viewport).
    // Scope to the table itself.
    const table = screen.getByRole("table", { name: /team members/i });
    expect(
      within(table).getByRole("button", { name: /edit limits/i }),
    ).toBeInTheDocument();
    expect(
      within(table).getAllByRole("button", { name: /remove/i }).length,
    ).toBeGreaterThan(0);
  });

  it("selects a row when its checkbox is clicked", async () => {
    const user = userEvent.setup();
    render(<TeamsTable />);
    const table = screen.getByRole("table", { name: /team members/i });

    const firstCheckbox = within(table).getAllByRole("checkbox", {
      name: /^select /i,
    })[0];

    expect(firstCheckbox).not.toBeChecked();
    await user.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    await user.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
  });

  it("shows pagination summary and page controls", () => {
    render(<TeamsTable />);
    expect(screen.getByText(/showing 1 to 10 of \d+ entries/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("advances to the next page when Next is pressed", async () => {
    const user = userEvent.setup();
    render(<TeamsTable />);
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(
      screen.getByText(/showing 11 to 20 of \d+ entries/i),
    ).toBeInTheDocument();
  });
});
