import type { Metadata } from "next";
import Why from "@/components/Why";
import HowItWorks from "@/components/HowItWorks";
import Stories from "@/components/Stories";
import MoreList from "@/components/mobile/MoreList";

export const metadata: Metadata = {
  title: "More",
  description: "Guides, FAQs, advisors, contact details and RERA registration for Highness Construction.",
  alternates: { canonical: "/more" },
};

export default function MorePage() {
  return (
    <main id="main" className="scr">
      <MoreList why={<Why />} how={<HowItWorks />} stories={<Stories />} />
    </main>
  );
}
