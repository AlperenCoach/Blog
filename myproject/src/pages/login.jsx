import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { googleOAuth } from '../services/api';
import './pages.css';
import { FaGoogle } from 'react-icons/fa';

// Google OAuth Client ID - Use environment variable in production
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '397009625616-vg5sqm9n8gcd0u03bje5dd6it79h8r54.apps.googleusercontent.com';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCredentialLogin = async (googleResponse) => {
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
      
      // Generate username from email
      const username = email.split('@')[0] || fullName.toLowerCase().replace(/\s+/g, '') || 'user' + Date.now();

      // Call Google OAuth endpoint (handles both login and signup)
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
        
        setMessage('Signed in successfully with Google! Redirecting...');
        setMessageColor('green');
        setTimeout(() => {
          navigate('/');
          window.location.reload(); // Reload to update auth state
        }, 1000);
      } else {
        setMessage('Failed to sign in with Google. Please try again.');
        setMessageColor('red');
      }
    } catch (error) {
      console.error('Google OAuth error:', error);
      let errorMessage = 'Failed to sign in with Google. Please try again.';
      
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
        callback: handleCredentialLogin,
      });
      
      window.google.accounts.id.renderButton(
        document.getElementById('google-login-btn'),
        { theme: 'outline', size: 'large', text: 'signin_with' }
      );
    } else {
      // Retry after a short delay if script hasn't loaded yet
      const timer = setTimeout(() => {
        if (window.google && window.google.accounts) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialLogin,
          });
          
          window.google.accounts.id.renderButton(
            document.getElementById('google-login-btn'),
            { theme: 'outline', size: 'large', text: 'signin_with' }
          );
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [navigate, login]);

  const validateInput = (value) => {
    setInputValue(value);

    const isEmail = value.includes('@') && value.includes('.');
    const isPhone = /^[0-9+\s-]*$/.test(value) && value.length > 9;

    if (isEmail) {
      setMessage('Email detected');
      setMessageColor('green');
    } else if (isPhone) {
      setMessage('Phone number detected');
      setMessageColor('blue');
    } else if (value.length > 0) {
      setMessage('Invalid format');
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
      setMessage('Please enter a valid email address.');
      setMessageColor('red');
      setLoading(false);
      return;
    }

    try {
      const result = await login(inputValue, password);
      if (result.success) {
        navigate('/');
      } else {
        setMessage(result.error || 'Something went wrong while signing in.');
        setMessageColor('red');
      }
    } catch (error) {
      setMessage('Something went wrong while signing in.');
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
          Email or phone number
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Enter your email or phone number"
            value={inputValue}
            onChange={(e) => validateInput(e.target.value)}
            required
            pattern="^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})|([0-9+\s-]{10,15})$"
            title="Please enter a valid email address or phone number."
          />
        </label>
        <label className="writeFieldLogin" htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div id="google-login-btn"></div>
        </div>
        <p
          style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '0.9rem',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Don’t have an account? <Link to="/signup" style={{ color: '#2563eb' }}>Sign Up</Link>
        </p>
      </form>
    </section>
  );
}

