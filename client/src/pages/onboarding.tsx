
import React from 'react';
import OnboardingWizard from '../components/onboarding/OnboardingWizard';

interface OnboardingPageProps {
  onComplete?: () => void;
}

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <OnboardingWizard onComplete={onComplete} />
    </div>
  );
}
