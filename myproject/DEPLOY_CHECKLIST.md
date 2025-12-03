# ✅ cPanel Deployment Hızlı Kontrol Listesi

## 📦 Build Öncesi

- [ ] `npm install` çalıştırıldı
- [ ] `.env.production` dosyası oluşturuldu ve API URL'i ayarlandı
- [ ] Google OAuth Client ID production için ayarlandı

## 🔨 Build İşlemi

- [ ] `npm run build` komutu çalıştırıldı
- [ ] Build başarılı oldu (hata yok)
- [ ] `dist` klasörü oluşturuldu
- [ ] `dist` klasörü içinde `index.html` var
- [ ] `dist` klasörü içinde `assets` klasörü var
- [ ] `dist` klasörü içinde `favicon.png` var

## 📤 cPanel Upload

- [ ] Eski dosyalar yedeklendi
- [ ] `public_html` içindeki eski dosyalar temizlendi
- [ ] `dist` klasörünün **içeriği** `public_html`'e yüklendi
- [ ] `index.html` dosyası **doğrudan `public_html` içinde** (alt klasörde değil!)
- [ ] `favicon.png` dosyası **doğrudan `public_html` içinde**
- [ ] `assets` klasörü **doğrudan `public_html` içinde**

## 🔐 İzinler

- [ ] `public_html` klasörü: **755**
- [ ] `index.html` dosyası: **644**
- [ ] `favicon.png` dosyası: **644**
- [ ] `assets` klasörü: **755**
- [ ] `assets` içindeki tüm dosyalar: **644**

## ⚙️ Yapılandırma

- [ ] `.htaccess` dosyası `public_html` içinde oluşturuldu
- [ ] `.htaccess` dosyası izinleri: **644**

## 🧪 Test

- [ ] Tarayıcı önbelleği temizlendi (Ctrl+Shift+Delete)
- [ ] Ana sayfa açıldı: `https://apidev.com`
- [ ] `/blog` route'u çalışıyor
- [ ] `/about` route'u çalışıyor
- [ ] `/contact` route'u çalışıyor
- [ ] Browser Developer Tools (F12) açıldı
- [ ] Console'da hata yok
- [ ] Network sekmesinde dosyalar yüklendi (200 OK)
- [ ] API bağlantısı çalışıyor

## 🎉 Tamamlandı!

Tüm adımlar tamamlandıysa siteniz production'da çalışıyor! 🚀

