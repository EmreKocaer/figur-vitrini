"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Aksiyon Figürleri",
    text: "Sevdiğin kahramanlar detaylı eklemleri ve gerçekçi tasarımlarıyla koleksiyonuna katılmaya hazır.",
    button: "Aksiyon Figürlerini Gör",
    href: "/urunler?kategori=Aksiyon Figürü",
    image: "/banners/aksiyon.jpg",
    bg: "from-purple-800 via-purple-700 to-indigo-600",
  },
  {
    title: "Funko Pop Dünyası",
    text: "Marvel'dan Star Wars'a binlerce karakter, sevimli Funko Pop figürleriyle rafında yerini alsın.",
    button: "Funko Popları Gör",
    href: "/urunler?kategori=Funko",
    image: "/banners/funko.jpg",
    bg: "from-fuchsia-700 via-pink-600 to-orange-500",
  },
  {
    title: "Nadir Heykeller",
    text: "Sınırlı sayıda üretilen, koleksiyonerlerin aradığı özel heykeller ve statüler burada.",
    button: "Nadir Heykelleri Gör",
    href: "/urunler?kategori=Heykel",
    image: "/banners/heykel.jpg",
    bg: "from-gray-900 via-slate-800 to-purple-900",
  },
];

const SWIPE_THRESHOLD = 60; // kaç piksel çekince banner değişsin

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startX = useRef<number | null>(null);
  const moved = useRef(false);

  // Her 5 saniyede bir sonraki banner (elle geçince sayaç sıfırlanır)
  useEffect(() => {
    if (paused || dragging) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, [paused, dragging, index]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  // Sürükleme
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    moved.current = false;
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) moved.current = true;
    setDragX(dx);
  };

  const endDrag = () => {
    if (startX.current === null) return;
    if (dragX <= -SWIPE_THRESHOLD) next();
    else if (dragX >= SWIPE_THRESHOLD) prev();
    startX.current = null;
    setDragX(0);
    setDragging(false);
  };

  // Sürükleme sonrası butona yanlışlıkla tıklanmasın
  const onClickCapture = (e: React.MouseEvent) => {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
      moved.current = false;
    }
  };

  return (
    <section
      className="relative select-none overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`flex cursor-grab active:cursor-grabbing ${
          dragging ? "" : "transition-transform duration-700 ease-in-out"
        }`}
        style={{
          transform: `translateX(calc(-${index * 100}% + ${dragX}px))`,
          touchAction: "pan-y", // dikey kaydırma çalışsın, yatay bizde
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {slides.map((s) => (
          <div
            key={s.title}
            className={`relative flex h-[200px] w-full shrink-0 items-center bg-gradient-to-r px-6 sm:h-[250px] md:h-[300px] ${s.bg}`}
          >
            {/* Arka plan görseli */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt={s.title}
              draggable={false}
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="absolute inset-0 h-full w-full object-cover object-right"
            />

            {/* Yazıların okunması için soldan sağa koyu gölge */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            <div className="relative mx-auto w-full max-w-7xl px-4 md:px-12">
              <div className="max-w-xl text-white">
                <h2 className="text-2xl font-extrabold drop-shadow sm:text-3xl md:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-2 text-xs text-white/90 drop-shadow sm:text-sm md:mt-3 md:text-base">
                  {s.text}
                </p>
                <Link
                  href={s.href}
                  draggable={false}
                  className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-bold text-purple-800 transition hover:scale-105 hover:bg-purple-100"
                >
                  {s.button}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Oklar */}
      <button
        onClick={prev}
        aria-label="Önceki banner"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-xl text-white hover:bg-black/50 md:left-4"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Sonraki banner"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-xl text-white hover:bg-black/50 md:right-4"
      >
        ›
      </button>

      {/* Noktalar */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`${i + 1}. banner`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}