import type { Metadata } from "next";
import { guides } from "@/data/guides";
import GuideCard from "@/components/GuideCard";
import GuideRow from "@/components/mobile/GuideRow";

export const metadata: Metadata = {
  title: "Guides",
  description: "Plain-words guides for home buyers in Lucknow: localities, plots vs apartments, and how to check RERA.",
  alternates: { canonical: "/guides" },
};

const DELAYS = ["", " d1", " d2"];

export default function GuidesPage() {
  return (
    <main id="main" className="scr">
      <section className="sec scr-guides" aria-labelledby="h-guides">
        <div className="wrap">
          <div className="sh scr-head">
            <div>
              <p className="eyebrow">Guides</p>
              <h1 id="h-guides" className="scr-h">
                Read before you buy
              </h1>
            </div>
          </div>
          <div className="grid3 only-desktop">
            {guides.map((g, i) => (
              <GuideCard key={g.slug} g={g} delay={DELAYS[i % 3]} />
            ))}
          </div>
          <div className="glist only-mobile">
            {guides.map((g) => (
              <GuideRow key={g.slug} g={g} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
