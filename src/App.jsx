
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
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

  if (loading) {
    return <div className="loading-screen">Loading Lea Connect...</div>;
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
            <Route path="/" element={<HomeScreen />} />
            <Route path="/flashcards" element={<FlashcardScreen />} />
            <Route path="/dictionary" element={<DictionaryScreen />} />
            <Route path="/progress" element={<ProgressScreen />} />
          </Routes>

          <BottomNavigation />
        </div>
      </div>
    </Router>
  );
}

export default App;
