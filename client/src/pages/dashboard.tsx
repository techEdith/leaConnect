import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function DashboardPage() {
  // In a real app, you'd get the actual user ID from authentication
  const userId = 1;

  const { data: profile } = useQuery({
    queryKey: [`/api/user/${userId}/profile`],
  });

  const { data: familyMembers } = useQuery({
    queryKey: [`/api/user/${userId}/family-members`],
  });

  if (!profile?.onboardingCompleted) {
    window.location.href = "/onboarding";
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => window.location.href = "/onboarding"}
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Onboarding
        </Button>
        <h1 className="text-3xl font-bold text-primary mb-6">Welcome to LeaConnect!</h1>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <p className="text-lg text-gray-700">
            Congratulations! You've completed the onboarding process.
          </p>
          <p className="text-gray-600 mt-2">
            Your language learning journey begins here.
          </p>
        </div>
      </div>
    </div>
  );
}