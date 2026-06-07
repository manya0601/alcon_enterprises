"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, ShoppingCart, ChevronDown, Phone, Printer, ArrowRight, User, Mail, MapPin, Clock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { useUIStore, useCartStore } from "@/store";
import { createClient } from "@/utils/supabase/client";
import { TRENDING_PRODUCTS } from "@/data/products";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { totalItems } = useCartStore();
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return TRENDING_PRODUCTS.filter((p) => 
      p.name.toLowerCase().includes(query) || 
      p.brand.toLowerCase().includes(query) ||
      p.category.name.toLowerCase().includes(query)
    ).slice(0, 5); // Limit to 5 results for dropdown
  }, [searchQuery]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        useCartStore.getState().setUserId(user.id);
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(profile);
      } else {
        useCartStore.getState().setUserId(null);
      }
    };
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        useCartStore.getState().setUserId(currentUser.id);
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', currentUser.id).single();
        setProfile(profile);
      } else {
        useCartStore.getState().setUserId(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

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
          <div className="flex items-center justify-between py-4 gap-4 md:gap-8">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 h-full">
              <Image 
                src="/logo.png" 
                alt="Alcon Enterprise" 
                width={180} 
                height={72} 
                className="h-9 md:h-[52px] w-auto object-contain mix-blend-multiply" 
                priority
              />
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-xl relative group">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery) {
                    router.push(`/buy?q=${encodeURIComponent(searchQuery)}`);
                    setIsSearchFocused(false);
                  }
                }}
                className="w-full relative"
              >
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand transition-colors z-10" />
                <Input 
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => {
                    // Small delay to allow clicking dropdown items before hiding
                    setTimeout(() => setIsSearchFocused(false), 200);
                  }}
                  placeholder="Search printers, cartridges, or parts..." 
                  className="w-full pl-10 pr-24 h-10 bg-soft-gray border-border-gray rounded-full focus-visible:ring-1 focus-visible:ring-brand focus-visible:border-brand transition-all text-[13px] relative z-10" 
                  autoComplete="off"
                />
                <Button type="submit" size="sm" className="absolute right-1 top-1 bottom-1 h-8 rounded-full bg-brand hover:bg-brand-dark text-white px-4 text-[12px] z-10">
                  Search
                </Button>
              </form>

              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {isSearchFocused && searchQuery.trim().length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-border-gray overflow-hidden z-50 flex flex-col max-h-[400px]"
                  >
                    {searchResults.length > 0 ? (
                      <>
                        <div className="overflow-y-auto p-2 space-y-1">
                          {searchResults.map((product) => (
                            <Link 
                              key={product.id} 
                              href={`/buy/${product.slug}`}
                              onClick={() => {
                                setIsSearchFocused(false);
                                setSearchQuery("");
                              }}
                              className="flex items-center gap-3 p-2 hover:bg-soft-gray rounded-xl transition-colors group/item"
                            >
                              <div className="w-12 h-12 bg-white border border-border-gray rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                <Image src={product.images[0]} alt={product.name} width={40} height={40} className="object-contain" unoptimized />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-dark-text group-hover/item:text-brand truncate">{product.name}</p>
                                <p className="text-[11px] text-slate-text capitalize truncate">{product.category.name} • {product.brand}</p>
                              </div>
                              <div className="text-[13px] font-extrabold text-brand pr-2 shrink-0">
                                ₹{product.price.toLocaleString()}
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="p-2 border-t border-border-gray bg-soft-gray/50">
                          <Link 
                            href={`/buy?q=${encodeURIComponent(searchQuery)}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="w-full flex items-center justify-center gap-1 text-[12px] font-bold text-brand hover:text-brand-dark py-1.5"
                          >
                            View all results <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="p-8 text-center text-slate-text">
                        <Search className="w-8 h-8 mx-auto text-border-gray mb-3" />
                        <p className="text-[14px] font-bold text-dark-text mb-1">No products found</p>
                        <p className="text-[12px]">Try a different search term</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="icon" className="md:hidden text-slate-text w-9 h-9">
                <Search className="w-4 h-4" />
              </Button>
              
              {user ? (
                <div 
                  className="hidden sm:flex relative items-center cursor-pointer"
                  onMouseEnter={() => setActiveDropdown('user')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-soft-gray transition-colors">
                    <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {(profile?.full_name || profile?.username || user.email || 'U').charAt(0).toUpperCase()}
                    </div>
                  </Link>

                  <AnimatePresence>
                    {activeDropdown === 'user' && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-1 w-56 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-border-gray p-2 z-50"
                      >
                        <div className="px-3 py-2 border-b border-border-gray mb-1">
                          <p className="text-sm font-bold text-dark-text truncate">{profile?.full_name || profile?.username || 'User'}</p>
                          <p className="text-xs text-slate-text truncate">{user.email}</p>
                        </div>
                        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-text hover:bg-soft-gray hover:text-brand rounded-lg transition-colors">
                          <User className="w-4 h-4" /> Dashboard
                        </Link>
                        <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left mt-1">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login" className="hidden sm:inline-flex">
                  <Button variant="ghost" className="text-slate-text hover:text-brand hover:bg-light-sky/50 rounded-full font-bold">
                    Sign In
                  </Button>
                </Link>
              )}

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
                    <Image 
                      src="/logo.png" 
                      alt="Alcon Enterprise" 
                      width={120} 
                      height={36} 
                      className="w-24 max-w-full h-auto object-contain mix-blend-multiply" 
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-soft-gray" onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const q = new FormData(e.currentTarget).get("q");
                    if (q) {
                      router.push(`/buy?q=${encodeURIComponent(q.toString())}`);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="mb-6 relative"
                >
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input name="q" placeholder="Search products..." className="w-full pl-9 h-10 bg-soft-gray border-none rounded-lg text-[13px]" />
                </form>

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
