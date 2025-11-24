import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';
import { FaGoogle } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: '',
  });
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear helper message when user edits a field
    if (message) {
      setMessage('');
      setMessageColor('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageColor('red');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      setMessageColor('red');
      setLoading(false);
      return;
    }

    try {
      const result = await signup({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        profilePicture: formData.profilePicture || '',
      });

      if (result.success) {
        setMessage('Account created successfully! Redirecting...');
        setMessageColor('green');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        console.error('Signup failed:', result.error);
        setMessage(result.error || 'Something went wrong while signing up.');
        setMessageColor('red');
      }
    } catch (error) {
      console.error('Signup exception:', error);
      setMessage(error.message || 'Something went wrong while signing up. Please try again.');
      setMessageColor('red');
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="page">
      <h1>Signup</h1>
      <form className="writeForm" onSubmit={handleSubmit}>
        <label className="writeField" htmlFor="fullName">
          Full name
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
          />
        </label>
        <label className="writeField" htmlFor="username">
          Username
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Username" 
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField" htmlFor="phoneNumber">
          Phone number
          <input 
            type="text" 
            id="phoneNumber" 
            name="phoneNumber" 
            placeholder="Phone number" 
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
        <label className="writeField" htmlFor="profilePicture">
          Profile picture URL
          <input 
            type="url" 
            id="profilePicture" 
            name="profilePicture" 
            placeholder="https://images.unsplash.com/..." 
            value={formData.profilePicture}
            onChange={handleChange}
          />
        </label>
        <label className="writeField" htmlFor="password">
          Password
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField" htmlFor="confirmPassword">
          Confirm password
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            placeholder="Confirm password" 
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
          <button type="button" className="google-login-btn">
              <FaGoogle size={18} style={{ marginRight: '8px' }} />
              Continue with Google
          </button>
        </div>
        <p style={{ 
          textAlign: 'center', 
          marginTop: '1rem', 
          fontSize: '0.9rem',
          fontFamily: "'Poppins', sans-serif"
        }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb' }}>Sign In</Link>
        </p>
      </form>
    </section>
  );
}
