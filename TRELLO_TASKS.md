# 📋 Sitede Eksik Olan Özellikler - Trello Kartları

## 🔴 Yüksek Öncelik (Kritik)

### 1. Backend API ve Veritabanı Entegrasyonu
- [x] Backend API kurulumu (Node.js/Express veya .NET) ✅ .NET 9.0 ile tamamlandı
- [x] Veritabanı bağlantısı (PostgreSQL, MongoDB veya SQLite) ✅ MongoDB ile tamamlandı
- [x] Blog yazıları için CRUD API endpoint'leri ✅ BlogController ile tamamlandı (GET, POST, PUT, DELETE)
- [x] Kullanıcı yönetimi için API endpoint'leri ✅ UserController ile tamamlandı (GET, POST, PUT, DELETE, PATCH)
- [x] API istekleri için axios veya fetch kullanımı ✅ Frontend'de api.js servis dosyası oluşturuldu (axios)

### 2. Kimlik Doğrulama (Authentication) Sistemi
- [x] Login sayfası implementasyonu ✅ login.jsx component'i oluşturuldu, form validasyonu eklendi
- [x] Login route'u eklenmesi (/login) ✅ Route eklendi
- [x] Signup sayfası implementasyonu ✅ signup.jsx component'i oluşturuldu, form state yönetimi eklendi
- [x] Signup route'u eklenmesi (/signup) ✅ Route eklendi
- [ ] JWT token yönetimi
- [ ] Kullanıcı oturum yönetimi (session management)
- [ ] Logout fonksiyonelliği (şu an sadece buton var)
- [ ] Protected routes (korunan sayfalar - örn: /write)

### 3. Form İşleme ve Veri Gönderimi
- [ ] Write sayfası form submit handler'ı
- [ ] Form validasyonu
- [ ] Form verilerinin API'ye gönderilmesi
- [ ] Başarılı/hata mesajları gösterimi
- [ ] Contact formu için backend entegrasyonu

