import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import { Search, Volume2 } from 'lucide-react';

const DictionaryScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWords = flashcards.filter(card => 
    card.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const playAudio = (word) => {
    // Fallback for demo using speech synthesis
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'sw-KE';
    speechSynthesis.speak(utterance);
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
        <h1>Heritage Dictionary</h1>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search words, translations, or meanings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="dictionary-content">
        <div className="dictionary-stats">
          <span>{filteredWords.length} words found</span>
        </div>

        <div className="dictionary-list">
          {filteredWords.map((card) => (
            <div key={card.id} className="dictionary-item">
              <div className="word-header">
                <div className="word-main-info">
                  <h3 className="word-title">{card.word}</h3>
                  <span className="word-translation">({card.translation})</span>
                </div>
                <button 
                  className="audio-button-small"
                  onClick={() => playAudio(card.word)}
                >
                  <Volume2 size={18} />
                </button>
              </div>

              <p className="word-definition">{card.definition}</p>

              {card.culturalNote && (
                <div className="cultural-note-small">
                  <strong>Cultural Note:</strong> {card.culturalNote}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredWords.length === 0 && searchQuery && (
          <div className="no-results">
            <p>No words found for "{searchQuery}"</p>
            <p>Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DictionaryScreen;