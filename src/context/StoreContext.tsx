"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { products, deliveryText } from "@/data/products";
import {
  WHATSAPP_NUMBER,
  INSTAGRAM_USERNAME,
  INSTAGRAM_DIRECT_DM,
} from "@/data/config";

type CartItem = { id: number; qty: number };

type StoreValue = {
  cart: CartItem[];
  favorites: number[];
  cartCount: number;
  cartTotal: number;
  addToCart: (id: number) => boolean; // stok dolduysa false döner
  setQty: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  checkoutWhatsApp: () => void;
  checkoutInstagram: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const getProduct = (id: number) => products.find((p) => p.id === id);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Açılışta kayıtlı veriyi yükle
  useEffect(() => {
    try {
      const c = localStorage.getItem("fv-cart");
      const f = localStorage.getItem("fv-favorites");
      if (c) setCart(JSON.parse(c));
      if (f) setFavorites(JSON.parse(f));
    } catch {}
    setLoaded(true);
  }, []);

  // Değişince kaydet
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("fv-cart", JSON.stringify(cart));
    localStorage.setItem("fv-favorites", JSON.stringify(favorites));
  }, [cart, favorites, loaded]);

  const addToCart = (id: number) => {
    const product = getProduct(id);
    if (!product || product.stock <= 0) return false;
    const existing = cart.find((i) => i.id === id);
    if (existing && existing.qty >= product.stock) return false;

    setCart((prev) =>
      existing
        ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { id, qty: 1 }]
    );
    return true;
  };

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const setQty = (id: number, qty: number) => {
    const product = getProduct(id);
    if (!product) return;
    const safeQty = Math.min(qty, product.stock); // stoktan fazlası olamaz
    if (safeQty <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: safeQty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (id: number) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const isFavorite = (id: number) => favorites.includes(id);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce(
    (sum, i) => sum + (getProduct(i.id)?.price ?? 0) * i.qty,
    0
  );

  const buildMessage = () => {
    const lines = cart.map((i) => {
      const p = getProduct(i.id)!;
      const pre = p.preorder
        ? ` (Ön sipariş, tahmini teslimat: ${deliveryText(p)})`
        : "";
      return `• ${p.name} x${i.qty}${pre} - ${(p.price * i.qty).toLocaleString("tr-TR")} TL`;
    });
    return `Merhaba, Figür Vitrini'nden sipariş vermek istiyorum:\n\n${lines.join(
      "\n"
    )}\n\nToplam: ${cartTotal.toLocaleString("tr-TR")} TL`;
  };

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildMessage()
    )}`;
    window.open(url, "_blank");
  };

  // Instagram hazır mesaj kabul etmez, bu yüzden mesajı kopyalayıp DM'i açıyoruz
  const checkoutInstagram = () => {
    if (cart.length === 0) return;
    navigator.clipboard?.writeText(buildMessage()).catch(() => {});
    const username = INSTAGRAM_USERNAME.replace("@", "").trim();
    const url = INSTAGRAM_DIRECT_DM
      ? `https://ig.me/m/${username}`
      : `https://www.instagram.com/${username}/`;
    window.open(url, "_blank");
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        cartCount,
        cartTotal,
        addToCart,
        setQty,
        removeFromCart,
        clearCart,
        toggleFavorite,
        isFavorite,
        checkoutWhatsApp,
        checkoutInstagram,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore, StoreProvider içinde kullanılmalı");
  return ctx;
}