import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getDialects } from "@/lib/firebase";
import type { Language, Dialect } from "@shared/schema";

interface DialectSelectionProps {
  selectedLanguage: Language;
  selectedDialect: Dialect | null;
  onDialectSelect: (dialect: Dialect) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
}

export default function DialectSelection({ 
  selectedLanguage, 
  selectedDialect, 
  onDialectSelect, 
  onNext, 
  onBack, 
  canProceed 
}: DialectSelectionProps) {
  const { data: dialects = [], isLoading, error } = useQuery({
    queryKey: [`/api/languages/${selectedLanguage.id}/dialects`],
    queryFn: () => getDialects(selectedLanguage.id),
    enabled: !!selectedLanguage,
  });

  const handleDialectChange = (dialectId: string) => {
    const dialect = dialects.find((d: Dialect) => d.id.toString() === dialectId);
    if (dialect) {
      onDialectSelect(dialect);
    }
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
        <p className="text-red-500">Failed to load dialects. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral mb-3">Select Your Dialect</h2>
        <p className="text-gray-600">Choose the specific dialect or regional variation you'd like to focus on.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{selectedLanguage.flag}</span>
          <div>
            <div className="font-semibold text-neutral">{selectedLanguage.name}</div>
            <div className="text-sm text-gray-600">Selected Language</div>
          </div>
        </div>
      </div>

      {dialects.length > 0 ? (
        <div className="space-y-3 mb-8">
          <RadioGroup 
            value={selectedDialect?.id.toString() || ""} 
            onValueChange={handleDialectChange}
          >
            {dialects.map((dialect: Dialect) => (
              <div key={dialect.id} className="flex items-center space-x-3">
                <RadioGroupItem 
                  value={dialect.id.toString()} 
                  id={`dialect-${dialect.id}`}
                  className="text-primary"
                />
                <Label 
                  htmlFor={`dialect-${dialect.id}`}
                  className="flex-1 p-4 border border-gray-200 rounded-xl hover:border-primary hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    <div className="font-medium text-neutral">{dialect.name}</div>
                    {dialect.description && (
                      <div className="text-sm text-gray-500">{dialect.description}</div>
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 mb-8">
          No specific dialects available for {selectedLanguage.name}. You can continue with the standard version.
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
          className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
        >
          Continue
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
}
