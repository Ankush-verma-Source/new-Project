import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Hero.css';
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

const Hero = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [course, setCourse] = useState('');
    const [qualification, setQualification] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanPhone = phone.replace(/\D/g, ''); // Keep only numeric digits

        // 1. Client-side Validation Checks
        if (!cleanName || !cleanEmail || !cleanPhone || !course || !qualification) {
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

        const combinedPhone = `${countryCode} ${cleanPhone}`;

        try {
            const response = await fetch(`${API_BASE_URL}/api/submissions/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: cleanName, email: cleanEmail, phone: combinedPhone, course, qualification })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess(true);
                setName('');
                setEmail('');
                setPhone('');
                setCourse('');
                setQualification('');
            } else {
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="hero">
            <div className="container hero-logo-container">
                {/* <img src={logo} alt="Global Education Guide Logo" className="hero-logo" /> */}
                {/* <span className="hero-logo-text">Global Education Guide</span> */}
            </div>
            <div className="container hero-layout">
                <div className="hero-text">
                    <h1 className="hero-title">Empowering Futures Through Education in India & Abroad</h1>
                    <p className="hero-subtitle">
                        We provide expert career counselling, admission guidance, and support in securing scholarships to help students achieve their dreams of higher education in India and abroad.
                    </p>
                    <div className="hero-buttons">
                        <button onClick={() => document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' })} className="btn btn-accent">Apply for Counselling</button>
                        <Link to="/about" className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>Learn More</Link>
                    </div>
                </div>

                <div className="hero-form-container" id="apply-form" style={{ scrollMargin: "100px", position: "relative" }}>
                    {success ? (
                        <div className="form-success-container">
                            <div className="success-icon-check">✓</div>
                            <h3>Counselling Request Received!</h3>
                            <p>Thank you. We have saved your details and will get in touch with you shortly for your free counselling session.</p>
                            <button onClick={() => setSuccess(false)} className="btn btn-accent btn-block" style={{ marginTop: '20px' }}>Request Another</button>
                        </div>
                    ) : (
                        <form className="hero-form" onSubmit={handleSubmit}>
                            {error && (
                                <div className="form-floating-error">
                                    <span>⚠️ {error}</span>
                                    <button type="button" className="error-close-btn" onClick={() => setError('')}>&times;</button>
                                </div>
                            )}

                            <div className="form-logo-container">
                                <img src={logo} alt="Global Education Guide" className="form-logo" />
                            </div>
                            <h3>Apply for Counselling</h3>
                            <p>Fill out the form below to get free expert counselling and admission guidance.</p>

                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="form-group phone-flex-container">
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
                            <div className="form-group">
                                <select 
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                    required
                                >
                                    <option value="">Select Course</option>
                                    <option value="B.Tech / BE">B.Tech / BE</option>
                                    <option value="MBA / PGDM">MBA / PGDM</option>
                                    <option value="BBA / BCA">BBA / BCA</option>
                                    <option value="B.Pharm / M.Pharm">B.Pharm / M.Pharm</option>
                                    <option value="LLB / BA LLB">LLB / BA LLB</option>
                                    <option value="B.Ed / M.Ed">B.Ed / M.Ed</option>
                                    <option value="MBBS / BDS">MBBS / BDS</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select 
                                    value={qualification}
                                    onChange={(e) => setQualification(e.target.value)}
                                    required
                                >
                                    <option value="">Current Qualification</option>
                                    <option value="12th (Science)">12th (Science)</option>
                                    <option value="12th (Commerce)">12th (Commerce)</option>
                                    <option value="12th (Arts)">12th (Arts)</option>
                                    <option value="Graduation">Graduation</option>
                                    <option value="Post Graduation">Post Graduation</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-accent btn-block" disabled={loading}>
                                {loading ? <span className="btn-spinner"></span> : 'Get Free Counselling →'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
