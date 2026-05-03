"use client";
import { useState } from "react";
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
export default function Home(){ // Kullanıcıdan alinacak 7 farklı bilgi için 7 farklı hafıza.
  const [isim, setIsim] = useState("");
  const[oda, setOda]= useState("");
  const[temizlik, setTemizlik]= useState("");
  const[konfor, setKonfor]= useState("");
  const[yemek, setYemek]= useState("");
  const[giris, setGiris]= useState("");
  const[cikis, setCikis]= useState("");
  const [yorumListesi, setYorumListesi] = useState<Degerlendirme[]>([]); // 3000'den gelen liste burada tutulacak.
  const gonder = async () => {
    if (!isim || !oda || !temizlik || !konfor || !yemek || !giris || !cikis) { // Formda boş alan bırakılıp bırakılmadığını kontrol etmek için.
      alert("Hop! Lütfen tüm alanlari doldur.");
      return;
    }
    const odaNo = Number(oda); //Oda numarasının oteldeki oda numalarıyla aynı sayıda olmasını kontrol etmek için.
    if(odaNo < 1 || odaNo > 200){
      alert("HATA!: Otelimizde 1 ile 200 sayilari arasinda oda bulunmaktadir.");
      return;
    }
    const tPuan = Number(temizlik); // Verilecek puanların doğru aralıkta olup olmadığını kontrol etmek için.
    const kPuan = Number(konfor);
    const yPuan = Number(yemek);
    if(tPuan < 0 || tPuan > 10 || kPuan < 0 || kPuan > 10 || yPuan <0 || yPuan > 10) {
      alert("HATA!: Temizli, konfor ve yemek için verdiğiniz puanlar 0 ile 10 arasinda olmalidir.");
      return;
    }
    if (Number(temizlik) < 0 || Number(konfor) < 0 || Number(yemek) < 0) { // Puan değerlerinin pozitif girilip girilmediğini kontrol etmek için.
      alert("Hata: Puanlar negatif (-) olamaz!");
      return; 
    }
    const girisTarihiObj = new Date(giris); // Tarihleri karşılaştırabilmek için Date haline getiriyoruz.
    const cikisTarihiObj = new Date(cikis);
    const acilisTarihi = new Date("2005-12-06"); // Otelin açılış tarihini ve bugün ki tarihi sisteme tanıtmak için.
    const bugun = new Date();
    if (cikisTarihiObj <= girisTarihiObj) { // Tarihlerin karşılaştırmasını yapıp doğru tarih girildiğini kontrol etmek için.
      alert("Zaman makinesi henüz icat edilmedi! Çikis tarihi, girişten önce veya ayni gün olamaz.");
      return;
    }
    if(girisTarihiObj < acilisTarihi){ // Otel açılmadan önce olan bir tarih girilmek istenirse.
      alert("HATA!: Otelimiz 6 Aralik 2005 tarihinde hizmete girmistir.Daha eski bir tarih için değerlendirme yapilamaz.");
      return ;
    }
    if(cikisTarihiObj > bugun){ // Bugünden ileri bir tarih girilmek istenirse.
      alert("HATA!: Otelden cikis tarihi bugunden ileri bir tarih olamaz.");
      return;
    }
    const formatliIsim = isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase(); // CHAR kısmı ilk harfi büyütmek, SLİCE kısmı ilk harften sonrasını küçültmek için.
    const kargoPaketi = { // Her şey kontrol edildiyse onaylayıp JSON paketini hazırlar.
      musteriIsmi: formatliIsim, // Müşterinin isim giriş biçimini önemsemeyip düzeltilmiş ismi gönderiyoruz.
      odaNumarasi: oda,
      temizlikPuani: Number(temizlik),
      konforPuani: Number(konfor),
      yemekPuani: Number(yemek),
      girisTarihi: giris,
      cikisTarihi: cikis
    };
    const istek = await fetch("http://localhost:3000/kaydet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kargoPaketi),
    });
    alert(await istek.text());
    setIsim("");
    setOda("");
    setTemizlik("");
    setKonfor("");
    setYemek("");
    setGiris("");
    setCikis(""); // Başarılı kayıttan sonra formda doldurulan kısımları temizlemek için.
    };
    const listeyiGetir = async () => { 
      const istek = await fetch("http://localhost:3000/listele"); // Sisteme girilen veriyi 3000'den istiyor. 
      const veri = await istek.json(); // JSON'u liste halinde açmak için.
      setYorumListesi(veri); // yorumListesinin içine kalıcı olarak yazmak için.
    };
    const kayitSil = async (silinecekId: number) => { // Silinecek ID'yi alıp DELETE fonksiyonuna göndermek için.
      const istek = await fetch(`http://localhost:3000/sil/${silinecekId}`,{
        method: "DELETE",
      });
      const cevap = await istek.text();
      alert(cevap); 
      listeyiGetir();
    }
