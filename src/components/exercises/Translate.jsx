import { useState } from 'react';
import './exercises.css';
import SpeakerButton from '../SpeakerButton';

export default function Translate({ exercise, onAnswer, answered }) {
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answered || !input.trim()) return;
    const isCorrect =
      input.trim().toLowerCase() === exercise.answer.toLowerCase();
    onAnswer(isCorrect);
  };

  // If translating FROM French, the sentence is French; if TO French, the answer is French
  const isFromFrench = exercise.prompt?.toLowerCase().includes('to english');
  const frenchText = isFromFrench ? exercise.sentence : exercise.answer;

  return (
    <div className="exercise translate">
      <p className="exercise-prompt">{exercise.prompt}</p>
      <div className="exercise-sentence-row">
        {isFromFrench && <SpeakerButton text={frenchText} size="large" autoPlay />}
        <h2 className="exercise-sentence">{exercise.sentence}</h2>
      </div>

      <form onSubmit={handleSubmit} className="translate-form">
        <input
          type="text"
          className={`translate-input ${
            answered
              ? input.trim().toLowerCase() === exercise.answer.toLowerCase()
                ? 'correct'
                : 'incorrect'
              : ''
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer in French..."
          disabled={answered}
          autoFocus
        />
        {!answered && (
          <button
            type="submit"
            className="check-btn"
            disabled={!input.trim()}
          >
            Check
          </button>
        )}
      </form>

      {answered && input.trim().toLowerCase() !== exercise.answer.toLowerCase() && (
        <div className="correct-answer-row">
          <p className="correct-answer">
            Correct answer: <strong>{exercise.answer}</strong>
          </p>
          <SpeakerButton text={exercise.answer} size="small" autoPlay={!isFromFrench} />
        </div>
      )}

      {answered && input.trim().toLowerCase() === exercise.answer.toLowerCase() && !isFromFrench && (
        <div className="correct-answer-row">
          <SpeakerButton text={exercise.answer} size="small" autoPlay />
          <span className="hear-answer">Listen to your answer</span>
        </div>
      )}

      {!answered && exercise.hint && (
        <button
          className="hint-btn"
          onClick={() => setShowHint(true)}
        >
          {showHint ? `💡 ${exercise.hint}` : '💡 Show hint'}
        </button>
      )}
    </div>
  );
}
