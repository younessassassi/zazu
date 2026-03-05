import { useState } from 'react';
import './exercises.css';

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

  return (
    <div className="exercise translate">
      <p className="exercise-prompt">{exercise.prompt}</p>
      <h2 className="exercise-sentence">{exercise.sentence}</h2>

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
        <p className="correct-answer">
          Correct answer: <strong>{exercise.answer}</strong>
        </p>
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
