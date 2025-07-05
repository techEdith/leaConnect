
import React, { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { auth } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthScreen from "./screens/AuthScreen.jsx";
import HomeScreen from "./screens/HomeScreen.tsx";
import OnboardingPage from "./pages/onboarding";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/not-found";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Check if user has completed onboarding
        try {
          const response = await fetch(`/api/user/1/profile`); // Using demo user ID
          if (response.ok) {
            const profile = await response.json();
            setHasCompletedOnboarding(profile?.onboardingCompleted || false);
          }
        } catch (error) {
          console.error('Error checking onboarding status:', error);
          setHasCompletedOnboarding(false);
        }
      } else {
        setHasCompletedOnboarding(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuth = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setHasCompletedOnboarding(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold animate-pulse">
            L
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen" style={{ backgroundColor: 'hsl(var(--background))' }}>
        <Switch>
          <Route path="/">
            {!user ? (
              <AuthScreen onAuth={handleAuth} />
            ) : !hasCompletedOnboarding ? (
              <OnboardingPage onComplete={handleOnboardingComplete} />
            ) : (
              <HomeScreen user={user} onLogout={handleLogout} />
            )}
          </Route>
          <Route path="/auth">
            <AuthScreen onAuth={handleAuth} />
          </Route>
          <Route path="/onboarding">
            {user ? (
              <OnboardingPage onComplete={handleOnboardingComplete} />
            ) : (
              <AuthScreen onAuth={handleAuth} />
            )}
          </Route>
          <Route path="/home">
            {user && hasCompletedOnboarding ? (
              <HomeScreen user={user} onLogout={handleLogout} />
            ) : !user ? (
              <AuthScreen onAuth={handleAuth} />
            ) : (
              <OnboardingPage onComplete={handleOnboardingComplete} />
            )}
          </Route>
          <Route path="/dashboard" component={DashboardPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
