import { guides } from "@/data/guides";
import GuideCard from "./GuideCard";
import SwipeCounter from "./SwipeCounter";

const DELAYS = ["", " d1", " d2"];

export default function Guides() {
  return (
    <section className="sec" id="journal" aria-labelledby="h-guides" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sh">
          <div>
            <p className="eyebrow reveal">
              <b>10</b>— Guides
            </p>
            <h2 id="h-guides" className="reveal d1">
              Read before you buy
            </h2>
          </div>
          <div className="shr">
            <span className="swipe-hint">Swipe →</span>
            <SwipeCounter target="guideRow" initial={`1 / ${guides.length}`} />
          </div>
        </div>
        <div className="grid3 swipe" id="guideRow">
          {guides.map((g, i) => (
            <GuideCard key={g.slug} g={g} delay={DELAYS[i % 3]} />
          ))}
        </div>
      </div>
    </section>
  );
}
