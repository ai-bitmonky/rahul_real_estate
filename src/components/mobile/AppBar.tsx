"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { isDetailPath } from "@/lib/shell";
import { Ico, Mono } from "../Icons";

const TITLES: Record<string, string> = {
  "/homes": "Homes & plots",
  "/emi": "EMI calculator",
  "/more": "More",
  "/guides": "Guides",
};

// In-app history depth, so "back" never leaves the site on a deep link.
let depth = 0;
let popped = false;
if (typeof window !== "undefined") window.addEventListener("popstate", () => (popped = true));

/** Phone app shell: top app bar (hidden on desktop/tablet by CSS). */
export default function AppBar() {
  const path = usePathname();
  const router = useRouter();
  const detail = isDetailPath(path);
  const home = path === "/";
  const [scrolled, setScrolled] = useState(false);
  const [title, setTitle] = useState(TITLES[path] ?? "");
  const [toast, setToast] = useState("");
  const toastT = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    depth = popped ? Math.max(0, depth - 1) : depth + 1;
    popped = false;
    // Detail screens put their name on <main data-title>; other screens use the fixed titles.
    const t = document.querySelector<HTMLElement>("main[data-title]")?.dataset.title;
    setTitle(TITLES[path] ?? t ?? "Highness");
  }, [path]);

  useEffect(() => {
    const limit = detail ? Math.round(window.innerWidth * 0.75) - 72 : 4;
    const onS = () => setScrolled(window.scrollY > limit);
    onS();
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, [detail, path]);

  useEffect(() => () => clearTimeout(toastT.current), []);

  const back = () => {
    if (depth > 1) router.back();
    else router.push("/");
  };

  const say = (msg: string) => {
    setToast(msg);
    clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToast(""), 1800);
  };

  const share = async () => {
    const data = { title: document.title, url: window.location.href };
    if (typeof navigator.share === "function") {
      try {
        await navigator.share(data);
      } catch {
        /* user closed the share sheet */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(data.url);
      say("Link copied");
    } catch {
      say("Could not copy the link");
    }
  };

  const wa = (
    <a className="ab-btn wa" href={site.whatsapp} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <Ico name="wa" />
    </a>
  );

  let inner;
  if (home) {
    inner = (
      <>
        <Link href="/" className="ab-logo" aria-label="Highness Construction home">
          <Mono />
          <b>Highness</b>
        </Link>
        <div className="ab-r">
          <Link className="ab-btn" href="/homes" aria-label="Search homes">
            <Ico name="search" />
          </Link>
          {wa}
        </div>
      </>
    );
  } else {
    inner = (
      <>
        <button type="button" className="ab-btn ab-back" onClick={back} aria-label="Back">
          <Ico name="back" />
        </button>
        <p className="ab-title" aria-hidden={detail && !scrolled ? true : undefined}>
          {title}
        </p>
        <div className="ab-r">
          {detail ? (
            <button type="button" className="ab-btn" onClick={share} aria-label="Share">
              <Ico name="share" />
            </button>
          ) : (
            wa
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <header className={`appbar${detail ? " clear" : ""}${scrolled ? " s" : ""}`}>{inner}</header>
      <div className={`toast${toast ? " on" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
