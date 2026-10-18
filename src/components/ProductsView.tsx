"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product, products } from "@/data/products";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 12; // her seferde kaç ürün gösterilsin
const STORAGE_KEY = "fv-products-state"; // geri dönünce durumu hatırlamak için
const MAX_AGE = 30 * 60 * 1000; // 30 dakikadan eski kaydı kullanma

// Türkçe karakterleri ve büyük/küçük harfi yok sayarak karşılaştırır
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");

const unique = (values: string[]) =>
  [...new Set(values)].sort((a, b) => a.localeCompare(b, "tr"));

type Sel = { cats: string[]; brands: string[]; series: string[] };
type Key = keyof Sel;

const EMPTY: Sel = { cats: [], brands: [], series: [] };

const valueOf = (p: Product, key: Key) =>
  key === "cats" ? p.category : key === "brands" ? p.brand ?? "" : p.series;

// Tüm seçenekler (ürünlerden otomatik toplanır)
const ALL: Record<Key, string[]> = {
  cats: unique(products.map((p) => p.category)),
  brands: unique(products.map((p) => p.brand ?? "").filter(Boolean)),
  series: unique(products.map((p) => p.series)),
};

// Ürün, seçimlerle uyuşuyor mu? (skip: o grubu yok say)
const matches = (p: Product, sel: Sel, skip?: Key) =>
  (["cats", "brands", "series"] as Key[]).every(
    (k) => k === skip || sel[k].length === 0 || sel[k].includes(valueOf(p, k))
  );

// Diğer gruplara göre seçilebilir olan değerler
const availableFor = (sel: Sel, key: Key) =>
  new Set(products.filter((p) => matches(p, sel, key)).map((p) => valueOf(p, key)));

// Artık uygun olmayan seçimleri otomatik kaldırır
const prune = (sel: Sel): Sel => {
  let cur = sel;
  for (let i = 0; i < 3; i++) {
    cur = {
      cats: cur.cats.filter((v) => availableFor(cur, "cats").has(v)),
      brands: cur.brands.filter((v) => availableFor(cur, "brands").has(v)),
      series: cur.series.filter((v) => availableFor(cur, "series").has(v)),
    };
  }
  return cur;
};

type Saved = {
  query: string;
  sort: string;
  sel: Sel;
  minPrice: string;
  maxPrice: string;
  onlyPreorder: boolean;
  onlyDiscount: boolean;
  visibleCount: number;
  scrollY: number;
  params: string;
  savedAt: number;
};

// Kayıtlı durumu okur (eskiyse ya da farklı adresten gelindiyse yok sayar)
const readSaved = (ps: string): Saved | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved: Saved = JSON.parse(raw);
    if (Date.now() - (saved.savedAt ?? 0) > MAX_AGE) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    if (saved.params !== ps) return null;
    return saved;
  } catch {
    return null;
  }
};

