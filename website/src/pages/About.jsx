import React, { useEffect } from 'react';
import foundationImg from '../assets/foundation-img.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './About.css';

const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <h1 data-aos="fade-up">About Global Education Guide Foundation</h1>
                    <p data-aos="fade-up" data-aos-delay="100">Empowering the next generation of leaders through accessible education.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-image" data-aos="fade-right">
                            <img src={foundationImg} alt="About Us" />
                        </div>
                        <div className="about-text" data-aos="fade-left">
                            <div className="pill-tag">Our Story</div>
                            <h2>Dedicated to Your Educational Success</h2>
                            <p>
                                Incorporated on May 18, 2023, Global Education Guide Foundation is a non-profit organization registered as a Section 8 company. Based in Jammu, we are committed to bridging the gap between academic aspirations and financial realities.
                            </p>
                            <p>
                                We believe that every student deserves a chance to excel, regardless of their financial background. Our foundation works tirelessly to provide scholarships ranging from 60% to 100% for both undergraduate and postgraduate programs in India and abroad.
                            </p>
                            <div className="about-stats">
                                <div className="about-stat-item">
                                    <h3>60% - 100%</h3>
                                    <p>Scholarship Support</p>
                                </div>
                                <div className="about-stat-item">
                                    <h3>SC/ST</h3>
                                    <p>Free Education Focus</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-alt">
                <div className="container">
                    <div className="mission-vision">
                        <div className="mission-card" data-aos="fade-up">
                            <div className="mission-icon">🎯</div>
                            <h3>Our Mission</h3>
                            <p>To empower students by providing them with the necessary financial support and guidance to pursue higher education in prestigious institutions worldwide.</p>
                        </div>
                        <div className="mission-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="mission-icon">👁️</div>
                            <h3>Our Vision</h3>
                            <p>To create a world where quality education is accessible to all, fostering a generation of skilled professionals who contribute to global progress.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
