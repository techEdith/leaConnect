
import React from 'react';
import { useLocation } from 'wouter';
import { Home, BookOpen, Search, TrendingUp } from 'lucide-react';

const BottomNavigation = () => {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/flashcards', icon: BookOpen, label: 'Flashcards' },
    { path: '/dictionary', icon: Search, label: 'Dictionary' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' }
  ];

  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.path || (item.path === '/home' && location === '/');

        return (
          <button
            key={item.path}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setLocation(item.path)}
          >
            <Icon size={20} />
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
