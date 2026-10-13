/**
 * True when the phone "app shell" (AppBar + TabBar + bottom sheets) is showing.
 * Mirrors the CSS tiers in globals.css: any viewport under 700px, or a phone
 * user-agent (html[data-device="mobile"], set by src/middleware.ts) up to 999px.
 */
export function isAppShell(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(max-width: 699px)").matches) return true;
  return document.documentElement.dataset.device === "mobile" && window.matchMedia("(max-width: 999px)").matches;
}

/** Detail screens (project / guide) get the transparent AppBar and slide-in transition. */
export const isDetailPath = (path: string) => /^\/(projects|guides)\/[^/]+/.test(path);
