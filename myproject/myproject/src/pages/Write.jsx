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
        category: formData.category || 'General',
        imageUrl: formData.imageUrl || '',
        author: user?.username || user?.email || 'Author',
      };

      await createBlog(blogData);
      setMessage('Your blog post was created successfully!');
      setMessageColor('green');
      
      // Reset form values
      setFormData({
        title: '',
        content: '',
        summary: '',
        category: '',
        imageUrl: '',
      });

      // Redirect to the homepage after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error creating blog:', error);
      setMessage(error.response?.data?.message || 'Something went wrong while creating the post.');
      setMessageColor('red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page write">
      <h1>Create a new post</h1>
      <p>
        Use this form to drop fresh ideas into my digital notebook. I review and publish submitted drafts, so keep it concise and focused.
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
          Title
          <input 
            type="text" 
            name="title"
            placeholder="e.g. Minimal routing with React Router" 
            value={formData.title}
            onChange={handleChange}
            required 
          />
        </label>
        <label className="writeField">
          Category
          <input 
            type="text" 
            name="category"
            placeholder="e.g. React, JavaScript, .NET" 
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label className="writeField">
          Image URL (optional)
          <input 
            type="url" 
            name="imageUrl"
            placeholder="https://images.unsplash.com/..." 
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </label>
        <label className="writeField">
          Summary
          <textarea 
            name="summary"
            placeholder="Share the main idea in a couple of sentences..." 
            rows={3}
            value={formData.summary}
            onChange={handleChange}
          />
        </label>
        <label className="writeField">
          Content
          <textarea 
            name="content"
            placeholder="Write the full content here..." 
            rows={8} 
            value={formData.content}
            onChange={handleChange}
            required 
          />
        </label>
        <div className="writeActions">
          <button type="submit" disabled={loading}>
            {loading ? 'Publishing...' : 'Create Draft'}
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
            Clear
          </button>
        </div>
      </form>
    </section>
  );
}

