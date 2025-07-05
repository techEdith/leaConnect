
import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { flashcards } from '../data/flashcards';

const FlashcardsPage: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const playPronunciation = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'sw'; // Swahili language code
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const currentCard = flashcards[currentCardIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (isCorrect: boolean) => {
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  return (
    <div className="flashcard-screen-wrapper">
      <div className="flashcard-screen">
        <div className="flashcard-header">
          <h1>Swahili Flashcards</h1>
          <div className="progress">
            <span>{currentCardIndex + 1} of {flashcards.length}</span>
            <div className="score">
              Score: {score.correct}/{score.total}
            </div>
          </div>
        </div>

        <div className="flashcard-container">
          <div 
            className={`flashcard ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
          >
            <div className="flashcard-front">
              <div className="card-header">
                <h2>{currentCard.word}</h2>
                <button 
                  className="pronunciation-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    playPronunciation(currentCard.word);
                  }}
                  title="Play pronunciation"
                >
                  <Volume2 size={24} />
                </button>
              </div>
              {currentCard.pronunciation && (
                <p className="pronunciation-guide">[{currentCard.pronunciation}]</p>
              )}
              <p className="word-example">{currentCard.example}</p>
              <div className="flip-hint">🔄 Tap to see translation</div>
            </div>

            <div className="flashcard-back">
              <div className="translation-section">
                <h3>Translation</h3>
                <p className="translation-text">{currentCard.translation}</p>
              </div>
              
              {currentCard.culturalNote && (
                <div className="cultural-note-section">
                  <h4>🌍 Cultural Context</h4>
                  <p className="cultural-note">{currentCard.culturalNote}</p>
                </div>
              )}
              
              <div className="answer-buttons">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnswer(false);
                  }} 
                  className="incorrect-btn"
                >
                  ❌ Need Practice
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnswer(true);
                  }} 
                  className="correct-btn"
                >
                  ✅ I Know This
                </button>
              </div>
              
              <div className="flip-hint">🔄 Tap to see word</div>
            </div>
          </div>
        </div>

        <div className="navigation-buttons">
          <button onClick={handlePrevious} className="nav-btn">
            ← Previous
          </button>
          <button onClick={handleNext} className="nav-btn">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;
