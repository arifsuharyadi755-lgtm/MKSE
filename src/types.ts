export interface Product {
  id: string;
  name: string;
  category: "laptop" | "component" | "gaming-pc" | "accessories";
  price: number;
  description: string;
  image: string;
  specs: string[];
  rating: number;
  stock: number;
  brand: string;
  componentType?: "cpu" | "gpu" | "motherboard" | "ram" | "storage" | "psu" | "case" | "cooler";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface PCBuilderPart {
  type: "cpu" | "gpu" | "motherboard" | "ram" | "storage" | "psu" | "case" | "cooler";
  label: string;
  description: string;
}

export interface RepairIssue {
  id: string;
  name: string;
  description: string;
  basePriceMin: number;
  basePriceMax: number;
  estimatedDuration: string;
  symptoms: string[];
}
