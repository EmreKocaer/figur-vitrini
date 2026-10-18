import { Suspense } from "react";
import ProductsView from "@/components/ProductsView";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8">Yükleniyor…</div>}>
      <ProductsView />
    </Suspense>
  );
}