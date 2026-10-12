import { site } from "@/data/site";
import CountUp from "./CountUp";

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Our record">
      <div className="wrap">
        <div className="stats">
          <div className="stat reveal">
            <div className="n num">
              <CountUp to={25} />
              <i>YEARS</i>
            </div>
            <p>Building in Lucknow since 2001</p>
          </div>
          <div className="stat reveal d1">
            <div className="n num">
              <CountUp to={40} />
              <i>PROJECTS</i>
            </div>
            <p>
              All RERA-registered —{" "}
              <a href={site.reraUrl} target="_blank" rel="noopener">
                see list ↗
              </a>
            </p>
          </div>
          <div className="stat reveal d2">
            <div className="n num">
              <CountUp to={1200} />
              <i>FAMILIES</i>
            </div>
            <p>Possession letters on file · as on 30 Sep 2026</p>
          </div>
          <div className="stat reveal d3">
            <div className="n num">
              <CountUp to={38} />
              <i>ON TIME</i>
            </div>
            <p>Of 40 projects handed over on the promised date</p>
          </div>
          <div className="stat rr reveal d3">
            <small>✓ Check us yourself</small>
            <a className="big" href={site.reraUrl} target="_blank" rel="noopener">
              RERA {site.rera}
              <span>Verify on UP RERA ↗</span>
            </a>
          </div>
        </div>
        <div className="partners">
          <b style={{ fontWeight: 600, color: "var(--ink)" }}>Home-loan partners:</b>
          <span>SBI</span>
          <span>HDFC</span>
          <span>LIC HFL</span>
          <span>Axis</span>
          <em>Loan help is free for every buyer</em>
        </div>
      </div>
    </section>
  );
}
