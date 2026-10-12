"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { Ico } from "./Icons";

/** Mobile-only bottom bar; slides in once the hero has scrolled away. */
export default function StickyBar() {
  const path = usePathname();
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(false);
    const hero = document.getElementById("hero");
    if (!hero || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setOn(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(hero);
    return () => io.disconnect();
  }, [path]);
  return (
    <div className={`sbar${on ? " on" : ""}`} id="sbar">
      <a className="btn btn-o" href={site.phoneHref}>
        <Ico name="phone" />
        Call
      </a>
      <a className="btn btn-wa" href={site.whatsapp} target="_blank" rel="noopener">
        <Ico name="wa" />
        WhatsApp
      </a>
      <a className="btn btn-p" href="#contact">
        Book a Visit
      </a>
    </div>
  );
}