return (
    <main className="min-h-screen flex flex-col items-center p-10 font-sans text-black bg-[url('/otel-arkaplan.avif')] bg-cover bg-center bg-fixed bg-black/50 bg-blend-overlay">
      <h1 className="text-4xl font-bold text-white drop-shadow-xl mb-8 tracking-wide">Otel Değerlendirme Sistemi</h1>      
      {/* Form kısmı */}
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-96">
        <input type="text" value={isim} placeholder="Müşteri İsmi" className="border p-2 rounded" onChange={(e) => setIsim(e.target.value)} />
        <input type="number" value={oda} placeholder="Oda Numarasi (Örn: 104)" className="border p-2 rounded" onChange={(e) => setOda(e.target.value)} />       
        <hr className="my-2" />
        <p className="text-sm font-semibold text-gray-500">Puanlar (0-10 Arasi)</p>        
        <input type="number" value={temizlik} placeholder="Temizlik Puani" min="0" max="10" className="border p-2 rounded" onChange={(e) => setTemizlik(e.target.value)} />
        <input type="number" value={konfor} placeholder="Konfor Puani" min="0" max="10" className="border p-2 rounded" onChange={(e) => setKonfor(e.target.value)} />
        <input type="number" value={yemek} placeholder="Yemek Kalitesi Puani" min="0" max="10" className="border p-2 rounded" onChange={(e) => setYemek(e.target.value)} />
        <hr className="my-2" />
        <p className="text-sm font-semibold text-gray-500">Konaklama Tarihleri</p>
        <div className="flex justify-between items-center">
          <span className="text-sm">Giriş:</span>
          <input type="date" value={giris} className="border p-1 rounded text-sm w-2/3" onChange={(e) => setGiris(e.target.value)} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Çikiş:</span>
          <input type="date" value={cikis} className="border p-1 rounded text-sm w-2/3" onChange={(e) => setCikis(e.target.value)} />
        </div>
        <button onClick={gonder} className="bg-blue-600 text-white font-bold py-3 rounded mt-4 hover:bg-blue-700 transition-colors">
          Sisteme Kaydet
        </button>
      </div>
      {/* Listeleme ve silme ekranı*/}
      <div className="mt-12 w-full max-w-2xl flex flex-col items-center">
        <button onClick={listeyiGetir} className="bg-green-600 text-white font-bold py-3 px-8 rounded shadow-lg hover:bg-green-700 transition-all">
          Kayitli Yorumlari Getir
        </button>
        {/* Listeyi ekrana basma alanı */}
        <div className="w-full mt-6 flex flex-col gap-4">
          {yorumListesi.map((yorum) => (
            <div key={yorum.id} className="bg-white p-5 rounded-lg shadow border-l-4 border-green-500 flex flex-col gap-2 relative">             
              {/* Kırmızı sil butonu */}
              <button 
                onClick={() => kayitSil(yorum.id)} 
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold hover:bg-red-700 transition-colors"
              >
                Sil
              </button>
              <h3 className="font-bold text-xl text-gray-800">
                {yorum.musteriIsmi} <span className="text-sm font-normal text-gray-500">(Oda: {yorum.odaNumarasi})</span>
              </h3>             
              <div className="flex gap-4 text-sm text-gray-600 bg-gray-50 p-2 rounded w-max">
                <p>🧹 Temizlik: <b>{yorum.temizlikPuani}</b></p>
                <p>🛏️ Konfor: <b>{yorum.konforPuani}</b></p>
                <p>🍽️ Yemek: <b>{yorum.yemekPuani}</b></p>
              </div>
              <p className="text-xs text-gray-400 text-left mt-2">
                Tarih: {yorum.girisTarihi} / {yorum.cikisTarihi}
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </main>
  );
}