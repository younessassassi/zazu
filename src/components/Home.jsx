import { useNavigate } from 'react-router-dom';
import { getUnits } from '../data/lessons';
import { getUserProgress, isLessonUnlocked, getLessonProgress, getLessonPosition } from '../data/progress';
import { useAuth } from '../contexts/AuthContext';
import lessons from '../data/lessons';
import './Home.css';

function ProgressRing({ percentage, size = 48, stroke = 4 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <svg width={size} height={size} className="progress-ring">
      <circle
        className="progress-ring-bg"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
      />
      <circle
        className="progress-ring-fill"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { isAdmin, isPremium } = useAuth();
  const units = getUnits();
  const progress = getUserProgress();
  const completedCount = Object.keys(progress.completedLessons).length;
  const overallPercent = Math.round((completedCount / lessons.length) * 100);
  const FREE_UNITS = 3;
  const hasFullAccess = isPremium || isAdmin;

  return (
    <div className="home">
      <div className="home-header">
        <h1>Bonjour! 🇫🇷</h1>
        <p className="home-subtitle">
          {completedCount === 0
            ? 'Ready to start your French adventure?'
            : `${overallPercent}% complete — ${completedCount} of ${lessons.length} lessons`}
        </p>
        {completedCount > 0 && (
          <div className="overall-progress">
            <div className="overall-bar">
              <div
                className="overall-fill"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <span className="overall-label">{overallPercent}%</span>
          </div>
        )}
      </div>

      <div className="chapters-container">
        {units.map((unit) => {
          const unitLessons = unit.lessons;
          const completedInUnit = unitLessons.filter(
            (l) => !!getLessonProgress(l.id)
          ).length;
          const unitLocked = !hasFullAccess && unit.id > FREE_UNITS;

          return (
            <div key={unit.id} className={`chapter-section ${unitLocked ? 'chapter-premium-locked' : ''}`}>
              <div className="chapter-banner">
                <span className="chapter-number">Chapter {unit.id}</span>
                <span className="chapter-name">{unit.name}</span>
                {unitLocked ? (
                  <span className="chapter-premium-tag" onClick={() => navigate('/pricing')}>👑 Premium</span>
                ) : (
                  <span className="chapter-progress-tag">
                    {completedInUnit}/{unitLessons.length}
                  </span>
                )}
              </div>

              {unitLocked ? (
                <div className="premium-gate" onClick={() => navigate('/pricing')}>
                  <span className="premium-gate-icon">🔒</span>
                  <p className="premium-gate-text">Unlock this chapter with Premium</p>
                  <button className="premium-gate-btn">See Plans</button>
                </div>
              ) : (
              <div className="lesson-grid">
                {unitLessons.map((lesson) => {
                  const unlocked = isLessonUnlocked(lesson.id, lessons, isAdmin);
                  const lessonProg = getLessonProgress(lesson.id);
                  const isCompleted = !!lessonProg;
                  const inProgress = !isCompleted && !!getLessonPosition(lesson.id);
                  const accuracy = isCompleted
                    ? Math.round((lessonProg.bestScore / lessonProg.maxScore) * 100)
                    : 0;

                  return (
                    <div
                      key={lesson.id}
                      className={`lesson-card ${
                        isCompleted ? 'completed' : unlocked ? 'unlocked' : 'locked'
                      }`}
                      onClick={() => {
                        if (unlocked) navigate(`/lesson/${lesson.id}`);
                      }}
                    >
                      <div className="card-icon-wrap">
                        {isCompleted ? (
                          <>
                            <ProgressRing percentage={accuracy} />
                            <span className="card-icon-center">{lesson.icon}</span>
                          </>
                        ) : (
                          <span className="card-icon-solo">
                            {unlocked ? lesson.icon : '🔒'}
                          </span>
                        )}
                      </div>
                      <div className="card-info">
                        <span className="card-title">{lesson.title}</span>
                        {isCompleted && (
                          <span className="card-grade">{lessonProg.grade}</span>
                        )}
                        {!isCompleted && unlocked && (
                          <span className={`card-tag ${inProgress ? 'in-progress' : ''}`}>
                            {inProgress ? 'Continue' : 'Start'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
