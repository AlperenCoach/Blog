# 📋 Sitede Eksik Olan Özellikler - Trello Kartları

## 🔴 Yüksek Öncelik (Kritik)

### 1. Backend API ve Veritabanı Entegrasyonu
- [x] Backend API kurulumu (Node.js/Express veya .NET) ✅ .NET 9.0 ile tamamlandı
- [x] Veritabanı bağlantısı (PostgreSQL, MongoDB veya SQLite) ✅ MongoDB ile tamamlandı
- [x] Blog yazıları için CRUD API endpoint'leri ✅ BlogController ile tamamlandı (GET, POST, PUT, DELETE)
- [x] Kullanıcı yönetimi için API endpoint'leri ✅ UserController ile tamamlandı (GET, POST, PUT, DELETE, PATCH)
- [x] API istekleri için axios veya fetch kullanımı ✅ Frontend'de api.js servis dosyası oluşturuldu (axios)

### 2. Kimlik Doğrulama (Authentication) Sistemi
- [ ] Login sayfası implementasyonu (login.jsx boş)
- [ ] Login route'u eklenmesi (/login)
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
- [ ] Dinamik blog yazıları listesi (şu an hardcoded)
- [ ] Blog yazısı detay sayfası (/post/:id route'u eksik)
- [ ] Blog yazılarını veritabanından çekme
- [ ] Blog yazısı oluşturma/güncelleme/silme
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
- [ ] useState ve useEffect hook'larının kullanımı

### 7. Hata Yönetimi ve Loading States
- [ ] Error boundary component'i
- [ ] Loading spinner/indicator'ları
- [ ] API hataları için error handling
- [ ] Kullanıcı dostu hata mesajları

### 8. Responsive Tasarım İyileştirmeleri
- [ ] Mobil uyumluluk testleri
- [ ] Tablet görünümü optimizasyonu
- [ ] Hamburger menü (mobil için)
- [ ] Touch-friendly butonlar ve linkler

## 🟢 Düşük Öncelik (İyileştirmeler)

### 9. SEO Optimizasyonu
- [ ] Meta tags eklenmesi (description, keywords, og:tags)
- [ ] Sitemap.xml oluşturulması
- [ ] robots.txt dosyası
- [ ] Structured data (JSON-LD) eklenmesi

### 10. Performans Optimizasyonu
- [ ] Image lazy loading
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
- [ ] Blog yazıları için kategori/filtreleme
- [ ] Yorum sistemi
- [ ] Like/favorite özelliği
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

- **Mevcut Durum**: Site temel yapıya sahip ancak tüm veriler hardcoded
- **En Kritik Eksikler**: Backend, Authentication, Form handling
- **Önerilen Sıralama**: Önce backend ve auth, sonra form handling, en son UI iyileştirmeleri


