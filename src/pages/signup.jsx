
import { useState } from 'react';               
import './pages.css';
import { FaGoogle } from "react-icons/fa";



export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Signup işlemi burada yapılacak
    console.log('Signup attempt:', formData);
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
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Şifre Tekrar" required />
            </label>
        <div className="writeActions">
          <button type="submit">Kayıt Ol</button>
          <button type="button" className="google-login-btn">
              <FaGoogle size={18} style={{ marginRight: '8px' }} />
              Google ile Giriş Yap
          </button>
        </div>
      </form>
    </section>
  );
}
