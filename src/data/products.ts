import type { Product, ProductCategory } from "@/types";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: "toner-cartridges", name: "Toner Cartridges", slug: "toner-cartridges", description: "Premium toner cartridges for laser printers", productCount: 10 },
  { id: "ink-cartridges", name: "Ink Cartridges", slug: "ink-cartridges", description: "Original & compatible ink cartridges", productCount: 6 },
  { id: "printers", name: "Printers", slug: "printers", description: "Enterprise-grade printers", productCount: 4 },
];

const CAT = PRODUCT_CATEGORIES;

export const TRENDING_PRODUCTS: Product[] = [
  {
    id: "1", name: "HP 88A (CC388A) Black Toner", slug: "hp-88a-cc388a",
    description: "The HP 88A is a standard-yield black laser toner cartridge designed for high-frequency office use. Delivers consistent, smudge-resistant text output and reliable page-after-page performance. OEM-grade formulation ensures compatibility without voiding printer warranty.",
    shortDescription: "Compatible: LaserJet P1007 / P1008 / P1106 / P1108 / M1136",
    price: 2499, comparePrice: 3200, images: ["https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80"],
    category: CAT[0], brand: "HP", sku: "HP-CC388A", stock: 45,
    specifications: { "Print Technology": "Laser", Color: "Black", "Page Yield": "~2,000 pages" },
    features: [
      "Page yield: ~2,000 pages at 5% coverage",
      "Genuine HP formulation for consistent density",
      "Anti-smear toner for crisp, professional prints",
      "Easy snap-in installation, no tools required",
      "Hermetically sealed for long shelf life"
    ],
    compatiblePrinters: ["LaserJet P1007", "LaserJet P1008", "LaserJet P1106", "LaserJet P1108", "LaserJet M1136"],
    isTrending: true, isSubscription: true, badges: ["trending", "bestseller"], rating: 4.8, reviewCount: 342,
  },
  {
    id: "2", name: "HP 12A (Q2612A) Black Toner", slug: "hp-12a-q2612a",
    description: "One of HP's most popular toner cartridges for entry-level LaserJet printers, the HP 12A offers reliable monochrome printing for SMBs and home offices. Its precision-engineered cartridge design reduces streaks and ensures even toner distribution across every page.",
    shortDescription: "Compatible: LaserJet 1010 / 1012 / 1018 / 1020 / 1022 / M1005",
    price: 2299, comparePrice: 2999, images: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80"],
    category: CAT[0], brand: "HP", sku: "HP-Q2612A", stock: 38,
    specifications: { "Print Technology": "Laser", Color: "Black", "Page Yield": "~2,000 pages" },
    features: [
      "Page yield: ~2,000 pages at 5% coverage",
      "Works seamlessly with HP LaserJet M1005 MFP",
      "Fine-grain toner particles for sharper text",
      "Low-noise operation compatible cartridge",
      "Tamper-evident security seal included"
    ],
    compatiblePrinters: ["LaserJet 1010", "LaserJet 1012", "LaserJet 1018", "LaserJet 1020", "LaserJet 1022", "LaserJet M1005"],
    isTrending: true, isSubscription: true, badges: ["trending"], rating: 4.7, reviewCount: 289,
  },
  {
    id: "3", name: "Brother TN-2365 Black Toner", slug: "brother-tn-2365",
    description: "The Brother TN-2365 is an original toner cartridge engineered for Brother's compact laser printer range. It delivers consistently dark, professional-grade output for documents, reports, and invoices — making it a go-to choice for small businesses and educational institutions.",
    shortDescription: "Compatible: HL-L2321D / L2361DN / DCP-L2541DW",
    price: 1899, comparePrice: 2500, images: ["https://images.unsplash.com/photo-1544719030-746777b7235a?w=800&q=80"],
    category: CAT[0], brand: "Brother", sku: "BRO-TN2365", stock: 29,
    specifications: { "Print Technology": "Laser", Color: "Black", "Page Yield": "~1,200 pages" },
    features: [
      "Page yield: ~1,200 pages at 5% coverage",
      "Original Brother formulation — no print quality compromise",
      "Works with Brother's automatic toner sensing system",
      "Dust-sealed cartridge for clean installation",
      "Best value for budget-focused offices"
    ],
    compatiblePrinters: ["HL-L2321D", "L2361DN", "DCP-L2541DW"],
    isTrending: true, isSubscription: true, badges: ["trending", "subscription"], rating: 4.6, reviewCount: 198,
  },
  {
    id: "4", name: "HP 78A (CE278A) Black Toner", slug: "hp-78a-ce278a",
    description: "Designed for HP's LaserJet Pro series, the 78A delivers high-density monochrome prints with consistent output quality across every page. Ideal for medium-duty print environments that handle contracts, proposals, and multipage documents regularly.",
    shortDescription: "Compatible: LaserJet Pro P1566 / P1606dn / M1536dnf",
    price: 2699, comparePrice: 3400, images: ["https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80"],
    category: CAT[0], brand: "HP", sku: "HP-CE278A", stock: 22,
    specifications: { "Print Technology": "Laser", Color: "Black", "Page Yield": "~2,100 pages" },
    features: [
      "Page yield: ~2,100 pages at 5% coverage",
      "Precision-toner technology for uniform print density",
      "Compatible with MFP M1536dnf for scan/copy/fax functions",
      "Genuine HP chip for accurate toner-level monitoring",
      "Resistant to smear immediately after printing"
    ],
    compatiblePrinters: ["LaserJet Pro P1566", "LaserJet Pro P1606dn", "LaserJet Pro M1536dnf"],
    isTrending: true, isSubscription: false, badges: ["trending"], rating: 4.5, reviewCount: 156,
  },
  {
    id: "5", name: "HP 136A (W1360A) Black Toner", slug: "hp-136a-w1360a",
    description: "The HP 136A is engineered exclusively for HP's newer Laser 100 series, featuring a dynamic security chip that ensures optimal performance only with genuine HP toner. Suited for modern offices running wireless network printing setups with HP's smart printing ecosystem.",
    shortDescription: "Compatible: HP Laser 136nw / MFP 137fnw / 138fnw",
    price: 3199, comparePrice: 3999, images: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80"],
    category: CAT[0], brand: "HP", sku: "HP-W1360A", stock: 18,
    specifications: { "Print Technology": "Laser", Color: "Black", "Page Yield": "~1,150 pages" },
    features: [
      "Page yield: ~1,150 pages at 5% coverage",
      "HP Dynamic Security enabled — genuine cartridge authentication",
      "Wireless and network printer optimised",
      "Anti-counterfeit holographic label for authenticity",
      "Compact design for HP's newer slim printer body"
    ],
    compatiblePrinters: ["HP Laser 136nw", "HP Laser MFP 137fnw", "HP Laser MFP 138fnw"],
    isTrending: true, isSubscription: true, badges: ["trending", "new"], rating: 4.4, reviewCount: 87,
  },
  {
    id: "6", name: "Brother TN-B021 Black Toner", slug: "brother-tn-b021",
    description: "An exceptionally budget-friendly toner cartridge from Brother's B-series range, the TN-B021 is best suited for high-volume, cost-conscious environments like schools, pharmacies, and logistics offices. Engineered to deliver reliable daily output without performance compromises.",
    shortDescription: "Compatible: DCP-B7535DW / HL-B2080DW",
    price: 999, comparePrice: 1299, images: ["https://images.unsplash.com/photo-1544719030-746777b7235a?w=800&q=80"],
    category: CAT[0], brand: "Brother", sku: "BRO-TNB021", stock: 35,
    specifications: { "Print Technology": "Laser", Color: "Black", "Page Yield": "~1,200 pages" },
    features: [
      "Page yield: ~1,200 pages at 5% coverage",
      "Lowest cost-per-page among Brother toners in this range",
      "Supports Brother's automatic duplex printing",
      "Toner-save mode compatible for reduced consumption",
      "Built to withstand high-frequency daily cycling"
    ],
    compatiblePrinters: ["DCP-B7535DW", "HL-B2080DW"],
    isTrending: true, isSubscription: true, badges: ["subscription"], rating: 4.4, reviewCount: 145,
  },
  {
    id: "7", name: "HP 680 Black Ink Cartridge", slug: "hp-680-black",
    description: "The HP 680 is India's most widely used inkjet cartridge, built for HP's DeskJet Ink Advantage series commonly found in homes, small offices, and schools. Fast-drying pigment-based ink delivers sharp text and vibrant colour output on plain and coated paper alike.",
    shortDescription: "Compatible: DeskJet 1115 / 2135 / 3635 / 4535 / Ink Advantage",
    price: 799, comparePrice: 999, images: ["https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80"],
    category: CAT[1], brand: "HP", sku: "HP-680-BLK", stock: 56,
    specifications: { "Print Technology": "Inkjet", Color: "Black", "Page Yield": "~480 pages" },
    features: [
      "Page yield: ~480 pages (black) at 5% coverage",
      "Fast-drying, water-resistant ink formulation",
      "Ideal for everyday document and photo printing",
      "HP Smart app compatible for remote ink level monitoring",
      "Snap-in installation with no ink spills"
    ],
    compatiblePrinters: ["DeskJet 1115", "DeskJet 2135", "DeskJet 3635", "DeskJet 4535", "Ink Advantage"],
    isTrending: true, isSubscription: true, badges: ["bestseller", "subscription"], rating: 4.6, reviewCount: 534,
  },
  {
    id: "8", name: "HP 803 Black Ink Cartridge", slug: "hp-803-black",
    description: "The HP 803 is an affordable, entry-level ink cartridge ideal for home and personal use with HP's DeskJet 1000 series. It delivers clean, legible monochrome prints for assignments, forms, bills, and general correspondence at a very low cost per page.",
    shortDescription: "Compatible: DeskJet 1112 / 2131 / 2132",
    price: 699, comparePrice: 899, images: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80"],
    category: CAT[1], brand: "HP", sku: "HP-803-BLK", stock: 41,
    specifications: { "Print Technology": "Inkjet", Color: "Black", "Page Yield": "~400 pages" },
    features: [
      "Page yield: ~400 pages at 5% coverage",
      "Most affordable HP OEM ink cartridge available",
      "Quick-dry ink — less smearing on plain paper",
      "Compact design for slim DeskJet printers",
      "Original HP chip for seamless recognition"
    ],
    compatiblePrinters: ["DeskJet 1112", "DeskJet 2131", "DeskJet 2132"],
    isTrending: true, isSubscription: true, badges: ["trending"], rating: 4.3, reviewCount: 267,
  },
  {
    id: "9", name: "Canon PG-47 Black Ink Cartridge", slug: "canon-pg-47",
    description: "The Canon PG-47 uses Canon's ChromaLife100 ink system to produce bold, clear monochrome prints that last for decades in album conditions. Optimized for Canon PIXMA's inkjet head architecture for minimal printhead clogging and hassle-free operation.",
    shortDescription: "Compatible: PIXMA E400 / E410 / E460 / E470 / iP2870",
    price: 899, comparePrice: 1100, images: ["https://images.unsplash.com/photo-1544719030-746777b7235a?w=800&q=80"],
    category: CAT[1], brand: "Canon", sku: "CAN-PG47", stock: 33,
    specifications: { "Print Technology": "Inkjet", Color: "Black", "Page Yield": "~400 pages" },
    features: [
      "Page yield: ~400 pages at 5% coverage",
      "ChromaLife100 technology for fade-resistant output",
      "Pigment black ink for crisp text documents",
      "Works with Canon PIXMA multifunction printers",
      "Smart IC chip for real-time ink level detection"
    ],
    compatiblePrinters: ["PIXMA E400", "PIXMA E410", "PIXMA E460", "PIXMA E470", "PIXMA iP2870"],
    isTrending: true, isSubscription: false, badges: ["trending"], rating: 4.5, reviewCount: 178,
  },
  {
    id: "10", name: "HP 682 Black + Tri-Color Combo Pack", slug: "hp-682-combo",
    description: "The HP 682 Combo Pack bundles both a black and a tri-color ink cartridge in a single purchase — ideal for users who print a mix of documents and images. Designed for HP's DeskJet Plus wireless series, it supports borderless photo printing and vivid colour graphics.",
    shortDescription: "Compatible: DeskJet Plus 6075 / 6475 / Ink Advantage 6075",
    price: 1599, comparePrice: 1999, images: ["https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80"],
    category: CAT[1], brand: "HP", sku: "HP-682-COMBO", stock: 27,
    specifications: { "Print Technology": "Inkjet", Color: "Black + Tri-Color", "Page Yield": "~480+300 pages" },
    features: [
      "Includes one black + one tri-color cartridge",
      "Page yield: ~480 pages black / ~300 pages color",
      "Vivid dye-based colour for borderless photo output",
      "HP Instant Ink subscription-compatible",
      "Wireless printing via HP Smart app supported"
    ],
    compatiblePrinters: ["DeskJet Plus 6075", "DeskJet Plus 6475", "Ink Advantage 6075"],
    isTrending: true, isSubscription: true, badges: ["trending", "bestseller"], rating: 4.7, reviewCount: 312,
  },
];
