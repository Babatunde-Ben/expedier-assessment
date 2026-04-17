import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { CardCarousel } from "@/features/cards/components/CardCarousel";
import type { CardData } from "@/features/cards/types";

const CARDS: CardData[] = [
  {
    id: "c1",
    label: "Default Card",
    number: "**** **** **** 4567",
    expiry: "02/23",
    balance: 432.12,
    gradient: "purple-blue",
  },
  {
    id: "c2",
    label: "Default Card",
    number: "**** **** **** 4567",
    expiry: "02/23",
    balance: 400.25,
    gradient: "blue",
  },
  {
    id: "c3",
    label: "Default Card",
    number: "**** **** **** 4567",
    expiry: "02/23",
    balance: 832.02,
    gradient: "purple-blue",
  },
];

describe("CardCarousel", () => {
  it("renders a slide for every card", () => {
    const { container } = render(<CardCarousel cards={CARDS} />);
    expect(container.querySelectorAll(".swiper-slide").length).toBe(
      CARDS.length,
    );
  });

  it("displays formatted balances", () => {
    render(<CardCarousel cards={CARDS} />);
    expect(screen.getByText("$432.12")).toBeInTheDocument();
    expect(screen.getByText("$400.25")).toBeInTheDocument();
    expect(screen.getByText("$832.02")).toBeInTheDocument();
  });

  it("exposes prev/next navigation buttons", () => {
    render(<CardCarousel cards={CARDS} />);
    expect(
      screen.getByRole("button", { name: /previous card/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next card/i }),
    ).toBeInTheDocument();
  });

  it("hides and reveals the active card balance via the eye toggle", async () => {
    const user = userEvent.setup();
    render(<CardCarousel cards={CARDS} />);

    expect(screen.getByText("$432.12")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /hide card balance/i }),
    );

    expect(screen.queryByText("$432.12")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /show card balance/i }),
    );

    expect(screen.getByText("$432.12")).toBeInTheDocument();
  });
});
