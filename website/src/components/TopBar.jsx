import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import './TopBar.css';

const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="container top-bar-container">
                <div className="helpline">
                    <span className="helpline-icon"><FaPhoneAlt /></span>
                    <span>Help Line : +91 9103252871</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
