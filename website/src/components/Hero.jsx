import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-logo-container">
                {/* <img src={logo} alt="GlobalEdu Guide Logo" className="hero-logo" /> */}
                {/* <span className="hero-logo-text">GlobalEdu Guide</span> */}
            </div>
            <div className="container hero-layout">
                <div className="hero-text">
                    <h1 className="hero-title">Empowering Futures Through Education in India & Abroad</h1>
                    <p className="hero-subtitle">
                        We provide scholarships, mentorship, and guidance to help students achieve their dreams of higher education in India and abroad.
                    </p>
                    <div className="hero-buttons">
                        <button onClick={() => document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' })} className="btn btn-accent">Apply for Scholarship</button>
                        <Link to="/about" className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>Learn More</Link>
                    </div>
                </div>

                <div className="hero-form-container" id="apply-form" style={{ scrollMargin: "100px" }}>
                    <form className="hero-form">
                        <div className="form-logo-container">
                            <img src={logo} alt="GlobalEdu Guide" className="form-logo" />
                        </div>
                        <h3>Apply Scholarship</h3>
                        <p>Fill out the form below to apply for scholarships.</p>

                        <div className="form-group">
                            <input type="text" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address" required />
                        </div>
                        <div className="form-group">
                            <input type="tel" placeholder="Phone Number" required />
                        </div>
                        <div className="form-group">
                            <select required>
                                <option value="">Select Course</option>
                                <option value="medical">Medical</option>
                                <option value="engineering">Engineering</option>
                                <option value="management">Management</option>
                                <option value="law">Law</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-accent btn-block">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Hero;
