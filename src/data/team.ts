export interface Advisor {
  initials: string;
  name: string;
  role: string;
  since: string;
  phone: string;
  /** digits only, with country code */
  digits: string;
}

export const team: Advisor[] = [
  { initials: "AS", name: "Anjali Sharma", role: "Sales Head", since: "Since 2012", phone: "+91 98765 43211", digits: "919876543211" },
  { initials: "VS", name: "Vikram Singh", role: "Property Consultant", since: "Since 2016", phone: "+91 98765 43212", digits: "919876543212" },
  { initials: "NG", name: "Neha Gupta", role: "Client Relations", since: "Since 2018", phone: "+91 98765 43213", digits: "919876543213" },
];

/** Advisor who takes new site-visit requests */
export const leadAdvisor = team[0];
