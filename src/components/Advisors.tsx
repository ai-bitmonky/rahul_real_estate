import { team } from "@/data/team";
import SwipeCounter from "./SwipeCounter";
import { Ico, Mono } from "./Icons";

const DELAYS = ["", " d1", " d2"];

export default function Advisors() {
  return (
    <section className="sec" id="team" aria-labelledby="h-team">
      <div className="wrap">
        <div className="sh">
          <div>
            <p className="eyebrow reveal">
              <b>09</b>— Meet the team
            </p>
            <h2 id="h-team" className="reveal d1">
              Advisors who know Lucknow
            </h2>
            <p className="meta reveal d2">Replies within 2 hours, 9 am – 8 pm</p>
          </div>
          <div className="shr">
            <span className="swipe-hint">Swipe →</span>
            <SwipeCounter target="advRow" initial={`1 / ${team.length}`} />
          </div>
        </div>
        <div className="grid3 swipe" id="advRow">
          {team.map((a, i) => (
            <div key={a.name} className={`adv reveal${DELAYS[i % 3]}`}>
              <div className="por" aria-hidden="true">
                <Mono />
                <b>{a.initials}</b>
                <small>{a.since}</small>
              </div>
              <h3>{a.name}</h3>
              <p>
                {a.role} · {a.phone}
              </p>
              <div className="acts">
                <a className="btn btn-o btn-sm" href={`tel:+${a.digits}`}>
                  <Ico name="phone" />
                  Call
                </a>
                <a className="btn btn-wa btn-sm" href={`https://wa.me/${a.digits}`} target="_blank" rel="noopener">
                  <Ico name="wa" />
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
