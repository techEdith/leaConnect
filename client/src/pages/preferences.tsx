
import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../services/firebase';
import { getUserProfileFromFirebase, updateUserPreferences } from '../lib/firebase';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { useLocation } from 'wouter';

export default function PreferencesPage() {
  const [user] = useAuthState(auth);
  const [, setLocation] = useLocation();
  const [userProfile, setUserProfile] = useState(null);
  const [onboardingData, setOnboardingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(5);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      const profile = await getUserProfileFromFirebase(user.uid);
      setUserProfile(profile);
      setOnboardingData(profile?.onboardingData);
      setDailyGoal(profile?.onboardingData?.dailyGoal || 5);
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !onboardingData) return;

    setSaving(true);
    try {
      const updatedData = {
        ...onboardingData,
        dailyGoal
      };
      
      await updateUserPreferences(user.uid, updatedData);
      alert('Preferences updated successfully!');
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Failed to update preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="phone-container">
      <div className="phone-notch"></div>
      <div className="phone-screen">
        <div className="app-content">
          <div className="min-h-full bg-gradient-to-br from-purple-400 to-blue-500">
            {/* Header */}
            <div className="home-header">
              <Button
                onClick={() => setLocation('/home')}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1>Preferences</h1>
              <div></div>
            </div>

            {/* Content */}
            <div className="screen-content">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-purple-600">Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <div className="text-gray-900">
                        {userProfile?.firstName} {userProfile?.lastName}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="text-gray-900">{userProfile?.email}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {onboardingData && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-purple-600">Learning Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Native Language
                        </label>
                        <div className="text-gray-900">{onboardingData.nativeLanguage}</div>
                      </div>
                      
                      {onboardingData.dialect && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dialect
                          </label>
                          <div className="text-gray-900">{onboardingData.dialect}</div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Daily Goal
                        </label>
                        <select
                          value={dailyGoal}
                          onChange={(e) => setDailyGoal(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {[1, 2, 3, 5, 10, 15, 20, 30].map((goal) => (
                            <option key={goal} value={goal}>
                              {goal} flashcard{goal > 1 ? 's' : ''} per day
                            </option>
                          ))}
                        </select>
                      </div>

                      {onboardingData.familyMembers && onboardingData.familyMembers.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Family Members
                          </label>
                          <div className="space-y-2">
                            {onboardingData.familyMembers.map((member, index) => (
                              <div key={index} className="bg-gray-50 p-3 rounded-md">
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-gray-600">
                                  {member.relationship} - {member.proficiency}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
        <div className="phone-home-indicator"></div>
      </div>
    </div>
  );
}
