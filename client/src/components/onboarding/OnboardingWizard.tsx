import React from "react";
import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Globe, Heart, ArrowLeft, ArrowRight } from "lucide-react";
import LanguageSelection from "./LanguageSelection";
import DialectSelection from "./DialectSelection";
import FamilyMembers from "./FamilyMembers";
import LearningGoals from "./LearningGoals";
import CompletionScreen from "./CompletionScreen";
import type { Language, Dialect, FamilyMember } from "../../../../shared/schema";

export interface OnboardingState {
  currentStep: number;
  selectedLanguage: Language | null;
  selectedDialect: Dialect | null;
  familyMembers: Omit<FamilyMember, 'id' | 'userId' | 'createdAt'>[];
  dailyGoal: number;
}

const TOTAL_STEPS = 5;

interface OnboardingWizardProps {
  onComplete?: () => void;
}

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [state, setState] = useState<OnboardingState>({
    currentStep: 1,
    selectedLanguage: null,
    selectedDialect: null,
    familyMembers: [],
    dailyGoal: 5,
  });

  const progressPercentage = (state.currentStep / TOTAL_STEPS) * 100;

  const updateState = (updates: Partial<OnboardingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (state.currentStep < TOTAL_STEPS) {
      updateState({ currentStep: state.currentStep + 1 });
    }
  };

  const previousStep = () => {
    if (state.currentStep > 1) {
      updateState({ currentStep: state.currentStep - 1 });
    }
  };

  const canProceed = () => {
    switch (state.currentStep) {
      case 2:
        return state.selectedLanguage !== null;
      case 3:
        return state.selectedDialect !== null;
      case 4:
        return true; // Family members are optional
      case 5:
        return state.dailyGoal > 0;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <WelcomeStep onNext={nextStep} />;
      case 2:
        return (
          <LanguageSelection
            selectedLanguage={state.selectedLanguage}
            onLanguageSelect={(language) => updateState({ selectedLanguage: language })}
            onNext={nextStep}
            onBack={previousStep}
            canProceed={canProceed()}
          />
        );
      case 3:
        return (
          <DialectSelection
            selectedLanguage={state.selectedLanguage!}
            selectedDialect={state.selectedDialect}
            onDialectSelect={(dialect) => updateState({ selectedDialect: dialect })}
            onNext={nextStep}
            onBack={previousStep}
            canProceed={canProceed()}
          />
        );
      case 4:
        return (
          <FamilyMembers
            familyMembers={state.familyMembers}
            onFamilyMembersChange={(members) => updateState({ familyMembers: members })}
            onNext={nextStep}
            onBack={previousStep}
          />
        );
      case 5:
        return (
          <LearningGoals
            dailyGoal={state.dailyGoal}
            onGoalChange={(goal) => updateState({ dailyGoal: goal })}
            onBack={previousStep}
            onComplete={() => updateState({ currentStep: 6 })}
            canProceed={canProceed()}
          />
        );
      case 6:
        return (
          <CompletionScreen
            selectedLanguage={state.selectedLanguage!}
            selectedDialect={state.selectedDialect}
            familyMembers={state.familyMembers}
            dailyGoal={state.dailyGoal}
            onComplete={onComplete}
          />
        );
      default:
        return null;
    }
  };

  if (state.currentStep === 6) {
    return renderStep();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl">
        <Card className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-100 h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-amber-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full flex items-center justify-center">
                  <Globe className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-neutral">Lea Connect</h1>
                  <p className="text-sm text-gray-500">Where Language Builds Connections</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Step <span className="font-medium text-primary">{state.currentStep}</span> of <span className="font-medium">{TOTAL_STEPS}</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8">
            {renderStep()}
          </div>
        </Card>
      </div>
    </div>
  );
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-neutral mb-4">Welcome to Your Language Journey</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
          Let's help you connect with your cultural roots and strengthen family bonds through language learning.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-book-open text-blue-600"></i>
          </div>
          <h3 className="font-semibold text-neutral mb-2">Learn</h3>
          <p className="text-sm text-gray-600">Master your heritage language with interactive flashcards</p>
        </div>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-users text-green-600"></i>
          </div>
          <h3 className="font-semibold text-neutral mb-2">Connect</h3>
          <p className="text-sm text-gray-600">Bridge generations and strengthen family communication</p>
        </div>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-trophy text-purple-600"></i>
          </div>
          <h3 className="font-semibold text-neutral mb-2">Grow</h3>
          <p className="text-sm text-gray-600">Track progress and celebrate cultural milestones</p>
        </div>
      </div>

      <Button 
        onClick={onNext}
        className="w-full bg-gradient-to-r from-purple-600 to-amber-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      >
        Let's Get Started
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
}