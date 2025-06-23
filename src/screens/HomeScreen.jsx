
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/common/FeatureCard';

const HomeScreen = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🎯',
      title: 'Flashcard Learning',
      description: 'Learn Swahili words with audio pronunciation, translations, and cultural context from your family heritage.',
      onClick: () => navigate('/flashcards')
    },
    {
      icon: '📚',
      title: 'Heritage Dictionary',
      description: 'Explore a rich collection of Swahili words with definitions, family recordings, and cultural stories.',
      onClick: () => navigate('/dictionary')
    },
    {
      icon: '📈',
      title: 'Learning Progress',
      description: 'Track your journey in connecting with your cultural roots through language mastery.',
      onClick: () => navigate('/progress')
    },
    {
      icon: '👵',
      title: 'Family Contributions',
      description: 'Listen to recordings from grandparents and family members sharing proverbs and cultural wisdom.',
      onClick: () => {}
    }
  ];

  return (
    <div className="screen-content">
      <div className="header">
        <div className="logo">L.E.A.</div>
        <div className="app-title">Learn & Connect</div>
        <div className="app-subtitle">Language • Education • Ancestry</div>
        <div className="tagline">Where Language Builds Connections</div>
      </div>

      <div className="main-content">
        <div className="cultural-banner">
          <div className="cultural-text">
            "Karibu! Ready to strengthen your cultural bonds through Swahili?"
          </div>
        </div>

        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}

        <button 
          className="start-button" 
          onClick={() => navigate('/flashcards')}
        >
          Start Learning Today
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
