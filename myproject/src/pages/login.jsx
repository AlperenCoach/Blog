import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInput = (value) => {
    setInputValue(value);

    const isEmail = value.includes('@') && value.includes('.');
    const isPhone = /^[0-9+\s-]*$/.test(value) && value.length > 9;

    if (isEmail) {
      setMessage('Email algılandı');
      setMessageColor('green');
    } else if (isPhone) {
      setMessage('Telefon numarası algılandı');
      setMessageColor('blue');
    } else if (value.length > 0) {
      setMessage('Geçersiz format');
      setMessageColor('red');
    } else {
      setMessage('');
      setMessageColor('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const isEmail = inputValue.includes('@') && inputValue.includes('.');
    if (!isEmail) {
      setMessage('Lütfen geçerli bir email adresi giriniz.');
      setMessageColor('red');
      setLoading(false);
      return;
    }

    try {
      const result = await login(inputValue, password);
      if (result.success) {
        navigate('/');
      } else {
        setMessage(result.error || 'Giriş yapılırken bir hata oluştu.');
        setMessageColor('red');
      }
    } catch (error) {
      setMessage('Giriş yapılırken bir hata oluştu.');
      setMessageColor('red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h1>Login</h1>
      <form className="writeForm" onSubmit={handleSubmit}>
        <label className="writeFieldLogin" htmlFor="contact">
          Email veya Telefon Numaranız
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Email veya Telefon Numaranızı Giriniz"
            value={inputValue}
            onChange={(e) => validateInput(e.target.value)}
            required
            pattern="^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})|([0-9+\s-]{10,15})$"
            title="Lütfen geçerli bir email adresi veya telefon numarası giriniz."
          />
        </label>
        <label className="writeFieldLogin" htmlFor="password">
          Şifre
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {message && (
          <div
            style={{
              color: messageColor,
              fontSize: '0.9rem',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              padding: '0.75rem',
              background:
                messageColor === 'green'
                  ? '#d1fae5'
                  : messageColor === 'red'
                  ? '#fee2e2'
                  : '#dbeafe',
              borderRadius: '8px',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {message}
          </div>
        )}
        <div className="writeActions">
          <button type="submit" disabled={loading}>
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
          <button type="button" className="google-login-btn">
            <FaGoogle size={18} style={{ marginRight: '8px' }} />
            Google ile Giriş Yap
          </button>
        </div>
        <p
          style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '0.9rem',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Hesabınız yok mu? <Link to="/signup" style={{ color: '#2563eb' }}>Kayıt Ol</Link>
        </p>
      </form>
    </section>
  );
}

