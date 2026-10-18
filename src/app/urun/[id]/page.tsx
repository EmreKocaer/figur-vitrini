import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getSimilar } from "@/data/products";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";

// Tüm ürün sayfalarını önceden hazırla
export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

async function ProductContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) notFound();

  const similar = getSimilar(product);

  return (
    <>
      <div className="mt-4">
        <ProductDetail product={product} />
      </div>

      {similar.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-extrabold md:text-2xl">Benzer Ürünler</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/urunler"
        className="text-sm font-semibold text-purple-700 hover:underline"
      >
        ← Tüm Ürünler
      </Link>

      <Suspense fallback={<div className="mt-8 text-gray-500">Yükleniyor…</div>}>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}