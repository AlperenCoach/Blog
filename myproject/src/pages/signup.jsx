import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';
import { FaGoogle } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Mesajı temizle
    if (message) {
      setMessage('');
      setMessageColor('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validasyon
    if (formData.password !== formData.confirmPassword) {
      setMessage('Şifreler eşleşmiyor.');
      setMessageColor('red');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setMessage('Şifre en az 6 karakter olmalıdır.');
      setMessageColor('red');
      setLoading(false);
      return;
    }

    try {
      const result = await signup({
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      if (result.success) {
        navigate('/');
      } else {
        setMessage(result.error || 'Kayıt olurken bir hata oluştu.');
        setMessageColor('red');
      }
    } catch (error) {
      setMessage('Kayıt olurken bir hata oluştu.');
      setMessageColor('red');
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="page">
      <h1>Signup</h1>
      <form className="writeForm" onSubmit={handleSubmit}>
        <label className="writeField" htmlFor="username">
          Kullanıcı Adı
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Kullanıcı Adı" 
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField" htmlFor="phoneNumber">
          Telefon Numarası
          <input 
            type="text" 
            id="phoneNumber" 
            name="phoneNumber" 
            placeholder="Telefon Numarası" 
            value={formData.phoneNumber}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField" htmlFor="email">
          Email
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField" htmlFor="password">
          Şifre
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Şifre" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField" htmlFor="confirmPassword">
          Şifre Tekrar
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            placeholder="Şifre Tekrar" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
          />
        </label>
        {message && (
          <div style={{ 
            color: messageColor, 
            fontSize: '0.9rem', 
            marginTop: '0.5rem', 
            padding: '0.75rem',
            background: messageColor === 'green' ? '#d1fae5' : '#fee2e2',
            borderRadius: '8px',
            fontFamily: "'Poppins', sans-serif"
          }}>
            {message}
          </div>
        )}
        <div className="writeActions">
          <button type="submit" disabled={loading}>
            {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
          </button>
          <button type="button" className="google-login-btn">
              <FaGoogle size={18} style={{ marginRight: '8px' }} />
              Google ile Giriş Yap
          </button>
        </div>
        <p style={{ 
          textAlign: 'center', 
          marginTop: '1rem', 
          fontSize: '0.9rem',
          fontFamily: "'Poppins', sans-serif"
        }}>
          Zaten hesabınız var mı? <Link to="/login" style={{ color: '#2563eb' }}>Giriş Yap</Link>
        </p>
      </form>
    </section>
  );
}
