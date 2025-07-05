
import React, { useState } from 'react';
import { flashcards } from '../data/flashcards';

// Simple FlashcardComponent for this page
const FlashcardComponent: React.FC<{
  card: any;
  showAnswer: boolean;
  onShowAnswer: () => void;
  onAnswer: (isCorrect: boolean) => void;
}> = ({ card, showAnswer, onShowAnswer, onAnswer }) => {
  return (
    <div className="flashcard-container">
      <div className="flashcard">
        <div className="flashcard-front">
          <h2>{card.word}</h2>
          <p>Definition: {card.definition}</p>
          {card.pronunciation && <p>Pronunciation: {card.pronunciation}</p>}
        </div>

        {!showAnswer ? (
          <button onClick={onShowAnswer} className="show-answer-btn">
            Show Answer
          </button>
        ) : (
          <div className="flashcard-back">
            <p><strong>Translation:</strong> {card.translation}</p>
            {card.culturalNote && <p><strong>Cultural Note:</strong> {card.culturalNote}</p>}
            <div className="answer-buttons">
              <button onClick={() => onAnswer(false)} className="incorrect-btn">
                ❌ Incorrect
              </button>
              <button onClick={() => onAnswer(true)} className="correct-btn">
                ✅ Correct
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FlashcardsPage: React.FC = () => {
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

        <FlashcardComponent
          card={currentCard}
          showAnswer={showAnswer}
          onShowAnswer={() => setShowAnswer(true)}
          onAnswer={handleAnswer}
        />

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
