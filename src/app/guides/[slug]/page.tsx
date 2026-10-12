import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/data/guides";
import BookVisit from "@/components/BookVisit";
import GuideCard from "@/components/GuideCard";
import GuideCover from "@/components/GuideCover";
import { Ico } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.summary,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: "article", title: g.title, description: g.summary, url: `/guides/${g.slug}`, publishedTime: g.iso },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const related = guides.filter((x) => x.slug !== g.slug);

  return (
    <main id="main">
      <article className="sec" id="hero" style={{ paddingTop: 44 }}>
        <div className="wrap">
          <div className="article">
            <Link className="back" href="/#journal">
              <Ico name="arrow" />
              All guides
            </Link>
            <p className="eyebrow">
              {g.category} · <time dateTime={g.iso}>{g.date}</time>
            </p>
            <h1>{g.title}</h1>
            <p className="lead">{g.summary}</p>
            <div className="cov" style={{ marginTop: 40 }}>
              <GuideCover slug={g.slug} />
            </div>
            <div className="body">
              {g.body.map((b, i) =>
                "p" in b ? (
                  <p key={i}>{b.p}</p>
                ) : "h" in b ? (
                  <h2 key={i}>{b.h}</h2>
                ) : (
                  <ul key={i}>
                    {b.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ),
              )}
            </div>
          </div>
        </div>
      </article>

      <section className="sec band2" aria-labelledby="h-related">
        <div className="wrap">
          <div className="sh">
            <div>
              <p className="eyebrow reveal">Keep reading</p>
              <h2 id="h-related" className="reveal d1">
                More guides
              </h2>
            </div>
          </div>
          <div className="grid3">
            {related.map((r, i) => (
              <GuideCard key={r.slug} g={r} delay={i ? " d1" : ""} />
            ))}
          </div>
        </div>
      </section>

      <BookVisit num="" />
    </main>
  );
}
