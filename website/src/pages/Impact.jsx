import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Impact.css';

const Impact = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const impactStats = [
        { number: "25,334+", label: "Students Empowered", icon: "👨‍🎓" },
        { number: "1,500+", label: "Scholarships Awarded", icon: "📜" },
        { number: "50+", label: "Partner Universities", icon: "🏛️" },
        { number: "10+", label: "Countries Reached", icon: "🌍" }
    ];

    return (
        <div className="impact-page">
            <section className="impact-hero">
                <div className="container">
                    <h1 data-aos="fade-up">Our Impact</h1>
                    <p data-aos="fade-up" data-aos-delay="100">Changing lives through the power of education.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="impact-stats-grid">
                        {impactStats.map((stat, index) => (
                            <div className="impact-stat-card" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                                <div className="impact-stat-icon">{stat.icon}</div>
                                <h3>{stat.number}</h3>
                                <p>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section section-alt">
                <div className="container">
                    <div className="impact-story" style={{ display: 'block', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <div className="story-text" data-aos="fade-up" style={{ margin: '0 auto' }}>
                            <div className="pill-tag" style={{ display: 'inline-block', margin: '0 auto 15px' }}>Success Stories</div>
                            <h2>Real Stories, Real Change</h2>
                            <p>
                                Since our inception, we have been dedicated to breaking down the barriers to higher education. Our impact goes beyond numbers; it's about the dreams we've helped realize and the futures we've helped build.
                            </p>
                            <p>
                                From small towns in Jammu to international universities in Canada and the UK, our students are making their mark on the world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Impact;
