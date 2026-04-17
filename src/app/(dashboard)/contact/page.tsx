import type { Metadata } from "next";
import { ComingSoonPanel } from "@/components/molecules/ComingSoonPanel";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Expedier Business support team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Expedier Business",
    description: "Get in touch with the Expedier Business support team.",
    url: "/contact",
  },
};

export default function Page() {
  return <ComingSoonPanel label="Contact Us" />;
}
