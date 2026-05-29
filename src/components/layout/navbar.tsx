"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, ShoppingCart, ChevronDown, Phone, Printer, ArrowRight, User, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { useUIStore, useCartStore } from "@/store";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { totalItems } = useCartStore();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  return (
    <>
      {/* Top bar - Dark blue */}
      <div className="hidden lg:block w-full bg-brand text-white text-[12px] py-1.5 font-medium">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE_CONFIG.contact.phones[0].replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent-cyan" /> {SITE_CONFIG.contact.phones[0]}
            </a>
            <a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Mail className="w-3.5 h-3.5 text-accent-cyan" /> {SITE_CONFIG.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent-cyan" /> Ahmedabad, Gujarat
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent-cyan" /> Mon–Sat: 9 AM – 7 PM
            </span>
          </div>
        </div>
      </div>

      {/* Main navbar - Ecommerce Style */}
      <header className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-200 ${scrolled ? "shadow-[0_2px_10px_rgba(0,0,0,0.06)]" : "border-b border-border-gray"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4 md:gap-8">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-accent-blue flex items-center justify-center shadow-sm">
                <Printer className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[18px] font-bold tracking-tight text-dark-text">Alcon</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-blue font-semibold">Enterprise</span>
              </div>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-xl relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
              <Input 
                placeholder="Search printers, cartridges, or parts..." 
                className="w-full pl-10 pr-4 h-10 bg-soft-gray border-border-gray rounded-full focus-visible:ring-1 focus-visible:ring-brand focus-visible:border-brand transition-all text-[13px]" 
              />
              <Button size="sm" className="absolute right-1 top-1 bottom-1 h-8 rounded-full bg-brand hover:bg-brand-dark text-white px-4 text-[12px]">
                Search
              </Button>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="icon" className="md:hidden text-slate-text w-9 h-9">
                <Search className="w-4 h-4" />
              </Button>
              <Link href="/dashboard" className="hidden sm:inline-flex">
                <Button variant="ghost" size="icon" className="text-slate-text hover:text-brand hover:bg-light-sky/50 w-9 h-9 rounded-full">
                  <User className="w-[18px] h-[18px]" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative text-slate-text hover:text-brand hover:bg-light-sky/50 w-9 h-9 rounded-full">
                  <ShoppingCart className="w-[18px] h-[18px]" />
                  {totalItems() > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-accent-blue text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                      {totalItems()}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/contact" className="hidden lg:inline-flex ml-2">
                <Button className="bg-brand hover:bg-brand-dark text-white gap-1.5 rounded-full h-10 px-5 text-[13px] shadow-sm shadow-brand/20">
                  Get a Quote <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="lg:hidden text-slate-text w-9 h-9" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Nav Links */}
        <div className="hidden lg:block border-t border-border-gray bg-white">
          <nav className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-1 h-12">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <div
                    key={link.title}
                    className="relative"
                    onMouseEnter={() => link.children ? setActiveDropdown(link.title) : undefined}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`relative flex items-center gap-1.5 px-4 h-12 text-[13px] font-medium transition-colors ${
                        isActive ? "text-brand" : "text-slate-text hover:text-brand"
                      }`}
                    >
                      {link.title}
                      {link.children && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
                      {isActive && <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand rounded-t-full" />}
                    </Link>

                    <AnimatePresence>
                      {link.children && activeDropdown === link.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-0 w-64 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-border-gray p-2 z-50"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-light-sky/30 hover:text-brand transition-colors group"
                            >
                              <span className="text-[13px] font-semibold text-dark-text group-hover:text-brand">{child.title}</span>
                              <span className="text-[11px] text-muted-foreground line-clamp-1">{child.description}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              className="absolute top-0 left-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                      <Printer className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[16px] font-bold text-dark-text">Alcon</span>
                  </div>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-soft-gray" onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mb-6 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="w-full pl-9 h-10 bg-soft-gray border-none rounded-lg text-[13px]" />
                </div>

                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <div key={link.title}>
                      <Link href={link.href} className="flex items-center justify-between px-3 py-3 text-[14px] font-semibold text-dark-text rounded-lg hover:bg-light-sky/30 hover:text-brand transition-colors">
                        {link.title}
                        {link.children && <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </Link>
                      {link.children && (
                        <div className="pl-4 flex flex-col gap-1 mb-2 border-l-2 border-soft-gray ml-4 mt-1">
                          {link.children.map((child) => (
                            <Link key={child.title} href={child.href} className="px-4 py-2 text-[13px] text-slate-text hover:text-brand rounded-md hover:bg-light-sky/20 transition-colors">
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-border-gray">
                  <Link href="/contact">
                    <Button className="w-full bg-brand hover:bg-brand-dark text-white text-[14px] h-11 rounded-lg shadow-sm">
                      Get a Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
