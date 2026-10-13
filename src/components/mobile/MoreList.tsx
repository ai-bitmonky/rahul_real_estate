"use client";

import Link from "next/link";
import { useState, type MouseEvent, type ReactNode } from "react";
import { faqs } from "@/data/faq";
import { site } from "@/data/site";
import { team } from "@/data/team";
import { isAppShell } from "@/lib/shell";
import { Ico, type IconName } from "../Icons";
import Sheet from "./Sheet";

type SheetKey = "why" | "how" | "stories" | "privacy" | "terms";

const TITLES: Record<SheetKey, string> = {
  why: "Why Highness",
  how: "How it works",
  stories: "Owner stories",
  privacy: "Privacy",
  terms: "Terms",
};

function Lead({ icon, tone = "" }: { icon: IconName; tone?: string }) {
  return (
    <span className={`mrow-ic${tone ? " " + tone : ""}`} aria-hidden="true">
      <Ico name={icon} />
    </span>
  );
}

function Answer({ a, reraLink }: { a: string; reraLink?: boolean }) {
  if (!reraLink) return <p>{a}</p>;
  const [before, after] = a.split("{RERA}");
  return (
    <p>
      {before}
      <a className="rera" href={site.reraUrl} target="_blank" rel="noopener">
        {site.rera} · Verify ↗
      </a>
      {after}
    </p>
  );
}

