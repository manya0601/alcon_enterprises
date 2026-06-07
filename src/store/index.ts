import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createClient } from "@/utils/supabase/client";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  userId: string | null;
  setUserId: (id: string | null) => void;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: () => number;
  totalPrice: () => number;
  fetchCartFromDB: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      userId: null,
      setUserId: (id) => {
        const currentId = get().userId;
        if (currentId === id) return; // Break the infinite loop!
        
        set({ userId: id });
        if (id) {
          get().fetchCartFromDB();
        }
      },
      fetchCartFromDB: async () => {
        const { userId } = get();
        if (!userId) return;
        const supabase = createClient();
        const { data } = await supabase.from('cart_items').select('*').eq('user_id', userId);
        if (data && data.length > 0) {
          const dbItems = data.map(item => ({
            productId: item.product_id,
            name: item.name,
            price: Number(item.price),
            quantity: item.quantity,
            image: item.image || "/images/products/toner-1.png"
          }));
          set({ items: dbItems });
        }
      },
      addItem: async (item) => {
        const { userId, items } = get();
        
        // Auth Guard
        if (!userId) {
          useUIStore.getState().setAuthModalOpen(true);
          return;
        }

        const existing = items.find((i) => i.productId === item.productId);
        
        let newItems;
        if (existing) {
          newItems = items.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
          );
        } else {
          newItems = [...items, item];
        }

        set({ items: newItems });

        if (userId) {
          const supabase = createClient();
          if (existing) {
            await supabase.from('cart_items').update({ quantity: existing.quantity + item.quantity }).eq('user_id', userId).eq('product_id', item.productId);
          } else {
            await supabase.from('cart_items').insert({
              user_id: userId,
              product_id: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image
            });
          }
        }
      },
      removeItem: async (productId) => {
        const { userId, items } = get();
        set({ items: items.filter((i) => i.productId !== productId) });

        if (userId) {
          const supabase = createClient();
          await supabase.from('cart_items').delete().eq('user_id', userId).eq('product_id', productId);
        }
      },
      updateQuantity: async (productId, quantity) => {
        if (quantity < 1) return;
        const { userId, items } = get();
        
        // Auth Guard
        if (!userId) {
          useUIStore.getState().setAuthModalOpen(true);
          return;
        }

        set({
          items: items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        });

        if (userId) {
          const supabase = createClient();
          await supabase.from('cart_items').update({ quantity }).eq('user_id', userId).eq('product_id', productId);
        }
      },
      clearCart: async () => {
        const { userId } = get();
        set({ items: [] });
        
        if (userId) {
          const supabase = createClient();
          await supabase.from('cart_items').delete().eq('user_id', userId);
        }
      },
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "alcon-cart" }
  )
);

interface UIStore {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProductId: string | null;
  isAuthModalOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;
  setAuthModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isQuickViewOpen: false,
  quickViewProductId: null,
  isAuthModalOpen: false,
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  openQuickView: (productId) => set({ isQuickViewOpen: true, quickViewProductId: productId }),
  closeQuickView: () => set({ isQuickViewOpen: false, quickViewProductId: null }),
  setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
}));
