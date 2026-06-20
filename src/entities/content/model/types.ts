export type Banner = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  visible: boolean;
  order: number;
};

export type Review = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  visible: boolean;
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  visible: boolean;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  visible: boolean;
  order: number;
};

export type HeroBanner = {
  id: string;
  title: string;
  subtitle: string;
  bgColor: string;
  visible: boolean;
  order: number;
};
