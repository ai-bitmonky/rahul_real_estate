export interface Faq {
  q: string;
  /** Plain-text answer; the RERA answer adds a verify link in the component */
  a: string;
  reraLink?: boolean;
}

export const faqs: Faq[] = [
  { q: "Are all your projects RERA-registered?", a: "Yes. Every Highness project is registered with UP RERA (No. {RERA}) and follows all rules before we open bookings.", reraLink: true },
  { q: "Do you help with home loans?", a: "Yes. Our team helps with loan tie-ups and paperwork as part of the documentation step, so you have one point of contact from booking to registry." },
  { q: "Can I book a site visit before deciding?", a: "Yes. Site visits are free and guided by an advisor. Book one below or call +91 98765 43210." },
  { q: "What payment plans are available?", a: "Payment plans vary by project. Most new launches use a construction-linked plan — you pay only when a stage is done. Your advisor will share the current plan for the home you like." },
  { q: "Where exactly is Shakti Paradise?", a: "Plot No 7 & 8, KH No. 49A,B, Chak Malhori, Malhour Road, near Maan Kheda Tiraha, Chinhat, Lucknow — 226028." },
];
