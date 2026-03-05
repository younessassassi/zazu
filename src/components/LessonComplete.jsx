import { useNavigate } from 'react-router-dom';
import './LessonComplete.css';

export default function LessonComplete({ lesson, result }) {
  const navigate = useNavigate();
  const { stars, xpEarned, score, maxScore, hearts } = result;

  return (
    <div className="lesson-complete">
      <div className="complete-card">
        <div className="complete-icon">
          {hearts > 0 ? '🎉' : '💪'}
        </div>

        <h1 className="complete-title">
          {hearts > 0 ? 'Lesson Complete!' : 'Keep Practicing!'}
        </h1>

        <p className="complete-subtitle">{lesson.title}</p>

        <div className="complete-stars">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`complete-star ${s <= stars ? 'filled' : ''}`}
              style={{ animationDelay: `${s * 0.2}s` }}
            >
              ★
            </span>
          ))}
        </div>

        <div className="complete-stats">
          <div className="complete-stat">
            <span className="stat-number">{score}</span>
            <span className="stat-label">out of {maxScore} correct</span>
          </div>
          <div className="complete-stat">
            <span className="stat-number">+{xpEarned}</span>
            <span className="stat-label">XP earned</span>
          </div>
          <div className="complete-stat">
            <span className="stat-number">{hearts}/3</span>
            <span className="stat-label">hearts left</span>
          </div>
        </div>

        <div className="complete-actions">
          <button
            className="complete-btn primary"
            onClick={() => navigate('/')}
          >
            Continue
          </button>
          <button
            className="complete-btn secondary"
            onClick={() => window.location.reload()}
          >
            Practice Again
          </button>
        </div>
      </div>
    </div>
  );
}
