
import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { User } from 'firebase/auth';
import '../styles/App.css';

interface UserProfileSectionProps {
  user: User | null;
  onLogout: () => void;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ user, onLogout }) => {
  return (
    <div className="user-profile">
      <div className="profile-info">
        <div className="avatar">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
        <div className="user-details">
          <h3>{user?.displayName || 'User'}</h3>
          <p>{user?.email}</p>
        </div>
      </div>
      <button onClick={onLogout} className="logout-btn">
        <span>🚪</span> Logout
      </button>
    </div>
  );
};

interface AuthScreenProps {
  onAuth: (user: User | null) => void;
}

const AuthPage: React.FC<AuthScreenProps> = ({ onAuth }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Logout function
  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      // Reset form states
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFullName('');
      setError('');
      setIsSignUp(false);
      // Call onAuth callback to update parent component
      if (onAuth) {
        onAuth(null);
      }
    } catch (error: any) {
      setError('Error signing out: ' + error.message);
    }
  };

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (onAuth) {
          onAuth(userCredential.user);
        }
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (onAuth) {
          onAuth(userCredential.user);
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const switchTab = (tab: 'signin' | 'signup'): void => {
    setIsSignUp(tab === 'signup');
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 animate-pulse"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/12 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '6s'}}></div>
        <div className="absolute top-3/5 right-1/12 w-32 h-32 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/4 left-1/5 w-16 h-16 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '4s', animationDuration: '6s'}}></div>
      </div>

      {/* Auth Container */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl border border-white/20 relative animate-in slide-in-from-bottom-8 duration-800">

        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold animate-pulse">
            L
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Lea Connect
          </h1>
          <p className="text-slate-600 text-sm">Where Language Builds Connections</p>
        </div>

        {/* Tab Buttons */}
        <div className="bg-slate-100 rounded-xl p-1 mb-8 relative">
          <div 
            className={`absolute top-1 h-10 w-1/2 bg-white rounded-lg shadow-sm transition-transform duration-300 ${
              isSignUp ? 'translate-x-full' : 'translate-x-0'
            }`}
          ></div>
          <button
            type="button"
            onClick={() => switchTab('signin')}
            className={`relative z-10 w-1/2 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${
              !isSignUp ? 'text-indigo-600' : 'text-slate-500'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchTab('signup')}
            className={`relative z-10 w-1/2 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${
              isSignUp ? 'text-indigo-600' : 'text-slate-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-6">
          {/* Full Name - Only for Sign Up */}
          {isSignUp && (
            <div className="animate-in slide-in-from-left duration-300">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 hover:border-slate-300"
                required={isSignUp}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 hover:border-slate-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 hover:border-slate-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {!isSignUp && (
              <div className="text-right mt-2">
                <button 
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>

          {/* Confirm Password - Only for Sign Up */}
          {isSignUp && (
            <div className="animate-in slide-in-from-right duration-300">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 hover:border-slate-300"
                  required={isSignUp}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-in slide-in-from-top duration-300">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 ${
              isLoading 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]'
            } relative overflow-hidden`}
          >
            <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </div>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </form>

        {/* Social Login Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button 
            type="button"
            className="flex items-center justify-center py-3 px-4 border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl text-red-500">G</span>
          </button>
          <button 
            type="button"
            className="flex items-center justify-center py-3 px-4 border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl">🍎</span>
          </button>
          <button 
            type="button"
            className="flex items-center justify-center py-3 px-4 border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl text-gray-800">⚡</span>
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-slate-500 text-center leading-relaxed">
          By continuing, you agree to our{' '}
          <button className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

// Export the logout function so it can be used elsewhere
export default AuthPage;
export const logout = async (): Promise<boolean> => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
};
