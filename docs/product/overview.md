# Vision Ekosistemi — Ürün Genel Bakışı

## Vizyon

Öğrencinin üniversite hayatındaki farklı ihtiyaçlarını tek ekosistemde birleştirmek.

- **Vision Hub** → profesyonel/akademik (fırsat, proje, şirket, kariyer, Academy)
- **Vision Social** → sosyal/topluluk (etkinlik, arkadaşlık, spor, kültür)

İki alan ayrı arayüz gibi görünür ama **ortak hesap, ortak profil, ortak backend** üzerinden çalışır.

## Ana Kullanıcı Akışı

1. `gateway` → kullanıcı Hub veya Social seçer
2. Ortak auth ile giriş
3. Ortak profil (üniversite, bölüm, şehir, ilgi alanları)
4. Hub tarafında: fırsat/proje/başvuru
5. Social tarafında: etkinlik keşfi/katılım/oluşturma
6. Faaliyetler ortak profile yansır

## Roller

| Rol | Yetki |
|-----|-------|
| Öğrenci | Kendi profili, başvuru, etkinlik oluşturma (onaylı) |
| Şirket | Şirket profili, fırsat/proje ilanı |
| Üniversite Temsilcisi | Üniversite etkinlikleri, temsilcilik |
| Yönetici | Merkezi moderasyon, tüm sistem |

## MVP Öncelikleri

Hub: kayıt → fırsatlar → proje → başvuru → şirket → academy → yönetim
Social: kayıt → etkinlik keşfi → detay/katılım → filtre → oluşturma/onay → takvim → moderasyon

## Etkinlik Onay Akışı

`Taslak → İnceleniyor → Onaylandı → Yayında`

Kaynak: `Vision_Ekosistemi_Vision_Hub_Vision_Social_Gelistirme_Dosyasi.docx` v1.0
