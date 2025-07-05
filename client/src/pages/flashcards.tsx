
import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { flashcards } from '../data/flashcards';

// Simple FlashcardComponent for this page
const FlashcardComponent: React.FC<{
  card: any;
  showAnswer: boolean;
  onShowAnswer: () => void;
  onAnswer: (isCorrect: boolean) => void;
  playPronunciation: (word: string) => void;
}> = ({ card, showAnswer, onShowAnswer, onAnswer, playPronunciation }) => {
  return (
    <div className="flashcard-container">
      <div className="flashcard">
        <div className="flashcard-front">
          <div className="card-header">
            <h2>{card.word}</h2>
            <button 
              className="pronunciation-btn" 
              onClick={() => onShowAnswer ? null : playPronunciation(card.word)}
              title="Play pronunciation"
            >
              <Volume2 size={20} />
            </button>
          </div>
          {card.pronunciation && <p className="pronunciation-guide">[{card.pronunciation}]</p>}
          <p className="word-example">{card.example}</p>
        </div>

        {!showAnswer ? (
          <button onClick={onShowAnswer} className="show-answer-btn">
            Show Translation & Cultural Context
          </button>
        ) : (
          <div className="flashcard-back">
            <p><strong>Translation:</strong> {card.translation}</p>
            {card.culturalNote && (
              <div className="cultural-note-section">
                <h4>Cultural Context</h4>
                <p>{card.culturalNote}</p>
              </div>
            )}
            <div className="answer-buttons">
              <button onClick={() => onAnswer(false)} className="incorrect-btn">
                ❌ Need Practice
              </button>
              <button onClick={() => onAnswer(true)} className="correct-btn">
                ✅ I Know This
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

  const playPronunciation = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'sw'; // Swahili language code
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

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
          playPronunciation={playPronunciation}
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