function Chip({
  label,
  active,
  disabled = false,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
        active
          ? "border-purple-700 bg-purple-700 text-white"
          : disabled
          ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300"
          : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50"
      }`}
    >
      {label}
    </button>
  );
}

function FilterGroup({
  title,
  options,
  available,
  values,
  onToggle,
}: {
  title: string;
  options: string[];
  available: Set<string>;
  values: string[];
  onToggle: (v: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div>
      <p className="mb-2 text-sm font-bold">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <Chip
            key={o}
            label={o}
            active={values.includes(o)}
            disabled={!available.has(o) && !values.includes(o)}
            onClick={() => onToggle(o)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductsView() {
  const params = useSearchParams();
  const paramsString = params.toString();

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("varsayilan");
  const [sel, setSel] = useState<Sel>(EMPTY);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyPreorder, setOnlyPreorder] = useState(false);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const lastParams = useRef<string | null>(null);
  const prevFilterKey = useRef<string | null>(null);
  const restoringRef = useRef(false);
  const paramsRef = useRef(paramsString);
  paramsRef.current = paramsString;

  // Ürüne tıklanınca kaydedebilmek için güncel durumu ref'te tut
  const stateRef = useRef({
    query,
    sort,
    sel,
    minPrice,
    maxPrice,
    onlyPreorder,
    onlyDiscount,
    visibleCount,
  });
  stateRef.current = {
    query,
    sort,
    sel,
    minPrice,
    maxPrice,
    onlyPreorder,
    onlyDiscount,
    visibleCount,
  };

  // 1) Sayfa her görünür olduğunda (ilk açılış ya da geri dönüş):
  //    ürün sayfasından geldiysek durumu ve kaydırma konumunu geri yükle
  useEffect(() => {
    const saved = readSaved(paramsRef.current);
    if (!saved) return;

    restoringRef.current = true;
    setQuery(saved.query ?? "");
    setSort(saved.sort ?? "varsayilan");
    setSel(saved.sel ?? EMPTY);
    setMinPrice(saved.minPrice ?? "");
    setMaxPrice(saved.maxPrice ?? "");
    setOnlyPreorder(!!saved.onlyPreorder);
    setOnlyDiscount(!!saved.onlyDiscount);
    setVisibleCount(saved.visibleCount ?? PAGE_SIZE);

    // Ürünler çizilene kadar birkaç kez dene
    const y = saved.scrollY ?? 0;
    const timers = [0, 50, 150, 300, 600, 900].map((ms) =>
      setTimeout(() => window.scrollTo(0, y), ms)
    );
    const done = setTimeout(() => {
      restoringRef.current = false;
    }, 1000);

    // Kaydı biraz sonra sil (temizlenmez, böylece çift çalışmada da kaybolmaz)
    setTimeout(() => {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {}
    }, 1500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, []);

  // 2) Banner/menü linklerinden gelen filtreleri uygula
  useEffect(() => {
    if (lastParams.current === paramsString) return;
    lastParams.current = paramsString;
    if (readSaved(paramsString)) return; // geri dönüş, yukarıdaki efekt hallediyor

    const kategori = params.get("kategori");
    setSel(prune({ ...EMPTY, cats: kategori ? [kategori] : [] }));
    setOnlyDiscount(params.get("indirim") === "1");
    setOnlyPreorder(params.get("onsiparis") === "1");
    setQuery(params.get("ara") ?? "");
  }, [params, paramsString]);

  // 3) Filtre, arama ya da sıralama gerçekten değişince listeyi başa döndür
  const filterKey = JSON.stringify([
    query,
    sel,
    minPrice,
    maxPrice,
    onlyPreorder,
    onlyDiscount,
    sort,
  ]);
  useEffect(() => {
    if (prevFilterKey.current === filterKey) return;
    prevFilterKey.current = filterKey;
    if (restoringRef.current) return;
    setVisibleCount(PAGE_SIZE);
  }, [filterKey]);

  // Bir ürüne tıklanınca durumu ve kaydırma konumunu kaydet
  const handleListClick = (e: React.MouseEvent) => {
    const link = (e.target as HTMLElement).closest("a");
    const href = link?.getAttribute("href");
    if (href && href.startsWith("/urun/")) {
      try {
        const data: Saved = {
          ...stateRef.current,
          scrollY: window.scrollY,
          params: paramsRef.current,
          savedAt: Date.now(),
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {}
    }
  };

  const toggle = (key: Key, v: string) =>
    setSel((prev) => {
      const list = prev[key];
      const next = list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
      return prune({ ...prev, [key]: next });
    });

  const resetFilters = () => {
    setQuery("");
    setSort("varsayilan");
    setSel(EMPTY);
    setMinPrice("");
    setMaxPrice("");
    setOnlyPreorder(false);
    setOnlyDiscount(false);
  };

  const available = useMemo(
    () => ({
      cats: availableFor(sel, "cats"),
      brands: availableFor(sel, "brands"),
      series: availableFor(sel, "series"),
    }),
    [sel]
  );

  const filtered = useMemo(() => {
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    const q = normalize(query.trim());

    const list = products.filter(
      (p) =>
        (!q || normalize(`${p.name} ${p.series} ${p.category}`).includes(q)) &&
        matches(p, sel) &&
        p.price >= min &&
        p.price <= max &&
        (!onlyPreorder || p.preorder) &&
        (!onlyDiscount || !!p.oldPrice)
    );

    if (sort === "artan") list.sort((a, b) => a.price - b.price);
    if (sort === "azalan") list.sort((a, b) => b.price - a.price);
    return list;
  }, [query, sel, minPrice, maxPrice, onlyPreorder, onlyDiscount, sort]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-extrabold md:text-3xl">Tüm Ürünler</h1>

      {/* Arama kutusu */}
      <div className="relative mt-5">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Figür veya seri ara… (örn. Iron Man, Marvel)"
          className="w-full rounded-full border bg-gray-50 py-3 pl-11 pr-4 text-sm focus:border-purple-600 focus:bg-white focus:outline-none"
        />
      </div>

      {/* Üst çubuk */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">{filtered.length} ürün</p>
        <div className="flex gap-2">
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className="rounded-full border px-4 py-2 text-sm font-medium lg:hidden"
          >
            {filtersOpen ? "Filtreleri Gizle" : "Filtrele"}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border px-4 py-2 text-sm"
          >
            <option value="varsayilan">Sıralama: Varsayılan</option>
            <option value="artan">Fiyat: Düşükten yükseğe</option>
            <option value="azalan">Fiyat: Yüksekten düşüğe</option>
          </select>
        </div>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Filtre paneli */}
        <aside
          className={`${filtersOpen ? "block" : "hidden"} h-fit space-y-5 rounded-3xl border bg-gray-50/60 p-5 lg:block`}
        >
          <FilterGroup
            title="Kategori"
            options={ALL.cats}
            available={available.cats}
            values={sel.cats}
            onToggle={(v) => toggle("cats", v)}
          />
          <FilterGroup
            title="Marka"
            options={ALL.brands}
            available={available.brands}
            values={sel.brands}
            onToggle={(v) => toggle("brands", v)}
          />
          <FilterGroup
            title="Seri"
            options={ALL.series}
            available={available.series}
            values={sel.series}
            onToggle={(v) => toggle("series", v)}
          />

          <div>
            <p className="mb-2 text-sm font-bold">Fiyat (TL)</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                placeholder="En az"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-full border bg-white px-4 py-2 text-sm focus:border-purple-600 focus:outline-none"
              />
              <span>-</span>
              <input
                type="number"
                min={0}
                placeholder="En çok"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-full border bg-white px-4 py-2 text-sm focus:border-purple-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip
              label="Ön sipariş"
              active={onlyPreorder}
              onClick={() => setOnlyPreorder((v) => !v)}
            />
            <Chip
              label="İndirimli"
              active={onlyDiscount}
              onClick={() => setOnlyDiscount((v) => !v)}
            />
          </div>

          <button
            onClick={resetFilters}
            className="w-full rounded-full border border-purple-700 py-2 text-sm font-bold text-purple-700 hover:bg-purple-50"
          >
            Filtreleri Sıfırla
          </button>
        </aside>

        {/* Ürün listesi */}
        <div onClickCapture={handleListClick}>
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed p-12 text-center text-gray-500">
              Bu filtrelere uygun ürün bulunamadı.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {/* Daha fazla göster */}
              {remaining > 0 && (
                <div className="mt-8 text-center">
                  <p className="mb-3 text-sm text-gray-500">
                    {filtered.length} üründen {visible.length} tanesi gösteriliyor
                  </p>
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="rounded-full border-2 border-purple-700 px-8 py-3 font-bold text-purple-700 transition hover:bg-purple-700 hover:text-white"
                  >
                    Daha fazla göster ({Math.min(PAGE_SIZE, remaining)})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}