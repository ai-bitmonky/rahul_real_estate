/** Monthly EMI for principal P (₹), annual rate R (%), tenure Y (years). */
export function emi(P: number, R: number, Y: number): number {
  const r = R / 1200;
  const n = Y * 12;
  if (!r) return P / n;
  const f = Math.pow(1 + r, n);
  return (P * r * f) / (f - 1);
}

/** Group digits the Indian way: 12,34,567 */
export function groupIN(n: number): string {
  const neg = n < 0;
  const s = String(Math.round(Math.abs(n)));
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const out = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3 : last3;
  return (neg ? "-" : "") + out;
}

/** ₹43,391 */
export const inr = (n: number) => "₹" + groupIN(n);

const trim = (v: number) => v.toFixed(2).replace(/\.?0+$/, "");

/** ₹50 Lakh · ₹1.04 Cr */
export function big(n: number): string {
  return n >= 1e7 ? "₹" + trim(n / 1e7) + " Cr" : "₹" + trim(n / 1e5) + " Lakh";
}

/** EMI line used on cards: 80% loan, 8.5%, 20 yrs, rounded to ₹100. */
export function emiFrom(price: number, rate = 8.5, years = 20): number {
  return Math.round(emi(price * 0.8, rate, years) / 100) * 100;
}
