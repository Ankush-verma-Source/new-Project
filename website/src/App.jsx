import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Scholarships from './pages/Scholarships';
import Impact from './pages/Impact';
import Contact from './pages/Contact';
import PlaceholderPage from './components/PlaceholderPage';
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
            <Route path="/apply" element={<PlaceholderPage title="Apply for Scholarship" />} />
            <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
