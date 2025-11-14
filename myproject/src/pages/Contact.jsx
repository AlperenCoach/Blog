import './pages.css';

export default function Contact() {
  return (
    <section className="page">
      <h1>İletişim</h1>
      <p>
        Bir proje fikriniz, mentorluk ihtiyacınız ya da paylaşmak istediğiniz geribildirim
        varsa mesaj atmanız yeterli. Genellikle 24 saat içinde geri dönüş yapıyorum.
      </p>
      <div className="pageActions">
        <a href="mailto:merhaba@alpi.dev">E-posta Gönder</a>
        <a href="https://cal.com/" target="_blank" rel="noreferrer">
          Görüşme Planla
        </a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          GitHub Profilim
        </a>
      </div>
    </section>
  );
}

