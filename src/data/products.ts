  export type GalleryImage = { src: string; scale?: number };
  export type Product = {
  id: number;
  name: string;
  series:string;
  category: string;
  price: number;
  oldPrice?: number;     // varsa indirimli demektir
  stock: number;         // 0 = tükendi
  preorder: boolean;
  deliveryDate?: string;
  image: string;         // kapak fotoğrafı
  images?: (string | GalleryImage)[]; // detay galerisi; boyut için { src: "...", scale: 1.2 } yazabilirsin
  description?: string;  // detay sayfası açıklaması
  imageScale?: number;   // fotoğraf boyutu: 1 = normal, 1.2 = %20 büyük, 0.9 = %10 küçük
  detailImageScale?:number;
  brand?:string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Thor vs. Thanos Funko Pop Moment",
    series: "Marvel",
    category: "Funko",
    brand:"Funko Pop",
    price:4500,
    oldPrice:5000,
    stock: 3,
    preorder: false,
    image: "/products/thorthanosfunko2.png",
    images: ["/products/thorthanosfunko2.png", "/products/thorthanosfunko.png"],
    description:
      "Marvel evreninin en epik karşılaşmalarından biri şimdi rafınızda hayat buluyor! Avengers: Infinity War filminin unutulmaz savaş sahnesini büyüleyici detaylarla yansıtan bu koleksiyonluk figür seti, Marvel tutkunları için kaçırılmayacak bir parça.",
    imageScale: 1,
  },
  {
    id: 2,
    name: "Shang Chi Marvel Legends",
    series: "Marvel",
    category: "Aksiyon Figürü",
    brand:"Hasbro",
    price: 3000,
    stock: 8,
    preorder: true,
    deliveryDate:"15 Kasım 2026",
    image: "/products/shangchilegends.webp",
    images:["/products/shangchilegends.webp","/products/shangchilegends2.webp"],
    description: "Marvel dünyasının usta dövüş sanatçısı Shang-Chi, Doomsday temalı özel detayları ve üstün eklem hareket kabiliyetiyle koleksiyonunuza güç katmaya geliyor",
    imageScale:0.9,
  },
  {
    id: 3,
    name: "Spiderman Iron Studios Heykel",
    series: "Marvel",
    category:"Heykel",
    brand:"Iron Studios",
    price: 16000,
    stock: 3,
    preorder: true,
    deliveryDate:"1 Aralık 2026",
    image:"/products/spidermanironstudios.webp",
    images:["/products/spidermanironstudios.webp","/products/spidermanironstudios2.webp"],
    description:"Marvel Evreni'nin efsanesi Spider-Man, Iron Studios'un büyüleyici 1/10 Art Scale heykeliyle koleksiyonunuza geliyor! El boyaması ince işçiliği, ikonik çizgi roman detayları ve dinamik sergileme duruşuyla Spider-Man hayranlarının ve koleksiyonerlerin vitrininde fark yaratacak özel bir parça."
  },
  {
    id: 4,
    name: "Doctor Doom LEGO Büst",
    series: "Marvel",
    category: "Yapı Seti",
    brand:"LEGO",
    price: 3000,
    stock: 10,
    preorder: false,
    image: "/products/doomlego.jpg",
    images:["/products/doomlego.jpg",{src:"/products/doomlego2.jpg",scale:0.8}],
    description: "Marvel evreninin en ikonik ve karanlık kötülerinden Doctor Doom, koleksiyonluk LEGO büst tasarımıyla hayat buluyor! Latveria hükümdarının meşhur zırhını ve efsanevi maskesini büyüleyici detaylarla sergilemenizi sağlayan bu set, hem LEGO tutkunları hem de Marvel hayranları için sergilenmeye değer mükemmel bir parça.",
    imageScale:1.1,
  },
  {
    id: 5,
    name: "Batman Funko Pop",
    series: "DC",
    category: "Funko",
    brand:"Funko Pop",
    price: 1500,
    oldPrice: 1800,
    stock: 12,
    preorder: false,
    image: "/products/batmanfunko.png",
    images:["/products/batmanfunko.png","/products/batmanfunko2.png"],
    description: "Gotham'ın koruyucusu Batman, sevimli Funko Pop tasarımıyla rafınıza renk katacak!",
  },
  {
    id: 6,
    name: "Obi-Wan Kenobi(Kyber Crystal) Funko Pop",
    series: "Star Wars",
    category: "Funko",
    brand:"Funko Pop",
    price: 7000,
    stock: 1,
    preorder:false,
    image: "/products/starwarsfunko.png",
    images:["/products/starwarsfunko.png","/products/starwarsfunko2.png"],
    description: "Tüm dünyada sadece 9.500 adetle sınırlı üretilen bu özel Obi-Wan Kenobi figürü, Star Wars koleksiyonunuza benzersiz bir değer katacak!",
  },
   {
    id: 7,
    name: "Toy Story Funko Pop 4'lü Paket",
    series: "Disney",
    category: "Funko",
    brand:"Funko Pop",
    price: 6000,
    stock: 5,
    preorder:false,
    image: "/products/toystroyfunko.png",
    imageScale:1.1,
    images:["/products/toystroyfunko.png","/products/toystoryfunko2.png"],
    description: "Sevilen Disney-Pixar klasiği Toy Story dünyasının unutulmaz karakterleri, bu özel 4'lü Funko Pop setiyle bir araya geliyor! Tüm ekibi tek pakette toplayan bu set, koleksiyonuna eğlenceli ve nostaljik bir dokunuş katmak isteyenler için mükemmel bir seçim.",
  },
  {
    id: 8,
    name: "Disney Castle LEGO",
    series: "Disney",
    category: "Yapı Seti",
    brand:"LEGO",
    price: 22000,
    oldPrice:26000,
    imageScale:1.1,
    stock: 4,
    preorder:false,
    image: "/products/disneylego.webp",
    images:["/products/disneylego.webp",{src:"/products/disneylego2.webp",scale:0.9}],
    description: "Disney dünyasının en ikonik simgesi olan görkemli şato, detaylı LEGO tasarımıyla masal diyarını odanıza taşıyor! Klasik Disney sahnelerine yapılan göndermeler ve özel minifigürleriyle hem LEGO hem de Disney hayranları için unutulmaz bir koleksiyon parçası.",
  },
  {
    id: 9,
    name: "Superman Mech vs. Lex Luthor LEGO",
    series: "DC",
    category: "Yapı Seti",
    brand:"LEGO",
    price: 650,
    imageScale:0.8,
    stock: 10,
    preorder:false,
    image: "/products/dclego.webp",
    images:["/products/dclego.webp",{src:"/products/dclego2.webp",scale:0.8}],
    description: "Superman’in devasa mekanik zırhı ile Lex Luthor’un güçlü savaş robotu arasındaki amansız mücadele odanızda yeniden canlanıyor! Aksiyon dolu savaş sahneleri oluşturabileceğiniz ve efsanevi rekabeti sergileyebileceğiniz harika bir DC Comics seti.",
  },
  {
    id: 10,
    name: "Chirrut Imwe LEGO",
    series: "Star Wars",
    category: "Yapı Seti",
    brand:"LEGO",
    price: 900,
    imageScale:1.1,
    stock: 12,
    preorder:false,
    image: "/products/starwarslego.webp",
    images:["/products/starwarslego.webp",{src:"/products/starwarslego2.webp",scale:0.8}],
    description: "Star Wars: Rogue One filminin gözü pek Kör Muhafızı Chirrut Îmwe, inşa edilebilir LEGO figürüyle galaktik mücadeleye katılıyor! Katlanır yaylı tüfeği, sağlam zırh yapısı ve hareketli eklemleriyle Star Wars koleksiyonunuza güç katacak harika bir parça.",
  },
  {
    id: 11,
    name: "Flash Iron Studios",
    series: "DC",
    category: "Heykel",
    brand:"Iron Studios",
    price: 42000,
    imageScale:1,
    stock: 4,
    preorder:false,
    image: "/products/dcironstudios.webp",
    images:["/products/dcironstudios.webp",{src:"/products/dcironstudios2.webp",scale:1}],
    description: "Çizgi roman dünyasının en hızlı kahramanı The Flash, Iron Studios’un göz alıcı el boyaması detaylarıyla koleksiyonunuza hız katıyor! İkonik kırmızı kostümü ve dinamik sergileme duruşuyla DC evreni tutkunlarının vitrininde mutlaka yer alması gereken özel bir parça.",
  },
  {
    id: 12,
    name: "Walt Disney & Mickey Mouse Iron Studios",
    series: "Disney",
    category: "Heykel",
    brand:"Iron Studios",
    price: 60000,
    imageScale:1,
    stock: 1,
    preorder:true,
    deliveryDate:"1 Ocak 2027",
    image: "/products/disneyironstudios.webp",
    images:["/products/disneyironstudios.webp",{src:"/products/disneyironstudios2.webp",scale:1}],
    description:"Sihirli Disney dünyasının yaratıcısı Walt Disney ve efsanevi karakteri Mickey Mouse, Iron Studios'un bu büyüleyici heykelinde bir araya geliyor! İnce detayları ve duygusal tasarımıyla Disney tarihinin en anlamlı anlarından birini ölümsüzleştiren, her koleksiyonerin sahip olmak isteyeceği özel bir parça.",

  },
  {
    id: 13,
    name: "Darth Vader Iron Studios",
    series: "Star Wars",
    category: "Heykel",
    brand:"Iron Studios",
    price: 11000,
    oldPrice:16000,
    imageScale:1,
    stock: 4,
    preorder:false,
    image: "/products/starwarsironstudios.webp",
    images:["/products/starwarsironstudios.webp",{src:"/products/starwarsironstudios2.webp",scale:1}],
    description:"Galaksinin en korkulan Sith Lordu Darth Vader, Iron Studios'un üstün işçiliği ve el boyaması detaylarıyla hayat buluyor! İkonik pelerin tasarımı ve heybetli duruşuyla Star Wars koleksiyonunuzun en göz alıcı ve karanlık parçası olmaya aday.",

  },
 {
    id: 14,
    name: "Robin(Damian Wayne) McFarlane Toys",
    series: "DC",
    category: "Aksiyon Figürü",
    brand:"McFarlane Toys",
    price: 2300,
    imageScale:1.2,
    stock: 7,
    preorder:false,
    image: "/products/dcaksiyonfiguru.png",
    images:["/products/dcaksiyonfiguru.png","/products/dcaksiyonfiguru2.jpg"],
    description:"Infinite Frontier serisinin bu nadir Platinum Edition (Chase) sürümü, Damian Wayne’in asi ve güçlü duruşunu koleksiyonunuza taşıyor! Özel renk detayları, yüksek eklem hareket kabiliyeti ve nadir bulunabilirliğiyle DC ve McFarlane koleksiyonerleri için gerçek bir hazine.",

  },
  {
    id: 15,
    name: "Stormtrooper Hasbro Aksiyon Figürü",
    series: "Star Wars",
    category: "Aksiyon Figürü",
    brand:"Hasbro",
    price: 3000,
    imageScale:1.2,
    stock: 6,
    preorder:false,
    image: "/products/starwarsaksiyonfiguru.jpg",
    images:["/products/starwarsaksiyonfiguru.jpg",{src:"/products/starwarsaksiyonfiguru2.jpg",scale:1}],
    description:"Galaktik İmparatorluk'un disiplinli ordusu Stormtrooper, Hasbro'nun detaylı The Black Series kalitesiyle koleksiyonunuza katılıyor! Yüksek eklem hareket kabiliyeti, ikonik beyaz zırhı ve blaster aksesuarıyla Star Wars hayranlarının vitrininde mutlaka bulunması gereken bir klasiktir.",

  },
  {
    id: 16,
    name: "Toy Story Jessie Aksiyon Figürü",
    series: "Disney",
    category: "Aksiyon Figürü",
    brand:"Mattel",
    price: 1850,
    oldPrice:2000,
    imageScale:1,
    stock: 5,
    preorder:false,
    image: "/products/disneyaksiyonfigur.avif",
    images:["/products/disneyaksiyonfigur.avif",{src:"/products/disneyaksiyonfigur2.avif",scale:1}],
    description:"Toy Story dünyasının cesur ve enerjik kovboy kızı Jessie, interaktif özellikleriyle macerayı odanıza taşıyor! Filmden ikonik ifadeleri ve diğer Interactables figürleriyle konuşabilme özelliğiyle Disney-Pixar koleksiyonunuza neşe katacak harika bir parça.",

  },
   {
    id: 17,
    name: "Minnie Mouse Bitty Pop 4'iü Paket",
    series: "Disney",
    category: "Funko",
    brand:"Bitty Pop",
    price: 1000,
    imageScale:1,
    stock: 2,
    preorder:false,
    image: "/products/disneybittypop.jpg",
    images:["/products/disneybittypop.jpg","/products/disneybittypop2.jpg"],
    description:"Disney’in sevimli ikonu Minnie Mouse ve arkadaşları, minyatür Bitty Pop boyutunda koleksiyonunuza geliyor! Özel sergileme kutusu içinde gelen bu 4'lü sette, 3 belirgin figürün yanı sıra keşfedilmeyi bekleyen 1 adet gizemli sürpriz figür yer alıyor. Mikro boyuttaki detaylarıyla Disney tutkunları için oldukça eğlenceli ve koleksiyonluk bir parça!",

  },
  {
    id: 18,
    name: "Doctor Strange Diamond Select",
    series: "Marvel",
    category: "Heykel",
    brand:"Diamond Select",
    price: 3250,
    imageScale:0.8,
    stock: 2,
    preorder:false,
    image: "/products/marveldst.jpg",
    images:["/products/marveldst.jpg","/products/marveldst2.jpg"],
    description:"Doctor Strange in the Multiverse of Madness filminden ilham alan bu büyüleyici Diamond Select Marvel Gallery heykeli, Yüce Büyücü'nün gizemli ve güçlü atmosferini odanıza taşıyor! Detaylı pelerin işçiliği, büyü efektleri ve dinamik sergileme kaidesiyle Marvel heykelleri arasında öne çıkan koleksiyonluk bir parça.",
  },

]
// Yardımcı fonksiyonlar (dokunma)
export const discountPercent = (p: Product) =>
  p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

export const isLowStock = (p: Product) => p.stock > 0 && p.stock <= 3;

export const getImages = (p: Product): GalleryImage[] => {
  const list = p.images && p.images.length > 0 ? p.images : [p.image];
  return list.map((i) => (typeof i === "string" ? { src: i } : i));
};
export const deliveryText = (p: Product) =>
  p.deliveryDate ?? "Yakında açıklanacak";

// Benzer ürünler: aynı seri en önemli, sonra marka, sonra kategori
export const getSimilar = (p: Product, limit = 4) =>
  products
    .filter((x) => x.id !== p.id)
    .map((x) => ({
      product: x,
      score:
        (x.series === p.series ? 2 : 0) +
        (x.category === p.category ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.product);