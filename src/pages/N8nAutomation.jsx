import './n8n.css';

export default function N8nAutomation() {
  return (
    <section className="n8nPage">
      <div className="n8nHero">
        <div className="n8nHeroText">
          <p className="n8nTag">Otomasyon · Low-code</p>
          <h1>n8n le uçtan uca iş akışı otomasyonu</h1>
          <p>
            SaaS hizmetlerini birbirine bağlamak, webhook tetikleyicileri kurmak ve veri
            zenginleştirme adımlarını görsel arayüzle tasarlamak için n8n’i nasıl kullanabileceğimi bu
            rehberde topladım. Kod yazmadan hızlı prototipler hazırlarken aynı zamanda sürüm kontrolü ve
            gizli anahtar yönetimi gibi kritik noktaları da ele aldım.
          </p>
          <ul>
            <li>Gerçek zamanlı tetikleyiciler ile CRM ve destek araçlarını senkronize etme</li>
            <li>HTTP node’ları ile REST/GraphQL API katmanını orkestre etme</li>
            <li>OpenAI, Slack ve Notion gibi popüler entegrasyonları otomatikleştirme</li>
          </ul>
        </div>
        <div className="n8nHeroImage">
          <img
            src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&h=800&fit=crop"
            alt="n8n ile hazırlanan otomasyon akışı"
            loading="lazy"
          />
        </div>
      </div>

      <div className="n8nContentGrid">
        <article className="n8nCard">
          <h2>Akışınızı modelleyin</h2>
          <p>
            n8n’de node’ları sürükle bırak yöntemiyle bağlayarak karmaşık koşullar kurabilirsiniz. Split
            In Batches node’u, yüksek hacimli veri setlerini throttling olmadan işlememe yardımcı oluyor.
          </p>
          <img
            src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=900&h=600&fit=crop"
            alt="Workflow tasarım ekranı"
            loading="lazy"
          />
        </article>

        <article className="n8nCard">
          <h2>Versiyon ve güvenlik</h2>
          <p>
            Her akış JSON olarak saklandığı için Git repo’suna dahil etmek mümkün. API anahtarlarını n8n
            Credentials modülüyle şifreleyerek paylaşmadan takım içi kullanım sağlayabilirsiniz.
          </p>
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=600&fit=crop"
            alt="API entegrasyon paneli"
            loading="lazy"
          />
        </article>
      </div>

      <div className="n8nCTA">
        <h3>Demo akışını incele</h3>
        <p>
          Hazırladığım örnek akış, gelen form cevaplarını Airtable’a kaydedip Slack kanalına özet
          gönderiyor. Dosyayı içe aktararak kendi projenizde kullanabilirsiniz.
        </p>
        <a
          href="https://n8n.io/workflows"
          target="_blank"
          rel="noopener noreferrer"
          className="n8nCTAButton"
        >
          n8n workflow galerisini aç
        </a>
      </div>
    </section>
  );
}

