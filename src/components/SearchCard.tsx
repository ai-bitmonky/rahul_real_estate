"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSiteState, type Kind } from "@/context/SiteState";
import { localities } from "@/data/localities";
import { Ico } from "./Icons";

export const TYPES: Record<Kind, [string, string][]> = {
  res: [["", "Any type"], ["plots", "Plot"], ["villas", "Villa"], ["apartments", "Apartment"]],
  com: [["", "Any type"], ["shop", "Shop"], ["office", "Office"], ["showroom", "Showroom"]],
};

export const BUDGETS: [string, string][] = [
  ["", "Any budget"],
  ["0-50", "Under ₹50 L"],
  ["50-100", "₹50 L – ₹1 Cr"],
  ["100-200", "₹1 Cr – ₹2 Cr"],
  ["200-999", "Above ₹2 Cr"],
];

export default function SearchCard() {
  const { filter, filterTick, applyFilter } = useSiteState();
  const [kind, setKind] = useState<Kind>("res");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState("");
  const [bud, setBud] = useState("");

  // Mirror filters applied elsewhere (chips, collage, map) into the search fields.
  useEffect(() => {
    if (!filterTick) return;
    setKind(filter.kind);
    setLoc(filter.loc);
    setType(TYPES[filter.kind].some(([v]) => v === filter.type) ? filter.type : "");
    setBud(filter.bud);
  }, [filter, filterTick]);

  const changeKind = (k: Kind) => {
    setKind(k);
    setType("");
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    applyFilter({ kind, loc, type, bud });
    const el = document.getElementById("properties");
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ behavior: rm ? "auto" : "smooth", block: "start" });
  };

  return (
    <form className="search" id="search" role="search" aria-label="Find a home" onSubmit={submit}>
      <div className="seg" role="tablist" aria-label="Property kind">
        <button type="button" role="tab" aria-selected={kind === "res"} data-k="res" onClick={() => changeKind("res")}>
          Residential
        </button>
        <button type="button" role="tab" aria-selected={kind === "com"} data-k="com" onClick={() => changeKind("com")}>
          Commercial
        </button>
      </div>
      <div className="fld">
        <label htmlFor="sLoc">Location</label>
        <select id="sLoc" value={loc} onChange={(e) => setLoc(e.target.value)}>
          <option value="">Any location</option>
          {localities.map((l) => (
            <option key={l.name} value={l.name}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
      <div className="fld">
        <label htmlFor="sType">Type</label>
        <select id="sType" value={type} onChange={(e) => setType(e.target.value)}>
          {TYPES[kind].map(([v, t]) => (
            <option key={v} value={v}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="fld">
        <label htmlFor="sBud">Budget</label>
        <select id="sBud" value={bud} onChange={(e) => setBud(e.target.value)}>
          {BUDGETS.map(([v, t]) => (
            <option key={v} value={v}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-p" type="submit">
        Search homes <Ico name="arrow" className="arr" />
      </button>
    </form>
  );
}
