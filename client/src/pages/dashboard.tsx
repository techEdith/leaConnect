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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={() => window.location.href = "/onboarding"}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Onboarding
          </Button>

          <h1 className="text-4xl font-bold text-neutral mb-2">
            Welcome to LeaConnect! 🎉
          </h1>
          <p className="text-gray-600 text-lg">
            Your language learning journey starts here.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                🌍 Your Language Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p><strong>Native Language:</strong> {profile.nativeLanguage}</p>
                {profile.dialect && (
                  <p><strong>Dialect:</strong> {profile.dialect}</p>
                )}
                <p><strong>Daily Goal:</strong> {profile.dailyGoal} minutes</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                👥 Family Members ({familyMembers?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {familyMembers && familyMembers.length > 0 ? (
                <div className="space-y-2">
                  {familyMembers.map((member: any) => (
                    <div key={member.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span><strong>{member.name}</strong> ({member.relationship})</span>
                      <span className="text-sm text-gray-600 capitalize">{member.proficiency}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No family members added yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🚀 Ready to Start Learning!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Your onboarding is complete! Here's what you can do next:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="p-6 h-auto flex-col bg-primary hover:bg-primary/90">
                <span className="text-2xl mb-2">📚</span>
                <span>Start Lessons</span>
              </Button>
              <Button className="p-6 h-auto flex-col bg-secondary hover:bg-secondary/90">
                <span className="text-2xl mb-2">🎯</span>
                <span>Practice Goals</span>
              </Button>
              <Button className="p-6 h-auto flex-col bg-accent hover:bg-accent/90">
                <span className="text-2xl mb-2">👨‍👩‍👧‍👦</span>
                <span>Family Activities</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}