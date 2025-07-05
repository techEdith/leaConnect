
import React, { useState, useEffect } from 'react';
import { flashcards } from '../data/flashcards';
import FlashcardComponent from '../components/flashcards/FlashcardComponent';

const FlashcardScreen: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentCard = flashcards[currentCardIndex];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleAnswer = (isCorrect: boolean) => {
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    setShowAnswer(true);
  };

  return (
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

      <FlashcardComponent
        card={currentCard}
        showAnswer={showAnswer}
        onShowAnswer={() => setShowAnswer(true)}
        onAnswer={handleAnswer}
      />

      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentCardIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardScreen;
