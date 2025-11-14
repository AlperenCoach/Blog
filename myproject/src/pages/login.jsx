import { useState } from 'react';
import './pages.css';
import { FaGoogle } from "react-icons/fa";


export default function Login() {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const validateInput = (value) => {
    setInputValue(value);

    // Basit kontroller
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login işlemi burada yapılacak
    console.log('Login attempt:', inputValue);
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
          {message && (
            <span style={{ color: messageColor, fontSize: '0.9rem', marginTop: '0.5rem', display: 'block' }}>
              {message}
            </span>
          )}
        </label>
        <label className="writeFieldLogin" htmlFor="password">
            Şifre
            <input type="password" id="password" name="password" placeholder="Şifre" required />
          </label>
        <div className="writeActions">
          <button type="submit">Giriş Yap</button>
          
        </div>
        <button type="button" className="google-login-btn">
            <FaGoogle size={18} style={{ marginRight: '8px' }} />
            Google ile Giriş Yap
        </button>
      </form>
    </section>
  );
}   


