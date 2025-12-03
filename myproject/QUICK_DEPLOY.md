# ⚡ Hızlı cPanel Deployment

## 🚀 Tek Komutla Build

### Windows (PowerShell):
```powershell
cd myproject
npm install
npm run build
.\build-for-production.ps1
```

### Linux/Mac:
```bash
cd myproject
npm install
npm run build
npm run postbuild
```

## 📤 cPanel'e Yükleme

1. **`myproject/dist/`** klasörünün **içeriğini** seçin
2. cPanel File Manager → `public_html` klasörüne gidin
3. Eski dosyaları yedekleyin ve silin
4. Dosyaları yükleyin
5. İzinleri ayarlayın: **dosyalar=644, klasörler=755**

## ✅ Kontrol

- `index.html` → `public_html/index.html` (root'ta olmalı!)
- `.htaccess` → `public_html/.htaccess` (root'ta olmalı!)
- `assets/` → `public_html/assets/` (root'ta olmalı!)

**Detaylı rehber için:** `CPANEL_DEPLOY.md` dosyasına bakın.

