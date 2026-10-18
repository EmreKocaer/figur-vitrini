"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Product,
  discountPercent,
  isLowStock,
  deliveryText,
} from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite, cart } = useStore();
  const [added, setAdded] = useState(false);

  const fav = isFavorite(product.id);
  const discount = discountPercent(product);
  const soldOut = product.stock <= 0;
  const inCart = cart.find((i) => i.id === product.id)?.qty ?? 0;
  const maxReached = inCart >= product.stock;
  const href = `/urun/${product.id}`;

  const handleAdd = () => {
    if (addToCart(product.id)) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border bg-white transition hover:shadow-lg">
      {/* Görsel + etiketler */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <Link href={href} className="absolute inset-0">
          <ProductImage
            src={product.image}
            alt={product.name}
            scale={product.imageScale ?? 1}
          />
        </Link>

        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1">
          {discount > 0 && (
            <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
              %{discount} İndirim
            </span>
          )}
          {product.preorder && (
            <span className="rounded bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white">
              Ön Sipariş
            </span>
          )}
          {isLowStock(product) && (
            <span className="rounded bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
              Son {product.stock} ürün
            </span>
          )}
          {soldOut && (
            <span className="rounded bg-gray-800 px-2 py-0.5 text-xs font-bold text-white">
              Tükendi
            </span>
          )}
        </div>

        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={fav ? "Favorilerden çıkar" : "Favorilere ekle"}
          className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl shadow hover:scale-110"
        >
          <span className={fav ? "text-red-500" : "text-gray-400"}>
            {fav ? "♥" : "♡"}
          </span>
        </button>
      </div>

      {/* Bilgiler */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-xs text-gray-500">{product.series}</p>
        <Link href={href} className="mt-1 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold hover:text-purple-700 sm:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-purple-700">
            {product.price.toLocaleString("tr-TR")} TL
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.oldPrice.toLocaleString("tr-TR")} TL
            </span>
          )}
        </div>

        {product.preorder && (
          <p className="mt-1 text-xs font-semibold text-indigo-600">
            📅 Tahmini teslimat: {deliveryText(product)}
          </p>
        )}

        <button
          onClick={handleAdd}
          disabled={soldOut || maxReached}
          className="mt-3 rounded-full bg-purple-700 py-2 text-sm font-bold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {soldOut
            ? "Tükendi"
            : added
            ? "Sepete eklendi ✓"
            : maxReached
            ? "Stok sınırına ulaştın"
            : "Sepete Ekle"}
        </button>
      </div>
    </div>
  );
}