/** "More" screen: grouped iOS-style rows. Section rows open sheets in the app shell, or jump to the home page section on desktop. */
export default function MoreList({ why, how, stories }: { why: ReactNode; how: ReactNode; stories: ReactNode }) {
  const [open, setOpenState] = useState<SheetKey | null>(null);
  // keep the last sheet's content mounted while it slides away
  const [last, setLast] = useState<SheetKey>("why");
  const setOpen = (k: SheetKey) => {
    setLast(k);
    setOpenState(k);
  };
  const close = () => setOpenState(null);

  const sectionRow = (key: SheetKey, hash: string, icon: IconName, label: string, sub: string) => (
    <Link
      className="mrow"
      href={`/#${hash}`}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        if (!isAppShell()) return;
        e.preventDefault();
        setOpen(key);
      }}
    >
      <Lead icon={icon} />
      <span className="mrow-t">
        <b>{label}</b>
        <small>{sub}</small>
      </span>
      <Ico name="chev" className="chev" />
    </Link>
  );

  const sheetRow = (key: SheetKey, icon: IconName, label: string) => (
    <button type="button" className="mrow" aria-haspopup="dialog" onClick={() => setOpen(key)}>
      <Lead icon={icon} tone="g" />
      <span className="mrow-t">
        <b>{label}</b>
      </span>
      <Ico name="chev" className="chev" />
    </button>
  );

  const content: Record<SheetKey, ReactNode> = {
    why,
    how,
    stories,
    privacy: (
      <div className="legal">
        <p>We use your name and phone number only to call you back about your site visit or enquiry.</p>
        <p>We never share or sell your details, and we never send spam calls.</p>
        <p>
          Questions about your data? Write to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    ),
    terms: (
      <div className="legal">
        <p>Images are artist&apos;s impressions. Prices are indicative and exclude registration and GST. *T&amp;C apply.</p>
        <p>EMI figures are for a loan of 80% of the price at 8.5% for 20 years. Your bank&apos;s offer may differ.</p>
        <p>Pay only into Highness Construction&apos;s registered bank accounts — never to an individual.</p>
      </div>
    ),
  };

  return (
    <div className="more">
      <div className="wrap">
        <div className="scr-head">
          <p className="eyebrow">More</p>
          <h1 className="scr-h">Everything else, in one place</h1>
        </div>

        <h2 className="mgrp-h">Explore</h2>
        <div className="mgrp">
          <Link className="mrow" href="/guides">
            <Lead icon="book" />
            <span className="mrow-t">
              <b>Guides</b>
              <small>Read before you buy</small>
            </span>
            <Ico name="chev" className="chev" />
          </Link>
          {sectionRow("why", "why", "shield", "Why Highness", "Built on trust, shown with proof")}
          {sectionRow("how", "how", "route", "How it works", "What happens after you enquire")}
          {sectionRow("stories", "stories", "heart", "Owner stories", "Families who got their keys")}
        </div>

        <h2 className="mgrp-h">Questions buyers ask</h2>
        <div className="mgrp">
          {faqs.map((f, i) => (
            <details key={f.q} className="macc" open={i === 0}>
              <summary>
                <Lead icon="help" />
                <span className="mrow-t">
                  <b>{f.q}</b>
                </span>
                <Ico name="chev" className="chev" />
              </summary>
              <div className="macc-a">
                <Answer a={f.a} reraLink={f.reraLink} />
              </div>
            </details>
          ))}
        </div>

        <h2 className="mgrp-h">Advisors</h2>
        <div className="mgrp">
          {team.map((a) => (
            <div key={a.name} className="mrow madv">
              <span className="mrow-av" aria-hidden="true">
                {a.initials}
              </span>
              <span className="mrow-t">
                <b>{a.name}</b>
                <small>{a.role}</small>
              </span>
              <span className="madv-act">
                <a className="rbtn" href={`tel:+${a.digits}`} aria-label={`Call ${a.name}`}>
                  <Ico name="phone" />
                </a>
                <a className="rbtn wa" href={`https://wa.me/${a.digits}`} target="_blank" rel="noopener" aria-label={`WhatsApp ${a.name}`}>
                  <Ico name="wa" />
                </a>
              </span>
            </div>
          ))}
        </div>

        <h2 className="mgrp-h">Contact &amp; address</h2>
        <div className="mgrp">
          <a className="mrow" href={site.mapsUrl} target="_blank" rel="noopener">
            <Lead icon="pin" />
            <span className="mrow-t">
              <b>Shakti Paradise, Chinhat</b>
              <small>{site.addressLines.join(" ")}</small>
            </span>
            <Ico name="ext" className="chev" />
          </a>
          <a className="mrow" href={site.phoneHref}>
            <Lead icon="phone" />
            <span className="mrow-t">
              <b>{site.phone}</b>
              <small>9 am – 8 pm, every day</small>
            </span>
            <Ico name="chev" className="chev" />
          </a>
          <a className="mrow" href={site.whatsapp} target="_blank" rel="noopener">
            <Lead icon="wa" tone="wa" />
            <span className="mrow-t">
              <b>WhatsApp</b>
              <small>Replies within 2 hours</small>
            </span>
            <Ico name="chev" className="chev" />
          </a>
          <a className="mrow" href={`mailto:${site.email}`}>
            <Lead icon="doc" />
            <span className="mrow-t">
              <b>{site.email}</b>
            </span>
            <Ico name="chev" className="chev" />
          </a>
        </div>

        <h2 className="mgrp-h">Registration &amp; legal</h2>
        <div className="mgrp">
          <a className="mrow" href={site.reraUrl} target="_blank" rel="noopener">
            <Lead icon="shield" tone="g" />
            <span className="mrow-t">
              <b>RERA {site.rera}</b>
              <small>Verify on the UP RERA portal</small>
            </span>
            <Ico name="ext" className="chev" />
          </a>
          <a className="mrow" href={site.gstUrl} target="_blank" rel="noopener">
            <Lead icon="doc" tone="g" />
            <span className="mrow-t">
              <b>GSTIN {site.gstin}</b>
              <small>Verify on the GST portal</small>
            </span>
            <Ico name="ext" className="chev" />
          </a>
          {sheetRow("privacy", "doc", "Privacy")}
          {sheetRow("terms", "doc", "Terms")}
        </div>

        <p className="mfine">
          Images are artist&apos;s impressions. Prices are indicative and exclude registration and GST. *T&amp;C apply. Pay only
          into Highness Construction&apos;s registered bank accounts — never to an individual.
          <br />© 2026 Highness Construction
        </p>
      </div>

      <Sheet open={open !== null} onClose={close} title={TITLES[last]}>
        <div className={`msheet msheet-${last}`}>{content[last]}</div>
      </Sheet>
    </div>
  );
}
