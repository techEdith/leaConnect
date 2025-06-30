
import React from 'react';

const FeatureCard = ({ icon, title, description, onClick }) => {
  return (
    <div className="feature-card" onClick={onClick}>
      <div className="feature-icon">
        {icon}
      </div>
      <div className="feature-content">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
