import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUserTie, FaChalkboardTeacher, FaUniversity, FaHandHoldingHeart, FaGlobeAsia } from 'react-icons/fa';
import foundationImg from '../assets/foundation-img.png';
import immigrationImg from '../assets/immigration-img.png';
import universityLogos from '../assets/university-logos.png';
import Hero from '../components/Hero';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
        });
    }, []);

    return (
        <div className="home">
            <Hero />

            {/* Stats Bar */}
            <div className="stats-bar">
                <div className="container">
                    <div className="stats-bar-grid">
                        <div className="stats-bar-item">
                            <h3>25334+</h3>
                            <p>Students</p>
                        </div>
                        <div className="stats-bar-item">
                            <h3>1500K</h3>
                            <p>Scholarships</p>
                        </div>
                        <div className="stats-bar-item">
                            <h3>4.9/5</h3>
                            <p>Review</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section (Yellow Icons) */}
            <section className="section" id="services">
                <div className="container">
                    <div className="services-row">
                        <div className="service-item" data-aos="fade-up">
                            <div className="service-icon-wrapper">
                                <FaHandHoldingHeart />
                            </div>
                            <div className="service-content">
                                <h3>Our Mission</h3>
                                <p>Empowering Education for a Brighter Future. We offer scholarships covering 60% to 100% of fees for all programs.</p>
                            </div>
                        </div>
                        <div className="service-item" data-aos="fade-up" data-aos-delay="100">
                            <div className="service-icon-wrapper">
                                <FaGraduationCap />
                            </div>
                            <div className="service-content">
                                <h3>Scholarship Programs</h3>
                                <p>Extensive Scholarship Opportunities at Leading Universities. Our special focus includes offering free education for SC/ST students</p>
                            </div>
                        </div>
                        <div className="service-item" data-aos="fade-up" data-aos-delay="200">
                            <div className="service-icon-wrapper">
                                <FaChalkboardTeacher />
                            </div>
                            <div className="service-content">
                                <h3>How We Assist</h3>
                                <p>We help you identify the best colleges and universities, guide you through the admission process.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Foundation Section (Image Left with Overlay) */}
            <section className="section section-alt" id="about">
                <div className="container">
                    <div className="foundation-content">
                        <div className="foundation-image-wrapper" data-aos="fade-right">
                            <img src={foundationImg} alt="Students Celebrating" className="foundation-image" />

                            {/* Overlay Performance Card */}
                            <div className="performance-card">
                                <h4>Performance</h4>
                                <div className="perf-stats">
                                    <div className="perf-stat">
                                        <div className="perf-icon desktop-icon"></div>
                                        <div>
                                            <span className="perf-number">25334+</span>
                                            <span className="perf-label">Students</span>
                                        </div>
                                    </div>
                                    <div className="perf-stat">
                                        <div className="perf-icon graph-icon"></div>
                                        <div>
                                            <span className="perf-number">1500K</span>
                                            <span className="perf-label">Scholarships</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="perf-footer">
                                    <span>Scholarships Booked in</span>
                                    <span className="perf-year">2024</span>
                                </div>
                                <div className="perf-progress"></div>
                            </div>
                        </div>

                        <div className="foundation-text" data-aos="fade-left">
                            <div className="pill-tag">★ Foundation with a Purpose</div>
                            <h2 className="foundation-title">Welcome to GlobalEdu Guide Foundation</h2>

                            <p className="foundation-desc">
                                Located at 17 A/C Gandhi Nagar, Jammu, Jammu and Kashmir, GlobalEdu Guide Foundation is dedicated to making higher education accessible and affordable for every deserving student. We provide scholarships ranging from 60% to 100% for both undergraduate (UG) and postgraduate (PG) programs. Our mission is to support students in their academic journey by facilitating admissions to various esteemed colleges and universities, ensuring no deserving student is left behind due to financial constraints. Additionally, we offer free education for students belonging to SC/ST categories.
                            </p>

                            <div className="rating-block">
                                <span className="rating-number">4.9+</span>
                                <div className="rating-stars">★★★★★</div>
                                <span className="rating-label">Student Review's</span>
                            </div>

                            <ul className="check-list">
                                <li>Career Guidance to Assured Admission</li>
                                <li>MOU & Tie-ups with 600+ Colleges & Universities in India & Abroad</li>
                                <li>Free education for SC/ST students.</li>
                                <li>Help students to achieve their study abroad goals.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="section section-impact" id="impact">
                <div className="impact-overlay"></div>
                <div className="container impact-content">
                    <h2 className="section-title text-white" data-aos="fade-down">Our Impact</h2>
                    <p className="section-subtitle text-white-50" data-aos="fade-up">
                        Measuring our success by the lives we've touched.
                    </p>
                    <div className="stats-grid">
                        <div className="stat-item" data-aos="zoom-in">
                            <span className="stat-number">25,334+</span>
                            <span className="stat-label">Students Empowered</span>
                        </div>
                        <div className="stat-item" data-aos="zoom-in" data-aos-delay="200">
                            <span className="stat-number">1,500+</span>
                            <span className="stat-label">Scholarships Awarded</span>
                        </div>
                        <div className="stat-item" data-aos="zoom-in" data-aos-delay="400">
                            <span className="stat-number">4.9/5</span>
                            <span className="stat-label">Student Reviews</span>
                        </div>
                        <div className="stat-item" data-aos="zoom-in" data-aos-delay="600">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Partner Universities</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Immigration Assistance Section */}
            <section className="section" id="immigration">
                <div className="container">
                    <div className="foundation-content" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div className="foundation-image-wrapper" data-aos="fade-right">
                            <img src={immigrationImg} alt="Immigration Assistance" className="foundation-image" />
                        </div>
                        <div className="foundation-text" data-aos="fade-left">
                            <div className="pill-tag">★ International Institutes You Dream</div>
                            <h2 className="foundation-title">Reliable & Transparent Immigration Assistance for Students Via Foundation</h2>
                            <p className="foundation-desc">
                                GlobalEdu Guide Foundation is committed to providing you with the most authentic, legal, and credible visa information. We offer fully assisted overseas education & settlement guidance to cater individual needs.
                            </p>
                            <ul className="check-list">
                                <li>Mission of Our Foundation is to Make Students Successful Internationally</li>
                                <li>We assist end to end for Study Abroad aspirants</li>
                                <li>We assist end to end for Work Permit aspirants</li>
                                <li>We assist end to end for Travel & Tourism aspirants</li>
                                <li>We assist end to end for all International Settlement Programs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Rated Institutes Section */}
            <section className="section section-alt" id="institutes">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2 className="section-title">Top Rated Institutes</h2>
                        <p className="section-subtitle">Partnerships with Premier Colleges & Universities</p>
                    </div>
                    <div className="about-content" data-aos="fade-up">
                        <p className="lead-text">
                            GlobalEdu Guide Foundation has established partnerships and MOUs with top colleges and universities in Punjab, Haryana, Chandigarh, and Delhi. We are committed to helping students secure direct admissions to these prestigious institutions while offering scholarships ranging from 60% to 100%.
                        </p>
                        {/* Logo Grid */}
                        <div className="institutes-grid" style={{ marginTop: '3rem', textAlign: 'center' }}>
                            <img src={universityLogos} alt="Partner Universities" style={{ maxWidth: '100%', borderRadius: '15px', boxShadow: 'var(--shadow-md)' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials / Success Stories */}
            <section className="section" id="testimonials">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <h2 className="section-title">What Our Students Say</h2>
                        <p className="section-subtitle">Hear from the students whose lives have been transformed.</p>
                    </div>
                    <div className="testimonials-grid">
                        <div className="testimonial-card" data-aos="fade-right">
                            <div className="quote-icon">❝</div>
                            <p className="testimonial-text">GlobalEdu Guide helped me secure a 100% scholarship for my engineering degree. I couldn't have done it without their mentorship.</p>
                            <div className="testimonial-author">
                                <h4>Rahul Kumar</h4>
                                <span>B.Tech Student</span>
                            </div>
                        </div>
                        <div className="testimonial-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="quote-icon">❝</div>
                            <p className="testimonial-text">The guidance I received for my medical entrance was invaluable. They truly care about your future and provide end-to-end support.</p>
                            <div className="testimonial-author">
                                <h4>Priya Singh</h4>
                                <span>MBBS Student</span>
                            </div>
                        </div>
                        <div className="testimonial-card" data-aos="fade-left" data-aos-delay="200">
                            <div className="quote-icon">❝</div>
                            <p className="testimonial-text">I am now studying in Canada thanks to the immigration assistance provided by the foundation. Highly recommended!</p>
                            <div className="testimonial-author">
                                <h4>Amit Sharma</h4>
                                <span>International Student</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2 data-aos="fade-up">Ready to Shape Your Future?</h2>
                    <p data-aos="fade-up" data-aos-delay="100">Apply for our scholarship programs today and take the first step towards your dreams.</p>
                    <Link to="/apply" className="btn btn-accent btn-lg" data-aos="zoom-in" data-aos-delay="200">Apply Now</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
