import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

// Dynamically import pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Scholarships = lazy(() => import('./pages/Scholarships'));
const Impact = lazy(() => import('./pages/Impact'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// A sleek fallback loading element
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    flexDirection: 'column',
    color: '#002147'
  }}>
    <div className="btn-spinner" style={{
      width: '40px',
      height: '40px',
      borderWidth: '3px',
      borderColor: '#002147',
      borderTopColor: 'transparent',
      marginBottom: '15px'
    }}></div>
    <p style={{ fontWeight: 600 }}>Loading page...</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <Header />
        <main style={{ flex: 1 }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/scholarships" element={<Scholarships />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        {/* Floating WhatsApp Widget */}
        <div className="wa-wrap">
          <div className="wa-tip">Chat on WhatsApp</div>
          <a className="wa-btn" href="https://wa.me/919103252871?text=Hi%2C%20I%20am%20interested%20in%20getting%20counselling%20from%20Global%20Education%20Guide%20Foundation." target="_blank" rel="noopener noreferrer">
            <div className="wa-pulse"></div>
            <FaWhatsapp className="wa-icon" />
          </a>
        </div>
      </div>
    </Router>
  );
}

export default App;
