# 🚀 Postman Hızlı Başlangıç Rehberi

## ⚡ 5 Dakikada Başlayın

### Adım 1: Postman Collection'ı İçe Aktarın
1. Postman'i açın
2. Sol üstte **"Import"** butonuna tıklayın
3. **"Blog_API.postman_collection.json"** dosyasını seçin
4. **"Import"** butonuna tıklayın

Artık tüm endpoint'leriniz hazır! 🎉

---

### Adım 2: API'nizi Başlatın
Terminal'de:
```bash
cd API
dotnet run
```

API şu adreste çalışacak: `http://localhost:5065`

---

### Adım 3: İlk İsteğinizi Yapın

**En Kolay Test:**
1. Postman'de sol tarafta **"Blog API Collection"** → **"Blog Endpoints"** → **"Get All Blogs"** seçin
2. **"Send"** butonuna tıklayın
3. Yanıtı görün! ✅

---

### Adım 4: Yeni Blog Oluşturun

1. **"Create New Blog"** isteğini seçin
2. **Body** sekmesinde JSON'u düzenleyin (isteğe göre)
3. **"Send"** butonuna tıklayın
4. Oluşturulan blog'un ID'sini kopyalayın

---

### Adım 5: Oluşturduğunuz Blogu Görüntüleyin

1. **"Get Blog by ID"** isteğini seçin
2. URL'deki `:id` değerini, az önce kopyaladığınız ID ile değiştirin
3. **"Send"** butonuna tıklayın

---

## 📚 Daha Detaylı Bilgi İçin

Detaylı rehber için **POSTMAN_REHBERI.md** dosyasına bakın.

---

## 🎯 Hızlı Referans

### Blog Endpoints
- `GET /api/blog` - Tüm blogları getir
- `GET /api/blog/{id}` - Tek blog getir
- `POST /api/blog` - Yeni blog oluştur
- `PUT /api/blog/{id}` - Blog güncelle
- `DELETE /api/blog/{id}` - Blog sil

### User Endpoints
- `GET /api/user` - Tüm kullanıcıları getir
- `GET /api/user/{id}` - Tek kullanıcı getir
- `GET /api/user/email/{email}` - Email ile kullanıcı getir
- `POST /api/user` - Yeni kullanıcı oluştur
- `PUT /api/user/{id}` - Kullanıcı güncelle
- `DELETE /api/user/{id}` - Kullanıcı sil
- `PATCH /api/user/{id}/activate` - Aktif/pasif yap

---

## ⚠️ Önemli Notlar

- API çalışmıyorsa: `dotnet run` komutunu çalıştırın
- 404 hatası alıyorsanız: URL'yi kontrol edin
- 400 hatası alıyorsanız: JSON formatını kontrol edin
- Swagger UI: `http://localhost:5065/swagger` adresinde mevcut

---

**İyi testler! 🚀**

