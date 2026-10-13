import type { Metadata } from "next";
import EmiCalculator from "@/components/EmiCalculator";
import BookVisit from "@/components/BookVisit";

export const metadata: Metadata = {
  title: "Home loan EMI calculator",
  description: "Work out your monthly home-loan EMI, total interest and total payable in seconds.",
  alternates: { canonical: "/emi" },
};

export default function EmiPage() {
  return (
    <main id="main" className="scr">
      <EmiCalculator screen />
      <BookVisit num="" />
    </main>
  );
}
