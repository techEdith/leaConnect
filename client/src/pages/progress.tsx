
import React from 'react';
import { Trophy, Target, Calendar, BookOpen } from 'lucide-react';

const ProgressPage: React.FC = () => {
  // Mock progress data
  const progressData = {
    streak: 7,
    wordsLearned: 156,
    totalWords: 500,
    level: 3,
    dailyGoal: 10,
    todayProgress: 7
  };

  const progressPercentage = (progressData.wordsLearned / progressData.totalWords) * 100;
  const dailyProgressPercentage = (progressData.todayProgress / progressData.dailyGoal) * 100;

  return (
    <div className="progress-screen">
      <div className="progress-header">
        <h1>Your Learning Journey</h1>
        <p>Track your progress in connecting with your heritage</p>
      </div>

      <div className="progress-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Trophy className="icon" />
          </div>
          <div className="stat-content">
            <h3>{progressData.streak}</h3>
            <p>Day Streak</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BookOpen className="icon" />
          </div>
          <div className="stat-content">
            <h3>{progressData.wordsLearned}</h3>
            <p>Words Learned</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Target className="icon" />
          </div>
          <div className="stat-content">
            <h3>Level {progressData.level}</h3>
            <p>Current Level</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Calendar className="icon" />
          </div>
          <div className="stat-content">
            <h3>{progressData.todayProgress}/{progressData.dailyGoal}</h3>
            <p>Today's Goal</p>
          </div>
        </div>
      </div>

      <div className="progress-charts">
        <div className="chart-section">
          <h3>Overall Progress</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p>{progressData.wordsLearned} of {progressData.totalWords} words learned</p>
        </div>

        <div className="chart-section">
          <h3>Daily Goal</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill daily" 
              style={{ width: `${dailyProgressPercentage}%` }}
            ></div>
          </div>
          <p>{progressData.todayProgress} of {progressData.dailyGoal} words today</p>
        </div>
      </div>

      <div className="achievements">
        <h3>Recent Achievements</h3>
        <div className="achievement-list">
          <div className="achievement-item">
            <span className="achievement-emoji">🔥</span>
            <span>7-day learning streak!</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-emoji">📚</span>
            <span>Completed 150 words</span>
          </div>
          <div className="achievement-item">
            <span className="achievement-emoji">🎯</span>
            <span>Reached Level 3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
