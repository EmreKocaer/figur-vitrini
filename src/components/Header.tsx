"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/urunler", label: "Tüm Ürünler" },
  { href: "/biz-kimiz", label: "Biz Kimiz" },
];

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 4h2l2.4 11h10.2L20 7H6.2" />
      <circle cx="9" cy="19.5" r="1.5" />
      <circle cx="17" cy="19.5" r="1.5" />
    </svg>
  );
}

function Badge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-700 px-1 text-xs font-bold text-white">
      {count}
    </span>
  );
}

export default function Header({ onCartClick }: { onCartClick: () => void }) {
  const pathname = usePathname();
  const { cartCount, favorites } = useStore();

  const navLink = (l: (typeof links)[number]) => (
    <Link
      key={l.href}
      href={l.href}
      style={{ fontFamily: "var(--font-nav)" }}
      className={`text-[15px] font-semibold tracking-wide transition hover:text-purple-700 ${
        pathname === l.href ? "text-purple-700" : "text-gray-600"
      }`}
    >
      {l.label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:grid md:grid-cols-3">
        {/* Sol: site adı */}
        <Link href="/" className="text-xl font-extrabold tracking-tight text-gray-900">
          Figür <span className="text-purple-700">Vitrini</span>
        </Link>

        {/* Orta: menü (sadece masaüstü) */}
        <nav className="hidden justify-center gap-8 md:flex">
          {links.map(navLink)}
        </nav>

        {/* Sağ: favoriler + sepet */}
        <div className="flex items-center justify-end gap-4">
          <Link href="/favoriler" aria-label="Favorilerim" className="relative text-gray-700 hover:text-purple-700">
            <HeartIcon />
            <Badge count={favorites.length} />
          </Link>
          <button onClick={onCartClick} aria-label="Sepet" className="relative text-gray-700 hover:text-purple-700">
            <CartIcon />
            <Badge count={cartCount} />
          </button>
        </div>
      </div>

      {/* Mobil menü satırı */}
      <nav className="flex justify-center gap-6 border-t py-2 md:hidden">
        {links.map(navLink)}
      </nav>
    </header>
  );
}