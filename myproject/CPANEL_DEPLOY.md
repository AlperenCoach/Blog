# 🚀 cPanel Deployment - Hızlı Başlangıç

## ⚡ Hızlı Deployment (3 Adım)

### 1️⃣ Production Build Alın

```bash
cd myproject
npm install
npm run build:cpanel
```

Bu komut:
- Production build alır
- `.htaccess` dosyasını `dist` klasörüne kopyalar
- Build çıktısını hazırlar

### 2️⃣ Environment Variables Ayarlayın

**ÖNEMLİ:** Production API URL'inizi ayarlayın:

1. `.env.production` dosyası oluşturun:
```bash
cp .env.production.example .env.production
```

2. `.env.production` dosyasını düzenleyin:
```env
VITE_API_BASE_URL=https://api.apidev.com
VITE_GOOGLE_CLIENT_ID=your-production-client-id
```

3. Tekrar build alın:
```bash
npm run build:cpanel
```

### 3️⃣ cPanel'e Yükleyin

#### Yöntem 1: File Manager (Küçük Projeler)

1. cPanel → **File Manager** → `public_html` klasörüne gidin
2. **Eski dosyaları yedekleyin ve silin**
3. `myproject/dist/` klasörünün **içeriğini** seçin (klasörün kendisini değil!)
4. **Upload** butonuna tıklayın
5. Dosyaları yükleyin

**ÖNEMLİ:** `index.html` dosyası **doğrudan `public_html` içinde** olmalı!

#### Yöntem 2: ZIP Upload (Büyük Projeler)

1. `myproject/dist/` klasörünün içeriğini ZIP'e sıkıştırın
2. cPanel File Manager'da `public_html` klasörüne gidin
3. ZIP dosyasını yükleyin
4. ZIP'e sağ tıklayın → **Extract**
5. ZIP dosyasını silin

### 4️⃣ İzinleri Ayarlayın

cPanel File Manager'da:

- **Klasörler:** Sağ tık → **Change Permissions** → **755**
- **Dosyalar:** Sağ tık → **Change Permissions** → **644**

Özellikle kontrol edin:
- `public_html` klasörü: **755**
- `index.html` dosyası: **644**
- `assets` klasörü: **755**
- `.htaccess` dosyası: **644**

### 5️⃣ Test Edin

1. Tarayıcı önbelleğini temizleyin: **Ctrl+Shift+Delete**
2. Siteyi açın: `https://apidev.com`
3. Farklı sayfaları test edin: `/blog`, `/about`, `/contact`
4. Browser Developer Tools (F12) açın ve hataları kontrol edin

---

## 📋 Kontrol Listesi

- [ ] `.env.production` dosyası oluşturuldu ve API URL ayarlandı
- [ ] `npm run build:cpanel` komutu çalıştırıldı
- [ ] `dist` klasörü oluşturuldu
- [ ] `dist` içinde `index.html` var
- [ ] `dist` içinde `.htaccess` var
- [ ] Eski dosyalar yedeklendi
- [ ] `public_html` içindeki eski dosyalar temizlendi
- [ ] `dist` içeriği `public_html`'e yüklendi
- [ ] `index.html` doğrudan `public_html` içinde (alt klasörde değil!)
- [ ] Dosya izinleri ayarlandı (dosyalar: 644, klasörler: 755)
- [ ] Tarayıcı önbelleği temizlendi
- [ ] Site test edildi

---

## 🔧 Sorun Giderme

### Boş Beyaz Sayfa

**Neden:** JavaScript dosyaları yüklenemiyor veya API bağlantısı başarısız

**Çözüm:**
1. Browser Developer Tools (F12) açın
2. **Console** sekmesinde hataları kontrol edin
3. **Network** sekmesinde hangi dosyaların yüklenemediğini kontrol edin
4. `.env.production` dosyasındaki `VITE_API_BASE_URL` değerini kontrol edin

### 404 Hatası (Route'lar Çalışmıyor)

**Neden:** `.htaccess` dosyası eksik veya yanlış yapılandırılmış

**Çözüm:**
1. `.htaccess` dosyasının `public_html` içinde olduğundan emin olun
2. `.htaccess` dosyasının izinlerinin **644** olduğundan emin olun
3. Apache `mod_rewrite` modülünün aktif olduğundan emin olun

### API Bağlantı Hatası

**Neden:** Environment variable'lar build sırasında enjekte edilmemiş

**Çözüm:**
1. `.env.production` dosyasını kontrol edin
2. `VITE_API_BASE_URL` değerinin doğru olduğundan emin olun
3. Tekrar build alın: `npm run build:cpanel`

---

## 📝 Önemli Notlar

1. **Environment Variables:** Build işlemi sırasında enjekte edilir. Build sonrası değişiklik yapmak için yeniden build gerekir.

2. **API URL:** Production API URL'inizi mutlaka `.env.production` dosyasında tanımlayın.

3. **Google OAuth:** Production için Google Cloud Console'dan yeni bir OAuth client ID oluşturun ve `.env.production` dosyasına ekleyin.

4. **Güncelleme:** Her güncellemede yeni build alın ve `public_html` içindeki dosyaları güncelleyin.

---

## 🎉 Başarılı Deployment!

Tüm adımları tamamladıktan sonra siteniz production'da çalışıyor olmalı!

