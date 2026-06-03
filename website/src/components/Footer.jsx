import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import mouBadge from '../assets/mou-badge.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-column about-col">
                        <div className="footer-logo">
                            <img src={logo} alt="Global Education Guide" loading="lazy" />
                            <span>Global Education Guide</span>
                        </div>
                        <p className="footer-about-text">
                            Global Education Guide Foundation is dedicated to making higher education accessible and affordable for all students through generous scholarship programs and comprehensive support. Join us in our mission to empower the next generation of leaders and innovators.
                        </p>
                        <div className="social-links">
                            <a href="https://www.instagram.com/global_education_guide?igsh=MXN0dDV6dGQwY2NtbA==" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram"><FaInstagram /></a>
                        </div>
                    </div>

                    <div className="footer-column contact-col">
                        <div className="contact-item">
                            <h3>Phone</h3>
                            <p><FaPhoneAlt className="icon" /> +91 9103252871</p>
                        </div>
                        <div className="contact-item">
                            <h3>Email</h3>
                            <p><FaEnvelope className="icon" /> info@globaleducationguide.in</p>
                            <p><FaEnvelope className="icon" /> scholarship@globaleducationguide.in</p>
                        </div>
                        <div className="contact-item">
                            <h3>Address</h3>
                            <p><FaMapMarkerAlt className="icon" /> Gandhi Nagar, Gol Market Jammu</p>
                        </div>
                    </div>

                    <div className="footer-column badge-col">
                        <img src={mouBadge} alt="MOU with 200+ Universities" className="mou-badge" loading="lazy" />
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; copyright {new Date().getFullYear()} by Global Education Guide Foundation | Powered by: Global Education Guide Team</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
