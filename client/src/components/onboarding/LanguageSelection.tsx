import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { getLanguages } from "@/lib/firebase";
import type { Language } from "@shared/schema";

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
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: languages = [], isLoading, error } = useQuery({
    queryKey: ['/api/languages'],
    queryFn: () => getLanguages(),
  });

  const filteredLanguages = languages.filter((language: Language) =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    language.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (language: Language) => {
    onLanguageSelect(language);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load languages. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral mb-3">Choose Your Native Language</h2>
        <p className="text-gray-600">Select the language you'd like to learn or teach to your family.</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={20} />
        </div>
        <Input
          type="text"
          placeholder="Search for your language..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Languages Grid */}
      <div className="mb-6">
        <h3 className="font-semibold text-neutral mb-4">
          {searchTerm ? 'Search Results' : 'Available Languages'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
          {filteredLanguages.map((language: Language) => (
            <button
              key={language.id}
              onClick={() => handleLanguageSelect(language)}
              className={`p-4 border rounded-xl hover:border-primary hover:bg-blue-50 transition-all duration-300 text-left group ${
                selectedLanguage?.id === language.id 
                  ? 'border-primary bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{language.flag}</span>
                <div>
                  <div className={`font-medium ${
                    selectedLanguage?.id === language.id 
                      ? 'text-primary' 
                      : 'text-neutral group-hover:text-primary'
                  }`}>
                    {language.name}
                  </div>
                  <div className="text-xs text-gray-500">{language.nativeName}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {filteredLanguages.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500">
            No languages found matching "{searchTerm}". Try a different search term.
          </div>
        )}
      </div>

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
          className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
}
