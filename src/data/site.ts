export const site = {
  name: "Highness Construction",
  title: "Highness Construction · Homes in Lucknow",
  description:
    "RERA-registered plots, villas and apartments across Lucknow — built on time, priced clearly, easy to check on the UP RERA portal.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://highness.in",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "https://wa.me/919876543210",
  rera: "UPRERAPRJ962033",
  reraUrl: "https://www.up-rera.in",
  gstin: "09AAOFH4949M1ZI",
  gstUrl: "https://services.gst.gov.in/services/searchtp",
  email: "hello@highness.in",
  addressLines: [
    "Plot No 7 & 8, KH No. 49A,B, Shakti Paradise,",
    "Chak Malhori, Malhour Road, near Maan Kheda Tiraha,",
    "Chinhat, Lucknow — 226028",
  ],
  shortAddress: "Shakti Paradise, Chinhat, Lucknow",
  mapsUrl: "https://www.google.com/maps/search/Highness+Construction+Lucknow",
} as const;

/** WhatsApp deep link with a prefilled message. */
export const waText = (text: string) => `${site.whatsapp}?text=${encodeURIComponent(text)}`;
