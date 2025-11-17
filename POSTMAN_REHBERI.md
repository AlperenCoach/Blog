# 📮 Postman ile API Kullanım Rehberi

Bu rehber, mevcut .NET API'nizi Postman ile nasıl test edeceğinizi adım adım açıklar.

## 🚀 Başlangıç

### 1. Postman Kurulumu
- Postman'i [postman.com](https://www.postman.com/downloads/) adresinden indirin ve kurun
- Ücretsiz hesap oluşturun (isteğe bağlı, ancak önerilir)

### 2. API'nizi Başlatın
API'nizin çalıştığından emin olun:
```bash
cd API
dotnet run
```

API şu adreste çalışıyor: **http://localhost:5065**

### 3. Swagger UI (Alternatif)
Geliştirme ortamında Swagger UI'yi de kullanabilirsiniz:
**http://localhost:5065/swagger**

---

## 📋 API Endpoint'leri

### Base URL
```
http://localhost:5065/api
```

---

## 📝 BLOG API İstekleri

### 1. Tüm Blogları Getir (GET)

**Endpoint:** `GET http://localhost:5065/api/blog`

**Postman'de Nasıl Yapılır:**
1. Postman'i açın
2. "New" butonuna tıklayın → "HTTP Request" seçin
3. Method: **GET** seçin
4. URL kutusuna şunu yazın: `http://localhost:5065/api/blog`
5. "Send" butonuna tıklayın

**Beklenen Yanıt:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "title": "Blog Başlığı",
    "content": "Blog içeriği...",
    "author": "Yazar Adı",
    "imageUrl": "https://example.com/image.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### 2. Tek Blog Getir (GET)

**Endpoint:** `GET http://localhost:5065/api/blog/{id}`

**Postman'de Nasıl Yapılır:**
1. Method: **GET**
2. URL: `http://localhost:5065/api/blog/507f1f77bcf86cd799439011`
   - `507f1f77bcf86cd799439011` yerine gerçek blog ID'sini yazın

**Örnek:**
```
GET http://localhost:5065/api/blog/507f1f77bcf86cd799439011
```

---

### 3. Yeni Blog Oluştur (POST)

**Endpoint:** `POST http://localhost:5065/api/blog`

**Postman'de Nasıl Yapılır:**
1. Method: **POST** seçin
2. URL: `http://localhost:5065/api/blog`
3. **Headers** sekmesine gidin:
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body** sekmesine gidin:
   - "raw" seçeneğini işaretleyin
   - Sağdaki dropdown'dan **JSON** seçin
   - Aşağıdaki JSON'u yapıştırın:

```json
{
  "title": "Yeni Blog Yazısı",
  "content": "Bu blog yazısının içeriği burada yer alacak. Detaylı açıklamalar ve bilgiler...",
  "author": "Ahmet Yılmaz",
  "imageUrl": "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
}
```

5. "Send" butonuna tıklayın

**Beklenen Yanıt (201 Created):**
```json
{
  "id": "507f1f77bcf86cd799439012",
  "title": "Yeni Blog Yazısı",
  "content": "Bu blog yazısının içeriği burada yer alacak...",
  "author": "Ahmet Yılmaz",
  "imageUrl": "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

### 4. Blog Güncelle (PUT)

**Endpoint:** `PUT http://localhost:5065/api/blog/{id}`

**Postman'de Nasıl Yapılır:**
1. Method: **PUT** seçin
2. URL: `http://localhost:5065/api/blog/507f1f77bcf86cd799439011`
3. **Headers** sekmesi:
   - `Content-Type: application/json`
4. **Body** sekmesi (raw, JSON):
```json
{
  "title": "Güncellenmiş Blog Başlığı",
  "content": "Güncellenmiş içerik...",
  "author": "Ahmet Yılmaz",
  "imageUrl": "https://example.com/new-image.jpg"
}
```

