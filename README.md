# 🏨 Otel Değerlendirme Sistemi (Full-Stack)

Bu proje, bir otel işletmesi için müşterilerin konaklama deneyimlerini puanlayabildiği ve yorum bırakabildiği tam kapsamlı bir web uygulamasıdır. Hem backend hem de frontend mimarisi modern teknolojiler kullanılarak geliştirilmiştir.

## 🚀 Kullanılan Teknolojiler

*   **Frontend:** [Next.js](https://nextjs.org/) (TypeScript, Tailwind CSS, React Hooks)
*   **Backend:** [NestJS](https://nestjs.com/) (Node.js framework)
*   **İletişim:** REST API (JSON)

## ✨ Öne Çıkan Özellikler

*   **Akıllı Form Kontrolleri:** Puanlama aralıkları (0-10), oda numarası kısıtlamaları ve tarih mantığı (geçmişe veya geleceğe dönük hatalı giriş engelleme) gibi kapsamlı doğrulamalar içerir.
*   **Veri Hijyeni:** Müşteri isimlerini otomatik olarak formatlar (Baş harf büyük, diğerleri küçük).
*   **CRUD İşlemleri:** Yeni değerlendirme kaydetme, tüm kayıtları listeleme ve spesifik kayıtları silebilme özellikleri mevcuttur.
*   **Çakışma Engelleme:** Aynı oda için aynı tarihte birden fazla değerlendirme yapılmasını backend tarafında engeller.

## 🛠️ Kurulum ve Çalıştırma

Projenin yerelde çalıştırılması için:

1. Bu depoyu klonlayın: `git clone https://github.com/NahitAyhan/Otel-Degerlendirme-Sistemi.git`
2. **Backend için:** `cd gorev-backend` -> `npm install` -> `npm run start`
3. **Frontend için:** `cd gorev-frontend` -> `npm install` -> `npm run dev`
4. Tarayıcıda `http://localhost:3000` (veya Next.js'in verdiği port) adresine gidin.

---
**Geliştiren:** [Nahit Erkam Ayhan](https://github.com/NahitAyhan)  
*Bilgisayar Mühendisliği Öğrencisi | Karabük Üniversitesi*
