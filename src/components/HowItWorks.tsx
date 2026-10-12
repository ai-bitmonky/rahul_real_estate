import { Ico } from "./Icons";

const STEPS = [
  { t: "Explore", p: "Shortlist homes that fit your budget and area, with an advisor on call.", time: "Same day" },
  { t: "Site visit", p: "A free guided visit. We can pick you up from home.", time: "Within 48 hrs" },
  { t: "Documentation", p: "We handle RERA papers, home loan and registry with you.", time: "2–4 weeks" },
  { t: "Move in", p: "Collect your keys and the possession letter.", time: "On the possession date" },
];
const DELAYS = ["", " d1", " d2", " d3"];

export default function HowItWorks() {
  return (
    <section className="sec band2" id="how" aria-labelledby="h-how">
      <div className="wrap">
        <div className="sh">
          <div>
            <p className="eyebrow reveal">
              <b>06</b>— How it works
            </p>
            <h2 id="h-how" className="reveal d1">
              What happens after you enquire
            </h2>
          </div>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.t} className={`step reveal${DELAYS[i]}`}>
              <span className="c">{i + 1}</span>
              <small>Step 0{i + 1}</small>
              <h3>{s.t}</h3>
              <p>{s.p}</p>
              <span className="time">
                <Ico name="clock" />
                {s.time}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
