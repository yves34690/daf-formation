export interface Company {
  name: string;
  logo: string;
  product: string;
  situation: string;
  problem: string;
  implication: string;
  necessity: string;
  price: string;
}

export interface SME {
  name: string;
  industry: string;
  description: string;
  challenges: string[];
}

export interface Scenario {
  id: number;
  company: Company;
  sme: SME;
}

export interface DeliverableContent {
  proposal: string;
  specs: string;
}

export interface VoteCounts {
  proposal: number;
  specs: number;
}
