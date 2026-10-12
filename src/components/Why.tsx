import { site } from "@/data/site";
import { Ico } from "./Icons";

export default function Why() {
  return (
    <section className="sec" id="why" aria-labelledby="h-why">
      <div className="wrap">
        <div className="sh">
          <div>
            <p className="eyebrow reveal">
              <b>05</b>— Why Highness
            </p>
            <h2 id="h-why" className="reveal d1">
              Built on trust. <em>Shown with proof.</em>
            </h2>
          </div>
          <p className="meta reveal d2" style={{ maxWidth: "22em" }}>
            Every claim on this page comes with a link you can check.
          </p>
        </div>
        <div className="pillars">
          <div className="pillar reveal">
            <span className="pn" aria-hidden="true">01</span>
            <div>
              <h3>RERA-registered</h3>
              <p>Every project is registered with UP RERA before we open bookings.</p>
              <a className="tlink" href={site.reraUrl} target="_blank" rel="noopener">
                See the registrations ↗
              </a>
            </div>
          </div>
          <div className="pillar reveal d1">
            <span className="pn" aria-hidden="true">02</span>
            <div>
              <h3>On time</h3>
              <p>38 of our 40 projects were handed over on the promised date.</p>
              <a className="tlink" href="#contact">
                See the handover list <Ico name="arrow" className="arr" />
              </a>
            </div>
          </div>
          <div className="pillar reveal">
            <span className="pn" aria-hidden="true">03</span>
            <div>
              <h3>Built to last</h3>
              <p>Grade-A materials and seismic zone-III design, checked at every stage.</p>
            </div>
          </div>
          <div className="pillar reveal d1">
            <span className="pn" aria-hidden="true">04</span>
            <div>
              <h3>One team till the keys</h3>
              <p>The same advisor helps with site visit, loan, registry and handover.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
