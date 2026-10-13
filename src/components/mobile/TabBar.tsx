"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteState } from "@/context/SiteState";
import { Ico, type IconName } from "../Icons";

const TABS: { href: string; label: string; icon: IconName; match: (p: string) => boolean }[] = [
  { href: "/", label: "Home", icon: "home", match: (p) => p === "/" },
  { href: "/homes", label: "Homes", icon: "homes", match: (p) => p.startsWith("/homes") },
  { href: "/emi", label: "EMI", icon: "calc", match: (p) => p.startsWith("/emi") },
  { href: "/more", label: "More", icon: "more", match: (p) => p.startsWith("/more") || p.startsWith("/guides") },
];

/** Phone app shell: fixed bottom tab bar (hidden on desktop/tablet by CSS, and on project screens). */
export default function TabBar() {
  const path = usePathname();
  const { openBook } = useSiteState();
  if (path.startsWith("/projects/")) return null;

  const tab = (t: (typeof TABS)[number]) => {
    const on = t.match(path);
    return (
      <Link key={t.href} href={t.href} className={`tab${on ? " on" : ""}`} aria-current={on ? "page" : undefined}>
        <Ico name={t.icon} />
        <span>{t.label}</span>
      </Link>
    );
  };

  return (
    <nav className="tabbar" aria-label="App">
      {tab(TABS[0])}
      {tab(TABS[1])}
      <button type="button" className="tab tab-book" onClick={() => openBook("")}>
        <span className="fab" aria-hidden="true">
          <Ico name="cal" />
        </span>
        <span>Book</span>
      </button>
      {tab(TABS[2])}
      {tab(TABS[3])}
    </nav>
  );
}
