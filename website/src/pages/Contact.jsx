import React, { useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css';

const Contact = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="contact-page">
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
                            <p>Have questions about scholarships or admissions? Our team is ready to assist you.</p>

                            <div className="info-items">
                                <div className="info-item">
                                    <div className="info-icon"><FaPhoneAlt /></div>
                                    <div>
                                        <h3>Phone</h3>
                                        <p>+91 941 910 1940</p>
                                        <p>+91 914 983 3760</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-icon"><FaEnvelope /></div>
                                    <div>
                                        <h3>Email</h3>
                                        <p>info@globaleduguide.com</p>
                                        <p>scholarship@globaleduguide.com</p>
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
                            <form className="contact-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="Enter your name" required />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="Enter your email" required />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" placeholder="Enter your phone number" required />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea rows="5" placeholder="How can we help you?" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-accent btn-block">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map-section">
                <div className="container">
                    <div className="map-container" data-aos="zoom-in">
                        {/* Placeholder for Google Map */}
                        <div style={{ width: '100%', height: '450px', background: '#eee', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                            <p>Google Map Integration Placeholder (Gandhi Nagar, Jammu)</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
