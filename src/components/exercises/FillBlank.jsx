import { useState } from 'react';
import './exercises.css';
import SpeakerButton from '../SpeakerButton';

export default function FillBlank({ exercise, onAnswer, answered }) {
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answered || !input.trim()) return;
    const isCorrect =
      input.trim().toLowerCase() === exercise.answer.toLowerCase();
    onAnswer(isCorrect);
  };

  // Render sentence with blank highlighted
  const parts = exercise.sentence.split('_____');
  // Build the full French sentence for audio
  const fullSentence = exercise.sentence.replace('_____', exercise.answer);

  return (
    <div className="exercise fill-blank">
      <div className="exercise-question-row">
        <SpeakerButton text={fullSentence} size="medium" />
        <p className="exercise-prompt">Fill in the blank:</p>
      </div>

      <div className="fill-sentence">
        <span>{parts[0]}</span>
        <span className={`fill-slot ${answered ? (input.trim().toLowerCase() === exercise.answer.toLowerCase() ? 'correct' : 'incorrect') : ''}`}>
          {input || '______'}
        </span>
        <span>{parts[1]}</span>
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
          placeholder="Type the missing word..."
          disabled={answered}
          autoFocus
        />
        {!answered && (
          <button type="submit" className="check-btn" disabled={!input.trim()}>
            Check
          </button>
        )}
      </form>

      {answered && input.trim().toLowerCase() !== exercise.answer.toLowerCase() && (
        <div className="correct-answer-row">
          <p className="correct-answer">
            Correct answer: <strong>{exercise.answer}</strong>
          </p>
          <SpeakerButton text={fullSentence} size="small" autoPlay />
        </div>
      )}

      {answered && input.trim().toLowerCase() === exercise.answer.toLowerCase() && (
        <div className="correct-answer-row">
          <SpeakerButton text={fullSentence} size="small" autoPlay />
          <span className="hear-answer">Listen to the full sentence</span>
        </div>
      )}

      {!answered && exercise.hint && (
        <button className="hint-btn" onClick={() => setShowHint(true)}>
          {showHint ? `💡 ${exercise.hint}` : '💡 Show hint'}
        </button>
      )}
    </div>
  );
}