**Beklenen Yanıt:** 204 No Content (başarılı)

---

### 5. Blog Sil (DELETE)

**Endpoint:** `DELETE http://localhost:5065/api/blog/{id}`

**Postman'de Nasıl Yapılır:**
1. Method: **DELETE** seçin
2. URL: `http://localhost:5065/api/blog/507f1f77bcf86cd799439011`
3. "Send" butonuna tıklayın

**Beklenen Yanıt:** 204 No Content (başarılı)

---

## 👤 USER API İstekleri

### 1. Tüm Kullanıcıları Getir (GET)

**Endpoint:** `GET http://localhost:5065/api/user`

**Postman'de:**
- Method: **GET**
- URL: `http://localhost:5065/api/user`

**Not:** Şifreler yanıtta gösterilmez (güvenlik için)

---

### 2. Tek Kullanıcı Getir (GET)

**Endpoint:** `GET http://localhost:5065/api/user/{id}`

**Örnek:**
```
GET http://localhost:5065/api/user/507f1f77bcf86cd799439011
```

---

### 3. Email ile Kullanıcı Getir (GET)

**Endpoint:** `GET http://localhost:5065/api/user/email/{email}`

**Örnek:**
```
GET http://localhost:5065/api/user/email/ahmet@example.com
```

---

### 4. Yeni Kullanıcı Oluştur (POST)

**Endpoint:** `POST http://localhost:5065/api/user`

**Postman'de:**
1. Method: **POST**
2. URL: `http://localhost:5065/api/user`
3. Headers: `Content-Type: application/json`
4. Body (raw, JSON):
```json
{
  "username": "ahmetyilmaz",
  "email": "ahmet@example.com",
  "password": "güvenliŞifre123",
  "fullName": "Ahmet Yılmaz",
  "profilePicture": "https://example.com/profile.jpg"
}
```

**Önemli Notlar:**
- Email ve username benzersiz olmalı
- Şifre response'da gösterilmez
- `isActive` otomatik olarak `true` olarak ayarlanır

---

### 5. Kullanıcı Güncelle (PUT)

**Endpoint:** `PUT http://localhost:5065/api/user/{id}`

**Body Örneği:**
```json
{
  "username": "ahmetyilmaz",
  "email": "ahmet@example.com",
  "password": "yeniŞifre123",
  "fullName": "Ahmet Yılmaz",
  "profilePicture": "https://example.com/new-profile.jpg"
}
```

**Not:** Şifre boş bırakılırsa, eski şifre korunur.

---

### 6. Kullanıcı Sil (DELETE)

**Endpoint:** `DELETE http://localhost:5065/api/user/{id}`

---

### 7. Kullanıcı Aktif/Pasif Yap (PATCH)

**Endpoint:** `PATCH http://localhost:5065/api/user/{id}/activate`

**Postman'de:**
1. Method: **PATCH**
2. URL: `http://localhost:5065/api/user/507f1f77bcf86cd799439011/activate`
3. Body gerekmez

**Beklenen Yanıt:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "isActive": false
}
```

---

## 🎯 Postman İpuçları ve İleri Seviye Kullanım

### 1. Collection Oluşturma
Tüm isteklerinizi organize etmek için:

1. Sol tarafta "Collections" sekmesine tıklayın
2. "+" butonuna tıklayın
3. Collection adı verin: "Blog API" veya "My API"
4. İsteklerinizi bu collection'a kaydedin

### 2. Environment Variables
Farklı ortamlar için (development, production):

1. Sağ üstte "Environments" → "Create Environment"
2. Variables ekleyin:
   - `base_url`: `http://localhost:5065/api`
3. İsteklerinizde şu şekilde kullanın:
   ```
   {{base_url}}/blog
   ```

### 3. Pre-request Scripts
Her istekten önce çalışacak kodlar:

**Örnek:** Otomatik timestamp ekleme
```javascript
pm.environment.set("timestamp", new Date().toISOString());
```

