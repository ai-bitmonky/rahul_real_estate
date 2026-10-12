import { site } from "@/data/site";
import HeroSwitch from "./HeroSwitch";
import SearchCard from "./SearchCard";
import { Ico } from "./Icons";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="wrap hero-g">
        <div className="hero-t">
          <div className="chip reveal">
            <span>
              <Ico name="check" />
              RERA-registered developer · Lucknow · since 2001
            </span>
            <a href={site.reraUrl} target="_blank" rel="noopener">
              {site.rera} · Verify ↗
            </a>
          </div>
          <h1 className="reveal d1">
            Homes we finish.
            <br />
            <em>Keys we hand over.</em>
          </h1>
          <p className="lead reveal d2">
            Plots, villas and apartments across Lucknow — built on time, priced clearly, and easy to check on the UP RERA
            portal.
          </p>
          <div className="hero-cta reveal d2">
            <a className="btn btn-p" href="#contact">
              Book a free site visit <Ico name="arrow" className="arr" />
            </a>
            <a className="btn btn-wa" href={site.whatsapp} target="_blank" rel="noopener">
              <Ico name="wa" />
              Chat on WhatsApp
            </a>
          </div>
          <div className="trow reveal d3">
            <a href={site.mapsUrl} target="_blank" rel="noopener">
              <span className="star">★</span>
              <strong>4.8</strong> Google rating · 312 reviews ↗
            </a>
            <span>
              <strong>1,200+</strong> families
            </span>
            <span>
              <strong>38 of 40</strong> projects handed over on time
            </span>
          </div>
        </div>
        <HeroSwitch />
      </div>
      <div className="wrap search-w reveal">
        <SearchCard />
      </div>
    </section>
  );
}
