import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { googleOAuth } from '../services/api';
import './pages.css';
import { FaGoogle } from "react-icons/fa";

const GOOGLE_CLIENT_ID = '397009625616-vg5sqm9n8gcd0u03bje5dd6it79h8r54.apps.googleusercontent.com';

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

  const handleCredentialSignup = async (googleResponse) => {
    try {
      setLoading(true);
      setMessage('');
      
      // Decode JWT token to get user info
      const base64Url = googleResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const userData = JSON.parse(jsonPayload);

      // Extract user information from Google OAuth
      const fullName = userData.name || '';
      const email = userData.email || '';
      const profilePicture = userData.picture || '';
      
      // Generate username from email or name
      const username = email.split('@')[0] || fullName.toLowerCase().replace(/\s+/g, '') || 'user' + Date.now();

      // Call Google OAuth endpoint
      const authResponse = await googleOAuth({
        email: email,
        fullName: fullName,
        username: username,
        profilePicture: profilePicture || '',
      });

      // Handle successful OAuth response
      if (authResponse.token && authResponse.user) {
        // Store token and user data
        localStorage.setItem('token', authResponse.token);
        localStorage.setItem('user', JSON.stringify(authResponse.user));
        
        setMessage('Account created successfully with Google! Redirecting...');
        setMessageColor('green');
        setTimeout(() => {
          navigate('/');
          window.location.reload(); // Reload to update auth state
        }, 1000);
      } else {
        setMessage('Failed to create account with Google. Please try again.');
        setMessageColor('red');
      }
    } catch (error) {
      console.error('Google OAuth signup error:', error);
      let errorMessage = 'Failed to sign up with Google. Please try again.';
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setMessage(errorMessage);
      setMessageColor('red');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Wait for Google script to load
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialSignup,
      });
      
      window.google.accounts.id.renderButton(
        document.getElementById('google-signup-btn'),
        { theme: 'outline', size: 'large', text: 'signup_with' }
      );
    } else {
      // Retry after a short delay if script hasn't loaded yet
      const timer = setTimeout(() => {
        if (window.google && window.google.accounts) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialSignup,
          });
          
          window.google.accounts.id.renderButton(
            document.getElementById('google-signup-btn'),
            { theme: 'outline', size: 'large', text: 'signup_with' }
          );
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [navigate, signup]);

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
        setMessage(result.error || 'Something went wrong while signing up.');
        setMessageColor('red');
      }
    } catch (error) {
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
          Add a profile picture
          <input 
            type="file" 
            id="profilePicture" 
            name="profilePicture" 
            placeholder="Profile picture" 
            accept="image/*"
            onChange={handleChange}
            required 
          />
          <p className="profilePicturePreview">
            {formData.profilePicture && (
              <img src={formData.profilePicture} alt="Profile picture" />
            )}
          </p>
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
          <div id="google-signup-btn"></div>
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
