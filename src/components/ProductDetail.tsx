"use client";

import { useRef, useState } from "react";
import {
  Product,
  discountPercent,
  getImages,
  isLowStock,
  deliveryText,
} from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductImage from "./ProductImage";

const SWIPE_THRESHOLD = 50; // kaç piksel çekince fotoğraf değişsin

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite, cart } = useStore();
  const images = getImages(product);
  const multiple = images.length > 1;

  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);

  const fav = isFavorite(product.id);
  const discount = discountPercent(product);
  const soldOut = product.stock <= 0;
  const inCart = cart.find((i) => i.id === product.id)?.qty ?? 0;
  const maxReached = inCart >= product.stock;

  const handleAdd = () => {
    if (addToCart(product.id)) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  // Sürükleme
  const onPointerDown = (e: React.PointerEvent) => {
    if (!multiple) return;
    startX.current = e.clientX;
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    setDragX(e.clientX - startX.current);
  };

  const endDrag = () => {
    if (startX.current === null) return;
    if (dragX <= -SWIPE_THRESHOLD) next();
    else if (dragX >= SWIPE_THRESHOLD) prev();
    startX.current = null;
    setDragX(0);
    setDragging(false);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Galeri */}
      <div>
        <div className="relative aspect-square select-none overflow-hidden rounded-3xl border bg-white">
          <div
            className={`flex h-full ${multiple ? "cursor-grab active:cursor-grabbing" : ""} ${
              dragging ? "" : "transition-transform duration-500 ease-in-out"
            }`}
            style={{
              transform: `translateX(calc(-${active * 100}% + ${dragX}px))`,
              touchAction: "pan-y", // dikey kaydırma çalışsın, yatay bizde
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
            onDragStart={(e) => e.preventDefault()}
          >
            {images.map((img) => (
              <div key={img.src} className="relative h-full w-full shrink-0 overflow-hidden">
                <ProductImage
                  src={img.src}
                  alt={product.name}
                  // öncelik: fotoğrafın kendi boyutu → detailImageScale → imageScale → 1
                                    scale={img.scale ?? product.detailImageScale ?? 1}
                  emojiClass="text-7xl"
                />
              </div>
            ))}
          </div>

          {/* Oklar */}
          {multiple && (
            <>
              <button
                onClick={prev}
                aria-label="Önceki görsel"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-xl text-white hover:bg-black/50"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Sonraki görsel"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-xl text-white hover:bg-black/50"
              >
                ›
              </button>

              {/* Noktalar */}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`${i + 1}. görsel`}
                    className={`h-2.5 rounded-full transition-all ${
                      i === active ? "w-6 bg-purple-700" : "w-2.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Küçük resimler */}
        {multiple && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setActive(i)}
                aria-label={`${i + 1}. görsel`}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white ${
                  i === active ? "border-purple-700" : "border-gray-200"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt=""
                  draggable={false}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bilgiler */}
      <div>
        <p className="text-sm text-gray-500">
          {product.series} · {product.category}
        </p>
        <h1 className="mt-1 text-2xl font-extrabold md:text-3xl">{product.name}</h1>

        <div className="mt-3 flex flex-wrap gap-2">
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

        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-purple-700">
            {product.price.toLocaleString("tr-TR")} TL
          </span>
          {product.oldPrice && (
            <span className="text-lg text-gray-400 line-through">
              {product.oldPrice.toLocaleString("tr-TR")} TL
            </span>
          )}
        </div>

        {product.preorder && (
          <div className="mt-4 rounded-2xl bg-indigo-50 p-4 text-sm text-indigo-900">
            <p className="font-bold">📅 Tahmini teslimat: {deliveryText(product)}</p>
            <p className="mt-1">
              Bu ürün ön siparişle satılır ve tahmini teslimat tarihinde teslim
              edilecektir.
            </p>
          </div>
        )}

        {product.description && (
          <div className="mt-5">
            <h2 className="font-bold">Ürün Açıklaması</h2>
            <p className="mt-1 whitespace-pre-line text-gray-600">
              {product.description}
            </p>
          </div>
        )}

        <p className="mt-4 text-sm text-gray-500">
          {soldOut ? "Şu an stokta yok" : `Stokta ${product.stock} adet var`}
        </p>

        <div className="mt-5 flex gap-3">
          <button
            onClick={handleAdd}
            disabled={soldOut || maxReached}
            className="flex-1 rounded-full bg-purple-700 py-3.5 font-bold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {soldOut
              ? "Tükendi"
              : added
              ? "Sepete eklendi ✓"
              : maxReached
              ? "Stok sınırına ulaştın"
              : "Sepete Ekle"}
          </button>
          <button
            onClick={() => toggleFavorite(product.id)}
            aria-label={fav ? "Favorilerden çıkar" : "Favorilere ekle"}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full border text-2xl hover:border-red-300"
          >
            <span className={fav ? "text-red-500" : "text-gray-400"}>
              {fav ? "♥" : "♡"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}