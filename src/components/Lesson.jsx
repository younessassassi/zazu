import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonById } from '../data/lessons';
import { completeLesson, saveLessonPosition, getLessonPosition, clearLessonPosition } from '../data/progress';
import { stopSpeech } from '../utils/speech';
import { useAuth } from '../contexts/AuthContext';
import MultipleChoice from './exercises/MultipleChoice';
import Translate from './exercises/Translate';
import FillBlank from './exercises/FillBlank';
import Matching from './exercises/Matching';
import Dialogue from './exercises/Dialogue';
import Pronunciation from './exercises/Pronunciation';
import LessonComplete from './LessonComplete';
import './Lesson.css';

const FREE_UNITS = 3;

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isPremium, isAdmin } = useAuth();
  const lesson = getLessonById(id);

  const saved = lesson ? getLessonPosition(lesson.id) : null;
  const [currentIndex, setCurrentIndex] = useState(saved?.currentIndex || 0);
  const [score, setScore] = useState(saved?.score || 0);
  const [combo, setCombo] = useState(saved?.combo || 0);
  const [bestCombo, setBestCombo] = useState(saved?.bestCombo || 0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);
  const positionRef = useRef({ currentIndex: saved?.currentIndex || 0, score: saved?.score || 0, combo: saved?.combo || 0, bestCombo: saved?.bestCombo || 0 });

  // Save position on unmount (leaving mid-lesson)
  useEffect(() => {
    if (!lesson) return;
    return () => {
      const p = positionRef.current;
      if (!p.finished && p.currentIndex > 0) {
        saveLessonPosition(lesson.id, {
          currentIndex: p.currentIndex,
          score: p.score,
          combo: p.combo,
          bestCombo: p.bestCombo,
        });
      }
    };
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="lesson-not-found">
        <h2>Lesson not found</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  // Block non-premium users from premium lessons
  if (lesson.unit > FREE_UNITS && !isPremium && !isAdmin) {
    return (
      <div className="lesson-not-found">
        <h2>👑 Premium Lesson</h2>
        <p>Upgrade to Premium to access this lesson.</p>
        <button onClick={() => navigate('/pricing')}>See Plans</button>
      </div>
    );
  }

  const exercises = lesson.exercises;
  const exercise = exercises[currentIndex];
  const progress = ((currentIndex) / exercises.length) * 100;

  const handleAnswer = useCallback(
    (correct) => {
      setAnswered(true);
      setIsCorrect(correct);
      if (correct) {
        setScore((s) => {
          const v = s + 1;
          positionRef.current.score = v;
          return v;
        });
        setCombo((c) => {
          const next = c + 1;
          positionRef.current.combo = next;
          setBestCombo((best) => {
            const b = Math.max(best, next);
            positionRef.current.bestCombo = b;
            return b;
          });
          return next;
        });
      } else {
        setCombo(0);
        positionRef.current.combo = 0;
      }
    },
    []
  );

  const handleContinue = () => {
    stopSpeech();
    if (currentIndex + 1 >= exercises.length) {
      positionRef.current.finished = true;
      clearLessonPosition(lesson.id);
      const res = completeLesson(lesson.id, score + (isCorrect ? 0 : 0), exercises.length, lesson.xpReward, bestCombo);
      setResult({
        ...res,
        score: score,
        maxScore: exercises.length,
        bestCombo,
      });
      setFinished(true);
    } else {
      setCurrentIndex((i) => {
        const next = i + 1;
        positionRef.current.currentIndex = next;
        return next;
      });
      setAnswered(false);
      setIsCorrect(false);
    }
  };

  if (finished && result) {
    return <LessonComplete lesson={lesson} result={result} />;
  }

  const renderExercise = () => {
    switch (exercise.type) {
      case 'multipleChoice':
        return (
          <MultipleChoice
            key={currentIndex}
            exercise={exercise}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      case 'translate':
        return (
          <Translate
            key={currentIndex}
            exercise={exercise}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      case 'fillBlank':
        return (
          <FillBlank
            key={currentIndex}
            exercise={exercise}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      case 'matching':
        return (
          <Matching
            key={currentIndex}
            exercise={exercise}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      case 'dialogue':
        return (
          <Dialogue
            key={currentIndex}
            exercise={exercise}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      case 'pronunciation':
        return (
          <Pronunciation
            key={currentIndex}
            exercise={exercise}
            onAnswer={handleAnswer}
            answered={answered}
          />
        );
      default:
        return <p>Unknown exercise type</p>;
    }
  };

  return (
    <div className="lesson-container">
      {/* Header Bar */}
      <div className="lesson-header">
        <button className="lesson-close" onClick={() => { stopSpeech(); navigate('/'); }}>
          ✕
        </button>
        <div className="lesson-progress-bar">
          <div
            className="lesson-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        {combo > 0 && (
          <div className={`combo-badge ${combo >= 3 ? 'hot' : ''}`}>
            🔥 {combo}x
          </div>
        )}
        <div className="lesson-score">
          {score}/{exercises.length}
        </div>
      </div>

      {/* Exercise Area */}
      <div className="lesson-body">{renderExercise()}</div>

      {/* Feedback & Continue */}
      {answered && (
        <div className={`lesson-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-content">
            <div className="feedback-icon">{isCorrect ? '✅' : '❌'}</div>
            <div className="feedback-text">
              {isCorrect ? (
                <span className="feedback-title">
                  {combo >= 3 ? 'On fire!' : combo >= 2 ? 'Nice streak!' : 'Correct!'}
                </span>
              ) : (
                <>
                  <span className="feedback-title">Not quite</span>
                  <span className="feedback-detail">No worries — you'll get it next time!</span>
                </>
              )}
            </div>
          </div>
          <button className="continue-btn" onClick={handleContinue}>
            {currentIndex + 1 >= exercises.length ? 'Finish' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
}
