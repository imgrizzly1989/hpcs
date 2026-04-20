export type BrandSlug =
  | "chery" | "geely" | "mg" | "dfsk" | "great-wall" | "haval"
  | "jac" | "byd" | "baic" | "dongfeng" | "jetour" | "faw";

export interface Brand {
  slug: BrandSlug;
  name: string;
  country: string;
  founded: number;
  description: string;
  logo: string;
}

export interface Model {
  slug: string;
  name: string;
  yearStart: number;
  yearEnd?: number; // undefined = present
  engines: string[];
}

export interface BrandVehicles {
  brandSlug: BrandSlug;
  models: Model[];
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

export interface CompatibilityEntry {
  brandSlug: BrandSlug;
  modelSlug: string;
  years: [number, number]; // inclusive range; use current year as upper for "present"
  engines: string[]; // empty = all
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  reference: string;
  category: string;
  compatibleVehicles: CompatibilityEntry[];
  price: number;
  oldPrice?: number;
  stock: number;
  image?: string;
  images?: string[];
  description: string;
  specs: Record<string, string>;
  isNew?: boolean;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
  reference: string;
  quantity: number;
}

export interface FaqEntry {
  q: string;
  a: string;
}
