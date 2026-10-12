import localFont from "next/font/local";

/*
 * Fraunces (opsz, wght, SOFT, WONK axes) and Manrope, self-hosted from the
 * open-source @fontsource-variable builds (SIL OFL). Self-hosting keeps the
 * build offline-safe and avoids a runtime request to Google Fonts.
 * Latin-ext faces (₹ and accented letters) are separate families placed next
 * in the CSS font stack, limited by unicode-range (values must be literals).
 */

export const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin-full-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/fraunces-latin-full-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: false,
});

export const frauncesExt = localFont({
  src: [
    { path: "../fonts/fraunces-latin-ext-full-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/fraunces-latin-ext-full-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-fraunces-ext",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF" }],
});

export const manrope = localFont({
  src: [{ path: "../fonts/manrope-latin-wght-normal.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-manrope",
  display: "swap",
  adjustFontFallback: false,
});

export const manropeExt = localFont({
  src: [{ path: "../fonts/manrope-latin-ext-wght-normal.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-manrope-ext",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF" }],
});

export const fontVars = [fraunces, frauncesExt, manrope, manropeExt].map((f) => f.variable).join(" ");
