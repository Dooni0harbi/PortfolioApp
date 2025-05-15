import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    alert('Message sent!');
    setFormData({ name: '', message: '', phone: '' });
  };

  return (

    <div className="contact-form-wrapper">
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contact Us</h2>

      <label className="contact-label">Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="contact-input"
      />

      <label className="contact-label">Phone Number:</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="contact-input"
      />

      <label className="contact-label">Message:</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        rows="5"
        className="contact-textarea"
      />

      <button type="submit" className="contact-button">Send</button>
    </form>
    </div>
  );
};

export default Contact;
