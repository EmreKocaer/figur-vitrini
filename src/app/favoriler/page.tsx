"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

export default function FavoritesPage() {
  const { favorites } = useStore();
  const favProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-extrabold md:text-3xl">Favorilerim</h1>

      {favProducts.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed p-12 text-center text-gray-500">
          <p>Henüz favori ürünün yok.</p>
          <Link href="/urunler" className="mt-3 inline-block font-bold text-purple-700">
            Ürünlere göz at →
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {favProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}