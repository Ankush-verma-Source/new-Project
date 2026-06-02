import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-icon-wrapper">
          <FaExclamationTriangle className="not-found-icon" />
        </div>
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-text">
          Oops! The page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-accent return-home-btn">
          <FaHome style={{ marginRight: '8px' }} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
