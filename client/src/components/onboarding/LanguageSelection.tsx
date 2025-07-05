import React from "react";
import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, ArrowLeft, ArrowRight, Globe } from "lucide-react";
import type { Language } from "../../../../shared/schema";

interface LanguageSelectionProps {
  selectedLanguage: Language | null;
  onLanguageSelect: (language: Language) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
}

export default function LanguageSelection({ 
  selectedLanguage, 
  onLanguageSelect, 
  onNext, 
  onBack, 
  canProceed 
}: LanguageSelectionProps) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/languages');
      if (!response.ok) {
        throw new Error('Failed to fetch languages');
      }
      const data = await response.json();
      setLanguages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load languages');
    } finally {
      setLoading(false);
    }
  };

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading languages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchLanguages} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-neutral mb-2">Choose Your Heritage Language</h2>
        <p className="text-gray-600">Select the language you want to learn or reconnect with</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder="Search languages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-primary transition-colors"
        />
      </div>

      <div className="grid gap-3 mb-8 max-h-96 overflow-y-auto">
        {filteredLanguages.map((language) => (
          <Card
            key={language.id}
            className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
              selectedLanguage?.id === language.id
                ? 'ring-2 ring-primary bg-primary/5 border-primary'
                : 'border-gray-200 hover:border-primary/50'
            }`}
            onClick={() => onLanguageSelect(language)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-neutral">{language.name}</h3>
                <p className="text-gray-600 text-sm">{language.nativeName}</p>
              </div>
              {selectedLanguage?.id === language.id && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredLanguages.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500">No languages found matching "{searchTerm}"</p>
        </div>
      )}

      <div className="flex space-x-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 bg-gradient-to-r from-purple-600 to-amber-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
}