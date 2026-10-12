import type { CSSProperties } from "react";

/** Inline SVG sprite (rendered once in the layout) and a small <Ico> helper. */
export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <symbol id="mono" viewBox="0 0 48 64">
        <path fill="currentColor" d="M9 21.5 11 8.2l7 7.1L24 4.6l6 10.7 7-7.1 2 13.3z" />
        <rect fill="currentColor" x="8.6" y="23" width="30.8" height="2.4" rx="1" />
        <circle fill="currentColor" cx="11" cy="6.4" r="2" />
        <circle fill="currentColor" cx="24" cy="2.6" r="2.2" />
        <circle fill="currentColor" cx="37" cy="6.4" r="2" />
        <path fill="currentColor" d="M7 29.6h13.6v2.1h-3v28.6h3v2.1H7v-2.1h3V31.7H7zM27.4 29.6H41v2.1h-3v28.6h3v2.1H27.4v-2.1h3V31.7h-3zM17.6 44.4h12.8v2.8H17.6z" />
        <path d="M17.2 31.4 30.8 60.6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
      <symbol id="i-ext" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" /></symbol>
      <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5.5 3.5h3.3l1.9 4.8-2.4 1.6a11.5 11.5 0 0 0 5.8 5.8l1.6-2.4 4.8 1.9v3.3a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3.5 5.6a2 2 0 0 1 2-2.1z" /></symbol>
      <symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36A9.43 9.43 0 0 1 2.6 12.05C2.6 6.84 6.84 2.6 12.06 2.6a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.45-9.45 9.45M20.1 4a11.3 11.3 0 0 0-8.04-3.33C5.78.67.67 5.78.67 12.06c0 2 .52 3.96 1.52 5.69L.57 23.67l6.05-1.59a11.4 11.4 0 0 0 5.44 1.39h.01c6.27 0 11.38-5.11 11.38-11.39 0-3.04-1.18-5.9-3.34-8.05" /></symbol>
      <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-9.2-9.3C1.7 7.5 3.9 4.5 7 4.5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.1 0 5.3 3 4.2 6.2C19.5 15.4 12 20 12 20z" /></symbol>
      <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l7 3v5.5c0 4.4-3 7.9-7 9.5-4-1.6-7-5.1-7-9.5V6z" /><path d="M8.8 12l2.2 2.2 4.2-4.4" /></symbol>
      <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8h.01" /></symbol>
      <symbol id="i-cal" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></symbol>
    </svg>
  );
}

export type IconName = "check" | "arrow" | "ext" | "phone" | "wa" | "heart" | "clock" | "shield" | "info" | "cal";

export function Ico({ name, className = "" }: { name: IconName; className?: string }) {
  const filled = name === "wa";
  return (
    <svg className={`ico${filled ? " f" : ""}${className ? " " + className : ""}`} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

export function Mono({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 48 64" aria-hidden="true" style={style}>
      <use href="#mono" />
    </svg>
  );
}
