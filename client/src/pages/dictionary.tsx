
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
