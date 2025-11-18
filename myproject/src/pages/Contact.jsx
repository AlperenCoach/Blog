import { useState } from 'react';
import './pages.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (message) {
      setMessage('');
      setMessageColor('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // TODO: Backend hazır olduğunda API çağrısı yapılacak
      // await api.post('/contact', formData);
      
      // Şimdilik mock
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.');
      setMessageColor('green');
      
      // Formu temizle
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setMessage('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      setMessageColor('red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h1>İletişim</h1>
      <p>
        Bir proje fikriniz, mentorluk ihtiyacınız ya da paylaşmak istediğiniz geribildirim
        varsa mesaj atmanız yeterli. Genellikle 24 saat içinde geri dönüş yapıyorum.
      </p>
      
      {message && (
        <div style={{ 
          color: messageColor, 
          fontSize: '0.9rem', 
          marginBottom: '1rem', 
          padding: '0.75rem',
          background: messageColor === 'green' ? '#d1fae5' : '#fee2e2',
          borderRadius: '8px',
          fontFamily: "'Poppins', sans-serif"
        }}>
          {message}
        </div>
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <label className="writeField">
          Adınız
          <input 
            type="text" 
            name="name"
            placeholder="Adınız Soyadınız" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField">
          E-posta
          <input 
            type="email" 
            name="email"
            placeholder="ornek@email.com" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField">
          Konu
          <input 
            type="text" 
            name="subject"
            placeholder="Mesajınızın konusu" 
            value={formData.subject}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField">
          Mesajınız
          <textarea 
            name="message"
            placeholder="Mesajınızı buraya yazın..." 
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required 
          />
        </label>
        <div className="writeActions">
          <button type="submit" disabled={loading}>
            {loading ? 'Gönderiliyor...' : 'Gönder'}
          </button>
          <button 
            type="reset" 
            className="ghost"
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
              });
              setMessage('');
            }}
          >
            Temizle
          </button>
        </div>
      </form>

      <div className="pageActions" style={{ marginTop: '2rem' }}>
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

