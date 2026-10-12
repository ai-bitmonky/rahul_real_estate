"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useSiteState } from "@/context/SiteState";
import { listedProjects, STATUS, type Project } from "@/data/projects";
import { site, waText } from "@/data/site";
import { big, emiFrom, inr } from "@/lib/emi";
import { BUDGETS } from "./SearchCard";
import { BookLink } from "./Links";
import SwipeCounter from "./SwipeCounter";
import { Ico } from "./Icons";

const NAMES: Record<string, string> = {
  plots: "Plots",
  villas: "Villas",
  apartments: "Apartments",
  homes: "Apartments & villas",
  shop: "Shops",
  office: "Offices",
  showroom: "Showrooms",
};

const CHIPS: [string, string][] = [
  ["", "All"],
  ["villas", "Villas"],
  ["apartments", "Apartments"],
  ["plots", "Plots"],
];

const DELAYS = ["", " d1", " d2"];

function Card({ p, i, hidden }: { p: Project; i: number; hidden: boolean }) {
  const st = STATUS[p.status];
  const [saved, setSaved] = useState(false);
  const toggleSave = (e: MouseEvent<HTMLButtonElement>) => {
    const b = e.currentTarget;
    const on = !saved;
    setSaved(on);
    // restart the little "pop" animation
    b.classList.remove("pop");
    void b.offsetWidth;
    if (on) b.classList.add("pop");
  };
  const href = `/projects/${p.slug}`;
  return (
    <article className={`card reveal${DELAYS[i % 3]}`} hidden={hidden} data-type={p.type} data-loc={p.locality}>
      <div className="im">
        <Image
          src={`/img/${p.image}.jpg`}
          alt={p.imageAlt}
          fill
          quality={85}
          sizes="(max-width: 699px) 82vw, (max-width: 1099px) 50vw, 420px"
        />
        <Link className="im-link" href={href} aria-label={`View ${p.name}`} tabIndex={-1} />
        <span className={`pill ${st.cls}`}>
          <i></i>
          {st.label}
        </span>
        <button className="save" type="button" aria-pressed={saved} aria-label={`Save ${p.name}`} onClick={toggleSave}>
          <Ico name="heart" />
        </button>
        <span className="tag bl">Artist&apos;s impression</span>
      </div>
      <div className="cb">
        <p className="loc">{p.locLabel}</p>
        <h3>
          <Link href={href}>{p.name}</Link>
        </h3>
        <p className="specs">
          {p.specs.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
        <div className="price">
          <b className="num">
            <small>From</small>
            {big(p.price)}*
          </b>
          <span>
            EMI from <strong className="num">{inr(emiFrom(p.price))}</strong>/mo
          </span>
        </div>
        <div className="cmeta">
          {p.possession ? <span>Possession {p.possession}</span> : <span className="ok">Ready to move in</span>}
          <a className="rera" href={site.reraUrl} target="_blank" rel="noopener">
            RERA {p.rera} ↗
          </a>
        </div>
        <div className="cact">
          <BookLink className="tlink" project={p.name}>
            Book visit <Ico name="arrow" className="arr" />
          </BookLink>
          <a
            className="icobtn wa"
            href={waText(`Hi, I am interested in ${p.name}`)}
            target="_blank"
            rel="noopener"
            aria-label={`WhatsApp about ${p.name}`}
          >
            <Ico name="wa" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Listings() {
  const { filter: S, filterTick, applyFilter } = useSiteState();
  const grid = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    const [lo, hi] = S.bud ? S.bud.split("-").map(Number) : [0, 1e9];
    return listedProjects.map((p) => {
      const lakh = p.price / 1e5;
      return (
        S.kind === "res" &&
        (!S.type || p.type === S.type || (S.type === "homes" && p.type !== "plots")) &&
        (!S.loc || p.locality === S.loc) &&
        lakh >= lo &&
        lakh < hi
      );
    });
  }, [S]);
  const n = visible.filter(Boolean).length;

  useEffect(() => {
    if (grid.current) grid.current.scrollLeft = 0;
  }, [filterTick]);

  const budLabel = BUDGETS.find(([v]) => v === S.bud)?.[1] ?? "";
  const parts = [S.kind === "com" ? "Commercial" : "", NAMES[S.type] || "", S.loc, S.bud ? budLabel : ""].filter(Boolean);
  const chipOnly = parts.length === 1 && !!S.type && CHIPS.some(([f]) => f === S.type);
  const showRes = parts.length > 0 && !chipOnly;
  const com = S.kind === "com";

  return (
    <section className="sec band-iv" id="properties" aria-labelledby="h-props" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="sh">
          <div>
            <p className="eyebrow reveal">
              <b>02</b>— Homes ready for you
            </p>
            <h2 id="h-props" className="reveal d1">
              Homes ready for you
            </h2>
            <p className="meta reveal d2">Price, possession date and RERA number on every card.</p>
          </div>
          <div className="chips reveal d2" id="chips" role="group" aria-label="Filter homes">
            {CHIPS.map(([f, t]) => (
              <button
                key={t}
                type="button"
                aria-pressed={S.kind === "res" && S.type === f}
                data-f={f}
                onClick={() => applyFilter({ type: f })}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="shr">
            <span className="swipe-hint">Swipe →</span>
            <SwipeCounter target="grid" initial={`1 / ${listedProjects.length}`} version={filterTick} />
          </div>
        </div>
        <p className={`res${showRes ? " on" : ""}`} id="res" aria-live="polite">
          <span id="resT">{showRes ? `Showing ${n} ${n === 1 ? "home" : "homes"} · ${parts.join(" · ")}` : ""}</span>
          <button type="button" id="resX" onClick={() => applyFilter({})}>
            Clear filters
          </button>
        </p>
        <div className="grid3 swipe" id="grid" ref={grid}>
          {listedProjects.map((p, i) => (
            <Card key={p.slug} p={p} i={i} hidden={!visible[i]} />
          ))}
          <div className={`empty${n ? "" : " on"}`} id="empty">
            <h3 id="emT">{com ? "Commercial spaces are shared on request" : "No exact match yet"}</h3>
            <p id="emP">
              {com
                ? "8 shops, offices and showrooms are open now. Ask us for the current list and prices."
                : "Try another area or budget — or tell us what you need. New homes open every month."}
            </p>
            <a className="btn btn-wa btn-sm" href={site.whatsapp} target="_blank" rel="noopener">
              <Ico name="wa" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
