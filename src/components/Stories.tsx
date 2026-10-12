import { stories } from "@/data/stories";
import SwipeCounter from "./SwipeCounter";

const DELAYS = ["", " d1", " d2"];

export default function Stories() {
  return (
    <section className="sec band-iv" id="stories" aria-labelledby="h-stories" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="sh">
          <div>
            <p className="eyebrow reveal">
              <b>08</b>— Owner stories
            </p>
            <h2 id="h-stories" className="reveal d1">
              Families who got their keys
            </h2>
          </div>
          <div className="shr">
            <span className="swipe-hint">Swipe →</span>
            <SwipeCounter target="storyRow" initial={`1 / ${stories.length}`} />
          </div>
        </div>
        <div className="grid3 swipe" id="storyRow">
          {stories.map((s, i) => (
            <figure key={s.name} className={`story reveal${DELAYS[i % 3]}`}>
              <span className="q" aria-hidden="true">“</span>
              <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>{s.quote}</blockquote>
              <figcaption className="who">
                <span className="ini">{s.initials}</span>
                <span>
                  <b>{s.name}</b>
                  <span>{s.detail}</span>
                </span>
                <span className="vchip">Verified owner ✓</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