### 4. Tests (Otomatik Testler)
Yanıtları otomatik test etmek için:

**Body** sekmesinden sonra **Tests** sekmesine gidin:
```javascript
// Status code kontrolü
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Response time kontrolü
pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// JSON yapısı kontrolü
pm.test("Response has title field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('title');
});
```

### 5. Authorization (Gelecekte)
Eğer API'nize JWT token eklenirse:

1. **Authorization** sekmesine gidin
2. Type: **Bearer Token** seçin
3. Token'ı yapıştırın

Veya environment variable kullanın:
```
{{token}}
```

### 6. İstekleri Kaydetme ve Paylaşma
1. İsteği kaydedin (Save butonu)
2. Collection'ı export edin: Collection → "..." → Export
3. JSON dosyasını paylaşın

---

## 🔍 Hata Ayıklama (Debugging)

### Yaygın Hatalar ve Çözümleri

#### 1. Connection Refused
**Hata:** "Could not get any response"
**Çözüm:** API'nizin çalıştığından emin olun (`dotnet run`)

#### 2. 404 Not Found
**Hata:** "404 Not Found"
**Çözüm:** 
- URL'yi kontrol edin
- Base URL'nin doğru olduğundan emin olun
- Endpoint adını kontrol edin

#### 3. 400 Bad Request
**Hata:** "400 Bad Request"
**Çözüm:**
- JSON formatını kontrol edin
- Gerekli alanların doldurulduğundan emin olun
- Content-Type header'ının `application/json` olduğunu kontrol edin

#### 4. 500 Internal Server Error
**Hata:** "500 Internal Server Error"
**Çözüm:**
- MongoDB bağlantısını kontrol edin
- API loglarını inceleyin
- Veritabanı ayarlarını kontrol edin

---

## 📊 Örnek İstek Senaryoları

### Senaryo 1: Yeni Blog Yazısı Oluştur ve Listele

1. **POST** `/api/blog` - Yeni blog oluştur
2. Response'dan `id`'yi kopyala
3. **GET** `/api/blog` - Tüm blogları listele
4. Oluşturduğunuz blogu bulun

### Senaryo 2: Kullanıcı Kaydı ve Profil Güncelleme

1. **POST** `/api/user` - Yeni kullanıcı oluştur
2. Response'dan `id`'yi al
3. **PUT** `/api/user/{id}` - Profil bilgilerini güncelle
4. **GET** `/api/user/{id}` - Güncellenmiş profili görüntüle

### Senaryo 3: Blog ve Yazar İlişkisi

1. **POST** `/api/user` - Yazar oluştur
2. **POST** `/api/blog` - Blog oluştur (author alanına yazar adını yazın)
3. **GET** `/api/blog` - Blogları listele ve yazarları görüntüle

---

## 🎓 Öğrenme Kaynakları

- [Postman Resmi Dokümantasyon](https://learning.postman.com/docs/)
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)

---

## 📝 Notlar

- API development modunda çalışıyor, Swagger UI aktif
- CORS ayarları React uygulamanız için yapılandırılmış
- MongoDB veritabanı kullanılıyor
- Şifreler response'larda gösterilmiyor (güvenlik)

---

## ✅ Kontrol Listesi

API'nizi test etmek için bu adımları takip edin:

- [ ] API çalışıyor mu? (`http://localhost:5065`)
- [ ] Swagger UI açılıyor mu? (`http://localhost:5065/swagger`)
- [ ] GET `/api/blog` çalışıyor mu?
- [ ] POST `/api/blog` ile yeni blog oluşturabiliyor musunuz?
- [ ] GET `/api/user` çalışıyor mu?
- [ ] POST `/api/user` ile yeni kullanıcı oluşturabiliyor musunuz?
- [ ] PUT ve DELETE işlemleri çalışıyor mu?

---

**İyi testler! 🚀**

