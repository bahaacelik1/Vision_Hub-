import type { Post } from '../_components/post-card';

export const feed: Post[] = [
  {
    id: '1',
    author: { name: 'Elif Yılmaz', university: 'ODTÜ · Endüstri Tasarımı', verified: true },
    time: '2 sa',
    text: 'Yeni portfolyomu yayınladım! Ekipçe hazırladığımız sürdürülebilir kampüs uygulamasının UX süreçlerini paylaştım. Geri bildirimlere açığım 🎨',
    media: 'photo',
    likes: 342,
    comments: [
      { author: 'ahmet_kaya', text: 'Süper olmuş, bir de mobil için düşünmüşsünüz 👏' },
      { author: 'zeynep.d',   text: 'Renk paleti çok iyi!' },
      { author: 'can_o',      text: 'Nereden başladın bu alana?' },
    ],
  },
  {
    id: '2',
    author: { name: 'Vision Social', university: 'Resmi Hesap', verified: true },
    time: '4 sa',
    text: 'Bu hafta sonu Uludağ zirvesinde buluşuyoruz. Kontenjan hızla doluyor — kayıt için bio linki 🏔',
    media: 'event',
    eventBadge: {
      title: 'Sunset Hiking at Uludağ',
      date: 'Cts, 10 Ocak · 08:00 – 17:00',
      location: 'Uludağ National Park, Bursa',
    },
    likes: 1284,
    comments: [
      { author: 'furkan_er', text: 'Ekipmanları getirmek gerekiyor mu?' },
      { author: 'selin_u',   text: 'Ben kayıt oldum, görüşürüz herkese 🙌' },
    ],
  },
  {
    id: '3',
    author: { name: 'Ahmet Kaya', university: 'İTÜ · Makine Mühendisliği' },
    time: '6 sa',
    text: 'Öğrenci topluluğumuzla Formula 1 aracımızın CFD analizlerini bitirdik. 3 hafta önce başlayan yolculuk, ekipçe gecelik çalışmalarla nihayet meyvesini verdi. Bir sonraki aşamada üretime geçiyoruz — heyecanlıyım.',
    media: null,
    likes: 89,
    comments: [
      { author: 'elifyilmaz',   text: 'Emeğinize sağlık!' },
    ],
  },
  {
    id: '4',
    author: { name: 'Zeynep Demir', university: 'Bilkent · İşletme' },
    time: '8 sa',
    text: 'Startup Weekend Istanbul kayıtları açıldı 🚀 Aynı takımdayız?',
    media: 'photo',
    likes: 210,
    comments: [
      { author: 'kaan_dogan', text: 'Kesinlikle varım.' },
      { author: 'baha_c',     text: 'Beni de sayın!' },
    ],
  },
  {
    id: '5',
    author: { name: 'Can Öztürk', university: 'Koç · Ekonomi' },
    time: '12 sa',
    text: 'Kariyer önerileri hakkında geleceklere: LinkedIn profili kadar Vision Hub profili de artık öğrenci dünyasında ciddi ağırlık taşıyor. Projeler ve etkinlikler tek çatı altında...',
    media: null,
    likes: 421,
    comments: [
      { author: 'deniz_a', text: 'Katılıyorum, ekosistemin farkı belli oluyor.' },
      { author: 'furkan_er', text: 'Hub tarafında Academy içerikleri çok kaliteli.' },
      { author: 'selin_u', text: 'Aynı fikirdeyim!' },
      { author: 'ayşe_k',  text: 'Yazı için teşekkürler.' },
    ],
  },
];
