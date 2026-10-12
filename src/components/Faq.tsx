"use client";

import { useState } from "react";
import { faqs } from "@/data/faq";
import { site } from "@/data/site";
import { Ico } from "./Icons";

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

export default function Faq() {
  const [open, setOpen] = useState<boolean[]>(() => faqs.map((_, i) => i === 0));
  const toggle = (i: number) => setOpen((o) => o.map((v, j) => (j === i ? !v : v)));

  return (
    <section className="sec band2" id="faq" aria-labelledby="h-faq">
      <div className="wrap faq-g">
        <div className="faq-a">
          <p className="eyebrow reveal">
            <b>11</b>— Good to know
          </p>
          <h2 id="h-faq" className="reveal d1">
            Questions buyers ask us
          </h2>
          <p className="reveal d2">Still unsure? Our team is happy to walk you through anything.</p>
          <div className="acts reveal d2">
            <a className="btn btn-o btn-sm" href={site.phoneHref}>
              <Ico name="phone" />
              {site.phone}
            </a>
            <a className="btn btn-wa btn-sm" href={site.whatsapp} target="_blank" rel="noopener">
              <Ico name="wa" />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="faqs reveal">
          {faqs.map((f, i) => (
            <div className="acc" key={f.q}>
              <h3>
                <button type="button" aria-expanded={open[i]} aria-controls={`q${i + 1}`} id={`b${i + 1}`} onClick={() => toggle(i)}>
                  {f.q}
                  <span className="pm" aria-hidden="true"></span>
                </button>
              </h3>
              <div className={`pnl${open[i] ? " open" : ""}`} id={`q${i + 1}`} role="region" aria-labelledby={`b${i + 1}`}>
                <div>
                  <Answer a={f.a} reraLink={f.reraLink} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
