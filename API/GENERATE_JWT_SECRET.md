# 🔐 JWT Secret Key Oluşturma Rehberi

## ⚠️ ÖNEMLİ GÜVENLİK UYARISI

**JWT_SECRET_KEY** JWT token'larınızı imzalamak için kullanılan kritik bir güvenlik anahtarıdır. Bu anahtar:

- ✅ **Mutlaka sizin tarafınızdan oluşturulmalı**
- ✅ **En az 32 karakter uzunluğunda olmalı**
- ✅ **Rastgele ve tahmin edilemez olmalı**
- ✅ **Asla Git'e commit edilmemeli**
- ✅ **Production ve Development için farklı olmalı**

---

## 🛠️ Secret Key Oluşturma Yöntemleri

### Yöntem 1: OpenSSL (Linux/Mac - Önerilen)

```bash
openssl rand -base64 32
```

**Örnek çıktı:**
```
K8mN3pQ7rT9vW2xY5zA1bC4dE6fG8hJ0kL3mN5pQ7rT9vW2xY5zA1bC4dE6fG8hJ0=
```

### Yöntem 2: PowerShell (Windows - Önerilen)

```powershell
[Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Örnek çıktı:**
```
xY9mK3pQ7rT2vW5zA1bC4dE6fG8hJ0kL3mN5pQ7rT9vW2xY5zA1bC4dE6fG8hJ0kL3mN5pQ=
```

### Yöntem 3: Node.js (Her Platform)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Yöntem 4: Online Generator (Dikkatli Kullanın!)

**⚠️ UYARI:** Online generator'lar kullanırken dikkatli olun. Mümkünse yukarıdaki yöntemleri tercih edin.

- https://randomkeygen.com/
- https://www.lastpass.com/features/password-generator

---

## 📝 Kullanım Örnekleri

### Development Ortamı İçin

`.env` dosyası oluşturun (veya `appsettings.Development.json`):

```bash
JWT_SECRET_KEY=DevelopmentSecretKeyThatShouldBeAtLeast32CharactersLongForHS256!
```

### Production Ortamı İçin

**cPanel / Hosting Panel'de Environment Variable olarak:**

```bash
JWT_SECRET_KEY=xY9mK3pQ7rT2vW5zA1bC4dE6fG8hJ0kL3mN5pQ7rT9vW2xY5zA1bC4dE6fG8hJ0kL3mN5pQ=
```

**Veya `appsettings.Production.json` (Sadece güvenli sunucularda!):**

```json
{
  "Jwt": {
    "SecretKey": "xY9mK3pQ7rT2vW5zA1bC4dE6fG8hJ0kL3mN5pQ7rT9vW2xY5zA1bC4dE6fG8hJ0kL3mN5pQ="
  }
}
```

---

## ✅ Güvenlik Kontrol Listesi

- [ ] Secret key en az 32 karakter uzunluğunda
- [ ] Rastgele ve tahmin edilemez
- [ ] Production ve Development için farklı key'ler kullanılıyor
- [ ] `.env` dosyası `.gitignore`'da
- [ ] `appsettings.Production.json` Git'e commit edilmiyor (veya güvenli şekilde şifrelenmiş)
- [ ] Production'da environment variable olarak ayarlanmış
- [ ] Secret key asla log'lara yazılmıyor
- [ ] Secret key asla client-side kodda kullanılmıyor

---

## 🔄 Secret Key Değiştirme

Eğer secret key'iniz sızdırıldıysa veya değiştirmek istiyorsanız:

1. **Yeni bir secret key oluşturun** (yukarıdaki yöntemlerden biriyle)
2. **Environment variable'ı güncelleyin**
3. **Tüm kullanıcılar yeniden login olmak zorunda kalacak** (çünkü eski token'lar geçersiz olacak)
4. **Uygulamayı yeniden başlatın**

---

## 💡 İpuçları

1. **Her ortam için farklı key:** Development, Staging, Production için farklı secret key'ler kullanın
2. **Düzenli rotasyon:** Güvenlik için secret key'leri düzenli olarak değiştirin (örneğin her 6 ayda bir)
3. **Güçlü key:** En az 64 karakter uzunluğunda key kullanmak daha güvenlidir
4. **Key management:** Production'da AWS Secrets Manager, Azure Key Vault gibi servisler kullanabilirsiniz

---

## 🚨 Yapılmaması Gerekenler

❌ **Asla yapmayın:**
- Secret key'i Git repository'ye commit etmek
- Secret key'i kod içine hardcode etmek
- "123456" gibi basit key'ler kullanmak
- Aynı key'i tüm ortamlarda kullanmak
- Secret key'i log dosyalarına yazmak
- Secret key'i client-side JavaScript'te kullanmak

---

## 📚 Ek Kaynaklar

- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [OWASP JWT Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

