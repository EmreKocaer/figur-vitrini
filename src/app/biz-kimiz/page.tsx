import Link from "next/link";
import {
  WHATSAPP_NUMBER,
  INSTAGRAM_USERNAME,
  INSTAGRAM_DIRECT_DM,
} from "@/data/config";

const values = [
  { icon: "✅", title: "Orijinal Ürün", text: "Sattığımız her figür %100 orijinaldir." },
  { icon: "📦", title: "Sağlam Paketleme", text: "Ürünlerin hasarsız ulaşması için özenle paketliyoruz." },
  { icon: "💜", title: "Koleksiyoner Ruhu", text: "Biz de bu işin meraklısıyız, ne aradığını biliyoruz." },
];

const instagramUsername = INSTAGRAM_USERNAME.replace("@", "").trim();
const instagramUrl = INSTAGRAM_DIRECT_DM
  ? `https://ig.me/m/${instagramUsername}`
  : `https://www.instagram.com/${instagramUsername}/`;

export default function AboutPage() {
  return (
    <>
      {/* Üst bölüm */}
      <section className="bg-gradient-to-br from-purple-800 to-indigo-700 px-4 py-14 text-center text-white md:py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-extrabold md:text-5xl">Biz Kimiz?</h1>
          <p className="mt-4 text-white/90">
            Figür Vitrini, koleksiyon tutkunları için kurulmuş bir figür
            mağazasıdır.
          </p>
        </div>
      </section>

      {/* Hikaye (kendi hikayenle değiştir) */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-extrabold">Hikayemiz</h2>
        <div className="mt-4 space-y-4 text-gray-600">
          <p>
              Koleksiyon tutkusuyla yola çıkan bir ekip olarak; Marvel, DC, Star Wars, Disney ve popüler kültür dünyasının en sevilen karakterlerini sizlerle buluşturuyoruz.  Amacımız, sadece bir alışveriş platformu olmak değil; figür, büst ve heykel tutkunlarının aradığı nadir ve kaliteli parçaları güvenle temin edebileceği bir buluşma noktası yaratmaktır.  Orijinal ürün garantisi, özenli paketleme ve koleksiyoner hassasiyetiyle hazırladığımız süreçlerimiz sayesinde, tutkunuzu paylaşıyor ve vitrininizi zenginleştirmek için çalışıyoruz.  Hayalinizdeki parçayı keşfetmeye ve koleksiyonunuzu büyütmeye hoş geldiniz!
          </p>
          <p>
            “Bu site bir portfolyo projesidir, gerçek satış yapılmamaktadır”
          </p>
        </div>
      </section>

      {/* Değerler */}
      <section className="border-t bg-purple-50/50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl bg-white p-6 text-center shadow-sm">
              <div className="text-3xl">{v.icon}</div>
              <h3 className="mt-2 font-bold">{v.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* İletişim */}
      <section className="px-4 py-14 text-center">
        <h2 className="text-2xl font-extrabold">Bize Ulaş</h2>
        <p className="mt-2 text-gray-600">
          Soruların ya da özel istek ürünlerin için yaz, hemen dönelim.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full bg-green-600 px-8 py-3 font-bold text-white hover:bg-green-700 sm:w-auto"
          >
            WhatsApp
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-8 py-3 font-bold text-white hover:opacity-90 sm:w-auto"
          >
            Instagram
          </a>
        </div>
        <Link href="/urunler" className="mt-8 inline-block font-bold text-purple-700 hover:underline">
          Ürünlere göz at →
        </Link>
      </section>
    </>
  );
}