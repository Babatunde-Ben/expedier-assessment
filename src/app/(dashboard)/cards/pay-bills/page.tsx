import type { Metadata } from "next";
import { CardCarousel } from "@/features/cards/components/CardCarousel";
import { PayBillsForm } from "@/features/cards/components/PayBillsForm";
import { SAMPLE_CARDS } from "@/mocks/cards";

export const metadata: Metadata = {
  title: "Pay Bills with Card",
  description:
    "Pay utility bills, subscriptions and more directly from your Expedier card.",
  alternates: { canonical: "/cards/pay-bills" },
  openGraph: {
    title: "Pay Bills with Card | Expedier Business",
    description:
      "Pay utility bills, subscriptions and more directly from your Expedier card.",
    url: "/cards/pay-bills",
  },
  robots: { index: false, follow: true },
};

export default function PayBillsPage() {
  return (
    <div className="flex w-full min-w-0 max-w-full flex-col items-center gap-10 py-8 md:gap-[60px] md:py-10">
      <CardCarousel cards={SAMPLE_CARDS} />
      <PayBillsForm />
    </div>
  );
}
