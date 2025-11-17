import './pages.css';

export default function Write() {
  return (
    <section className="page write">
      <h1>Yeni Yazı Oluştur</h1>
      <p>
        Yeni fikirlerini dijital not defterime eklemek için bu formu kullanabilirsin. Gönderilen taslakları
        sonradan gözden geçirip yayımlıyorum; kısa ve odaklı anlatman yeterli.
      </p>
      <form className="writeForm">
        <label className="writeField">
          Başlık
          <input type="text" placeholder="Örn. React Router ile minimal yönlendirme" required />
        </label>
        <label className="writeField">
          Özet
          <textarea placeholder="İçeriğin ana fikrini birkaç cümleyle paylaş..." rows={3} />
        </label>
        <label className="writeField">
          İçerik
          <textarea placeholder="Ana içeriği buraya yaz..." rows={8} required />
        </label>
        <div className="writeActions">
          <button type="submit">Taslak Oluştur</button>
          <button type="reset" className="ghost">
            Temizle
          </button>
        </div>
      </form>
    </section>
  );
}

