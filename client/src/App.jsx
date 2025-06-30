import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import HomeScreen from './screens/HomeScreen';
import FlashcardScreen from './screens/FlashcardScreen';
import DictionaryScreen from './screens/DictionaryScreen';
import ProgressScreen from './screens/ProgressScreen';
import AuthScreen from './screens/AuthScreen';
import BottomNavigation from './components/navigation/BottomNavigation';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading Lea Connect...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onAuth={setUser} />;
  }

  return (
    <Router>
      <div className="phone-container">
        <div className="screen">
          <div className="floating-particles" id="particles"></div>

          <Routes>
            <Route path="/" element={<HomeScreen user={user} onLogout={handleLogout} />} />
            <Route path="/flashcards" element={<FlashcardScreen user={user} onLogout={handleLogout} />} />
            <Route path="/dictionary" element={<DictionaryScreen user={user} onLogout={handleLogout} />} />
            <Route path="/progress" element={<ProgressScreen user={user} onLogout={handleLogout} />} />
          </Routes>

          <BottomNavigation />
        </div>
      </div>
    </Router>
  );
}

export default App;