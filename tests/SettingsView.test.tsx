import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { SettingsView } from "@/features/settings/components/SettingsView";

describe("SettingsView", () => {
  it("renders the heading and tab list", () => {
    render(<SettingsView />);
    expect(
      screen.getByRole("heading", { name: /settings/i }),
    ).toBeInTheDocument();
    ["Profile", "Contacts", "Teams", "Preference"].forEach((label) => {
      expect(screen.getByRole("tab", { name: label })).toBeInTheDocument();
    });
  });

  it("starts with the Teams tab active and shows the table", () => {
    render(<SettingsView />);
    const teamsTab = screen.getByRole("tab", { name: /teams/i });
    expect(teamsTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByLabelText(/team members/i)).toBeInTheDocument();
  });

  it("switches to a coming-soon tab when clicked", async () => {
    const user = userEvent.setup();
    render(<SettingsView />);

    await user.click(screen.getByRole("tab", { name: /profile/i }));

    expect(screen.queryByLabelText(/team members/i)).not.toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /profile/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});
