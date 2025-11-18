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
      // TODO: API integration will replace this mock when backend is ready
      // await api.post('/contact', formData);

      // Temporary mock response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Your message has been sent! I’ll get back to you shortly.');
      setMessageColor('green');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setMessage('Something went wrong while sending the message. Please try again.');
      setMessageColor('red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h1>Contact</h1>
      <p>
        Have a project idea, need mentorship, or want to share feedback? Drop me a line— I typically reply within 24 hours.
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
          Your name
          <input 
            type="text" 
            name="name"
            placeholder="Full name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField">
          Email
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
          Subject
          <input 
            type="text" 
            name="subject"
            placeholder="What is this about?" 
            value={formData.subject}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField">
          Message
          <textarea 
            name="message"
            placeholder="Write your message here..." 
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required 
          />
        </label>
        <div className="writeActions">
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
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
            Clear
          </button>
        </div>
      </form>

      <div className="pageActions" style={{ marginTop: '2rem' }}>
        <a href="mailto:merhaba@alpi.dev">Send an email</a>
        <a href="https://cal.com/" target="_blank" rel="noreferrer">
          Book a call
        </a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          My GitHub profile
        </a>
      </div>
    </section>
  );
}

