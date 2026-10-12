"use client";

import { useRef, useState } from "react";
import { useSiteState } from "@/context/SiteState";
import { localities } from "@/data/localities";
import { Ico } from "./Icons";

const SANS = { fontFamily: "var(--sans)" } as const;
const SERIF = { fontFamily: "var(--serif)" } as const;
const PIN = "M0 0C0 0-15-13-15-24A15 15 0 0 1 15-24C15-13 0 0 0 0Z";
const DELAYS = ["", " d1", " d1", " d2", " d2", " d3"];

export default function WhereWeBuild() {
  const { applyFilter } = useSiteState();
  const [on, setOn] = useState(0);
  const rows = useRef<(HTMLAnchorElement | null)[]>([]);

  return (
    <section className="sec" id="where" aria-labelledby="h-where">
      <div className="wrap">
        <div className="sh">
          <div>
            <p className="eyebrow reveal">
              <b>03</b>— Where we build
            </p>
            <h2 id="h-where" className="reveal d1">
              Six parts of Lucknow, <em>all well connected</em>
            </h2>
          </div>
        </div>
        <div className="where">
          <div className="map reveal">
            <svg viewBox="0 0 640 500" role="img" aria-label="Map of Lucknow with our six project areas">
              <defs>
                <pattern id="gr" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M32 0H0V32" fill="none" stroke="#E2D8CB" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="640" height="500" rx="16" fill="url(#gr)" />
              <ellipse cx="320" cy="262" rx="262" ry="206" fill="none" stroke="#CDBFAE" strokeWidth="2.2" strokeDasharray="1 8" strokeLinecap="round" />
              <text x="96" y="92" style={SANS} className="lb" fontSize="11" fontWeight="600" letterSpacing="1.5" fill="#5C534E">
                OUTER RING ROAD
              </text>
              <path d="M-10 168C90 142 150 222 238 208S356 116 424 186 520 308 650 286" fill="none" stroke="#C3CEC9" strokeWidth="14" strokeLinecap="round" />
              <path d="M-10 168C90 142 150 222 238 208S356 116 424 186 520 308 650 286" fill="none" stroke="#D7DFDB" strokeWidth="5" strokeLinecap="round" />
              <text className="lb" x="150" y="168" style={SERIF} fontStyle="italic" fontSize="17" fill="#4F6A63">
                Gomti
              </text>
              <path d="M150 432 262 306 334 256 448 226" fill="none" stroke="#6E1A24" strokeWidth="1.6" strokeDasharray="5 5" opacity=".7" />
              <text x="206" y="392" style={SANS} className="lb" fontSize="11" fontWeight="600" fill="#6E1A24">
                Metro
              </text>
              <g transform="translate(262 306)">
                <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#1F1A18" />
                <text x="12" y="16" style={SANS} className="lb" fontSize="12" fontWeight="600" fill="#1F1A18">
                  Charbagh
                </text>
              </g>
              <g transform="translate(150 432)">
                <circle r="8" fill="#1F1A18" />
                <path d="M-4 0h8M0-4l4 4-4 4" stroke="#FCFAF6" strokeWidth="1.5" fill="none" />
                <text x="14" y="4" style={SANS} className="lb" fontSize="12" fontWeight="600" fill="#1F1A18">
                  Airport
                </text>
              </g>
              <g style={SANS} fontSize="12.5" fontWeight="600" fill="#1F1A18">
                {localities.map((l) => (
                  <g
                    key={l.i}
                    className={`pin${on === l.i ? " on" : ""}`}
                    data-i={l.i}
                    transform={`translate(${l.x} ${l.y})`}
                    onMouseEnter={() => setOn(l.i)}
                    onMouseLeave={() => setOn(0)}
                    onClick={() => rows.current[l.i - 1]?.click()}
                  >
                    <ellipse className="h" cx="0" cy="0" rx="26" ry="9" />
                    <g>
                      <path className="c" d={PIN} fill="#A8651F" />
                      <text x="0" y="-19.5" textAnchor="middle" fill="#FCFAF6" fontSize="13" fontWeight="700">
                        {l.i}
                      </text>
                    </g>
                    {l.labelLeft ? (
                      <text x="-20" y="-18" textAnchor="end">
                        {l.name}
                      </text>
                    ) : (
                      <text x="20" y="-18">
                        {l.name}
                      </text>
                    )}
                  </g>
                ))}
              </g>
              <text x="24" y="482" style={SANS} className="lb" fontSize="11" fill="#5C534E">
                Not to scale · travel times are typical, off-peak
              </text>
            </svg>
          </div>
          <ol className="locs" id="locs">
            {localities.map((l, idx) => (
              <li key={l.i} className={`reveal${DELAYS[idx]}`}>
                <a
                  ref={(el) => {
                    rows.current[idx] = el;
                  }}
                  href="#properties"
                  data-i={l.i}
                  data-loc={l.name}
                  className={on === l.i ? "on" : undefined}
                  onMouseEnter={() => setOn(l.i)}
                  onFocus={() => setOn(l.i)}
                  onMouseLeave={() => setOn(0)}
                  onBlur={() => setOn(0)}
                  onClick={() => applyFilter({ loc: l.name })}
                >
                  <span className="n">{String(l.i).padStart(2, "0")}</span>
                  <span>
                    <b>{l.name}</b>
                    <span>{l.times}</span>
                  </span>
                  <Ico name="arrow" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
