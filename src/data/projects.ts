export type ProjectType = "villas" | "apartments" | "plots";
export type ProjectStatus = "ready" | "new" | "selling" | "premium" | "construction";

export interface Project {
  slug: string;
  name: string;
  locality: string;
  /** Text shown above the card title */
  locLabel: string;
  type: ProjectType;
  typeLabel: string;
  specs: string[];
  /** Starting price in rupees */
  price: number;
  status: ProjectStatus;
  /** Possession text, e.g. "Mar 2027"; null when ready to move in */
  possession: string | null;
  rera: string;
  image: string;
  imageAlt: string;
  amenities: string[];
  description: string;
  /** Show in the "Homes ready for you" listing grid */
  listed: boolean;
}

export const STATUS: Record<ProjectStatus, { label: string; cls: string }> = {
  ready: { label: "Ready to move", cls: "" },
  new: { label: "New launch", cls: "nl" },
  selling: { label: "Selling fast", cls: "sf" },
  premium: { label: "Premium", cls: "pr" },
  construction: { label: "Under construction", cls: "nl" },
};

const RERA = "UPRERAPRJ962033";

export const projects: Project[] = [
  {
    slug: "shakti-paradise-villa",
    name: "Shakti Paradise Villa",
    locality: "Chinhat",
    locLabel: "Chinhat, Lucknow",
    type: "villas",
    typeLabel: "Villa",
    specs: ["4 BHK", "3 Bath", "2,100 sq ft"],
    price: 14500000,
    status: "ready",
    possession: null,
    rera: RERA,
    image: "shakti-villa",
    imageAlt: "Modern villa with a pool at Shakti Paradise",
    amenities: ["Private pool", "Gated community", "24×7 security", "Power backup", "Landscaped garden", "Covered parking"],
    description:
      "A finished 4 BHK villa inside Shakti Paradise, Chinhat. It has a private pool, a garden and covered parking for two cars. The villa is ready, so you can move in as soon as the registry is done.",
    listed: true,
  },
  {
    slug: "highness-green-plots",
    name: "Highness Green Plots",
    locality: "Faizabad Road",
    locLabel: "Faizabad Road",
    type: "plots",
    typeLabel: "Plot",
    specs: ["Plot", "1,500 sq ft", "Freehold"],
    price: 5200000,
    status: "new",
    possession: "Mar 2027",
    rera: RERA,
    image: "green-plots",
    imageAlt: "Marked plots with green borders on Faizabad Road",
    amenities: ["Wide internal roads", "Boundary wall", "Street lights", "Piped water supply", "Park in every block", "Clear freehold title"],
    description:
      "Freehold residential plots on Faizabad Road with wide roads, street lights and a park in every block. Buy now and build your own home when you are ready. Plots are handed over in March 2027.",
    listed: true,
  },
  {
    slug: "the-crown-residences",
    name: "The Crown Residences",
    locality: "Gomti Nagar Ext.",
    locLabel: "Gomti Nagar Ext.",
    type: "apartments",
    typeLabel: "Apartment",
    specs: ["3 BHK", "2 Bath", "1,450 sq ft"],
    price: 8800000,
    status: "selling",
    possession: "Dec 2026",
    rera: RERA,
    image: "crown-residences",
    imageAlt: "Courtyard and arches at The Crown Residences",
    amenities: ["Clubhouse & gym", "Kids' play area", "Lift with backup", "24×7 security", "Covered parking", "Rainwater harvesting"],
    description:
      "3 BHK apartments around a quiet central courtyard in Gomti Nagar Extension. The metro is 8 minutes away. Most homes are already booked, and handover is planned for December 2026.",
    listed: true,
  },
  {
    slug: "highness-grand-villa",
    name: "Highness Grand Villa",
    locality: "Sushant Golf City",
    locLabel: "Sushant Golf City",
    type: "villas",
    typeLabel: "Villa",
    specs: ["5 BHK", "4 Bath", "3,400 sq ft"],
    price: 21000000,
    status: "premium",
    possession: null,
    rera: RERA,
    image: "grand-villa",
    imageAlt: "Three-level villa beside a tree-lined road",
    amenities: ["Three levels", "Home lift option", "Terrace garden", "Servant room", "Gated community", "Two-car parking"],
    description:
      "A large 5 BHK villa on three levels in Sushant Golf City, on a tree-lined road. It has a terrace garden and space for a home lift. The airport is only 15 minutes away. Ready to move in.",
    listed: true,
  },
  {
    slug: "skyline-apartments",
    name: "Skyline Apartments",
    locality: "Vibhuti Khand",
    locLabel: "Vibhuti Khand",
    type: "apartments",
    typeLabel: "Apartment",
    specs: ["2 BHK", "2 Bath", "1,180 sq ft"],
    price: 9500000,
    status: "ready",
    possession: null,
    rera: RERA,
    image: "crown-residences",
    imageAlt: "Skyline Apartments courtyard view",
    amenities: ["Metro 5 min", "Lift with backup", "24×7 security", "Power backup", "Covered parking", "Gym"],
    description:
      "Ready 2 BHK apartments in Vibhuti Khand, close to offices, malls and the metro (5 minutes). A good choice for working couples and small families who want to move in now.",
    listed: true,
  },
  {
    slug: "meadows-plots",
    name: "Meadows Plots",
    locality: "Sultanpur Road",
    locLabel: "Sultanpur Road",
    type: "plots",
    typeLabel: "Plot",
    specs: ["Plot", "1,000 sq ft", "Freehold"],
    price: 4000000,
    status: "new",
    possession: "Jun 2027",
    rera: RERA,
    image: "meadows-plots",
    imageAlt: "Open green plots at Meadows on Sultanpur Road",
    amenities: ["Airport 10 min", "Wide internal roads", "Boundary wall", "Street lights", "Green belt", "Clear freehold title"],
    description:
      "Smaller freehold plots on Sultanpur Road, 10 minutes from the airport. A simple way to own land in a fast-growing part of Lucknow. Plots are handed over in June 2027.",
    listed: true,
  },
  {
    slug: "summit-twin-towers",
    name: "Summit Twin Towers",
    locality: "Chinhat",
    locLabel: "Malhour Road, Chinhat",
    type: "apartments",
    typeLabel: "Apartment",
    specs: ["2 & 3 BHK", "Two towers", "Sky bridge"],
    price: 5200000,
    status: "construction",
    possession: "Dec 2027",
    rera: RERA,
    image: "summit-tower",
    imageAlt: "Summit Twin Towers on Malhour Road, two towers joined by a sky bridge",
    amenities: ["Clubhouse & gym", "24×7 gated security", "Landscaped parks", "Wide internal roads", "Power backup", "Piped water supply"],
    description:
      "Premium 2 & 3 BHK homes in two towers joined by a sky bridge, on Malhour Road, Chinhat — minutes from Chinhat Tiraha.",
    listed: false,
  },
];

export const listedProjects = projects.filter((p) => p.listed);
export const projectNames = projects.map((p) => p.name);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Construction progress for under-construction projects */
export const progress: Record<string, { updated: string; stages: { title: string; note: string; state: "d" | "now" | "" }[] }> = {
  "summit-twin-towers": {
    updated: "Updated 1 Oct 2026",
    stages: [
      { title: "Foundation ✓", note: "Done · Mar 2026", state: "d" },
      { title: "Structure 60%", note: "Now in progress", state: "now" },
      { title: "Finishing", note: "2027", state: "" },
      { title: "Handover", note: "Dec 2027", state: "" },
    ],
  },
};