### 4. Blog Yazıları Yönetimi
- [x] Dinamik blog yazıları listesi ✅ Posts component'i API'den veri çekiyor, hardcoded veriler kaldırıldı
- [x] Blog yazılarını veritabanından çekme ✅ getBlogs() API çağrısı ile MongoDB'den veri çekiliyor
- [x] Home sayfası layout güncellemesi ✅ Sidebar ve grid card layout eklendi
- [x] Blog card'larına resim desteği ✅ ImageUrl alanı eklendi, otomatik placeholder resim seçimi
- [x] "Latest posts" başlığı ve görünüm seçenekleri ✅ Grid/List görünüm toggle eklendi
- [x] Loading states ✅ Posts component'inde loading, error, empty state'ler eklendi
- [ ] Blog yazısı detay sayfası (/blog/:id route'u eksik)
- [ ] Blog yazısı oluşturma/güncelleme/silme (API hazır, UI eksik)
- [ ] Blog yazıları için pagination (sayfalama)

## 🟡 Orta Öncelik (Önemli)

### 5. Arama Fonksiyonelliği
- [ ] Arama butonu için fonksiyonellik (şu an sadece buton var)
- [ ] Arama modalı veya sayfası
- [ ] Blog yazılarında arama özelliği
- [ ] Arama sonuçları sayfası

### 6. State Yönetimi
- [ ] React Context API veya Redux/Zustand kurulumu
- [ ] Global state yönetimi (kullanıcı bilgileri, yazılar)
- [x] useState ve useEffect hook'larının kullanımı ✅ Posts, Login, Signup component'lerinde kullanılıyor

### 7. Hata Yönetimi ve Loading States
- [ ] Error boundary component'i
- [x] Loading spinner/indicator'ları ✅ Posts component'inde loading state gösterimi eklendi
- [x] API hataları için error handling ✅ Posts component'inde try-catch ve error state yönetimi
- [x] Kullanıcı dostu hata mesajları ✅ Error mesajları kullanıcıya gösteriliyor

### 8. Responsive Tasarım İyileştirmeleri
- [x] Mobil uyumluluk testleri ✅ CSS media queries ile responsive tasarım eklendi
- [x] Tablet görünümü optimizasyonu ✅ Posts, Sidebar, Home component'lerinde responsive breakpoint'ler
- [ ] Hamburger menü (mobil için)
- [x] Touch-friendly butonlar ve linkler ✅ Card'lar ve butonlar touch-friendly boyutlarda

## 🟢 Düşük Öncelik (İyileştirmeler)

### 9. SEO Optimizasyonu
- [ ] Meta tags eklenmesi (description, keywords, og:tags)
- [ ] Sitemap.xml oluşturulması
- [ ] robots.txt dosyası
- [ ] Structured data (JSON-LD) eklenmesi

### 10. Performans Optimizasyonu
- [x] Image lazy loading ✅ Blog card'larında loading="lazy" attribute eklendi
- [ ] Code splitting
- [ ] React.memo kullanımı (gerektiğinde)
- [ ] Bundle size optimizasyonu

### 11. Erişilebilirlik (Accessibility)
- [ ] ARIA label'ların tamamlanması
- [ ] Keyboard navigation desteği
- [ ] Screen reader uyumluluğu
- [ ] Renk kontrast oranları kontrolü

### 12. Güvenlik
- [ ] XSS koruması
- [ ] CSRF token'ları
- [ ] Input sanitization
- [ ] Rate limiting (API için)

### 13. Testler
- [ ] Unit testler (Jest + React Testing Library)
- [ ] Integration testler
- [ ] E2E testler (Cypress veya Playwright)

### 14. TypeScript Geçişi
- [ ] TypeScript kurulumu
- [ ] .jsx dosyalarının .tsx'e dönüştürülmesi
- [ ] Type tanımlamaları

### 15. Environment Variables
- [ ] .env dosyası oluşturulması
- [ ] API URL'lerinin environment variable olarak ayarlanması
- [ ] .env.example dosyası

### 16. Ek Özellikler
- [x] Blog yazıları için kategori/filtreleme ✅ Kategori otomatik tespit ediliyor ve gösteriliyor
- [ ] Yorum sistemi (UI'da gösteriliyor ama backend entegrasyonu yok)
- [x] Like/favorite özelliği ✅ UI'da like sayısı gösteriliyor (backend entegrasyonu eksik)
- [ ] Blog yazısı paylaşma (social media)
- [ ] RSS feed
- [ ] Dark mode toggle
- [ ] Dil desteği (i18n) - Türkçe/İngilizce

### 17. Dokümantasyon
- [ ] README.md güncellemesi (proje açıklaması, kurulum)
- [ ] API dokümantasyonu
- [ ] Component dokümantasyonu
- [ ] Deployment guide

### 18. CI/CD Pipeline
- [ ] GitHub Actions veya benzeri CI/CD kurulumu
- [ ] Otomatik test çalıştırma
- [ ] Otomatik build ve deploy

### 19. Analytics ve Monitoring
- [ ] Google Analytics veya benzeri entegrasyonu
- [ ] Error tracking (Sentry gibi)
- [ ] Performance monitoring

### 20. Code Quality
- [ ] Prettier kurulumu
- [ ] ESLint kurallarının genişletilmesi
- [ ] Pre-commit hooks (Husky)
- [ ] Code review checklist

---

## 📝 Notlar

- **Mevcut Durum**: 
  - ✅ Backend API ve MongoDB entegrasyonu tamamlandı
  - ✅ Blog yazıları API'den dinamik olarak çekiliyor
  - ✅ Home sayfası modern layout ile güncellendi (Sidebar + Grid card'lar)
  - ✅ Login/Signup sayfaları oluşturuldu
  - ✅ Blog card'larına resim desteği eklendi
  - ✅ "Latest posts" başlığı ve görünüm seçenekleri eklendi
  - ⚠️ Blog detay sayfası henüz oluşturulmadı
  - ⚠️ Authentication backend entegrasyonu eksik (JWT, session)
  - ⚠️ Form submit handler'ları eksik (Write, Contact)
  
- **En Kritik Eksikler**: 
  - Blog detay sayfası (/blog/:id route)
  - Authentication backend entegrasyonu (JWT token)
  - Form handling (Write, Contact)
  
- **Önerilen Sıralama**: 
  1. Blog detay sayfası oluşturma
  2. Authentication backend entegrasyonu
  3. Form handling (Write, Contact)
  4. Protected routes


