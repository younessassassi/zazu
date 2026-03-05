import { useNavigate } from 'react-router-dom';
import './LessonComplete.css';

function AccuracyRing({ percentage }) {
  const size = 120;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div className="accuracy-ring-wrap">
      <svg width={size} height={size} className="accuracy-ring">
        <circle
          className="accuracy-ring-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className="accuracy-ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="accuracy-ring-text">{percentage}%</span>
    </div>
  );
}

export default function LessonComplete({ lesson, result }) {
  const navigate = useNavigate();
  const { grade, xpEarned, score, maxScore, bestCombo } = result;
  const accuracy = Math.round((score / maxScore) * 100);

  const gradeColor =
    grade === 'A+' || grade === 'A'
      ? '#10b981'
      : grade === 'B'
      ? '#4f46e5'
      : grade === 'C'
      ? '#f59e0b'
      : '#ef4444';

  return (
    <div className="lesson-complete">
      <div className="complete-card">
        <div className="complete-icon">
          {accuracy >= 70 ? '🎉' : '💪'}
        </div>

        <h1 className="complete-title">
          {accuracy >= 90 ? 'Excellent!' : accuracy >= 70 ? 'Well Done!' : 'Keep Going!'}
        </h1>

        <p className="complete-subtitle">{lesson.title}</p>

        <div className="grade-badge" style={{ background: gradeColor }}>
          {grade}
        </div>

        <AccuracyRing percentage={accuracy} />

        <div className="complete-stats">
          <div className="complete-stat">
            <span className="stat-number">{score}/{maxScore}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="complete-stat">
            <span className="stat-number">+{xpEarned}</span>
            <span className="stat-label">Points</span>
          </div>
          {bestCombo > 1 && (
            <div className="complete-stat">
              <span className="stat-number">🔥 {bestCombo}x</span>
              <span className="stat-label">Best Combo</span>
            </div>
          )}
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
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
