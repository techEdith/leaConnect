import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlashcardComponent from '../components/flashcards/FlashcardComponent';
import { flashcards } from '../data/flashcards';
import { auth } from '../services/firebase';
import { incrementWordsLearned } from '../services/progressService';

const FlashcardScreen = () => {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studiedCards, setStudiedCards] = useState(new Set());

  const currentCard = flashcards[currentCardIndex];

  const handleNext = async () => {
    // Mark current card as studied
    if (!studiedCards.has(currentCardIndex)) {
      setStudiedCards(prev => new Set([...prev, currentCardIndex]));

      // Update progress in Firebase
      if (auth.currentUser) {
        try {
          await incrementWordsLearned(auth.currentUser.uid);
        } catch (error) {
          console.error('Error updating progress:', error);
        }
      }
    }

    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Loop back to start or show completion message
      setCurrentCardIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(flashcards.length - 1);
    }
  };

  return (
    <div className="screen-content">
      <div className="screen-header">
        <button 
          className="back-button" 
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
        <h1>Flashcards</h1>
        <div className="progress-indicator">
          {currentCardIndex + 1} / {flashcards.length}
        </div>
      </div>

      <div className="flashcard-progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
        ></div>
      </div>

      <div className="flashcard-main">
        <FlashcardComponent
          card={currentCard}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>

      <div className="study-stats">
        <div className="stat">
          <span className="stat-number">{studiedCards.size}</span>
          <span className="stat-label">Cards Studied</span>
        </div>
        <div className="stat">
          <span className="stat-number">{flashcards.length - studiedCards.size}</span>
          <span className="stat-label">Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default FlashcardScreen;