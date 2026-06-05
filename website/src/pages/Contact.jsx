import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css';
import { API_BASE_URL } from '../config';

const countryCodes = [
  { code: '+91', iso: 'IN' },
  { code: '+1', iso: 'US' },
  { code: '+44', iso: 'GB' },
  { code: '+1', iso: 'CA' },
  { code: '+61', iso: 'AU' },
  { code: '+971', iso: 'AE' },
  { code: '+966', iso: 'SA' },
  { code: '+65', iso: 'SG' },
  { code: '+49', iso: 'DE' },
  { code: '+33', iso: 'FR' },
  { code: '+39', iso: 'IT' },
  { code: '+34', iso: 'ES' },
  { code: '+7', iso: 'RU' },
  { code: '+81', iso: 'JP' },
  { code: '+86', iso: 'CN' },
  { code: '+82', iso: 'KR' },
  { code: '+55', iso: 'BR' },
  { code: '+27', iso: 'ZA' },
  { code: '+64', iso: 'NZ' },
  { code: '+31', iso: 'NL' },
  { code: '+41', iso: 'CH' },
  { code: '+46', iso: 'SE' },
  { code: '+47', iso: 'NO' },
  { code: '+353', iso: 'IE' },
  { code: '+60', iso: 'MY' },
  { code: '+66', iso: 'TH' },
  { code: '+62', iso: 'ID' },
  { code: '+90', iso: 'TR' },
  { code: '+92', iso: 'PK' },
  { code: '+880', iso: 'BD' },
  { code: '+977', iso: 'NP' },
  { code: '+94', iso: 'LK' },
  { code: '+965', iso: 'KW' },
  { code: '+968', iso: 'OM' },
  { code: '+974', iso: 'QA' },
  { code: '+973', iso: 'BH' },
  { code: '+20', iso: 'EG' },
  { code: '+234', iso: 'NG' },
  { code: '+254', iso: 'KE' },
  { code: '+52', iso: 'MX' },
  { code: '+54', iso: 'AR' },
  { code: '+56', iso: 'CL' },
  { code: '+57', iso: 'CO' },
  { code: '+63', iso: 'PH' },
  { code: '+84', iso: 'VN' },
  { code: '+98', iso: 'IR' },
  { code: '+964', iso: 'IQ' },
  { code: '+972', iso: 'IL' },
  { code: '+380', iso: 'UA' },
  { code: '+48', iso: 'PL' }
];

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanPhone = phone.replace(/\D/g, ''); // Extract only numeric digits
        const cleanMessage = message.trim();

        // 1. Client-side Validation Checks
        if (!cleanName || !cleanEmail || !cleanPhone || !cleanMessage) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        if (!/^[a-zA-Z\s]{2,50}$/.test(cleanName)) {
            setError('Name must contain only letters and spaces, and be between 2 and 50 characters.');
            setLoading(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        if (!/^\d{10}$/.test(cleanPhone)) {
            setError('Phone number must be exactly 10 digits.');
            setLoading(false);
            return;
        }

        if (cleanMessage.length < 5) {
            setError('Message must be at least 5 characters long.');
            setLoading(false);
            return;
        }

        const combinedPhone = `${countryCode} ${cleanPhone}`;

        try {
            const response = await fetch(`${API_BASE_URL}/api/submissions/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: cleanName, email: cleanEmail, phone: combinedPhone, message: cleanMessage })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess(true);
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
            } else {
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to the server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <Helmet>
                <title>Contact Us | Global Education Guide</title>
                <meta name="description" content="Contact Global Education Guide for study abroad counselling, admissions support and scholarship guidance." />
                <link rel="canonical" href="https://www.globaleducationguide.in/contact" />
                <meta property="og:title" content="Contact Us | Global Education Guide" />
                <meta property="og:description" content="Contact Global Education Guide for study abroad counselling, admissions support and scholarship guidance." />
                <meta property="og:url" content="https://www.globaleducationguide.in/contact" />
                <meta property="og:image" content="https://www.globaleducationguide.in/logo.png" />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Contact Us | Global Education Guide" />
                <meta property="twitter:description" content="Contact Global Education Guide for study abroad counselling, admissions support and scholarship guidance." />
                <meta property="twitter:image" content="https://www.globaleducationguide.in/logo.png" />
            </Helmet>
            <section className="contact-hero">
                <div className="container">
                    <h1 data-aos="fade-up">Contact Us</h1>
                    <p data-aos="fade-up" data-aos-delay="100">We're here to help you with your educational journey.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info" data-aos="fade-right">
                            <div className="pill-tag">Get In Touch</div>
                            <h2>Reach Out to Us</h2>
                            <p>Have questions about admissions, career counselling, or scholarship guidance? Our team is ready to assist you.</p>

                            <div className="info-items">
                                <div className="info-item">
                                    <div className="info-icon"><FaPhoneAlt /></div>
                                    <div>
                                        <h3>Phone</h3>
                                        <p>+91 9103252871</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon"><FaEnvelope /></div>
                                    <div>
                                        <h3>Email</h3>
                                        <p>info@globaleducationguide.in</p>
                                        <p>scholarship@globaleducationguide.in</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon"><FaMapMarkerAlt /></div>
                                    <div>
                                        <h3>Address</h3>
                                        <p>Gandhi Nagar, Gol Market Jammu</p>
                                        <p>Jammu & Kashmir, India</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon"><FaClock /></div>
                                    <div>
                                        <h3>Working Hours</h3>
                                        <p>Mon - Sat: 10:00 AM - 6:00 PM</p>
                                        <p>Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-container" data-aos="fade-left">
                            {success ? (
                                <div className="contact-success-card">
                                    <div className="success-icon-check">✓</div>
                                    <h3>Message Sent!</h3>
                                    <p>Thank you for getting in touch. Your message has been received, and our support team will contact you shortly.</p>
                                    <button onClick={() => setSuccess(false)} className="btn btn-accent btn-block" style={{ marginTop: '20px' }}>Send Another Message</button>
                                </div>
                            ) : (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    {error && (
                                        <div className="form-floating-error">
                                            <span>⚠️ {error}</span>
                                            <button type="button" className="error-close-btn" onClick={() => setError('')}>&times;</button>
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter your name" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input 
                                            type="email" 
                                            placeholder="Enter your email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <div className="phone-flex-container">
                                            <select 
                                                className="country-code-select"
                                                value={countryCode}
                                                onChange={(e) => setCountryCode(e.target.value)}
                                                required
                                            >
                                                {countryCodes.map((c, idx) => (
                                                    <option key={idx} value={c.code}>
                                                        {c.code} ({c.iso})
                                                    </option>
                                                ))}
                                            </select>
                                            <input 
                                                type="tel" 
                                                placeholder="10-Digit Mobile" 
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea 
                                            rows="5" 
                                            placeholder="How can we help you?" 
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-accent btn-block" disabled={loading}>
                                        {loading ? <span className="btn-spinner"></span> : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="map-section">
                <div className="container">
                    <div className="map-container" data-aos="zoom-in">
                        {/* Real interactive Google Map for Jammu Office */}
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.5516070380846!2d74.86815347631326!3d32.71128367369325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e84860492dbad%3A0xe5a14d59a721727c!2sGol%20Market%2C%20Gandhi%20Nagar%2C%20Jammu%2C%20Jammu%20and%20Kashmir%20180004!5e0!3m2!1sen!2sin!4v1717600000000!5m2!1sen!2sin" 
                            width="100%" 
                            height="450" 
                            style={{ border: 0, borderRadius: '20px', boxShadow: 'var(--shadow-md)', display: 'block' }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map Location of Global Education Guide Office"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
