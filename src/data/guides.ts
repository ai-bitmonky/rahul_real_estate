export type GuideBlock = { p: string } | { h: string } | { list: string[] };

export interface Guide {
  slug: string;
  category: string;
  date: string;
  /** ISO date for metadata and sitemap */
  iso: string;
  title: string;
  summary: string;
  body: GuideBlock[];
}

export const guides: Guide[] = [
  {
    slug: "why-chinhat-is-growing",
    category: "Locality",
    date: "Jul 2026",
    iso: "2026-07-15",
    title: "Why Chinhat is Lucknow's fastest-growing corridor",
    summary: "Roads, metro and jobs are all moving east. Here is what that means for home buyers.",
    body: [
      { p: "Ten years ago, Chinhat was mostly farmland on the eastern edge of Lucknow. Today it is one of the busiest places to buy a home in the city. Here is why, in plain words." },
      { h: "1. It is easy to reach" },
      { p: "Chinhat sits on Faizabad Road, close to the Outer Ring Road. The metro is about 10 minutes away, Charbagh station about 25 minutes and the airport about 35 minutes. Good roads mean less time in traffic every day." },
      { h: "2. Jobs are close by" },
      { p: "Gomti Nagar, Gomti Nagar Extension and the new office parks are all a short drive away. Many families choose Chinhat so that both partners can reach work quickly." },
      { h: "3. Prices are still fair" },
      { p: "Homes in central Lucknow cost much more per square foot. In Chinhat you can still buy a larger home, or a plot, for the same money. As more roads and shops open, prices usually go up — so early buyers tend to gain the most." },
      { h: "What to check before you buy" },
      { list: [
        "The project's RERA number — check it yourself on the UP RERA portal.",
        "The possession date written in the agreement.",
        "Distance to the main road, school and hospital you will use.",
        "Whether water, power backup and drainage are already in place.",
      ] },
      { p: "Want to see Chinhat for yourself? Book a free site visit and our advisor will drive you around the area, not just the project." },
    ],
  },
  {
    slug: "plot-vs-apartment-2026",
    category: "Guide",
    date: "Jun 2026",
    iso: "2026-06-20",
    title: "Plot vs apartment: what should you buy in 2026?",
    summary: "Both are good choices. The right one depends on your budget, your timeline and how much work you want to do.",
    body: [
      { p: "This is the question we hear most often. There is no single right answer, but there is a right answer for you. Let us compare the two simply." },
      { h: "Buy a plot if…" },
      { list: [
        "You want to design and build your own home.",
        "You are happy to wait a few years before moving in.",
        "You want land that you fully own, with no shared walls.",
        "You want a lower starting price — our plots start near ₹40 Lakh.",
      ] },
      { h: "Buy an apartment if…" },
      { list: [
        "You want to move in soon, without managing builders.",
        "You like having security, a lift, a gym and a park ready on day one.",
        "You want an easier home loan — banks fund ready apartments quickly.",
        "You do not want to look after a large house alone.",
      ] },
      { h: "What about cost over time?" },
      { p: "A plot is cheaper to buy, but building a house on it adds cost and time. An apartment costs more at the start, but the price includes construction and shared facilities. Use our EMI calculator to see the monthly cost of each option." },
      { p: "Still unsure? Tell our advisor your budget and when you want to move. They will show you one plot and one apartment side by side, so you can decide with real numbers." },
    ],
  },
  {
    slug: "rera-guide-up",
    category: "Legal",
    date: "Jun 2026",
    iso: "2026-06-05",
    title: "A first-time buyer's guide to RERA in UP",
    summary: "RERA protects your money. Here is how to use it, step by step.",
    body: [
      { p: "RERA stands for the Real Estate (Regulation and Development) Act. In Uttar Pradesh it is managed by UP RERA. Its job is simple: to protect home buyers like you." },
      { h: "What RERA does for you" },
      { list: [
        "Every project must be registered before the builder can sell it.",
        "The builder must keep most of your money in a separate bank account for that project only.",
        "The possession date is fixed in writing. Late delivery can mean interest paid to you.",
        "The builder must share plans, approvals and progress on the RERA website.",
      ] },
      { h: "How to check a project in 3 steps" },
      { list: [
        "Ask for the RERA number. For example, ours is UPRERAPRJ962033.",
        "Open up-rera.in and search for that number.",
        "Check that the project name, address and promoter name match what you were told.",
      ] },
      { h: "Red flags to watch for" },
      { p: "Be careful if a seller cannot give you a RERA number, asks you to pay cash, or asks you to pay into a personal bank account. Always pay only into the company's registered bank account and keep every receipt." },
      { p: "Our advisors will gladly sit with you and check our RERA page together, before you pay anything." },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
