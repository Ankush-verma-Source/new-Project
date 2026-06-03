import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaGraduationCap, FaUserTie, FaChalkboardTeacher, FaUniversity, FaHandHoldingHeart, FaGlobeAsia, FaClock, FaSearch, FaRobot, FaMagic, FaMedal } from 'react-icons/fa';
import foundationImg from '../assets/foundation-img.png';
import immigrationImg from '../assets/immigration-img.png';
import universityLogos from '../assets/university-logos.png';
import Hero from '../components/Hero';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

const courses = [
  {
    id: 1,
    cat: 'engineering',
    icon: '⚙️',
    bg: '#FEF3C7',
    badge: 'by',
    bl: 'Most Popular',
    name: 'Bachelor of Technology',
    sh: 'B.Tech / BE',
    desc: 'A 4-year undergraduate program covering engineering disciplines from Computer Science to Mechanical, Civil, and Electronics.',
    full: 'B.Tech is one of the most sought-after undergraduate degrees in India. It offers strong career prospects in IT, manufacturing, infrastructure, and emerging tech. Our foundation partners with NAAC A-grade colleges in Punjab and Haryana offering merit-based scholarships to J&K students.',
    dur: '4 Years',
    elig: '12th (PCM, 55%+)',
    exam: 'JEE / Direct',
    schol: '60–100%',
    tags: ['Punjab', 'Haryana', 'AICTE', 'Top Placements'],
    det: [
      ['Duration', '4 Years'],
      ['Eligibility', '12th PCM, 55%+'],
      ['Entrance', 'JEE / Direct Merit'],
      ['Scholarship', '60% – 100%'],
      ['Top Colleges', 'LPU, Chandigarh Univ.'],
      ['Avg Package', '₹4–12 LPA']
    ]
  },
  {
    id: 2,
    cat: 'management',
    icon: '📊',
    bg: '#EDE9FE',
    badge: 'bg',
    bl: '100% Scholarship',
    name: 'Master of Business Administration',
    sh: 'MBA / PGDM',
    desc: 'A 2-year postgraduate management degree developing leadership, strategy, and business acumen for corporate careers.',
    full: 'MBA opens doors to senior management roles across all industries. Our partner colleges in Punjab and Himachal offer strong industry exposure and priority scholarship for J&K students.',
    dur: '2 Years',
    elig: 'Graduation (50%+)',
    exam: 'CAT/MAT/Direct',
    schol: '60–100%',
    tags: ['Punjab', 'Himachal', 'AICTE'],
    det: [
      ['Duration', '2 Years'],
      ['Eligibility', 'Any Graduation, 50%+'],
      ['Entrance', 'CAT/MAT or Direct'],
      ['Scholarship', '60% – 100%'],
      ['Specializations', 'Marketing, Finance, HR'],
      ['Avg Package', '₹5–14 LPA']
    ]
  },
  {
    id: 3,
    cat: 'medical',
    icon: '💊',
    bg: '#D1FAE5',
    badge: 'bg',
    bl: 'Scholarship',
    name: 'Bachelor of Pharmacy',
    sh: 'B.Pharm',
    desc: 'A 4-year program training students in pharmaceutical sciences, drug formulation, quality control, and healthcare.',
    full: 'B.Pharm is a gateway to the booming pharmaceutical and healthcare industry. Graduates work in drug manufacturing, clinical research, hospital pharmacy, and regulatory affairs.',
    dur: '4 Years',
    elig: '12th (PCB/PCM, 50%+)',
    exam: 'GPAT / Direct',
    schol: '60–80%',
    tags: ['Punjab', 'PCI Approved', 'High Demand'],
    det: [
      ['Duration', '4 Years'],
      ['Eligibility', '12th PCB/PCM, 50%+'],
      ['Entrance', 'GPAT or Direct'],
      ['Scholarship', '60% – 80%'],
      ['Approved By', 'PCI, UGC'],
      ['Career', 'Pharma, Hospitals, R&D']
    ]
  },
  {
    id: 4,
    cat: 'law',
    icon: '⚖️',
    bg: '#FEE2E2',
    badge: 'bp',
    bl: 'New Batch',
    name: 'Bachelor of Laws',
    sh: 'LLB / BA LLB',
    desc: 'A prestigious legal degree (3 or 5 years) qualifying students to practice law in India across all courts and tribunals.',
    full: 'Law is one of the most respected professions. BA LLB (5 years) or LLB (3 years) — both available at partner colleges with excellent moot court facilities and bar council recognition.',
    dur: '3 or 5 Years',
    elig: '12th or Graduation',
    exam: 'CLAT / Direct',
    schol: '60–70%',
    tags: ['Haryana', 'BCI Approved', '5-Year'],
    det: [
      ['Duration', '3 Yrs (LLB) / 5 Yrs (BA LLB)'],
      ['Eligibility', '12th or Graduation'],
      ['Entrance', 'CLAT or Direct'],
      ['Scholarship', '60% – 70%'],
      ['Approved By', 'Bar Council of India'],
      ['Career', 'Courts, Corporate, Govt']
    ]
  },
  {
    id: 5,
    cat: 'education',
    icon: '📚',
    bg: '#FEF3C7',
    badge: 'bg',
    bl: 'High Scholarship',
    name: 'Bachelor of Education',
    sh: 'B.Ed',
    desc: 'A 2-year professional degree qualifying graduates to teach at secondary and senior secondary levels in India.',
    full: 'B.Ed is mandatory for teaching at secondary school level (Classes 6–12). NCTE-approved programs at partner colleges qualify students for TGT/PGT examinations.',
    dur: '2 Years',
    elig: 'Graduation (50%+)',
    exam: 'Direct / State CET',
    schol: '60–90%',
    tags: ['Punjab', 'NCTE Approved', 'TGT/PGT'],
    det: [
      ['Duration', '2 Years'],
      ['Eligibility', 'Any Graduation, 50%+'],
      ['Entrance', 'Direct / CET'],
      ['Scholarship', '60% – 90%'],
      ['Approved By', 'NCTE'],
      ['Eligible For', 'TGT, PGT exams']
    ]
  },
  {
    id: 6,
    cat: 'it',
    icon: '💻',
    bg: '#EDE9FE',
    badge: 'by',
    bl: 'Top Choice',
    name: 'Bachelor of Computer Applications',
    sh: 'BCA',
    desc: 'A 3-year undergraduate program in computer science and IT applications — a fast-track to the tech industry.',
    full: 'BCA is ideal for students interested in software development. MNCs like TCS, Infosys, and Wipro actively recruit BCA graduates. Scholarships up to 80% available.',
    dur: '3 Years',
    elig: '12th (any stream, 45%+)',
    exam: 'Direct',
    schol: '60–80%',
    tags: ['Punjab', 'MNC Placements', 'Tech Skills'],
    det: [
      ['Duration', '3 Years'],
      ['Eligibility', '12th Any Stream, 45%+'],
      ['Entrance', 'Direct Merit'],
      ['Scholarship', '60% – 80%'],
      ['Top Skills', 'Java, Python, Web, DB'],
      ['Avg Package', '₹3–8 LPA']
    ]
  },
  {
    id: 7,
    cat: 'management',
    icon: '🏢',
    bg: '#FEF3C7',
    badge: 'by',
    bl: 'Scholarship',
    name: 'Bachelor of Business Administration',
    sh: 'BBA',
    desc: 'A 3-year undergraduate management program building foundational skills in business, entrepreneurship, and leadership.',
    full: 'BBA is perfect for students entering the business world early or pursuing an MBA later. Specializations in Marketing, Finance, International Business, and HR.',
    dur: '3 Years',
    elig: '12th (any stream, 50%+)',
    exam: 'Direct',
    schol: '60–80%',
    tags: ['Punjab', 'Haryana', 'Management'],
    det: [
      ['Duration', '3 Years'],
      ['Eligibility', '12th Any Stream, 50%+'],
      ['Entrance', 'Direct Merit'],
      ['Scholarship', '60% – 80%'],
      ['Specializations', 'Marketing, Finance, HR'],
      ['MBA Pathway', 'Direct MBA Eligible']
    ]
  },
  {
    id: 8,
    cat: 'medical',
    icon: '🦷',
    bg: '#D1FAE5',
    badge: 'bp',
    bl: 'New Seats',
    name: 'Bachelor of Dental Surgery',
    sh: 'BDS',
    desc: 'A 5-year undergraduate dental degree followed by 1-year internship, qualifying students for dental practice across India.',
    full: 'BDS is a premier medical degree for dental surgeons. DCI-approved colleges with advanced simulation labs and hospital tie-ups for clinical training.',
    dur: '5 Years + Internship',
    elig: '12th (PCB, 50%+)',
    exam: 'NEET',
    schol: '30–50%',
    tags: ['Punjab', 'DCI Approved', 'NEET'],
    det: [
      ['Duration', '5 Years + 1 Yr Internship'],
      ['Eligibility', '12th PCB, 50%+'],
      ['Entrance', 'NEET Required'],
      ['Scholarship', '30% – 50%'],
      ['Approved By', 'Dental Council of India'],
      ['Career', 'Hospitals, Private Practice']
    ]
  }
];


