import { ReactNode } from 'react';

export interface Company {
  name: string;
  logo: string;
  product: string | ReactNode;
  situation: string | ReactNode;
  problem: string;
  implication: string | ReactNode;
  necessity: string;
  price: string;
}

export interface SME {
  name: string;
  industry: string;
  description: string | ReactNode;
  challenges: (string | ReactNode)[];
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
