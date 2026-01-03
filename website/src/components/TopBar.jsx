import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import './TopBar.css';

const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="container top-bar-container">
                <div className="helpline">
                    <span className="helpline-icon"><FaPhoneAlt /></span>
                    <span>Help Line : +91 941 910 1940</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
