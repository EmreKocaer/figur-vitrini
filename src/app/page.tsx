import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";

const trust = [
  { icon: "🚚", title: "Hızlı Kargo", text: "Siparişin en kısa sürede yola çıkar" },
  { icon: "📦", title: "Sağlam Paketleme", text: "Figürlerin özenle korunarak gönderilir" },
  { icon: "✅", title: "Orijinal Ürün", text: "Tüm ürünlerimiz %100 orijinaldir" },
];

export default function Home() {
  return (
    <>
      {/* 1) Dönen büyük banner */}
                 <div className="mx-auto max-w-7xl px-4 pt-6">
        <div className="overflow-hidden rounded-2xl">
          <HeroSlider />
        </div>
      </div>

      {/* 2) Yan yana iki küçük banner */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-2 md:py-12">
        <Link
          href="/urunler?indirim=1"
          className="group rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 p-8 text-white transition hover:shadow-xl"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
            Fırsatları Kaçırma
          </p>
          <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">
            İndirimli Ürünler
          </h3>
          <p className="mt-2 text-sm text-white/90">
            Seçili figürlerde özel fiyatlar seni bekliyor.
          </p>
          <span className="mt-4 inline-block text-sm font-bold transition group-hover:translate-x-1">
            İndirimleri Gör →
          </span>
        </Link>

        <Link
          href="/urunler?onsiparis=1"
          className="group rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white transition hover:shadow-xl"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
            Yeni Gelenler
          </p>
          <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">
            Ön Sipariş Ürünler
          </h3>
          <p className="mt-2 text-sm text-white/90">
            Çıkmadan önce yerini ayırt, kaçıranlar için stok kalmayabilir.
          </p>
          <span className="mt-4 inline-block text-sm font-bold transition group-hover:translate-x-1">
            Ön Siparişleri Gör →
          </span>
        </Link>
      </section>

      {/* 3) Genel tanıtım + Alışverişe Başla */}
      <section className="bg-purple-50 px-4 py-14 text-center md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-extrabold md:text-4xl">
            Koleksiyonunu Tamamlayacak Her Şey Burada
          </h2>
          <p className="mt-4 text-gray-600">
            Aksiyon figürlerinden Funko Pop'lara, LEGO setlerinden nadir
            heykellere kadar tüm ürünlerimizi tek yerde keşfet. Serine ve
            kategorine göre filtrele, favorilerine ekle, sipariş için bize
            WhatsApp veya Instagram'dan ulaş.
          </p>
          <Link
            href="/urunler"
            className="mt-8 inline-block rounded-full bg-purple-700 px-8 py-3.5 font-bold text-white transition hover:scale-105 hover:bg-purple-800"
          >
            Alışverişe Başla
          </Link>
        </div>
      </section>

      {/* 4) En altta güven şeridi */}
      <section className="border-t">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3">
          {trust.map((t) => (
            <div key={t.title} className="text-center">
              <div className="text-3xl">{t.icon}</div>
              <h4 className="mt-2 font-bold">{t.title}</h4>
              <p className="mt-1 text-sm text-gray-500">{t.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}