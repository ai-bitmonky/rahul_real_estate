"use client";

import { useState, type CSSProperties } from "react";
import { waText } from "@/data/site";
import { big, emi, inr } from "@/lib/emi";
import { Ico } from "./Icons";

type Key = "L" | "R" | "T";
interface Spec {
  min: number;
  max: number;
  step: number;
  label: string;
  aria: string;
  ends: [string, string];
  pre?: string;
  unit: string;
}

const SPEC: Record<Key, Spec> = {
  L: { min: 10, max: 200, step: 0.1, label: "Loan amount", aria: "Loan amount in lakh", ends: ["₹10 L", "₹2 Cr"], pre: "₹", unit: "Lakh" },
  R: { min: 6, max: 14, step: 0.05, label: "Interest rate", aria: "Interest rate in percent", ends: ["6%", "14%"], unit: "%" },
  T: { min: 5, max: 30, step: 1, label: "Tenure", aria: "Tenure in years", ends: ["5 yrs", "30 yrs"], unit: "yrs" },
};
const KEYS: Key[] = ["L", "R", "T"];
const HOMES: [number, string][] = [
  [52, "₹52 L"],
  [88, "₹88 L"],
  [145, "₹1.45 Cr"],
];

const r2 = (v: number) => +v.toFixed(2);

export default function EmiCalculator() {
  const [val, setVal] = useState<Record<Key, number>>({ L: 50, R: 8.5, T: 20 });
  const [txt, setTxt] = useState<Record<Key, string>>({ L: "50", R: "8.5", T: "20" });
  const [quick, setQuick] = useState<number | null>(null);

  const set = (k: Key, v: number) => {
    setVal((s) => ({ ...s, [k]: v }));
    setTxt((s) => ({ ...s, [k]: String(r2(v)) }));
  };

  const L = val.L * 1e5;
  const m = emi(L, val.R, val.T);
  const tot = m * val.T * 12;
  const interest = tot - L;

  return (
    <section className="sec" id="emi" aria-labelledby="h-emi">
      <div className="wrap">
        <div className="emi reveal">
          <div className="emi-l">
            <p className="eyebrow">
              <b>07</b>— Plan your budget
            </p>
            <h2 id="h-emi">Home loan EMI calculator</h2>
            <div className="qc">
              <span>Set from a home:</span>
              {HOMES.map(([h, t]) => (
                <button
                  key={h}
                  type="button"
                  data-home={h}
                  className={quick === h ? "on" : undefined}
                  onClick={() => {
                    set("L", r2(h * 0.8));
                    setQuick(h);
                  }}
                >
                  {t}
                </button>
              ))}
              <span style={{ fontSize: "12.5px" }}>(loan = 80% of price)</span>
            </div>
            {KEYS.map((k) => {
              const s = SPEC[k];
              const pct = ((val[k] - s.min) / (s.max - s.min)) * 100;
              return (
                <div className="rowx" key={k}>
                  <div className="top">
                    <label htmlFor={`r${k}`}>{s.label}</label>
                    <div className="nbox">
                      {s.pre && <span>{s.pre}</span>}
                      <input
                        type="number"
                        id={`n${k}`}
                        min={s.min}
                        max={s.max}
                        step={s.step}
                        value={txt[k]}
                        aria-label={s.aria}
                        onChange={(e) => {
                          const raw = e.target.value;
                          setTxt((t) => ({ ...t, [k]: raw }));
                          const v = +raw;
                          if (raw !== "" && v >= s.min && v <= s.max) setVal((x) => ({ ...x, [k]: v }));
                        }}
                        onBlur={() => {
                          const v = Math.min(s.max, Math.max(s.min, +txt[k] || s.min));
                          set(k, v);
                        }}
                      />
                      <span>{s.unit}</span>
                    </div>
                  </div>
                  <input
                    className="rng"
                    type="range"
                    id={`r${k}`}
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={val[k]}
                    style={{ "--p": `${pct}%` } as CSSProperties}
                    onChange={(e) => {
                      set(k, +e.target.value);
                      setQuick(null);
                    }}
                  />
                  <div className="ends">
                    <span>{s.ends[0]}</span>
                    <span>{s.ends[1]}</span>
                  </div>
                </div>
              );
            })}
            <p className="note">
              <Ico name="info" />
              Indicative rate 8.5% · reviewed Oct 2026
            </p>
          </div>
          <div className="emi-r" aria-live="polite">
            <small className="k">Your monthly EMI</small>
            <div className="emi-fig" id="emiFig">
              {inr(m)}
            </div>
            <p className="emi-sub" id="emiSub">
              for {val.T} yrs at {r2(val.R)}%
            </p>
            <div className="split" aria-hidden="true">
              <i id="spP" style={{ width: `${(L / tot) * 100}%` }}></i>
              <i id="spI" style={{ width: `${(interest / tot) * 100}%` }}></i>
            </div>
            <div className="leg">
              <span>Principal</span>
              <span>Interest</span>
            </div>
            <div className="sum">
              <div>
                <span>Principal</span>
                <b id="sP">{big(L)}</b>
              </div>
              <div>
                <span>Total interest</span>
                <b id="sI">{big(interest)}</b>
              </div>
              <div>
                <span>Total payable</span>
                <b id="sT">{big(tot)}</b>
              </div>
            </div>
            <div className="emi-cta">
              <a className="btn btn-p" href="#contact">
                Check loan eligibility
              </a>
              <a className="btn btn-wa" href={waText("Hi, I need help with a home loan")} target="_blank" rel="noopener">
                <Ico name="wa" />
                Talk to a loan advisor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
