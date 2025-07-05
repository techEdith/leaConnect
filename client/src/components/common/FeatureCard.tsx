
import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="feature-card bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
    >
      <div className="feature-icon text-4xl mb-4">{icon}</div>
      <h3 className="feature-title text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="feature-description text-white/90 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
