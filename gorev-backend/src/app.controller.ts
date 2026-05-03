import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
// İnterface tanımlıyoruz ki listede any kullanmak zorunda kalmayalım.
interface Degerlendirme {
  id: number;
  musteriIsmi: string;
  odaNumarasi: string;
  temizlikPuani: number;
  konforPuani: number;
  yemekPuani: number;
  girisTarihi: string;
  cikisTarihi: string;
}
@Controller()
export class AppController {
  // Sunucu kapanınca silinecek bir veritabanı.
  veritabani: Degerlendirme[] = [];
  @Post('kaydet')
  // Alttaki satır gelen veride ID dışında her şey olsun ama ID olmasın demek.
  yorumKaydet(@Body() gelenVeri: Omit<Degerlendirme, 'id'>) {
    const cakisiyorMu = this.veritabani.find(
      (eskiKayit) =>
        eskiKayit.odaNumarasi === gelenVeri.odaNumarasi &&
        eskiKayit.girisTarihi === gelenVeri.girisTarihi, // Yandaki satırda veritabanını gezip oda numarası ve giriş tarihine göre çakışma olup olmadığını kontrol etmek için.
    );
    if (cakisiyorMu) {
      return 'HATA!: Belirtilen tarih için bu oda zaten değerlendirilmiştir.';
    }
    // Bir oda için aynı tarihli başka bir kayıt bulamadı ise- Silme işlemi yapabilmek için gelen veriyi rastgele gizliyoruz.
    const yeniKayit: Degerlendirme = {
      id: Date.now(), // ID çakışmasını önlemek için zamanı kullanarak ID atıyoruz.
      ...gelenVeri,
    };
    this.veritabani.push(yeniKayit); // Gelen veriyi depoya ekleme işlemi.
    console.log(`SİSTEME YENİ KAYİT GİRİLDİ: ${yeniKayit.musteriIsmi}`);
    return 'Müşteri değerlendirmesi başariyla sisteme kaydedildi!'; // Vitrine gidicek mesaj.
  }
  @Get('listele') // Listeleme yapılacağı zaman verileri buradan çekeceğiz.
  yorumlariGetir() {
    return this.veritabani;
  }
  @Delete('sil/:id') // Kayıt silmek için.
  kayitSil(@Param('id') id: string) {
    const silinecekId = Number(id); // Gelen ID'yi sayıya çevirmek için.
    const yeniListe = this.veritabani.filter(
      (kayit) => kayit.id !== silinecekId, // Silinecek ID ile eşleşmeyenleri tutup eşleşeni silmek için.
    );
    if (yeniListe.length < this.veritabani.length) {
      this.veritabani = yeniListe; // Yeni oluşturulan listeyi asıl liste yerine geçirmek için.
      console.log(`${silinecekId} ID'li kayit silindi.`);
      return 'Kayit basariyla silindi!';
    } else {
      return 'HATA!: Silinecek kayit bulunamadi.';
    }
  }
}
