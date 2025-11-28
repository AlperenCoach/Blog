import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    profilePicture: user?.profilePicture || '',
    bio: user?.bio || '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files && files[0]) {
      // File input için
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      // Normal input için
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    
    const result = await updateProfile(formData);
    if (result.success) {
      setStatus({ type: 'success', message: 'Profile updated successfully.' });
      setTimeout(() => navigate('/profile'), 1200);
    } else {
      setStatus({ type: 'error', message: result.error || 'Failed to update profile.' });
    }
  };

  return (
    <section className="page">
      <header className="profileHeader">
        <div>
          <p className="profileEyebrow">Account settings</p>
          <h1>Edit Profile</h1>
        </div>
        <Link className="profileEditLink profileEditLink--ghost" to="/profile">
          Back to profile
        </Link>
      </header>

      {status.message && (
        <div className={`profileToast profileToast--${status.type}`}>
          {status.message}
        </div>
      )}

      <form className="profileForm" onSubmit={handleSubmit}>
        <div className="profileFormGrid">
          <label className="profileFormField">
            Full name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </label>
          <label className="profileFormField">
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Preferred username"
            />
          </label>
          <label className="profileFormField">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
          </label>
          <label className="profileFormField">
            Phone number
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+90 555 555 55 55"
            />
          </label>
          <label className="profileFormField">
            Short bio
            <textarea
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Share a short introduction..."
            />
          </label>
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <button type="button" className="profilePictureButton" onClick={() => document.getElementById('profilePicture').click()}>
            Add a profile picture
          </button>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          {formData.profilePicture && (
            <p className="profilePicturePreview" style={{ margin: 0 }}>
              <img src={formData.profilePicture} alt="Profile picture" style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '8px', objectFit: 'cover' }} />
            </p>
          )}
        </div>
        </div>



        <div className="profileFormActions">
          <button type="button" className="ghost" onClick={() => navigate('/profile')}>
            Cancel
          </button>
          <button type="submit">Save changes</button>
        </div>
      </form>
    </section>
  );
}

