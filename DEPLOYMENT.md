# 🚀 cPanel Deployment Rehberi

Bu rehber, React/Vite projenizi cPanel File Manager üzerinden production'a deploy etmek için adım adım talimatlar içerir.

## 📋 Ön Hazırlık

### 1. Projeyi Build Etme

**Yerel bilgisayarınızda:**

```bash
cd myproject
npm install
npm run build
```

Bu komut `dist` klasörü oluşturur. Bu klasörün içeriği production'a deploy edilecek dosyalardır.

### 2. Build Çıktısını Kontrol Etme

Build işlemi tamamlandıktan sonra `dist` klasörünün içeriği şöyle olmalıdır:

```
dist/
├── index.html
├── favicon.png
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [diğer asset dosyaları]
└── [varsa diğer dosyalar]
```

---

## 📤 cPanel File Manager ile Deployment

### Adım 1: cPanel'e Giriş ve File Manager Açma

1. cPanel hesabınıza giriş yapın
2. **File Manager**'ı açın
3. Sol taraftaki dizin ağacından **`public_html`** klasörüne gidin

### Adım 2: Mevcut Dosyaları Yedekleme (Önemli!)

1. `public_html` içindeki mevcut dosyaları yedeklemek için:
   - Tüm dosya ve klasörleri seçin (Ctrl+A veya Cmd+A)
   - **Compress** butonuna tıklayın
   - **Zip Archive** seçin ve **Compress** butonuna tıklayın
   - Oluşan `.zip` dosyasını indirin veya `public_html` dışına taşıyın

### Adım 3: Eski Dosyaları Temizleme

1. `public_html` içindeki **tüm dosya ve klasörleri** seçin
2. **Delete** butonuna tıklayın
3. Onay verin

**⚠️ ÖNEMLİ:** Eğer `public_html` içinde `public`, `dist`, `build` gibi alt klasörler varsa, bunların içindeki dosyaları da kontrol edin. Muhtemelen eski build çıktıları burada olabilir.

### Adım 4: Build Çıktısını Yükleme

**Yöntem 1: File Manager Upload (Küçük Dosyalar İçin)**

1. Yerel bilgisayarınızda `dist` klasörünün içindeki **tüm dosya ve klasörleri** seçin
2. cPanel File Manager'da `public_html` klasörüne gidin
3. **Upload** butonuna tıklayın
4. Dosyaları sürükleyip bırakın veya **Select Files** ile seçin
5. Upload işleminin tamamlanmasını bekleyin

**Yöntem 2: ZIP Upload ve Extract (Büyük Dosyalar İçin - Önerilen)**

1. Yerel bilgisayarınızda `dist` klasörünün içeriğini bir ZIP dosyasına sıkıştırın
2. cPanel File Manager'da `public_html` klasörüne gidin
3. **Upload** butonuna tıklayın
4. ZIP dosyasını yükleyin
5. Yüklenen ZIP dosyasına sağ tıklayın ve **Extract** seçin
6. Extract işlemi tamamlandıktan sonra ZIP dosyasını silin

**Yöntem 3: FTP/SFTP (Büyük Projeler İçin)**

1. FileZilla veya benzeri bir FTP client kullanın
2. cPanel FTP bilgilerinizle bağlanın
3. `dist` klasörünün içeriğini `public_html` klasörüne yükleyin

### Adım 5: Dosya Yapısını Kontrol Etme

Upload işlemi tamamlandıktan sonra `public_html` klasörünün yapısı şöyle olmalıdır:

```
public_html/
├── index.html          ← Ana HTML dosyası (root'ta olmalı!)
├── favicon.png         ← Favicon (root'ta olmalı!)
├── assets/            ← JS, CSS ve diğer asset dosyaları
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [diğer dosyalar]
└── [varsa diğer dosyalar]
```

**⚠️ ÖNEMLİ KONTROLLER:**

- ✅ `index.html` dosyası **doğrudan `public_html` içinde** olmalı (alt klasörde değil!)
- ✅ `favicon.png` dosyası **doğrudan `public_html` içinde** olmalı
- ✅ `assets` klasörü **doğrudan `public_html` içinde** olmalı
- ❌ `public_html/dist/` gibi bir yapı **OLMAMALI** - dosyalar doğrudan `public_html` içinde olmalı

### Adım 6: Dosya İzinlerini Ayarlama

1. `public_html` klasörüne sağ tıklayın ve **Change Permissions** seçin
2. İzinleri **755** olarak ayarlayın (klasörler için)
3. `index.html` dosyasına sağ tıklayın ve **Change Permissions** seçin
4. İzinleri **644** olarak ayarlayın (dosyalar için)
5. `assets` klasörüne sağ tıklayın ve **Change Permissions** seçin
6. İzinleri **755** olarak ayarlayın
7. `assets` klasörünün içindeki tüm dosyalar için **644** izni verin

**İzin Özeti:**
- Klasörler: **755** (rwxr-xr-x)
- Dosyalar: **644** (rw-r--r--)

### Adım 7: .htaccess Dosyası Oluşturma (React Router İçin)

React Router kullanıldığı için, tüm route'ların `index.html`'e yönlendirilmesi gerekiyor.

