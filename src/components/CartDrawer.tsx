"use client";

import { useEffect } from "react";
import { products, deliveryText } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { FREE_SHIPPING_LIMIT } from "@/data/config";
import ProductImage from "./ProductImage";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    cart,
    cartTotal,
    cartCount,
    setQty,
    removeFromCart,
    clearCart,
    checkoutWhatsApp,
    checkoutInstagram,
  } = useStore();

  // Esc ile kapat + panel açıkken arka plan kaymasın
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const remaining = FREE_SHIPPING_LIMIT - cartTotal;
  const progress = Math.min(100, (cartTotal / FREE_SHIPPING_LIMIT) * 100);
  const hasPreorder = cart.some(
    (i) => products.find((x) => x.id === i.id)?.preorder
  );

  return (
    <>
      {/* Karartma */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Başlık */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-extrabold">Sepetim ({cartCount})</h2>
          <button
            onClick={onClose}
            aria-label="Sepeti kapat"
            className="rounded-full p-2 text-xl leading-none hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center text-gray-500">
            <div className="text-5xl">🛒</div>
            <p className="font-semibold">Sepetin şu an boş</p>
            <button
              onClick={onClose}
              className="mt-2 font-bold text-purple-700 hover:underline"
            >
              Alışverişe devam et
            </button>
          </div>
        ) : (
          <>
            {/* Ücretsiz kargo çubuğu */}
            <div className="border-b bg-purple-50 px-5 py-3">
              <p className="text-sm font-semibold text-purple-900">
                {remaining > 0
                  ? `Ücretsiz kargo için ${remaining.toLocaleString("tr-TR")} TL daha ekle 📦`
                  : "Tebrikler, kargo ücretsiz! 🎉"}
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-purple-200">
                <div
                  className="h-full rounded-full bg-purple-700 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Ürünler */}
            <ul className="flex-1 space-y-4 overflow-y-auto p-5">
              {cart.map((item) => {
                const p = products.find((x) => x.id === item.id);
                if (!p) return null;
                const maxed = item.qty >= p.stock;

                return (
                  <li key={item.id} className="flex gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white">
                      <ProductImage
                        src={p.image}
                        alt={p.name}
                        scale={p.imageScale ?? 1}
                        emojiClass="text-2xl"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <h3 className="line-clamp-2 text-sm font-semibold">
                          {p.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(p.id)}
                          aria-label="Ürünü sepetten çıkar"
                          className="text-gray-400 hover:text-red-500"
                        >
                          🗑
                        </button>
                      </div>

                      <p className="text-sm font-bold text-purple-700">
                        {(p.price * item.qty).toLocaleString("tr-TR")} TL
                      </p>

                      {p.preorder && (
                        <p className="text-xs font-semibold text-indigo-600">
                          📅 Ön sipariş · Tahmini teslimat: {deliveryText(p)}
                        </p>
                      )}

                      <div className="mt-auto flex items-center gap-3 pt-1">
                        <div className="flex items-center rounded-full border">
                          <button
                            onClick={() => setQty(p.id, item.qty - 1)}
                            aria-label="Azalt"
                            className="h-8 w-8 text-lg hover:text-purple-700"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-bold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => setQty(p.id, item.qty + 1)}
                            disabled={maxed}
                            aria-label="Artır"
                            className="h-8 w-8 text-lg hover:text-purple-700 disabled:cursor-not-allowed disabled:text-gray-300"
                          >
                            +
                          </button>
                        </div>
                        {maxed && (
                          <span className="text-xs text-amber-600">
                            Stokta {p.stock} adet var
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Alt kısım: toplam + satın al */}
            <div className="space-y-3 border-t p-5">
              {hasPreorder && (
                <p className="rounded-xl bg-indigo-50 p-3 text-xs text-indigo-900">
                  Sepetindeki ön sipariş ürünleri tahmini teslimat tarihinde
                  teslim edilecektir.
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="font-semibold">Toplam</span>
                <span className="text-xl font-extrabold text-purple-700">
                  {cartTotal.toLocaleString("tr-TR")} TL
                </span>
              </div>

              <button
                onClick={checkoutWhatsApp}
                className="w-full rounded-full bg-green-600 py-3 font-bold text-white transition hover:bg-green-700"
              >
                WhatsApp ile Satın Al
              </button>

              <div>
                <button
                  onClick={checkoutInstagram}
                  className="w-full rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 py-3 font-bold text-white transition hover:opacity-90"
                >
                  Instagram ile Satın Al
                </button>
                {/* Bilgi notu: her zaman görünür */}
                <p className="mt-2 rounded-xl bg-purple-50 p-3 text-xs text-purple-900">
                  I                  Instagram'a yönlendirilirken sipariş mesajın otomatik
                  kopyalanır. Açılan profilde <b>Mesaj</b> butonuna basıp
                  yapıştırman yeterli.
                </p>
              </div>

              <button
                onClick={clearCart}
                className="w-full text-sm text-gray-500 hover:text-red-500"
              >
                Sepeti temizle
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}