// ============================================
// Alcon Enterprise - Site Constants
// ============================================

export const SITE_CONFIG = {
  name: "Alcon Enterprise",
  tagline: "India's Trusted Printer & Enterprise Hardware Solutions",
  description:
    "Serving businesses since 1999 with printers, cartridges, rentals, repairs, and enterprise hardware solutions. Buy, rent, or sell printers with trusted enterprise support.",
  url: "https://alconenterprise.com",
  founder: "Neelkant Gupta",
  foundedYear: 1999,
  yearsOfExperience: new Date().getFullYear() - 1999,
  location: {
    address: "Hariom Complex",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.74801408678!2d72.41653!3d23.02045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin",
  },
  contact: {
    phones: ["+91 98250 83056", "+91 99098 24258"],
    email: "alcon_ent@rediffmail.com",
    whatsapp: "919825083056",
  },
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    twitter: "#",
  },
} as const;

interface NavChild {
  title: string;
  href: string;
  description: string;
}

interface NavLink {
  title: string;
  href: string;
  children?: NavChild[];
}

export const NAV_LINKS: NavLink[] = [
  {
    title: "Products",
    href: "/buy",
    children: [
      {
        title: "Ink Cartridge & Ink",
        href: "/buy?category=ink-cartridges",
        description: "Original & compatible ink cartridges for all major brands",
      },
      {
        title: "Toner Cartridges",
        href: "/buy?category=toner-cartridges",
        description: "Premium toner cartridges for laser printers",
      },
      {
        title: "Toner Powder",
        href: "/buy?category=toner-powder",
        description: "High-density toner powder for refilling",
      },
      {
        title: "Drums (Imaging & OPC)",
        href: "/buy?category=drums",
        description: "Long-lasting imaging drum units",
      },
      {
        title: "Printers",
        href: "/buy?category=printers",
        description: "Enterprise-grade printers for every need",
      },
    ],
  },
  {
    title: "Rent",
    href: "/rent",
    children: [
      {
        title: "Daily Rental",
        href: "/rent?type=daily",
        description: "Short-term rentals for events & projects",
      },
      {
        title: "Monthly Rental",
        href: "/rent?type=monthly",
        description: "Flexible monthly plans for businesses",
      },
      {
        title: "Corporate Plans",
        href: "/rent?type=corporate",
        description: "Custom enterprise rental solutions",
      },
    ],
  },
  {
    title: "Sell",
    href: "/sell",
  },
  {
    title: "Subscriptions",
    href: "/subscriptions",
  },
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Toner Refilling",
        href: "/services/toner-refilling",
        description: "Professional toner refilling for HP, Canon, Brother",
      },
      {
        title: "On-Site Repair",
        href: "/services/on-site-repair",
        description: "Expert printer repair at your location",
      },
      {
        title: "AMC Plans",
        href: "/services/amc-plans",
        description: "Annual maintenance contracts",
      },
      {
        title: "Cartridge Subscription",
        href: "/services/cartridge-subscription",
        description: "Monthly refill plans & automatic delivery",
      },
      {
        title: "Printer Rentals",
        href: "/services/printer-rentals",
        description: "Office and industrial printer rentals",
      },
    ],
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const CLIENT_LOGOS = [
  { name: "Zomato" },
  { name: "Blinkit" },
  { name: "BigBasket" },
  { name: "Taj Group" },
  { name: "Somany Ceramics" },
  { name: "Podar International School" },
  { name: "TGB Bakery" },
  { name: "Hasti Petrochemical" },
] as const;

export const STATS = [
  { value: 27, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Enterprise Clients" },
  { value: 10000, suffix: "+", label: "Products Delivered" },
  { value: 50, suffix: "+", label: "Cities Served" },
] as const;
