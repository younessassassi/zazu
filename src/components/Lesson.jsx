import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonById } from '../data/lessons';
import { completeLesson } from '../data/progress';
import MultipleChoice from './exercises/MultipleChoice';
import Translate from './exercises/Translate';
import FillBlank from './exercises/FillBlank';
import Matching from './exercises/Matching';
import LessonComplete from './LessonComplete';
import './Lesson.css';

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = getLessonById(id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  if (!lesson) {
    return (
      <div className="lesson-not-found">
        <h2>Lesson not found</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
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
        setScore((s) => s + 1);
      } else {
        setHearts((h) => h - 1);
      }
    },
    []
  );

  const handleContinue = () => {
    if (currentIndex + 1 >= exercises.length || hearts <= 0) {
      const res = completeLesson(lesson.id, score + (isCorrect ? 0 : 0), exercises.length, lesson.xpReward);
      setResult({
        ...res,
        score: score,
        maxScore: exercises.length,
        hearts,
      });
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
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
      default:
        return <p>Unknown exercise type</p>;
    }
  };

  return (
    <div className="lesson-container">
      {/* Header Bar */}
      <div className="lesson-header">
        <button className="lesson-close" onClick={() => navigate('/')}>
          ✕
        </button>
        <div className="lesson-progress-bar">
          <div
            className="lesson-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="lesson-hearts">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={`heart ${i < hearts ? 'active' : 'lost'}`}>
              ❤️
            </span>
          ))}
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
                <span className="feedback-title">Correct!</span>
              ) : (
                <>
                  <span className="feedback-title">Incorrect</span>
                  <span className="feedback-detail">Don&apos;t worry, keep practicing!</span>
                </>
              )}
            </div>
          </div>
          <button className="continue-btn" onClick={handleContinue}>
            {hearts <= 0 && !isCorrect
              ? 'End Lesson'
              : currentIndex + 1 >= exercises.length
              ? 'Finish'
              : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
}
