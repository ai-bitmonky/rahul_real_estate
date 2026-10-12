"use client";

import { useEffect, useState } from "react";

/** "1 / N" counter for a horizontal swipe row (shown on mobile only via CSS). */
export default function SwipeCounter({ target, initial, version = 0 }: { target: string; initial: string; version?: number }) {
  const [text, setText] = useState(initial);
  useEffect(() => {
    const row = document.getElementById(target);
    if (!row) return;
    const upd = () => {
      const kids = Array.from(row.children).filter(
        (x): x is HTMLElement => x instanceof HTMLElement && !x.hidden && x.offsetParent !== null,
      );
      if (!kids.length) {
        setText("");
        return;
      }
      const w = kids[0].offsetWidth + 16;
      let i = Math.round(row.scrollLeft / w);
      if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 4) i = kids.length - 1;
      setText(`${Math.min(i, kids.length - 1) + 1} / ${kids.length}`);
    };
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(upd);
    };
    upd();
    row.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", upd);
    return () => {
      cancelAnimationFrame(raf);
      row.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", upd);
    };
  }, [target, version]);
  return <span className="ctr">{text}</span>;
}
