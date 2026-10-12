import Image from "next/image";
import { FilterLink } from "./Links";
import SwipeCounter from "./SwipeCounter";
import { Ico } from "./Icons";

const CATS = [
  { cat: "plots", img: "cat-plots", alt: "Open residential plots under a clear sky", title: "Residential plots", sub: "18 layouts · freehold", d: "" },
  { cat: "apartments", img: "cat-apartments", alt: "Apartment towers at sunset", title: "Apartments & villas", sub: "24 homes · 2 to 5 BHK", d: " d1" },
  { cat: "com", img: "hero-tower", alt: "Commercial floors in a glass tower", title: "Commercial", sub: "8 spaces · shops, offices, showrooms", d: " d2", pos: "70% 50%" },
];

export default function Categories() {
  return (
    <section className="sec" id="browse" aria-labelledby="h-browse">
      <div className="wrap">
        <div className="sh">
          <div>
            <p className="eyebrow reveal">
              <b>01</b>— Browse
            </p>
            <h2 id="h-browse" className="reveal d1">
              What are you looking for?
            </h2>
          </div>
          <div className="shr">
            <span className="swipe-hint">Swipe →</span>
            <SwipeCounter target="cats" initial="1 / 3" />
          </div>
        </div>
        <div className="cats swipe" id="cats">
          {CATS.map((c, i) => (
            <FilterLink key={c.cat} cat={c.cat} fromCollage className={`cat reveal${c.d}`}>
              <div className="im">
                <Image
                  src={`/img/${c.img}.jpg`}
                  alt={c.alt}
                  fill
                  quality={85}
                  sizes={i === 0 ? "(max-width: 699px) 82vw, 640px" : "(max-width: 699px) 82vw, 580px"}
                  style={c.pos ? { objectPosition: c.pos } : undefined}
                />
                <span className="tag bl">Artist&apos;s impression</span>
              </div>
              <div className="cap">
                <div>
                  <b>{c.title}</b>
                  <span>{c.sub}</span>
                </div>
                <span className="arrc">
                  <Ico name="arrow" />
                </span>
              </div>
            </FilterLink>
          ))}
        </div>
      </div>
    </section>
  );
}
