import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Scholarships.css';

const Scholarships = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const scholarshipList = [
        {
            title: "Merit-Based Scholarship",
            coverage: "60% - 100%",
            description: "For students with exceptional academic records in their previous qualifying examinations.",
            icon: "🎓"
        },
        {
            title: "SC/ST Free Education",
            coverage: "100%",
            description: "Dedicated program providing completely free education for students from SC/ST categories.",
            icon: "🤝"
        },
        {
            title: "Need-Based Financial Aid",
            coverage: "Up to 80%",
            description: "Support for deserving students who face significant financial hurdles in pursuing higher education.",
            icon: "💰"
        },
        {
            title: "International Study Grant",
            coverage: "Varies",
            description: "Special assistance for students aiming for international universities and global exposure.",
            icon: "🌍"
        }
    ];

    return (
        <div className="scholarships-page">
            <section className="scholarships-hero">
                <div className="container">
                    <h1 data-aos="fade-up">Counselling &amp; Scholarship Guidance</h1>
                    <p data-aos="fade-up" data-aos-delay="100">Guiding you to the best academic opportunities and scholarships.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <div className="pill-tag">Opportunities</div>
                        <h2>Guidance &amp; Scholarship Categories</h2>
                        <p>We assist you in securing programs tailored to your academic profile and financial needs.</p>
                    </div>

                    <div className="scholarships-grid">
                        {scholarshipList.map((item, index) => (
                            <div className="scholarship-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="scholarship-icon">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <div className="coverage-badge">{item.coverage} Coverage</div>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section section-alt">
                <div className="container">
                    <div className="eligibility-content">
                        <div className="eligibility-text" data-aos="fade-right">
                            <h2>Eligibility & Process</h2>
                            <p>Our selection process is transparent and designed to identify the most deserving candidates.</p>
                            <ul className="check-list">
                                <li>Academic performance in 10th, 12th, or Graduation.</li>
                                <li>Family income verification for need-based aid.</li>
                                <li>Valid category certificate for SC/ST programs.</li>
                                <li>Successful completion of the interview process (if applicable).</li>
                            </ul>
                        </div>
                        <div className="eligibility-steps" data-aos="fade-left">
                            <div className="step-item">
                                <div className="step-num">1</div>
                                <div>
                                    <h4>Apply Online</h4>
                                    <p>Fill out the application form with your academic and personal details.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-num">2</div>
                                <div>
                                    <h4>Document Review</h4>
                                    <p>Our team will verify your documents and assess your eligibility.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-num">3</div>
                                <div>
                                    <h4>Admission &amp; Scholarship</h4>
                                    <p>Once selected, we will assist you in securing your admission and scholarship letter from the partner college.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Scholarships;
