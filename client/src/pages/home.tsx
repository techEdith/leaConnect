import React from 'react';
import { useLocation } from 'wouter';
import FeatureCard from '../components/common/FeatureCard';

interface HomePageProps {
  user: any;
  userProfile: any;
  onLogout: () => void;
}

export default function HomePage({ user, userProfile, onLogout }: HomePageProps) {
  const [, setLocation] = useLocation();
  const displayName = userProfile 
    ? `${userProfile.firstName} ${userProfile.lastName}`
    : user?.displayName || user?.email;

  const features = [
    {
      icon: '🎯',
      title: 'Flashcard Learning',
      description: 'Learn Swahili words with audio pronunciation, translations, and cultural context from your family heritage.',
      onClick: () => setLocation('/flashcards')
    },
    {
      icon: '📚',
      title: 'Heritage Dictionary',
      description: 'Explore a rich collection of Swahili words with definitions, family recordings, and cultural stories.',
      onClick: () => setLocation('/dictionary')
    },
    {
      icon: '📈',
      title: 'Learning Progress',
      description: 'Track your journey in connecting with your cultural roots through language mastery.',
      onClick: () => setLocation('/progress')
    },
    {
      icon: '👵',
      title: 'Family Contributions',
      description: 'Listen to recordings from grandparents and family members sharing proverbs and cultural wisdom.',
      onClick: () => setLocation('/family')
    }
  ];

  return (
    <div className="home-screen">
      {/* Header with logout button */}
      <header className="home-header">
        <h1>Welcome, {displayName}!</h1>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </header>

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
            onClick={() => setLocation('/flashcards')}
          >
            Start Learning Today
          </button>
        </div>
      </div>
    </div>
  );
};
