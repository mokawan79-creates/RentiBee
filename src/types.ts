export type PageId =
  | 'home'
  | 'services'
  | 'claim-maintenance'
  | 'about'
  | 'contact'
  | 'faq'
  | 'blog';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  propertyType: string;
  quote: string;
  earningsGain: string;
  rating: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  shortDesc: string;
  demandLevel: 'Very High' | 'High' | 'Rapidly Growing';
  popularFor: string;
  avgOccupancy: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Payouts & Split' | 'Maintenance & Coverage' | 'Onboarding' | 'General';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
  content: string[];
}


