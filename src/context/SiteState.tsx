"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type Kind = "res" | "com";
export interface Filter {
  kind: Kind;
  /** "", plots, villas, apartments, homes (= villas + apartments), shop, office, showroom */
  type: string;
  loc: string;
  /** "", "0-50", "50-100", ... in lakh */
  bud: string;
}

export const EMPTY_FILTER: Filter = { kind: "res", type: "", loc: "", bud: "" };

interface SiteState {
  filter: Filter;
  /** increments on every applyFilter call so listeners can react to repeats */
  filterTick: number;
  applyFilter: (f: Partial<Filter>) => void;
  /** Apply a "category" link: plots | villas | apartments | com */
  applyCat: (cat: string, fromCollage?: boolean) => void;
  book: { project: string; tick: number };
  setBook: (project: string) => void;
}

const Ctx = createContext<SiteState | null>(null);

export function SiteStateProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<Filter>(EMPTY_FILTER);
  const [filterTick, setTick] = useState(0);
  const [book, setBookState] = useState({ project: "", tick: 0 });

  const applyFilter = useCallback((f: Partial<Filter>) => {
    setFilter({ ...EMPTY_FILTER, ...f });
    setTick((t) => t + 1);
  }, []);

  const applyCat = useCallback(
    (cat: string, fromCollage = false) => {
      if (cat === "com") applyFilter({ kind: "com" });
      else applyFilter({ type: cat === "apartments" && fromCollage ? "homes" : cat });
    },
    [applyFilter],
  );

  const setBook = useCallback((project: string) => setBookState((b) => ({ project, tick: b.tick + 1 })), []);

  const value = useMemo(
    () => ({ filter, filterTick, applyFilter, applyCat, book, setBook }),
    [filter, filterTick, applyFilter, applyCat, book, setBook],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSiteState(): SiteState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSiteState must be used inside SiteStateProvider");
  return v;
}
