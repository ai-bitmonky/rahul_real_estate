/** Returns the 10-digit Indian mobile number, or null when invalid. Accepts +91 / 91 prefixes and spaces. */
export function normalisePhone(v: string): string | null {
  let d = v.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}
