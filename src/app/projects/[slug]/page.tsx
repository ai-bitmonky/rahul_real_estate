import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, progress, projects, STATUS } from "@/data/projects";
import { site, waText } from "@/data/site";
import { big, emiFrom, inr } from "@/lib/emi";
import BookVisit from "@/components/BookVisit";
import Progress from "@/components/Progress";
import { BookLink } from "@/components/Links";
import { Ico } from "@/components/Icons";
import MobileProject from "@/components/mobile/MobileProject";
import { getDevice } from "@/lib/device";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.name} · ${p.locality}, Lucknow`;
  return {
    title,
    description: `${p.specs.join(" · ")} in ${p.locLabel}. From ${big(p.price)}. ${p.description}`.slice(0, 300),
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title,
      description: p.description,
      url: `/projects/${p.slug}`,
      images: [{ url: `/img/${p.image}.jpg`, alt: p.imageAlt }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const st = STATUS[p.status];
  const hasProgress = !!progress[p.slug];

  // Phones get only the app layout; desktop/tablet also carry it (CSS-hidden) for narrow windows.
  if ((await getDevice()) === "mobile") {
    return (
      <main id="main" data-title={p.name}>
        <MobileProject p={p} priority />
      </main>
    );
  }

  return (
    <main id="main" data-title={p.name}>
      <div className="only-desktop">
        <section className="dhero" id="hero">
          <div className="wrap">
            <Link className="back" href="/#properties">
              <Ico name="arrow" />
              All homes &amp; plots
            </Link>
            <div className="hero-g">
              <div className="hero-t">
                <p className="eyebrow reveal">
                  {p.locLabel} · {p.typeLabel} · {st.label}
                </p>
                <h1 className="reveal d1">{p.name}</h1>
                <p className="lead reveal d2">{p.description}</p>
                <div className="hero-cta reveal d2">
                  <BookLink className="btn btn-p" project={p.name}>
                    Book a free site visit <Ico name="arrow" className="arr" />
                  </BookLink>
                  <a className="btn btn-wa" href={waText(`Hi, I am interested in ${p.name}`)} target="_blank" rel="noopener">
                    <Ico name="wa" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="hero-v reveal d1">
                <div className="hero-fig">
                  <Image
                    src={`/img/${p.image}.jpg`}
                    alt={p.imageAlt}
                    fill
                    priority
                    quality={85}
                    sizes="(max-width: 999px) 100vw, 600px"
                  />
                  <span className="tag br">Artist&apos;s impression</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="feat dfeat" aria-labelledby="h-facts">
          <div className="wrap dwrap">
            <p className="eyebrow reveal">At a glance</p>
            <h2 id="h-facts" className="reveal d1">
              The facts, in one place
            </h2>
            <p className="d reveal d1">Every number here is the same one you will see in your agreement.</p>
            <div className="cols">
              <div>
                <div className="facts f6 reveal d2">
                  <div>
                    <small>Price</small>
                    <b className="num">From {big(p.price)}*</b>
                  </div>
                  <div>
                    <small>EMI from</small>
                    <b className="num">{inr(emiFrom(p.price))}/mo</b>
                  </div>
                  <div>
                    <small>Possession</small>
                    <b>{p.possession ?? "Ready to move in"}</b>
                  </div>
                  <div>
                    <small>RERA no.</small>
                    <a href={site.reraUrl} target="_blank" rel="noopener">
                      {p.rera} ↗
                    </a>
                  </div>
                  <div>
                    <small>Type</small>
                    <b>{p.typeLabel}</b>
                  </div>
                  <div>
                    <small>Specs</small>
                    <b>{p.specs.join(" · ")}</b>
                  </div>
                </div>
                <p className="sub reveal">Amenities</p>
                <ul className="amen reveal d2">
                  {p.amenities.map((a) => (
                    <li key={a}>
                      <Ico name="check" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {hasProgress ? (
                  <Progress slug={p.slug} />
                ) : (
                  <>
                    <p className="sub reveal">About this home</p>
                    <p className="d reveal">{p.description}</p>
                    <p className="d reveal">
                      EMI shown is for a loan of 80% of the price at 8.5% for 20 years. Your bank&apos;s offer may differ.
                    </p>
                  </>
                )}
                <div className="feat-cta reveal">
                  <BookLink className="btn btn-brass" project={p.name}>
                    Book a visit <Ico name="arrow" className="arr" />
                  </BookLink>
                  <Link className="btn btn-od" href="/#emi">
                    Open EMI calculator
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BookVisit num="" defaultProject={p.name} />
      </div>
      <MobileProject p={p} />
    </main>
  );
}
