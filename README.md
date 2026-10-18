# Figür Vitrini

🔗 **Canlı demo:** [figur-vitrini-theta.vercel.app](https://figur-vitrini-theta.vercel.app/)

**EN:** A responsive collectible figure store front-end built with Next.js, TypeScript and Tailwind CSS. It features a swipeable hero banner, multi-select filtering, search, a cart with stock limits, favorites, product detail pages with image galleries, dark mode support and a WhatsApp/Instagram checkout flow. This is a portfolio project; no real sales are made.

---

## Hakkında

Figür Vitrini; aksiyon figürleri, Funko Pop ve heykel gibi koleksiyon ürünleri satan bir mağaza sitesidir. Sipariş ödeme sistemi yerine müşteriyi **WhatsApp** veya **Instagram**'a yönlendirir. Bu proje bir **portfolyo çalışmasıdır**, gerçek satış yapılmamaktadır.

<!--
Ekran görüntülerini projeye ekledikten sonra bu satırların başındaki ve sonundaki yorum işaretlerini kaldır:

![Ana sayfa](docs/ana-sayfa.png)
![Ürünler](docs/urunler.png)
![Ürün detayı](docs/urun-detay.png)
![Sepet](docs/sepet.png)
-->

## Özellikler

**Ana sayfa**
- Kapatılabilir duyuru şeridi (ücretsiz kargo bilgisi)
- Otomatik dönen büyük banner: parmakla/fareyle sürükleme, oklar ve nokta göstergeleri
- İndirimli ve ön sipariş ürünlere yönlendiren kampanya alanları

**Ürün listeleme**
- Kategori, marka ve seri filtreleri: çoklu seçim, birbirine göre daralan seçenekler (uyumsuz seçenekler devre dışı kalır)
- Fiyat aralığı, "ön sipariş" ve "indirimli" filtreleri, filtreleri sıfırlama
- Arama (Türkçe karakter ve büyük/küçük harf duyarsız) ve fiyata göre sıralama
- "Daha fazla göster" ile kademeli listeleme
- Ürün detayından geri dönünce filtrelerin ve kaydırma konumunun korunması
- İndirim yüzdesi, ön sipariş, "son N ürün" ve tükendi etiketleri

**Ürün detay sayfası**
- Sürüklenebilir görsel galerisi, küçük resimler, her görsel için ayrı boyut ayarı
- Açıklama, stok bilgisi, ön sipariş ürünlerde tahmini teslimat tarihi
- Seri ve kategoriye göre benzer ürünler

**Sepet ve favoriler**
- Sepet paneli: adet ayarı, stoktan fazla ürün eklenemez, ücretsiz kargo ilerleme çubuğu
- Sepet ve favoriler sayfa yenilense de `localStorage` ile saklanır
- Siparişi hazır mesajla WhatsApp'a gönderme, Instagram için mesajı kopyalayıp yönlendirme

**Genel**
- Tüm cihazlara uyumlu (responsive) tasarım
- Açık ve koyu tema desteği
- "Biz Kimiz" sayfası

## Kullanılan teknolojiler

- [Next.js](https://nextjs.org/) (App Router) ve React
- TypeScript
- Tailwind CSS
- Durum yönetimi: React Context + `localStorage`
- Barındırma: Vercel

## Yerel ortamda çalıştırma

```bash
git clone https://github.com/EmreKocaer/figur-vitrini.git
cd figur-vitrini
npm install
npm run dev
```

Ardından tarayıcıda `http://localhost:3000` adresini aç.

## Proje yapısı

```
src/
├── app/             # Sayfalar (ana sayfa, ürünler, ürün detay, favoriler, biz kimiz)
├── components/      # Header, banner, ürün kartı, sepet paneli vb.
├── context/         # Sepet ve favori durumu (StoreContext)
└── data/
    ├── products.ts  # Ürün verileri
    └── config.ts    # WhatsApp, Instagram ve kargo ayarları
public/
└── products/        # Ürün görselleri
```

## Ürün ekleme

Ürünler `src/data/products.ts` dosyasında tutulur. Yeni ürün eklemek için diziye bir kayıt eklemek yeterlidir; kategori, marka ve seri filtreleri bu verilerden otomatik oluşur.

```ts
{
  id: 7,
  name: "Örnek Figür",
  series: "Marvel",
  brand: "Hot Toys",
  category: "Aksiyon Figürü",
  price: 1299,
  oldPrice: 1599,          // varsa indirimli sayılır
  stock: 5,
  preorder: false,
  image: "/products/ornek.jpg",
}
```

## Yapılandırma

WhatsApp numarası ve Instagram kullanıcı adı `src/data/config.ts` içinde örnek değerlerle durur. Gerçek bir mağaza için bu değerleri kendi bilgilerinle değiştir.

## Yapılacaklar

- [ ] Ürünleri bir veritabanına taşıma (Supabase)
- [ ] Ürün, stok ve görsel yönetimi için admin paneli
- [ ] Yönetici girişi

## Not

Bu proje eğitim ve portfolyo amaçlıdır. Sitede kullanılan ürün adları ve markalar yalnızca örnek içeriktir, ilgili marka sahiplerinin onayını ya da ortaklığını göstermez.