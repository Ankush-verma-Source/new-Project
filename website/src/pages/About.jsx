import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
            <Helmet>
                <title>About Us | Global Education Guide</title>
                <meta name="description" content="Learn about Global Education Guide and our mission to help students achieve international education goals." />
                <link rel="canonical" href="https://www.globaleducationguide.in/about" />
                <meta property="og:title" content="About Us | Global Education Guide" />
                <meta property="og:description" content="Learn about Global Education Guide and our mission to help students achieve international education goals." />
                <meta property="og:url" content="https://www.globaleducationguide.in/about" />
                <meta property="og:image" content="https://www.globaleducationguide.in/logo.png" />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="About Us | Global Education Guide" />
                <meta property="twitter:description" content="Learn about Global Education Guide and our mission to help students achieve international education goals." />
                <meta property="twitter:image" content="https://www.globaleducationguide.in/logo.png" />
            </Helmet>
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
                            <img src={foundationImg} alt="About Us" loading="lazy" />
                        </div>
                        <div className="about-text" data-aos="fade-left">
                            <div className="pill-tag">Our Story</div>
                            <h2>Dedicated to Your Educational Success</h2>
                            <p>
                                Incorporated on May 18, 2023, Global Education Guide Foundation is a non-profit organization registered as a Section 8 company. Based in Jammu, we operate as a leading educational consultancy committed to bridging the gap between academic aspirations and financial realities.
                            </p>
                            <p>
                                We believe that every student deserves a chance to excel, regardless of their financial background. Our foundation works tirelessly as a consultancy to guide students and help them secure admissions and scholarships ranging from 60% to 100% for both undergraduate and postgraduate programs in India and abroad.
                            </p>
                            <div className="about-stats">
                                <div className="about-stat-item">
                                    <h3>60% - 100%</h3>
                                    <p>Scholarship Guidance</p>
                                </div>
                                <div className="about-stat-item">
                                    <h3>SC/ST</h3>
                                    <p>Free Education Guidance</p>
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
                            <p>To empower students by providing them with expert career counselling, admission guidance, and support in securing scholarships to pursue higher education in prestigious institutions worldwide.</p>
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
