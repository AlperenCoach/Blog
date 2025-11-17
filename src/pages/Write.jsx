import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './pages.css';

export default function Write() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: '',
    imageUrl: '',
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
      const blogData = {
        title: formData.title,
        content: formData.content,
        summary: formData.summary || formData.content.substring(0, 200),
        category: formData.category || 'Genel',
        imageUrl: formData.imageUrl || '',
        author: user?.username || user?.email || 'Yazar',
      };

      await createBlog(blogData);
      setMessage('Blog yazısı başarıyla oluşturuldu!');
      setMessageColor('green');
      
      // Formu temizle
      setFormData({
        title: '',
        content: '',
        summary: '',
        category: '',
        imageUrl: '',
      });

      // 2 saniye sonra ana sayfaya yönlendir
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error creating blog:', error);
      setMessage(error.response?.data?.message || 'Blog yazısı oluşturulurken bir hata oluştu.');
      setMessageColor('red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page write">
      <h1>Yeni Yazı Oluştur</h1>
      <p>
        Yeni fikirlerini dijital not defterime eklemek için bu formu kullanabilirsin. Gönderilen taslakları
        sonradan gözden geçirip yayımlıyorum; kısa ve odaklı anlatman yeterli.
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
          Başlık
          <input 
            type="text" 
            name="title"
            placeholder="Örn. React Router ile minimal yönlendirme" 
            value={formData.title}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField">
          Kategori
          <input 
            type="text" 
            name="category"
            placeholder="Örn. React, JavaScript, .NET" 
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label className="writeField">
          Resim URL (Opsiyonel)
          <input 
            type="url" 
            name="imageUrl"
            placeholder="https://images.unsplash.com/..." 
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </label>
        <label className="writeField">
          Özet
          <textarea 
            name="summary"
            placeholder="İçeriğin ana fikrini birkaç cümleyle paylaş..." 
            rows={3}
            value={formData.summary}
            onChange={handleChange}
          />
        </label>
        <label className="writeField">
          İçerik
          <textarea 
            name="content"
            placeholder="Ana içeriği buraya yaz..." 
            rows={8} 
            value={formData.content}
            onChange={handleChange}
            required 
          />
        </label>
        <div className="writeActions">
          <button type="submit" disabled={loading}>
            {loading ? 'Oluşturuluyor...' : 'Taslak Oluştur'}
          </button>
          <button 
            type="reset" 
            className="ghost"
            onClick={() => {
              setFormData({
                title: '',
                content: '',
                summary: '',
                category: '',
                imageUrl: '',
              });
              setMessage('');
            }}
          >
            Temizle
          </button>
        </div>
      </form>
    </section>
  );
}

