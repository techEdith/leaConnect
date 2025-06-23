import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

const FlashcardComponent = ({ card, onNext, onPrevious }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (card.audioUrl) {
      const sound = new Howl({
        src: [card.audioUrl],
        volume: 0.7
      });
      setAudio(sound);
    }
  }, [card.audioUrl]);

  const playAudio = () => {
    if (audio) {
      audio.play();
    } else {
      // Fallback for demo
      const utterance = new SpeechSynthesisUtterance(card.word);
      utterance.lang = 'sw-KE';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flashcard-container">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
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
            🔊 Listen to Pronunciation
          </button>
        </div>

        <div className="flashcard-back">
          <div className="word-definition">{card.definition}</div>
          {card.culturalNote && (
            <div className="cultural-note">
              <strong>Cultural Note:</strong> {card.culturalNote}
            </div>
          )}
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