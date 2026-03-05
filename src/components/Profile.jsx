import { getUserProgress, resetProgress, getGrade } from '../data/progress';
import lessons from '../data/lessons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [progress, setProgress] = useState(getUserProgress());
  const completedCount = Object.keys(progress.completedLessons).length;
  const totalLessons = lessons.length;

  // Calculate average grade
  const completedEntries = Object.values(progress.completedLessons);
  const avgAccuracy = completedEntries.length > 0
    ? completedEntries.reduce((sum, l) => sum + (l.bestScore / l.maxScore), 0) / completedEntries.length
    : 0;
  const avgGrade = completedEntries.length > 0 ? getGrade(avgAccuracy) : '—';

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      await resetProgress();
      setProgress(getUserProgress());
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="profile">
      <div className="profile-header">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="" className="profile-avatar-img" referrerPolicy="no-referrer" />
        ) : (
          <div className="profile-avatar">🧑‍🎓</div>
        )}
        <h1>{user?.displayName || 'Learner'}</h1>
        <p className="profile-email">{user?.email}</p>
        <p className="profile-level">Level {progress.level} — {completedCount > 0 ? `Average: ${avgGrade}` : 'Beginner'}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon">💎</div>
          <div className="stat-card-value">{progress.totalXP}</div>
          <div className="stat-card-label">Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🔥</div>
          <div className="stat-card-value">{progress.currentStreak}</div>
          <div className="stat-card-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">📖</div>
          <div className="stat-card-value">
            {completedCount}/{totalLessons}
          </div>
          <div className="stat-card-label">Lessons Done</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🎯</div>
          <div className="stat-card-value">
            {avgAccuracy > 0 ? `${Math.round(avgAccuracy * 100)}%` : '—'}
          </div>
          <div className="stat-card-label">Avg Accuracy</div>
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
                const accuracy = Math.round((lp.bestScore / lp.maxScore) * 100);
                return (
                  <div key={lesson.id} className="completed-item">
                    <span className="completed-icon">{lesson.icon}</span>
                    <div className="completed-info">
                      <span className="completed-title">{lesson.title}</span>
                      <span className="completed-unit">{lesson.unitName}</span>
                    </div>
                    <span className="completed-grade">{lp.grade}</span>
                    <span className="completed-accuracy">{accuracy}%</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2>Settings</h2>
        <div className="settings-actions">
          <button className="reset-btn" onClick={handleReset}>
            Reset All Progress
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
