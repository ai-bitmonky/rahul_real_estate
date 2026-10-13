import Image from "next/image";
import Link from "next/link";
import { progress, STATUS, type Project } from "@/data/projects";
import { site, waText } from "@/data/site";
import { big, emiFrom, inr } from "@/lib/emi";
import { BookLink } from "../Links";
import Progress from "../Progress";
import { Ico } from "../Icons";

/** Phone layout of a project: full-bleed image under the clear app bar, overlapping content card, sticky CTA bar. */
export default function MobileProject({ p, priority = false }: { p: Project; priority?: boolean }) {
  const st = STATUS[p.status];
  const hasProgress = !!progress[p.slug];
  return (
    <div className="mp only-mobile">
      <div className="mp-hero">
        <Image src={`/img/${p.image}.jpg`} alt={p.imageAlt} fill priority={priority} quality={85} sizes="(max-width: 999px) 100vw, 600px" />
        <span className="tag br">Artist&apos;s impression</span>
      </div>
      <article className="mp-card">
        <span className={`pill ${st.cls}`}>
          <i></i>
          {st.label}
        </span>
        <p className="mp-loc">
          {p.locLabel} · {p.typeLabel}
        </p>
        <h1>{p.name}</h1>
        <p className="mp-lead">{p.description}</p>

        <dl className="mp-facts">
          <div>
            <dt>Price</dt>
            <dd className="num">From {big(p.price)}*</dd>
          </div>
          <div>
            <dt>EMI from</dt>
            <dd className="num">{inr(emiFrom(p.price))}/mo</dd>
          </div>
          <div>
            <dt>Possession</dt>
            <dd>{p.possession ?? "Ready to move in"}</dd>
          </div>
          <div>
            <dt>Specs</dt>
            <dd className="sp">{p.specs.join(" · ")}</dd>
          </div>
          <div className="w">
            <dt>RERA no.</dt>
            <dd>
              <a className="rera" href={site.reraUrl} target="_blank" rel="noopener">
                {p.rera} · Verify ↗
              </a>
            </dd>
          </div>
        </dl>

        <h2 className="mp-h">Amenities</h2>
        <ul className="mp-amen">
          {p.amenities.map((a) => (
            <li key={a}>
              <Ico name="check" />
              {a}
            </li>
          ))}
        </ul>

        {hasProgress && (
          <div className="mp-prog feat">
            <Progress slug={p.slug} />
          </div>
        )}

        <h2 className="mp-h">Good to know</h2>
        <div className="mgrp">
          <Link className="mrow" href="/emi">
            <span className="mrow-ic" aria-hidden="true">
              <Ico name="calc" />
            </span>
            <span className="mrow-t">
              <b>Open EMI calculator</b>
              <small>EMI shown is for 80% loan · 8.5% · 20 yrs</small>
            </span>
            <Ico name="chev" className="chev" />
          </Link>
          <a className="mrow" href={site.mapsUrl} target="_blank" rel="noopener">
            <span className="mrow-ic" aria-hidden="true">
              <Ico name="pin" />
            </span>
            <span className="mrow-t">
              <b>{p.locLabel}</b>
              <small>Free guided site visits, 9 am – 7 pm</small>
            </span>
            <Ico name="ext" className="chev" />
          </a>
        </div>
        <p className="mp-fine">Images are artist&apos;s impressions. Prices exclude registration and GST. *T&amp;C apply.</p>
      </article>

      <div className="mp-cta">
        <div className="mp-cta-p">
          <b className="num">From {big(p.price)}</b>
          <span className="num">EMI {inr(emiFrom(p.price))}/mo</span>
        </div>
        <BookLink className="btn btn-p" project={p.name}>
          Book visit
        </BookLink>
        <a className="rbtn wa" href={waText(`Hi, I am interested in ${p.name}`)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
          <Ico name="wa" />
        </a>
      </div>
    </div>
  );
}
