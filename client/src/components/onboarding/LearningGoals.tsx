import React from "react";
import { useState, useEffect } from "react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, Check, Leaf, Star, Flame, Lightbulb } from "lucide-react";

interface LearningGoalsProps {
  dailyGoal: number;
  onGoalChange: (goal: number) => void;
  onBack: () => void;
  onComplete: () => void;
  canProceed: boolean;
}

const GOAL_OPTIONS = [
  {
    value: 3,
    label: "3 words",
    description: "Casual learner",
    timeCommitment: "5 min/day",
    icon: Leaf,
    color: "bg-green-100 group-hover:bg-green-200",
    iconColor: "text-green-600",
  },
  {
    value: 5,
    label: "5 words",
    description: "Regular practice",
    timeCommitment: "10 min/day",
    icon: Star,
    color: "bg-primary",
    iconColor: "text-white",
    recommended: true,
  },
  {
    value: 10,
    label: "10 words",
    description: "Intensive learner",
    timeCommitment: "15 min/day",
    icon: Flame,
    color: "bg-purple-100 group-hover:bg-purple-200",
    iconColor: "text-purple-600",
  },
];

export default function LearningGoals({ 
  dailyGoal, 
  onGoalChange, 
  onBack, 
  onComplete, 
  canProceed 
}: LearningGoalsProps) {
  const [customGoal, setCustomGoal] = useState("");
  const [selectedGoalType, setSelectedGoalType] = useState<'preset' | 'custom'>('preset');

  const handlePresetGoalSelect = (goal: number) => {
    setSelectedGoalType('preset');
    onGoalChange(goal);
  };

  const handleCustomGoalChange = (value: string) => {
    setCustomGoal(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 50) {
      setSelectedGoalType('custom');
      onGoalChange(numValue);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral mb-3">Set Your Learning Goals</h2>
        <p className="text-gray-600">Choose a daily learning target that fits your schedule and keeps you motivated.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {GOAL_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedGoalType === 'preset' && dailyGoal === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => handlePresetGoalSelect(option.value)}
              className={`flex flex-col items-center p-6 border rounded-xl cursor-pointer transition-all duration-300 group ${
                isSelected
                  ? 'border-primary bg-blue-50'
                  : option.recommended
                  ? 'border-2 border-primary bg-blue-50'
                  : 'border border-gray-200 hover:border-primary'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
                option.recommended ? option.color : option.color
              }`}>
                <Icon className={`text-xl ${option.iconColor}`} size={24} />
              </div>
              <div className="text-2xl font-bold text-neutral mb-1">{option.label}</div>
              <div className="text-sm text-gray-500 text-center">
                {option.description}<br/>{option.timeCommitment}
              </div>
              {option.recommended && (
                <div className="mt-2 px-3 py-1 bg-primary text-white text-xs rounded-full">
                  Recommended
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Goal Section */}
      <Card className="bg-amber-50 border border-amber-200 mb-8">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Lightbulb className="text-amber-500 text-xl" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral mb-2">Custom Goal</h3>
              <p className="text-gray-600 text-sm mb-4">
                Want to set a different target? You can always adjust this later in your settings.
              </p>
              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  min="1"
                  max="50"
                  placeholder="Enter number"
                  value={customGoal}
                  onChange={(e) => handleCustomGoalChange(e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center"
                />
                <span className="text-gray-600">words per day</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
          onClick={onComplete}
          disabled={!canProceed}
          className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          Complete Setup
          <Check className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
}
