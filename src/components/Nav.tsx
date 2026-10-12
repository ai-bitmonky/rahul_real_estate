"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { Ico, Mono } from "./Icons";
import { HashLink } from "./Links";

const LINKS: [string, string][] = [
  ["properties", "Homes & Plots"],
  ["featured", "New Launches"],
  ["why", "Why us"],
  ["emi", "EMI"],
  ["journal", "Guides"],
  ["contact", "Contact"],
];

const DRAWER: [string, string, string][] = [
  ["top", "Home", "00"],
  ["properties", "Homes & Plots", "02"],
  ["featured", "New Launches", "04"],
  ["emi", "EMI", "07"],
  ["journal", "Guides", "10"],
  ["contact", "Contact", "12"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 40);
    onS();
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lock", open);
    if (open) {
      const t = setTimeout(() => closeBtn.current?.focus(), 50);
      wasOpen.current = true;
      return () => clearTimeout(t);
    }
    if (wasOpen.current) burger.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className={`nav${scrolled ? " s" : ""}`} id="nav">
        <div className="wrap">
          <HashLink hash="top" className="logo" aria-label="Highness Construction home">
            <Mono />
            <span className="wm">
              <b>Highness</b>
              <small>CONSTRUCTION</small>
            </span>
          </HashLink>
          <nav className="nav-links" aria-label="Main">
            {LINKS.map(([h, t]) => (
              <HashLink key={h} hash={h}>
                {t}
              </HashLink>
            ))}
          </nav>
          <div className="nav-r">
            <a className="nav-tel" href={site.phoneHref}>
              <Ico name="phone" />
              {site.phone}
            </a>
            <a className="icobtn wa" href={site.whatsapp} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
              <Ico name="wa" />
            </a>
            <HashLink hash="contact" className="btn btn-p btn-sm">
              Book a Visit
            </HashLink>
            <button
              ref={burger}
              className="burger"
              id="burger"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="drawer"
              onClick={() => setOpen(true)}
            >
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer${open ? " open" : ""}`} id="drawer" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer-top">
          <HashLink hash="top" className="logo" aria-label="Highness Construction home" onClick={close}>
            <Mono style={{ width: 28, height: 38 }} />
            <span className="wm">
              <b>Highness</b>
              <small>CONSTRUCTION</small>
            </span>
          </HashLink>
          <button ref={closeBtn} className="x" id="dclose" aria-label="Close menu" onClick={close}>
            <svg className="ico" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile">
          {DRAWER.map(([h, t, n]) => (
            <HashLink key={h} hash={h} onClick={close}>
              {t} <small>{n}</small>
            </HashLink>
          ))}
        </nav>
        <div className="row">
          <a className="btn btn-o" href={site.phoneHref} onClick={close}>
            <Ico name="phone" />
            Call
          </a>
          <a className="btn btn-wa" href={site.whatsapp} target="_blank" rel="noopener" onClick={close}>
            <Ico name="wa" />
            WhatsApp
          </a>
        </div>
        <HashLink hash="contact" className="btn btn-p" onClick={close}>
          Book a Visit
        </HashLink>
      </div>
    </>
  );
}