const Home = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [aiSummary, setAiSummary] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);

    const runSearch = () => {
        const query = searchInput.trim();
        setSearchQuery(query);
        
        if (query.length > 2) {
            setAiLoading(true);
            setAiSummary(null);
            setTimeout(() => {
                setAiLoading(false);
                // Generate a custom smart summary based on matched courses
                const qLower = query.toLowerCase();
                const matched = courses.filter(c => 
                    c.name.toLowerCase().includes(qLower) || 
                    c.sh.toLowerCase().includes(qLower) ||
                    c.tags.some(t => t.toLowerCase().includes(qLower))
                );

                if (matched.length > 0) {
                    const first = matched[0];
                    setAiSummary(
                        `Based on your search for <strong>${query}</strong>, we found <strong>${first.name} (${first.sh})</strong>. This is a <strong>${first.dur}</strong> program requiring <strong>${first.elig}</strong>. Admissions are via <strong>${first.exam}</strong>. Global Education Guide Foundation helps secure <strong>${first.schol} scholarships</strong> at leading partner universities. Career scope includes high-paying roles with average packages of <strong>${first.det.find(d => d[0].includes('Package'))?.[1] || '₹3-8 LPA'}</strong>.`
                    );
                } else {
                    setAiSummary(
                        `We couldn't find a direct match for <strong>${query}</strong>. However, Global Education Guide Foundation assists J&K students in securing <strong>60–100% scholarships</strong> for B.Tech, MBA, B.Pharm, Law, and B.Ed programs at premier universities. Deserving SC/ST category students can access <strong>100% free education</strong>. Contact our support team to explore options.`
                    );
                }
            }, 600);
        } else {
            setAiSummary(null);
        }
    };

    const filteredCourses = courses.filter((c) => {
        const matchesCategory = activeCategory === 'all' || c.cat === activeCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = !q || 
            c.name.toLowerCase().includes(q) ||
            c.sh.toLowerCase().includes(q) ||
            c.desc.toLowerCase().includes(q) ||
            c.tags.some(t => t.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
    });

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
        });
    }, []);

    return (
        <div className="home">
            <Helmet>
                <title>Global Education Guide | Study Abroad Consultants</title>
                <meta name="description" content="Global Education Guide provides study abroad counselling, university admissions support, scholarships guidance and visa assistance." />
                <link rel="canonical" href="https://www.globaleducationguide.in/" />
                <meta property="og:title" content="Global Education Guide | Study Abroad Consultants" />
                <meta property="og:description" content="Global Education Guide provides study abroad counselling, university admissions support, scholarships guidance and visa assistance." />
                <meta property="og:url" content="https://www.globaleducationguide.in/" />
                <meta property="og:image" content="https://www.globaleducationguide.in/logo.png" />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Global Education Guide | Study Abroad Consultants" />
                <meta property="twitter:description" content="Global Education Guide provides study abroad counselling, university admissions support, scholarships guidance and visa assistance." />
                <meta property="twitter:image" content="https://www.globaleducationguide.in/logo.png" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "EducationalOrganization",
                        "name": "Global Education Guide",
                        "url": "https://www.globaleducationguide.in",
                        "logo": "https://www.globaleducationguide.in/logo-square.png"
                    })}
                </script>
            </Helmet>
            <Hero />

            {/* Stats Bar */}
            <div className="stats-bar">
                <div className="container">
                    <div className="stats-bar-grid">
                        <div className="stats-bar-item">
                            <h3>25334+</h3>
                            <p>Students Guided</p>
                        </div>
                        <div className="stats-bar-item">
                            <h3>1500K</h3>
                            <p>Scholarship Support</p>
                        </div>
                        <div className="stats-bar-item">
                            <h3>4.9/5</h3>
                            <p>Student Reviews</p>
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
                                <p>Empowering Education for a Brighter Future. We provide career guidance and help secure scholarships covering 60% to 100% of fees for all programs.</p>
                            </div>
                        </div>
                        <div className="service-item" data-aos="fade-up" data-aos-delay="100">
                            <div className="service-icon-wrapper">
                                <FaGraduationCap />
                            </div>
                            <div className="service-content">
                                <h3>Counselling &amp; Scholarships</h3>
                                <p>Comprehensive Counselling &amp; Scholarship Support. We guide you to top universities with direct admission and free education for SC/ST categories.</p>
                            </div>
                        </div>
                        <div className="service-item" data-aos="fade-up" data-aos-delay="200">
                            <div className="service-icon-wrapper">
                                <FaChalkboardTeacher />
                            </div>
                            <div className="service-content">
                                <h3>Admission Guidance</h3>
                                <p>Expert Educational Consultancy. We help you identify the best colleges, guide you through the admission process, and assist with scholarship applications.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="section courses-section" id="courses">
                <div className="container">
                    <div className="section-header" data-aos="fade-up">
                        <div className="pill-tag">— AI Course Finder</div>
                        <h2 className="section-title">Find Your Perfect Course</h2>
                        <p className="section-subtitle">Search any course and get an AI-powered summary — eligibility, duration, career scope &amp; scholarship/admission guidance details.</p>
                    </div>

                    {/* Search UI Container */}
                    <div className="courses-search-container" data-aos="fade-up">
                        <div className="search-box-wrapper">
                            <div className="search-box">
                                <FaSearch className="search-box-icon" />
                                <input 
                                    type="text" 
                                    placeholder="Search B.Tech, MBA, BBA, Pharmacy, Law..." 
                                    value={searchInput}
                                    onChange={(e) => {
                                        setSearchInput(e.target.value);
                                        if (e.target.value === '') {
                                            setSearchQuery('');
                                            setAiSummary(null);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') runSearch();
                                    }}
                                    autoComplete="off"
                                />
                                <button className="search-btn" onClick={runSearch}>
                                    <FaMagic /> Search
                                </button>
                            </div>
                        </div>

                        <div className="ai-tag">
                            <FaRobot className="ai-tag-icon" />
                            <span><strong>AI-powered</strong> summaries · 2025 admissions</span>
                        </div>

                        <div className="chips">
                            {[
                                { label: 'All', value: 'all' },
                                { label: 'Engineering', value: 'engineering' },
                                { label: 'Management', value: 'management' },
                                { label: 'Medical', value: 'medical' },
                                { label: 'Law', value: 'law' },
                                { label: 'Education', value: 'education' },
                                { label: 'IT & Computing', value: 'it' }
                            ].map((chip) => (
                                <button 
                                    key={chip.value}
                                    className={`chip ${activeCategory === chip.value ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(chip.value)}
                                >
                                    {chip.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AI Loading State */}
                    {aiLoading && (
                        <div className="ai-load vis">
                            <div className="ldots">
                                <div className="ldot"></div>
                                <div className="ldot"></div>
                                <div className="ldot"></div>
                            </div>
                            <p style={{ color: '#64748b' }}>Finding best courses for you...</p>
                        </div>
                    )}

                    {/* AI Summary Block */}
                    {!aiLoading && aiSummary && (
                        <div className="ai-summary vis">
                            <div className="ai-sum-label">
                                <FaRobot style={{ marginRight: '6px' }} /> AI Summary
                            </div>
                            <div 
                                className="ai-sum-text" 
                                dangerouslySetInnerHTML={{ __html: aiSummary }}
                            />
                        </div>
                    )}

                    {/* No Results Found */}
                    {!aiLoading && filteredCourses.length === 0 && (
                        <div className="no-res vis">
                            <span className="no-res-icon" style={{ fontSize: '32px', display: 'block', marginBottom: '10px' }}>😢</span>
                            <p style={{ color: '#64748b' }}>No courses found. Try different keywords or call our support team.</p>
                        </div>
                    )}

                    {/* Courses Grid */}
                    {!aiLoading && filteredCourses.length > 0 && (
                        <div className="courses-grid" data-aos="fade-up">
                            {filteredCourses.map((course) => (
                                <div key={course.id} className="course-card" onClick={() => setSelectedCourse(course)}>
                                    <div className="course-card-header">
                                        <div className="course-card-icon" style={{ backgroundColor: course.bg }}>
                                            {course.icon}
                                        </div>
                                        <span className={`course-card-badge ${course.badge}`}>
                                            {course.bl}
                                        </span>
                                    </div>
                                    <h3 className="course-card-name">{course.name}</h3>
                                    <div className="course-card-sh">{course.sh}</div>
                                    <p className="course-card-desc">{course.desc}</p>
                                    <div className="course-card-meta">
                                        <div className="meta-item">
                                            <FaClock className="meta-icon" /> {course.dur}
                                        </div>
                                        <div className="meta-item">
                                            <FaGraduationCap className="meta-icon" /> {course.elig}
                                        </div>
                                    </div>
                                    <div className="course-card-tags">
                                        {course.tags.map((tag, idx) => (
                                            <span key={idx} className="course-card-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="course-card-footer">
                                        <div className="scholarship-badge">
                                            🏆 {course.schol} Scholarship
                                        </div>
                                        <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); setSelectedCourse(course); }}>
                                            Details →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Foundation Section (Image Left with Overlay) */}
            <section className="section section-alt" id="about">
                <div className="container">
                    <div className="foundation-content">
                        <div className="foundation-image-wrapper" data-aos="fade-right">
                            <img src={foundationImg} alt="Students Celebrating" className="foundation-image" loading="lazy" />

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
                            <h2 className="foundation-title">Welcome to Global Education Guide Foundation</h2>

                            <p className="foundation-desc">
                                Located at 17 A/C Gandhi Nagar, Jammu, Jammu and Kashmir, Global Education Guide Foundation is a leading educational consultancy dedicated to making higher education accessible and affordable for J&K students. We guide students to secure admissions and scholarships ranging from 60% to 100% for undergraduate (UG) and postgraduate (PG) programs. Our mission is to support students in their academic journey by facilitating admissions to various esteemed colleges and universities in Punjab, Haryana &amp; Himachal, ensuring no deserving student is left behind due to financial constraints. Additionally, we offer free education guidance for students belonging to SC/ST categories.
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
                            <span className="stat-label">Scholarships Facilitated</span>
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
                    <div className="foundation-content">
                        <div className="foundation-image-wrapper" data-aos="fade-right">
                            <img src={immigrationImg} alt="Immigration Assistance" className="foundation-image" loading="lazy" />
                        </div>
                        <div className="foundation-text" data-aos="fade-left">
                            <div className="pill-tag">★ International Institutes You Dream</div>
                            <h2 className="foundation-title">Reliable & Transparent Immigration Assistance for Students Via Foundation</h2>
                            <p className="foundation-desc">
                                Global Education Guide Foundation is committed to providing you with the most authentic, legal, and credible visa information. We offer fully assisted overseas education & settlement guidance to cater individual needs.
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
                            Global Education Guide Foundation has established partnerships and MOUs with top colleges and universities in Punjab, Haryana, Chandigarh, and Delhi. We are committed to helping students secure direct admissions to these prestigious institutions while offering scholarships ranging from 60% to 100%.
                        </p>
                        {/* Logo Grid */}
                        <div className="institutes-grid" style={{ marginTop: '3rem', textAlign: 'center' }}>
                            <img src={universityLogos} alt="Partner Universities" loading="lazy" style={{ maxWidth: '100%', borderRadius: '15px', boxShadow: 'var(--shadow-md)' }} />
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
                            <p className="testimonial-text">Global Education Guide helped me secure a 100% scholarship for my engineering degree. I couldn't have done it without their mentorship.</p>
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
                    <p data-aos="fade-up" data-aos-delay="100">Apply for our counselling &amp; admission guidance today and take the first step towards your dreams.</p>
                    <button 
                        onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })} 
                        className="btn btn-accent btn-lg" 
                        data-aos="zoom-in" 
                        data-aos-delay="200"
                    >
                        Apply Now
                    </button>
                </div>
            </section>

            {/* Course Details Modal */}
            {selectedCourse && (
                <div className="course-modal-overlay" onClick={() => setSelectedCourse(null)}>
                    <div className="course-modal-card" onClick={(e) => e.stopPropagation()}>
                        <button className="course-modal-close" onClick={() => setSelectedCourse(null)}>✕</button>
                        <div className="course-modal-header">
                            <span className="course-modal-icon" style={{ backgroundColor: selectedCourse.bg }}>{selectedCourse.icon}</span>
                            <h3 className="course-modal-title">{selectedCourse.name}</h3>
                            <div className="course-modal-subtitle">{selectedCourse.sh} · {selectedCourse.dur}</div>
                        </div>
                        <div className="course-modal-body">
                            <p className="course-modal-desc">{selectedCourse.full}</p>
                            <div className="course-modal-details">
                                {selectedCourse.det.map(([label, value], idx) => (
                                    <div key={idx} className="course-modal-row">
                                        <span className="modal-row-label">{label}</span>
                                        <span className="modal-row-value">{value}</span>
                                    </div>
                                ))}
                            </div>
                            <button 
                                className="btn btn-accent btn-block" 
                                onClick={() => {
                                    setSelectedCourse(null);
                                    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Enquire About This Course →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
