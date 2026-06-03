import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navigate = useNavigate();

    const handleApplyClick = () => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
        }
        closeMenu();
    };

    const isAdminPage = location.pathname.startsWith('/admin');

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''} ${isAdminPage ? 'admin-header' : ''}`}>
            <div className="container header-container">
                <Link to="/" className="logo-container" onClick={closeMenu}>
                    <img src={logo} alt="Global Education Guide" className="logo-img" />
                    <span className="logo-text">Global Education Guide</span>
                </Link>

                <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
                    <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>About Us</Link>
                    <Link to="/scholarships" className={`nav-link ${location.pathname === '/scholarships' ? 'active' : ''}`} onClick={closeMenu}>Scholarships</Link>
                    <Link to="/impact" className={`nav-link ${location.pathname === '/impact' ? 'active' : ''}`} onClick={closeMenu}>Our Impact</Link>
                    <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} onClick={closeMenu}>Contact Us</Link>
                    <button onClick={handleApplyClick} className="btn btn-accent nav-btn">Apply Now</button>
                </nav>

                <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </header>
    );
};

export default Header;
