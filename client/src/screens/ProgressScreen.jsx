import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Trophy, Target, Calendar, BookOpen } from 'lucide-react';

const ProgressScreen = ({ user, onLogout })  => {
  const navigate = useNavigate();
  const { progress, loading } = useProgress();

  if (loading) {
    return (
      <div className="screen-content">
        <div className="loading-message">Loading your progress...</div>
      </div>
    );
  }

  const progressData = progress || {
    wordsLearned: 0,
    streak: 7,
    totalSessions: 0,
    weeklyGoal: 50,
    weeklyProgress: 0,
    level: 1,
    experience: 0
  };

  const weeklyPercentage = (progressData.weeklyProgress / progressData.weeklyGoal) * 100;
  const experienceToNextLevel = 100;
  const currentLevelProgress = (progressData.experience % experienceToNextLevel);
  const levelPercentage = (currentLevelProgress / experienceToNextLevel) * 100;

  return (
    <div className="progress-screen">
      <div className="user-section">
        <div className="user-info">
          <h2>Your Progress</h2>
          <p>Logged in as: {user?.email}</p>
        </div>
        <button onClick={onLogout} className="logout-button">
          Sign Out
        </button>
      </div>

    <div className="screen-content">
      <div className="screen-header">
        <button 
          className="back-button" 
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
        <h1>Your Progress</h1>
      </div>

      <div className="progress-content">
        {/* Level and Experience */}
        <div className="progress-card level-card">
          <div className="card-header">
            <Trophy className="card-icon" size={24} />
            <h2>Level {progressData.level}</h2>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill level-progress" 
              style={{ width: `${levelPercentage}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {currentLevelProgress} / {experienceToNextLevel} XP to next level
          </p>
        </div>

        {/* Weekly Goal */}
        <div className="progress-card goal-card">
          <div className="card-header">
            <Target className="card-icon" size={24} />
            <h2>Weekly Goal</h2>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill goal-progress" 
              style={{ width: `${Math.min(weeklyPercentage, 100)}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {progressData.weeklyProgress} / {progressData.weeklyGoal} words this week
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <BookOpen className="stat-icon" size={28} />
            <div className="stat-number">{progressData.wordsLearned}</div>
            <div className="stat-label">Words Learned</div>
          </div>

          <div className="stat-card">
            <Calendar className="stat-icon" size={28} />
            <div className="stat-number">{progressData.streak}</div>
            <div className="stat-label">Day Streak</div>
          </div>

          <div className="stat-card">
            <Trophy className="stat-icon" size={28} />
            <div className="stat-number">{progressData.totalSessions}</div>
            <div className="stat-label">Study Sessions</div>
          </div>

          <div className="stat-card">
            <Target className="stat-icon" size={28} />
            <div className="stat-number">{progressData.experience}</div>
            <div className="stat-label">Total XP</div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="achievements-section">
          <h3>Recent Achievements</h3>
          <div className="achievements-list">
            {progressData.streak >= 7 && (
              <div className="achievement-item">
                🔥 7 Day Streak Master
              </div>
            )}
            {progressData.wordsLearned >= 10 && (
              <div className="achievement-item">
                📚 First 10 Words
              </div>
            )}
            {progressData.level >= 2 && (
              <div className="achievement-item">
                ⭐ Level Up!
              </div>
            )}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="motivation-card">
          <h3>Keep Going!</h3>
          <p>{progressData.streak > 0 
            ? `You're on fire! ${progressData.streak} days strong. Don't break the chain!`
            : "Start your learning journey today and build a streak!"
          }</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProgressScreen;