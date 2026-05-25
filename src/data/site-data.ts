import type { RentalEquipment, SubscriptionPlan, Testimonial, TimelineEvent } from "@/types";

export const RENTAL_EQUIPMENT: RentalEquipment[] = [
  { id: "r1", name: "HP LaserJet 72625", model: "HP-72625", brand: "HP", category: "office", description: "High-volume office laser printer with duplex printing and network support.", image: "/rentals/hp-72625.jpg", features: ["Auto Duplex", "Network Ready", "35 PPM", "1200 DPI"], dailyRate: 500, monthlyRate: 8000, corporateRate: "Custom", isAvailable: true, ppm: "35 PPM" },
  { id: "r2", name: "HP LaserJet 4104", model: "HP-4104", brand: "HP", category: "industrial", description: "Industrial-grade laser printer for heavy-duty printing needs.", image: "/rentals/hp-4104.jpg", features: ["45 PPM", "Heavy Duty", "Network", "Large Tray"], dailyRate: 800, monthlyRate: 15000, corporateRate: "Custom", isAvailable: true, ppm: "45 PPM" },
  { id: "r3", name: "Brother DCP-2541", model: "Brother-2541", brand: "Brother", category: "office", description: "Multi-function printer with print, scan, copy, and fax.", image: "/rentals/brother-2541.jpg", features: ["Print/Scan/Copy", "30 PPM", "ADF", "Wi-Fi"], dailyRate: 400, monthlyRate: 6000, corporateRate: "Custom", isAvailable: true, ppm: "30 PPM" },
  { id: "r4", name: "Scanner Cam C226", model: "Scanner Cam-C226", brand: "Canon", category: "office", description: "High-speed document scanner with ADF.", image: "/rentals/scanner-c226.jpg", features: ["ADF", "Duplex Scan", "Network", "Cloud Ready"], dailyRate: 600, monthlyRate: 10000, corporateRate: "Custom", isAvailable: true, ppm: "26 PPM" },
  { id: "r5", name: "HP LaserJet 1020", model: "HP-1020", brand: "HP", category: "laser", description: "Compact laser printer perfect for small offices.", image: "/rentals/hp-1020.jpg", features: ["Compact", "14 PPM", "USB", "Quiet"], dailyRate: 200, monthlyRate: 3000, corporateRate: "Custom", isAvailable: true, ppm: "14 PPM" },
  { id: "r6", name: "Riso RunF 160 PPM", model: "Riso-RunF-160", brand: "Riso", category: "industrial", description: "Ultra-high speed digital duplicator for mass production.", image: "/rentals/riso-runf.jpg", features: ["160 PPM", "Mass Production", "Low Cost", "A3 Support"], dailyRate: 2000, monthlyRate: 35000, corporateRate: "Custom", isAvailable: true, ppm: "160 PPM" },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  { id: "monthly", name: "Starter", description: "Perfect for small offices with moderate printing needs.", price: 1499, interval: "monthly", features: ["2 Cartridge deliveries/month", "Free doorstep delivery", "10% off market price", "Email support", "Cancel anytime"], isPopular: false, cartridgesIncluded: 2, savings: "10%" },
  { id: "quarterly", name: "Professional", description: "Ideal for growing businesses with consistent printing.", price: 3999, interval: "quarterly", features: ["6 Cartridge deliveries/quarter", "Free doorstep delivery", "20% off market price", "Priority phone support", "Free printer health check", "Auto-reorder alerts"], isPopular: true, badge: "Most Popular", cartridgesIncluded: 6, savings: "20%" },
  { id: "yearly", name: "Enterprise", description: "Complete solution for large offices and enterprises.", price: 12999, interval: "yearly", features: ["Unlimited deliveries", "Free doorstep delivery", "30% off market price", "Dedicated account manager", "Free quarterly maintenance", "Priority emergency support", "Custom billing"], isPopular: false, cartridgesIncluded: 999, savings: "30%" },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Rajesh Patel", company: "Somany Ceramics", role: "IT Head", content: "Alcon Enterprise has been our trusted partner for over 8 years. Their printer maintenance and cartridge supply is consistently reliable. The best service in Ahmedabad.", rating: 5 },
  { id: "t2", name: "Priya Sharma", company: "Zomato (Regional Office)", role: "Operations Manager", content: "We switched to Alcon for our office printer fleet and saw 30% cost reduction. Their subscription model is a game-changer for our operations.", rating: 5 },
  { id: "t3", name: "Amit Desai", company: "TGB Bakery", role: "Managing Director", content: "From printer rentals to emergency repairs, Alcon has never let us down. Their response time is exceptional and pricing is very competitive.", rating: 5 },
  { id: "t4", name: "Neha Joshi", company: "Podar International School", role: "Admin Head", content: "We've been using Alcon's rental services for 5 years. Hassle-free experience with excellent after-sales support. Highly recommended for educational institutions.", rating: 4 },
  { id: "t5", name: "Vikram Singh", company: "Hasti Petrochemical", role: "Purchase Manager", content: "Alcon's enterprise solutions have streamlined our printing infrastructure. Professional team, competitive pricing, and reliable delivery.", rating: 5 },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { year: "1999", title: "The Beginning", description: "Founded by Neelkant Gupta with a vision to provide reliable printer solutions to businesses in Ahmedabad." },
  { year: "2005", title: "Ahmedabad Expansion", description: "Expanded operations across Ahmedabad, serving 100+ corporate clients with printing solutions." },
  { year: "2010", title: "Industrial Services", description: "Launched industrial-grade printing and high-volume copier rental services for manufacturing sector." },
  { year: "2015", title: "Enterprise Partnerships", description: "Partnered with Somany Ceramics, Taj Group, Podar International School, and other major enterprises." },
  { year: "2020", title: "Digital Transformation", description: "Onboarded Zomato, Blinkit, BigBasket as clients. Launched online ordering and subscription services." },
  { year: "2024", title: "Pan-India Vision", description: "Serving 500+ clients across 50+ cities with plans for nationwide expansion and digital platform launch." },
];