1. `public_html` klasöründe **New File** butonuna tıklayın
2. Dosya adını **`.htaccess`** olarak girin
3. İçine şu kodu yapıştırın:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/x-javascript "access plus 1 month"
  ExpiresByType application/x-shockwave-flash "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresDefault "access plus 2 days"
</IfModule>
```

4. Dosyayı kaydedin
5. `.htaccess` dosyasının izinlerini **644** olarak ayarlayın

### Adım 8: Son Kontroller

1. **Tarayıcı Önbelleğini Temizleme:**
   - Tarayıcıda **Ctrl+Shift+Delete** (Windows) veya **Cmd+Shift+Delete** (Mac) ile önbelleği temizleyin
   - Veya **Ctrl+F5** (Windows) veya **Cmd+Shift+R** (Mac) ile hard refresh yapın

2. **Siteyi Test Etme:**
   - Ana sayfayı açın: `https://apidev.com`
   - Farklı route'ları test edin: `/blog`, `/about`, `/contact`
   - Browser Developer Tools (F12) açın ve **Console** sekmesinde hata olup olmadığını kontrol edin
   - **Network** sekmesinde dosyaların doğru yüklendiğini kontrol edin

3. **API Bağlantısını Kontrol Etme:**
   - `.env` dosyasındaki `VITE_API_BASE_URL` değerinin production API URL'sine işaret ettiğinden emin olun
   - Build işlemi sırasında environment variable'ların doğru şekilde enjekte edildiğini kontrol edin

---

## 🔧 Sorun Giderme

### Sorun 1: Boş Beyaz Sayfa Görünüyor

**Olası Nedenler:**
- `index.html` dosyası yanlış konumda (alt klasörde)
- JavaScript dosyaları yüklenemiyor
- API bağlantısı başarısız

**Çözüm:**
1. Browser Developer Tools (F12) açın
2. **Console** sekmesinde hataları kontrol edin
3. **Network** sekmesinde hangi dosyaların yüklenemediğini kontrol edin
4. Dosya yollarının doğru olduğundan emin olun (örneğin `/assets/index-xxx.js` gibi)

### Sorun 2: 404 Hatası (Route'lar Çalışmıyor)

**Olası Neden:**
- `.htaccess` dosyası eksik veya yanlış yapılandırılmış

**Çözüm:**
1. `.htaccess` dosyasının `public_html` içinde olduğundan emin olun
2. `.htaccess` dosyasının içeriğini yukarıdaki örnekle karşılaştırın
3. Apache mod_rewrite modülünün aktif olduğundan emin olun (cPanel'de kontrol edin)

### Sorun 3: CSS/JS Dosyaları Yüklenmiyor

**Olası Nedenler:**
- Dosya izinleri yanlış
- Dosya yolları yanlış

**Çözüm:**
1. Dosya izinlerini kontrol edin (dosyalar: 644, klasörler: 755)
2. Browser Developer Tools'da **Network** sekmesinde hangi dosyaların 404 verdiğini kontrol edin
3. Dosya yollarının `index.html` içinde doğru olduğundan emin olun

### Sorun 4: Favicon Görünmüyor

**Olası Neden:**
- `favicon.png` dosyası yanlış konumda

**Çözüm:**
1. `favicon.png` dosyasının `public_html` içinde olduğundan emin olun
2. `index.html` içindeki favicon path'ini kontrol edin (`/favicon.png` olmalı)

---

## 📝 Önemli Notlar

1. **Environment Variables:**
   - Production build için `.env.production` dosyası oluşturun
   - Build işlemi sırasında environment variable'lar enjekte edilir
   - Build sonrası değişiklik yapmak için yeniden build gerekir

2. **API URL:**
   - Production API URL'sini `.env.production` dosyasında tanımlayın:
     ```
     VITE_API_BASE_URL=https://api.apidev.com
     ```

3. **Build Optimizasyonu:**
   - Production build'de console.log'lar otomatik olarak kaldırılır
   - Dosyalar minify edilir ve optimize edilir
   - Code splitting ile vendor ve app kodları ayrı chunk'lara bölünür

4. **Güncelleme:**
   - Her güncellemede yeni build alın ve `public_html` içindeki dosyaları güncelleyin
   - Eski dosyaları silmeden önce yedek alın

---

## ✅ Deployment Checklist

- [ ] Proje build edildi (`npm run build`)
- [ ] `dist` klasörü oluşturuldu ve içeriği kontrol edildi
- [ ] Eski dosyalar yedeklendi
- [ ] `public_html` içindeki eski dosyalar temizlendi
- [ ] Build çıktısı `public_html`'e yüklendi
- [ ] Dosya yapısı doğru (index.html root'ta)
- [ ] Dosya izinleri ayarlandı (dosyalar: 644, klasörler: 755)
- [ ] `.htaccess` dosyası oluşturuldu ve yapılandırıldı
- [ ] Tarayıcı önbelleği temizlendi
- [ ] Site test edildi (ana sayfa, route'lar, API bağlantısı)
- [ ] Browser Developer Tools'da hata kontrol edildi

---

## 🎉 Başarılı Deployment!

Tüm adımları tamamladıktan sonra siteniz production'da çalışıyor olmalı. Herhangi bir sorunla karşılaşırsanız yukarıdaki sorun giderme bölümüne bakabilirsiniz.

