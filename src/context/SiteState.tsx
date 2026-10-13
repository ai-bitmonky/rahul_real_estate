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
  /** Phone app shell: the "Book a visit" bottom sheet. `n` counts openings (fresh form each time). */
  bookSheet: { open: boolean; project: string; n: number };
  openBook: (project?: string) => void;
  closeBook: () => void;
}

const Ctx = createContext<SiteState | null>(null);

export function SiteStateProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<Filter>(EMPTY_FILTER);
  const [filterTick, setTick] = useState(0);
  const [book, setBookState] = useState({ project: "", tick: 0 });
  const [bookSheet, setBookSheet] = useState({ open: false, project: "", n: 0 });

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

  const openBook = useCallback((project = "") => setBookSheet((b) => ({ open: true, project, n: b.n + 1 })), []);
  const closeBook = useCallback(() => setBookSheet((b) => ({ ...b, open: false })), []);

  const value = useMemo(
    () => ({ filter, filterTick, applyFilter, applyCat, book, setBook, bookSheet, openBook, closeBook }),
    [filter, filterTick, applyFilter, applyCat, book, setBook, bookSheet, openBook, closeBook],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSiteState(): SiteState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSiteState must be used inside SiteStateProvider");
  return v;
}
