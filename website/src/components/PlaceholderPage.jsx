import React from 'react';

const PlaceholderPage = ({ title }) => {
    return (
        <div className="container" style={{ padding: '8rem 20px 4rem', textAlign: 'center' }}>
            <h1 className="section-title">{title}</h1>
            <p className="section-subtitle">This page is currently under construction.</p>
            <div style={{ fontSize: '5rem', margin: '2rem 0' }}>🚧</div>
            <p>We are working hard to bring you this content. Please check back soon!</p>
        </div>
    );
};

export default PlaceholderPage;
