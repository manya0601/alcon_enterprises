// ============================================
// Alcon Enterprise - Core Type Definitions
// ============================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: ProductCategory;
  brand: string;
  sku: string;
  stock: number;
  specifications: Record<string, string>;
  features?: string[];
  compatiblePrinters: string[];
  isTrending: boolean;
  isSubscription: boolean;
  badges: ProductBadge[];
  rating: number;
  reviewCount: number;
}

export type ProductBadge = "trending" | "bestseller" | "new" | "subscription" | "limited" | "sale";

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  productCount: number;
}

export interface RentalEquipment {
  id: string;
  name: string;
  model: string;
  brand: string;
  category: RentalCategory;
  description: string;
  image: string;
  features: string[];
  dailyRate?: number;
  monthlyRate?: number;
  corporateRate?: string;
  isAvailable: boolean;
  ppm?: string;
}

export type RentalCategory = "inkjet" | "laser" | "office" | "industrial";

export interface RentalInquiry {
  name: string;
  email: string;
  phone: string;
  company?: string;
  equipmentId: string;
  rentalType: "daily" | "monthly" | "corporate";
  duration: string;
  message?: string;
}

export interface SellRequest {
  brand: string;
  model: string;
  condition: "excellent" | "good" | "fair" | "poor";
  expectedPrice: number;
  images: File[];
  name: string;
  email: string;
  phone: string;
  description?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "monthly" | "quarterly" | "yearly";
  features: string[];
  isPopular: boolean;
  badge?: string;
  cartridgesIncluded: number;
  savings: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon?: string;
}

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
  icon?: string;
  badge?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  models?: string[];
  href: string;
}

export interface ClientLogo {
  name: string;
  width?: number;
}
