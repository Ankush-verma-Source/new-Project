import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Scholarships from './pages/Scholarships';
import Impact from './pages/Impact';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <Header />
        <main style={{ flex: 1 }}>
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
