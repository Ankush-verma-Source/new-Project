import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/logo.jpeg';
import mouBadge from '../assets/mou-badge.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-column about-col">
                        <div className="footer-logo">
                            <img src={logo} alt="GlobalEdu Guide" />
                            <span>GlobalEdu Guide</span>
                        </div>
                        <p className="footer-about-text">
                            GlobalEdu Guide Foundation is dedicated to making higher education accessible and affordable for all students through generous scholarship programs and comprehensive support. Join us in our mission to empower the next generation of leaders and innovators.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon"><FaFacebookF /></a>
                            <a href="#" className="social-icon"><FaTwitter /></a>
                            <a href="#" className="social-icon"><FaInstagram /></a>
                            <a href="#" className="social-icon"><FaLinkedinIn /></a>
                        </div>
                    </div>

                    <div className="footer-column contact-col">
                        <div className="contact-item">
                            <h3>Phone</h3>
                            <p><FaPhoneAlt className="icon" /> +91 941 910 1940</p>
                            <p><FaPhoneAlt className="icon" /> +91 914 983 3760</p>
                        </div>
                        <div className="contact-item">
                            <h3>Email</h3>
                            <p><FaEnvelope className="icon" /> info@globaleduguide.com</p>
                            <p><FaEnvelope className="icon" /> scholarship@globaleduguide.com</p>
                        </div>
                        <div className="contact-item">
                            <h3>Address</h3>
                            <p><FaMapMarkerAlt className="icon" /> Gandhi Nagar, Gol Market Jammu</p>
                        </div>
                    </div>

                    <div className="footer-column badge-col">
                        <img src={mouBadge} alt="MOU with 200+ Universities" className="mou-badge" />
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; copyright {new Date().getFullYear()} by GlobalEdu Guide Foundation | Powered by: GlobalEdu Guide Team</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
