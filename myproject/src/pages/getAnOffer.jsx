import { useState } from 'react';
import { sendContactMessage } from '../services/api';
import './pages.css';
import './getAnOffer.css';

export default function GetAnOffer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    projectDescription: '',
    serviceType: 'Web Development',
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
      // Format message for contact API
      const contactData = {
        name: formData.name,
        email: formData.email,
        subject: `Get An Offer Request - ${formData.serviceType}`,
        message: `Service Type: ${formData.serviceType}\n\nPhone Number: ${formData.phoneNumber || 'Not provided'}\n\nProject Description:\n${formData.projectDescription}`,
      };

      await sendContactMessage(contactData);
      
      setMessage("Your offer request has been sent successfully! I'll review your project and get back to you with a detailed offer within 24-48 hours.");
      setMessageColor('green');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        projectDescription: '',
        serviceType: 'Web Development',
      });
    } catch (error) {
      console.error('Error sending offer request:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong while sending your request. Please try again.';
      setMessage(errorMessage);
      setMessageColor('red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page getAnOfferPage">
      <div className="getAnOfferHeader">
        <h1>Get An Offer</h1>
        <p>
          Tell me about your project and I'll provide you with a detailed offer. 
          Whether it's web development, mobile apps, or design services, I'm here to help bring your vision to life.
        </p>
      </div>
      
      {message && (
        <div 
          className={`offerMessage ${messageColor === 'green' ? 'success' : 'error'}`}
        >
          {message}
        </div>
      )}

      <form className="writeForm offerForm" onSubmit={handleSubmit}>
        <label className="writeField">
          Your Name *
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
          Email Address *
          <input 
            type="email" 
            name="email"
            placeholder="your.email@example.com" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </label>

        <label className="writeField">
          Phone Number
          <input 
            type="tel" 
            name="phoneNumber"
            placeholder="+90 555 123 4567 (Optional)" 
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>

        <label className="writeField">
          Service Type *
          <select 
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="serviceSelect"
          >
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Desktop Development">Desktop Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="SEO">SEO</option>
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Consulting">Consulting</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="writeField">
          Project Description *
          <textarea 
            name="projectDescription"
            placeholder="Please describe your project in detail. Include features, timeline, target audience, and any specific requirements..." 
            rows={8}
            value={formData.projectDescription}
            onChange={handleChange}
            required 
          />
        </label>

        <div className="writeActions">
          <button type="submit" disabled={loading} className="submitButton">
            {loading ? 'Sending Request...' : 'Get An Offer'}
          </button>
          <button 
            type="reset" 
            className="ghost"
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                projectDescription: '',
                serviceType: 'Web Development',
              });
              setMessage('');
              setMessageColor('');
            }}
            disabled={loading}
          >
            Clear Form
          </button>
        </div>
      </form>

      <div className="offerInfo">
        <h3>What happens next?</h3>
        <ul>
          <li>I'll review your project details within 24-48 hours</li>
          <li>You'll receive a detailed offer with pricing and timeline</li>
          <li>We can schedule a call to discuss your project in detail</li>
          <li>No obligation - feel free to ask questions!</li>
        </ul>
      </div>
    </section>
  );
}