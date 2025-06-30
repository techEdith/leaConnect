import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, Target, BookOpen, Trophy, Calendar } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Globe className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral">Welcome to Lea Connect</h1>
              <p className="text-gray-600">Your language learning journey starts here</p>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Learning Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="text-primary" size={20} />
                  <span>Today's Learning</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral mb-2">Ready to Learn?</h3>
                  <p className="text-gray-600 mb-6">Start your daily language practice with interactive flashcards</p>
                  <Button className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    Start Today's Lesson
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="p-6 h-auto flex flex-col items-center space-y-2">
                    <BookOpen size={24} />
                    <span>Flashcards</span>
                  </Button>
                  <Button variant="outline" className="p-6 h-auto flex flex-col items-center space-y-2">
                    <Globe size={24} />
                    <span>Dictionary</span>
                  </Button>
                  <Button variant="outline" className="p-6 h-auto flex flex-col items-center space-y-2">
                    <Users size={24} />
                    <span>Family</span>
                  </Button>
                  <Button variant="outline" className="p-6 h-auto flex flex-col items-center space-y-2">
                    <Trophy size={24} />
                    <span>Progress</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="text-primary" size={20} />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Daily Goal</span>
                      <span>0/5 words</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weekly Streak</span>
                      <span>0 days</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600">Total Words Learned</div>
                    <div className="text-2xl font-bold text-neutral">0</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="text-primary" size={20} />
                  <span>Family Connections</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="text-blue-600" size={20} />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Connect with family members to share your progress and learn together</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Family
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cultural Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="text-primary" size={20} />
                  <span>Cultural Corner</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-2xl mb-2">🌍</div>
                  <p className="text-sm text-gray-600 mb-4">Discover cultural insights and stories related to your heritage language</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Explore Culture
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
