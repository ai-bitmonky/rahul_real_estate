import Image from "next/image";
import Link from "next/link";
import { getProject, listedProjects, progress, STATUS } from "@/data/projects";
import { guides } from "@/data/guides";
import { stories } from "@/data/stories";
import { team } from "@/data/team";
import { site } from "@/data/site";
import { big, emi, emiFrom, inr } from "@/lib/emi";
import { BookButton } from "../Links";
import { Ico } from "../Icons";
import GuideRow from "./GuideRow";
import InstallHint from "./InstallHint";

const CATS: [string, string][] = [
  ["plot", "Plots"],
  ["villa", "Villas"],
  ["apartment", "Apartments"],
  ["com", "Commercial"],
];

const TRUST: [string, string, string][] = [
  ["25", "years", "Building in Lucknow since 2001"],
  ["40", "projects", "All RERA-registered"],
  ["1,200+", "families", "Possession letters on file"],
  ["38/40", "on time", "Handed over on the promised date"],
];

/** Compact app-style Home screen for phones (the desktop home page stays as it is). */
export default function MobileHome({ priority = false }: { priority?: boolean }) {
  const summit = getProject("summit-twin-towers");
  const pr = summit ? progress[summit.slug] : undefined;
  const done = pr ? pr.stages.filter((s) => s.state === "d").length + 0.5 * pr.stages.filter((s) => s.state === "now").length : 0;
  const pct = pr ? (done / pr.stages.length) * 100 : 0;
  const sample = emi(50e5, 8.5, 20);

  return (
    <div className="mhome only-mobile">
      <section className="mh-hero" aria-labelledby="mh-h1">
        <div className="mh-hero-im">
          <Image
            src="/img/hero-tower.jpg"
            alt="Shakti Paradise towers in Chinhat at dusk"
            fill
            priority={priority}
            quality={85}
            sizes="(max-width: 999px) 100vw, 600px"
          />
          <span className="mh-chip">
            <i></i>Ready to move · Chinhat
          </span>
          <span className="tag br">Artist&apos;s impression</span>
        </div>
        <h1 id="mh-h1">
          Homes we finish. <em>Keys we hand over.</em>
        </h1>
        <p className="mh-lead">RERA-registered plots, villas and apartments across Lucknow.</p>
        <div className="mh-cta">
          <BookButton className="btn btn-p">
            Book a free site visit <Ico name="arrow" className="arr" />
          </BookButton>
          <a className="btn btn-wa" href={site.whatsapp} target="_blank" rel="noopener">
            <Ico name="wa" />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <InstallHint />

      <Link href="/homes" className="mh-search">
        <Ico name="search" />
        <span>Search by locality, type or budget</span>
        <span className="mh-search-f" aria-hidden="true">
          <Ico name="filter" />
        </span>
      </Link>

      <nav className="mh-cats" aria-label="Browse by type">
        {CATS.map(([t, label]) => (
          <Link key={t} href={`/homes?type=${t}`}>
            {label}
          </Link>
        ))}
      </nav>

      <section className="mh-sec" aria-labelledby="mh-homes">
        <div className="mh-sh">
          <h2 id="mh-homes">Homes ready for you</h2>
          <Link href="/homes">See all →</Link>
        </div>
        <div className="mh-rail">
          {listedProjects.slice(0, 6).map((p) => {
            const st = STATUS[p.status];
            return (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="hc">
                <span className="hc-im">
                  <Image src={`/img/${p.image}.jpg`} alt={p.imageAlt} fill quality={85} sizes="(max-width: 999px) 76vw, 320px" />
                  <span className={`pill ${st.cls}`}>
                    <i></i>
                    {st.label}
                  </span>
                </span>
                <span className="hc-b">
                  <small>{p.locLabel}</small>
                  <b>{p.name}</b>
                  <span className="hc-sp">{p.specs.join(" · ")}</span>
                  <span className="hc-pr">
                    <strong className="num">From {big(p.price)}*</strong>
                    <span className="num">EMI {inr(emiFrom(p.price))}/mo</span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {summit && (
        <section className="mh-sec" aria-labelledby="mh-feat">
          <div className="mh-sh">
            <h2 id="mh-feat">New launch</h2>
          </div>
          <Link href={`/projects/${summit.slug}`} className="mh-feat">
            <span className="mh-feat-im">
              <Image src={`/img/${summit.image}.jpg`} alt={summit.imageAlt} fill quality={85} sizes="(max-width: 999px) 100vw, 600px" />
              <span className="tag bl">Artist&apos;s impression</span>
            </span>
            <span className="mh-feat-b">
              <small>Under construction · {summit.locLabel}</small>
              <b>{summit.name}</b>
              <span className="mh-facts">
                <span>
                  <small>Price</small>
                  <strong className="num">From ₹52 L*</strong>
                </span>
                <span>
                  <small>Homes</small>
                  <strong>2 &amp; 3 BHK</strong>
                </span>
                <span>
                  <small>Possession</small>
                  <strong>{summit.possession}</strong>
                </span>
                <span>
                  <small>RERA</small>
                  <strong className="rr">{summit.rera}</strong>
                </span>
              </span>
              {pr && (
                <span className="mh-prog">
                  <span className="mh-prog-t">
                    <span>{pr.stages.find((s) => s.state === "now")?.title ?? "In progress"}</span>
                    <span>{pr.updated}</span>
                  </span>
                  <span className="mh-bar" aria-hidden="true">
                    <i style={{ width: `${pct}%` }}></i>
                  </span>
                  <span className="mh-prog-s">
                    {pr.stages.map((s) => (
                      <span key={s.title} className={s.state || undefined}>
                        {s.title.replace(/\s*[✓\d%]+$/, "")}
                      </span>
                    ))}
                  </span>
                </span>
              )}
            </span>
          </Link>
        </section>
      )}

      <section className="mh-trust" aria-label="Our record">
        {TRUST.map(([n, k, t]) => (
          <div key={k}>
            <b className="num">{n}</b>
            <small>{k}</small>
            <span>{t}</span>
          </div>
        ))}
        <a className="mh-trust-rr" href={site.reraUrl} target="_blank" rel="noopener">
          <Ico name="shield" />
          RERA {site.rera} · Verify on UP RERA ↗
        </a>
      </section>

      <Link href="/emi" className="mh-emi">
        <span className="mh-emi-ic" aria-hidden="true">
          <Ico name="calc" />
        </span>
        <span className="mh-emi-t">
          <b>Know your monthly EMI</b>
          <span>
            <strong className="num">{inr(sample)}</strong>/mo for ₹50 L · 8.5% · 20 yrs
          </span>
        </span>
        <span className="mh-emi-go">
          Open calculator <Ico name="chev" />
        </span>
      </Link>

      <section className="mh-sec" aria-labelledby="mh-stories">
        <div className="mh-sh">
          <h2 id="mh-stories">Owner stories</h2>
        </div>
        <div className="mh-rail">
          {stories.map((s) => (
            <figure key={s.name} className="mh-story">
              <div className="stars" role="img" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote>{s.quote}</blockquote>
              <figcaption>
                <span className="ini">{s.initials}</span>
                <span>
                  <b>{s.name}</b>
                  <span>{s.detail}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mh-sec" aria-labelledby="mh-guides">
        <div className="mh-sh">
          <h2 id="mh-guides">Read before you buy</h2>
          <Link href="/guides">All guides →</Link>
        </div>
        <div className="glist">
          {guides.slice(0, 3).map((g) => (
            <GuideRow key={g.slug} g={g} />
          ))}
        </div>
      </section>

      <section className="mh-adv" aria-labelledby="mh-adv">
        <div className="mh-adv-top">
          <span className="mh-av" aria-hidden="true">
            {team.map((a) => (
              <span key={a.initials}>{a.initials}</span>
            ))}
          </span>
          <span>
            <b id="mh-adv">Talk to an advisor</b>
            <small>Replies within 2 hours, 9 am – 8 pm</small>
          </span>
        </div>
        <div className="mh-adv-act">
          <a className="btn btn-o" href={site.phoneHref}>
            <Ico name="phone" />
            Call
          </a>
          <a className="btn btn-wa" href={site.whatsapp} target="_blank" rel="noopener">
            <Ico name="wa" />
            WhatsApp
          </a>
        </div>
      </section>

      <p className="mh-fine">
        RERA {site.rera} ·{" "}
        <a href={site.reraUrl} target="_blank" rel="noopener">
          Verify ↗
        </a>{" "}
        · © 2026 Highness Construction
      </p>
    </div>
  );
}
