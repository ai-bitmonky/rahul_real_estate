import type { Metadata } from "next";
import Listings from "@/components/Listings";
import BookVisit from "@/components/BookVisit";

export const metadata: Metadata = {
  title: "Homes & plots",
  description: "RERA-registered plots, villas and apartments across Lucknow, with price, EMI and possession date on every card.",
  alternates: { canonical: "/homes" },
};

type Props = { searchParams: Promise<{ type?: string | string[] }> };

export default async function HomesPage({ searchParams }: Props) {
  const { type } = await searchParams;
  return (
    <main id="main" className="scr">
      <Listings screen initialType={typeof type === "string" ? type : ""} />
      <BookVisit num="" />
    </main>
  );
}
