# ✅ cPanel Deployment Hazır!

## 🎉 Tüm Hazırlıklar Tamamlandı!

Projeniz cPanel'e yüklemeye hazır. Aşağıdaki adımları takip edin:

---

## 📦 Build Çıktısı

**Konum:** `myproject/dist/` klasörü

**İçerik:**
- ✅ `index.html` - Ana HTML dosyası
- ✅ `.htaccess` - React Router ve performans ayarları
- ✅ `favicon.png` - Site ikonu
- ✅ `assets/` - Tüm CSS, JS ve görsel dosyaları

---

## 🚀 cPanel'e Yükleme Adımları

### 1. cPanel File Manager'ı Açın
- cPanel hesabınıza giriş yapın
- **File Manager**'ı açın
- Sol taraftan **`public_html`** klasörüne gidin

### 2. Eski Dosyaları Yedekleyin ve Silin
- `public_html` içindeki tüm dosya ve klasörleri seçin
- **Compress** ile ZIP'e sıkıştırıp yedekleyin (isteğe bağlı)
- Eski dosyaları **Delete** ile silin

### 3. Yeni Dosyaları Yükleyin

**Yöntem 1: File Manager Upload (Küçük Projeler)**
1. Yerel bilgisayarınızda `myproject/dist/` klasörünün **içeriğini** seçin
   - ⚠️ **ÖNEMLİ:** `dist` klasörünün kendisini değil, **içeriğini** seçin!
2. cPanel File Manager'da **Upload** butonuna tıklayın
3. Dosyaları sürükleyip bırakın veya **Select Files** ile seçin

**Yöntem 2: ZIP Upload (Büyük Projeler - Önerilen)**
1. Yerel bilgisayarınızda `myproject/dist/` klasörünün **içeriğini** ZIP'e sıkıştırın
2. cPanel File Manager'da **Upload** butonuna tıklayın
3. ZIP dosyasını yükleyin
4. ZIP'e sağ tıklayın → **Extract**
5. ZIP dosyasını silin

### 4. Dosya Yapısını Kontrol Edin

`public_html` klasörünün yapısı şöyle olmalı:

```
public_html/
├── index.html          ← Root'ta olmalı!
├── .htaccess          ← Root'ta olmalı!
├── favicon.png        ← Root'ta olmalı!
└── assets/            ← Root'ta olmalı!
    ├── index-xxx.js
    ├── index-xxx.css
    └── [diğer dosyalar]
```

**⚠️ ÖNEMLİ:** 
- `index.html` **doğrudan `public_html` içinde** olmalı (alt klasörde değil!)
- `public_html/dist/` gibi bir yapı **OLMAMALI**

### 5. İzinleri Ayarlayın

cPanel File Manager'da:

1. **Klasörler için:**
   - `public_html` klasörüne sağ tık → **Change Permissions** → **755**
   - `assets` klasörüne sağ tık → **Change Permissions** → **755**

2. **Dosyalar için:**
   - `index.html` → Sağ tık → **Change Permissions** → **644**
   - `.htaccess` → Sağ tık → **Change Permissions** → **644**
   - `favicon.png` → Sağ tık → **Change Permissions** → **644**
   - `assets` içindeki tüm dosyalar → **644**

### 6. Test Edin

1. **Tarayıcı önbelleğini temizleyin:**
   - **Ctrl+Shift+Delete** (Windows) veya **Cmd+Shift+Delete** (Mac)
   - Veya **Ctrl+F5** ile hard refresh yapın

2. **Siteyi açın:**
   - Ana sayfa: `https://apidev.com`
   - Blog: `https://apidev.com/blog`
   - About: `https://apidev.com/about`
   - Contact: `https://apidev.com/contact`

3. **Hataları kontrol edin:**
   - Browser Developer Tools (F12) açın
   - **Console** sekmesinde hata var mı kontrol edin
   - **Network** sekmesinde dosyalar yüklendi mi kontrol edin

---

## ⚙️ Environment Variables (Opsiyonel)

Eğer production API URL'inizi değiştirmek isterseniz:

1. `myproject/.env.production` dosyasını düzenleyin:
```env
VITE_API_BASE_URL=https://api.apidev.com
VITE_GOOGLE_CLIENT_ID=your-production-client-id
```

2. Tekrar build alın:
```bash
cd myproject
npm run build
```

3. `dist` klasörünün içeriğini tekrar `public_html`'e yükleyin

---

## 🔧 Sorun Giderme

### Boş Beyaz Sayfa
- Browser Developer Tools (F12) açın
- Console'da hataları kontrol edin
- Network sekmesinde hangi dosyaların yüklenemediğini kontrol edin

### 404 Hatası (Route'lar Çalışmıyor)
- `.htaccess` dosyasının `public_html` içinde olduğundan emin olun
- `.htaccess` dosyasının izinlerinin **644** olduğundan emin olun

### API Bağlantı Hatası
- `.env.production` dosyasındaki `VITE_API_BASE_URL` değerini kontrol edin
- API sunucusunun çalıştığından emin olun

---

## ✅ Kontrol Listesi

- [ ] `dist` klasörü oluşturuldu
- [ ] `dist` içinde `index.html` var
- [ ] `dist` içinde `.htaccess` var
- [ ] `dist` içinde `favicon.png` var
- [ ] `dist` içinde `assets` klasörü var
- [ ] Eski dosyalar yedeklendi
- [ ] `public_html` içindeki eski dosyalar temizlendi
- [ ] `dist` içeriği `public_html`'e yüklendi
- [ ] `index.html` doğrudan `public_html` içinde (alt klasörde değil!)
- [ ] Dosya izinleri ayarlandı (dosyalar: 644, klasörler: 755)
- [ ] Tarayıcı önbelleği temizlendi
- [ ] Site test edildi

---

## 🎉 Başarılı Deployment!

Tüm adımları tamamladıktan sonra siteniz production'da çalışıyor olmalı!

**Sorun yaşarsanız:** `CPANEL_DEPLOY.md` dosyasındaki detaylı sorun giderme bölümüne bakın.

