# ŞantiyeNets (SN)

ŞantiyeNets (SN), Windows odaklı, offline-first bir şantiye ERP uygulamasıdır. Yoğun ızgara ekranları, hızlı klavye kullanımı ve Excel/CSV toplu aktarım mantığı ile klasik Netsis benzeri iş akışına modern bir arayüz sağlar.

## Ön Koşullar

- Node.js 18+
- npm veya pnpm
- Windows üzerinde paketleme için Visual Studio Build Tools (native modüller için)

## Kurulum

```bash
npm install
```

## Geliştirme Modunda Çalıştırma

```bash
npm run dev
```

## Build / Paketleme

Önce renderer ve main build alınır:

```bash
npm run build
```

Windows paketleme için:

```bash
npm run package
```

> Not: `electron-builder` ayarları `package.json` içindeki `build` bölümünde tanımlıdır.

## Smoke Test Checklist

- Uygulama açılıyor mu?
- Cari oluşturuluyor mu?
- Şantiye oluşturuluyor mu?
- Hakediş oluşturuluyor mu?
- Transfer (Excel) şablonu indiriliyor ve Cariler import ediliyor mu?
- Raporlar CSV/XLSX olarak dışa aktarılıyor mu?

## Geliştirici Notları

- Uygulama veri tabanı `better-sqlite3` ile tek dosyada tutulur.
- Migrations klasörü `migrations/` altındadır ve versiyonlu SQL dosyaları içerir.
- Loglar `app.log` ve `transfer.log` dosyalarına yazılır.
- İlk açılışta demo veri seed edilir.
- Günlük otomatik yedekleme `userData/backups` altında tutulur (son 7 yedek).

## Dizim

```
src/
  main/       # Electron ana süreç
  preload/    # IPC köprüleri
  renderer/   # React arayüz
  shared/     # Paylaşılan hesaplama ve validasyonlar
migrations/
templates/
```
