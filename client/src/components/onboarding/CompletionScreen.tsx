import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Check, ArrowRight, Globe, Users, Target, Clock } from "lucide-react";
import { useLocation } from "wouter";
import { saveOnboardingData } from "../../lib/firebase";
import type { Language, Dialect, FamilyMember } from "../../../../shared/schema";

interface CompletionScreenProps {
  selectedLanguage: Language;
  selectedDialect: Dialect | null;
  familyMembers: Omit<FamilyMember, 'id' | 'userId' | 'createdAt'>[];
  dailyGoal: number;
  onComplete?: () => void;
}


export default function CompletionScreen({
  selectedLanguage,
  selectedDialect,
  familyMembers,
  dailyGoal,
  onComplete,
}: CompletionScreenProps) {
  const [, setLocation] = useLocation();
  const [isCompleting, setIsCompleting] = useState(false);

  const completionMutation = useMutation({
    mutationFn: async () => {
      // For demo purposes, using userId = 1
      // In a real app, this would come from authentication
      const userId = 1;

      const onboardingData = {
        nativeLanguage: selectedLanguage.code,
        dialect: selectedDialect?.name,
        familyMembers,
        dailyGoal,
      };

      return saveOnboardingData(userId, onboardingData);
    },
    onSuccess: () => {
      // Call the onComplete callback or fallback to navigation
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        } else {
          setLocation('/dashboard');
        }
      }, 1500);
    },
    onError: (error) => {
      console.error('Failed to complete onboarding:', error);
      // Handle error - could show toast notification
    },
  });

  const handleComplete = async () => {
    setIsCompleting(true);
    completionMutation.mutate();
  };

  const getTimeCommitment = (goal: number) => {
    if (goal <= 3) return "5 min/day";
    if (goal <= 5) return "10 min/day";
    if (goal <= 10) return "15 min/day";
    return "20+ min/day";
  };

  const languageDisplay = selectedDialect 
    ? `${selectedLanguage.name} (${selectedDialect.name})`
    : selectedLanguage.name;

  if (isCompleting || completionMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-neutral">Setting up your profile...</p>
          <p className="text-sm text-gray-500 mt-2">This will just take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl">
        <Card className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-white text-3xl" size={32} />
              </div>

              <h2 className="text-3xl font-bold text-neutral mb-4">Welcome to Lea Connect!</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Your language learning journey is ready to begin. Let's start building those cultural connections!
              </p>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 mb-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-neutral mb-4">Your Learning Setup</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="text-left">
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="text-primary" size={16} />
                        <span className="font-medium">Language:</span>
                        <span>{languageDisplay}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="text-primary" size={16} />
                        <span className="font-medium">Family Members:</span>
                        <span>{familyMembers.length} added</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="text-primary" size={16} />
                        <span className="font-medium">Daily Goal:</span>
                        <span>{dailyGoal} words</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="text-primary" size={16} />
                        <span className="font-medium">Time Commitment:</span>
                        <span>{getTimeCommitment(dailyGoal)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleComplete}
                disabled={completionMutation.isPending}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Learning
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}