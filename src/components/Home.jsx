import { useNavigate } from 'react-router-dom';
import { getUnits } from '../data/lessons';
import { getUserProgress, isLessonUnlocked, getLessonProgress } from '../data/progress';
import lessons from '../data/lessons';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const units = getUnits();
  const progress = getUserProgress();
  const completedCount = Object.keys(progress.completedLessons).length;

  return (
    <div className="home">
      <div className="home-header">
        <h1>Learn French</h1>
        <p className="home-subtitle">
          {completedCount === 0
            ? 'Start your French learning journey!'
            : `${completedCount} of ${lessons.length} lessons completed`}
        </p>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${(completedCount / lessons.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="units-container">
        {units.map((unit) => (
          <div key={unit.id} className="unit-section">
            <div className="unit-header">
              <div className="unit-badge">Unit {unit.id}</div>
              <h2 className="unit-title">{unit.name}</h2>
            </div>

            <div className="lessons-path">
              {unit.lessons.map((lesson, index) => {
                const unlocked = isLessonUnlocked(lesson.id, lessons);
                const lessonProg = getLessonProgress(lesson.id);
                const isCompleted = !!lessonProg;

                return (
                  <div
                    key={lesson.id}
                    className={`lesson-node ${
                      isCompleted ? 'completed' : unlocked ? 'unlocked' : 'locked'
                    }`}
                    style={{ '--offset': index % 2 === 0 ? '0px' : '60px' }}
                    onClick={() => {
                      if (unlocked) navigate(`/lesson/${lesson.id}`);
                    }}
                  >
                    <div className="lesson-circle">
                      {isCompleted ? (
                        <span className="lesson-check">✓</span>
                      ) : unlocked ? (
                        <span className="lesson-icon">{lesson.icon}</span>
                      ) : (
                        <span className="lesson-lock">🔒</span>
                      )}
                    </div>
                    <div className="lesson-info">
                      <span className="lesson-title">{lesson.title}</span>
                      {isCompleted && (
                        <div className="lesson-stars">
                          {[1, 2, 3].map((s) => (
                            <span
                              key={s}
                              className={`star ${s <= lessonProg.stars ? 'filled' : ''}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {index < unit.lessons.length - 1 && (
                      <div className="lesson-connector" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
