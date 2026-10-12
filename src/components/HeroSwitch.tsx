"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const P: [string, string, string][] = [
  ["Shakti Paradise", "Ready to move · Chinhat", "Site visits every day, 9 am – 7 pm"],
  ["Summit Twin Towers", "Next handover · Dec 2027", "On schedule · structure 60% done"],
];

export default function HeroSwitch() {
  const [sel, setSel] = useState(0);
  const [shown, setShown] = useState(0);
  const [fade, setFade] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const pick = (i: number) => {
    setSel(i);
    setFade(true);
    clearTimeout(timer.current);
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(() => {
      setShown(i);
      setFade(false);
    }, rm ? 0 : 320);
  };

  return (
    <div className="hero-v reveal d1">
      <div className="switch" role="tablist" aria-label="Show project">
        {P.map(([name], i) => (
          <button key={name} role="tab" aria-selected={sel === i} onClick={() => pick(i)}>
            {name}
          </button>
        ))}
      </div>
      <div className={`hero-fig${sel === 1 ? " alt" : ""}`} id="heroFig">
        <Image
          className="a"
          src="/img/hero-tower.jpg"
          alt="Shakti Paradise towers in Chinhat at dusk"
          fill
          priority
          quality={85}
          sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 560px"
        />
        <Image
          className="b"
          src="/img/summit-tower.jpg"
          alt="Summit Twin Towers joined by a sky bridge"
          fill
          quality={85}
          sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 560px"
        />
        <span className="tag br">Artist&apos;s impression</span>
      </div>
      <div className={`fcard${fade ? " fade" : ""}`} id="fcard" aria-live="polite">
        <span className="dot"></span>
        <div className="t">
          <small id="fcS">{P[shown][0]}</small>
          <b id="fcB">{P[shown][1]}</b>
          <span id="fcT">{P[shown][2]}</span>
        </div>
      </div>
    </div>
  );
}
