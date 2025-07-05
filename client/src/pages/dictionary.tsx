
import React, { useState } from 'react';
import { flashcards } from '../data/flashcards';

interface DictionaryEntry {
  id: number;
  swahili: string;
  english: string;
  pronunciation: string;
  culturalContext?: string;
}

const DictionaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Convert flashcard data to dictionary entries
  const dictionaryEntries: DictionaryEntry[] = flashcards.map((card, index) => ({
    id: index + 1,
    swahili: card.word,
    english: card.translation,
    pronunciation: card.pronunciation || '',
    culturalContext: card.culturalNote
  }));

  const filteredEntries = dictionaryEntries.filter(entry =>
    entry.swahili.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dictionary-screen">
      <div className="dictionary-header">
        <h1>Heritage Dictionary</h1>
        <p>Explore Swahili words with cultural context</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="dictionary-entries">
        {filteredEntries.map((entry) => (
          <div key={entry.id} className="dictionary-entry">
            <div className="word-header">
              <h3 className="swahili-word">{entry.swahili}</h3>
              <span className="pronunciation">[{entry.pronunciation}]</span>
            </div>
            <p className="english-translation">{entry.english}</p>
            {entry.culturalContext && (
              <p className="cultural-context">
                <strong>Cultural Note:</strong> {entry.culturalContext}
              </p>
            )}
          </div>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="no-results">
          <p>No words found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default DictionaryPage;

interface DictionaryEntry {
  id: number;
  swahili: string;
  english: string;
  pronunciation: string;
  culturalContext?: string;
}

const DictionaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);

  // Convert flashcard data to dictionary entries
  const dictionaryEntries: DictionaryEntry[] = flashcards.map((card, index) => ({
    id: index + 1,
    swahili: card.word,
    english: card.translation,
    pronunciation: card.pronunciation || '',
    culturalContext: card.culturalNote
  }));

  const filteredEntries = dictionaryEntries.filter(entry =>
    entry.swahili.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dictionary-screen">
      <div className="dictionary-header">
        <h1>Heritage Dictionary</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Swahili or English..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="dictionary-content">
        <div className="entries-list">
          {filteredEntries.map(entry => (
            <div
              key={entry.id}
              className={`entry-item ${selectedEntry?.id === entry.id ? 'selected' : ''}`}
              onClick={() => setSelectedEntry(entry)}
            >
              <div className="entry-swahili">{entry.swahili}</div>
              <div className="entry-english">{entry.english}</div>
            </div>
          ))}
        </div>

        {selectedEntry && (
          <div className="entry-details">
            <h2>{selectedEntry.swahili}</h2>
            <p className="pronunciation">{selectedEntry.pronunciation}</p>
            <p className="translation">{selectedEntry.english}</p>
            {selectedEntry.culturalContext && (
              <div className="cultural-context">
                <h3>Cultural Context</h3>
                <p>{selectedEntry.culturalContext}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DictionaryPage;
