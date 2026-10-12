export interface Locality {
  i: number;
  name: string;
  times: string;
  /** Pin position on the 640×500 map */
  x: number;
  y: number;
  /** Label to the left of the pin */
  labelLeft?: boolean;
}

export const localities: Locality[] = [
  { i: 1, name: "Chinhat", times: "Airport 35 min · Charbagh station 25 min · Metro 10 min", x: 512, y: 216 },
  { i: 2, name: "Gomti Nagar Ext.", times: "Airport 30 min · Metro 8 min", x: 436, y: 290 },
  { i: 3, name: "Faizabad Road", times: "Airport 40 min · Metro 12 min", x: 478, y: 128 },
  { i: 4, name: "Sushant Golf City", times: "Airport 15 min · Metro 20 min", x: 330, y: 420 },
  { i: 5, name: "Vibhuti Khand", times: "Airport 25 min · Metro 5 min", x: 372, y: 232, labelLeft: true },
  { i: 6, name: "Sultanpur Road", times: "Airport 10 min · Metro 25 min", x: 468, y: 380 },
];
