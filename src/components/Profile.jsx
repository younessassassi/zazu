import { getUserProgress, resetProgress } from '../data/progress';
import lessons from '../data/lessons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getUserProgress());
  const completedCount = Object.keys(progress.completedLessons).length;
  const totalLessons = lessons.length;
  const totalStars = Object.values(progress.completedLessons).reduce(
    (sum, l) => sum + l.stars,
    0
  );
  const maxStars = totalLessons * 3;

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      setProgress(getUserProgress());
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-avatar">🧑‍🎓</div>
        <h1>Your Profile</h1>
        <p className="profile-level">Level {progress.level} French Learner</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon">⚡</div>
          <div className="stat-card-value">{progress.totalXP}</div>
          <div className="stat-card-label">Total XP</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🔥</div>
          <div className="stat-card-value">{progress.currentStreak}</div>
          <div className="stat-card-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">📚</div>
          <div className="stat-card-value">
            {completedCount}/{totalLessons}
          </div>
          <div className="stat-card-label">Lessons Done</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">⭐</div>
          <div className="stat-card-value">
            {totalStars}/{maxStars}
          </div>
          <div className="stat-card-label">Stars Earned</div>
        </div>
      </div>

      <div className="profile-section">
        <h2>Completed Lessons</h2>
        {completedCount === 0 ? (
          <div className="empty-state">
            <p>No lessons completed yet. Start learning!</p>
            <button className="start-btn" onClick={() => navigate('/')}>
              Start Learning
            </button>
          </div>
        ) : (
          <div className="completed-list">
            {lessons
              .filter((l) => progress.completedLessons[l.id])
              .map((lesson) => {
                const lp = progress.completedLessons[lesson.id];
                return (
                  <div key={lesson.id} className="completed-item">
                    <span className="completed-icon">{lesson.icon}</span>
                    <div className="completed-info">
                      <span className="completed-title">{lesson.title}</span>
                      <span className="completed-unit">{lesson.unitName}</span>
                    </div>
                    <div className="completed-stars">
                      {[1, 2, 3].map((s) => (
                        <span
                          key={s}
                          className={`star ${s <= lp.stars ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="completed-score">
                      {lp.bestScore}/{lp.maxScore}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2>Settings</h2>
        <button className="reset-btn" onClick={handleReset}>
          Reset All Progress
        </button>
      </div>
    </div>
  );
}
