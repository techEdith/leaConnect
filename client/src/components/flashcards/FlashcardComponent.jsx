import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

const FlashcardComponent = ({ card, onNext, onPrevious }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playAudio = () => {
    // Simple text-to-speech for pronunciation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(card.word);
      utterance.lang = 'sw'; // Swahili language code
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flashcard-container">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        <div className="flashcard-front">
          <div className="word-main">{card.word}</div>
          <div className="word-translation">{card.translation}</div>
          <button 
            className="audio-button" 
            onClick={(e) => {
              e.stopPropagation();
              playAudio();
            }}
          >
            <Volume2 size={20} />
          </button>
          <div className="flip-hint">Tap to see definition</div>
        </div>

        <div className="flashcard-back">
          <div className="word-definition">
            <strong>Definition:</strong>
            <p>{card.definition}</p>
          </div>

          {card.culturalNote && (
            <div className="cultural-note">
              <strong>Cultural Note:</strong>
              <p>{card.culturalNote}</p>
            </div>
          )}

          <div className="flip-hint">Tap to see word</div>
        </div>
      </div>

      <div className="card-actions">
        <button className="previous-button" onClick={onPrevious}>
          ← Previous
        </button>
        <button className="next-button" onClick={onNext}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default FlashcardComponent;