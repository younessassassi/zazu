import { useState } from 'react';
import './exercises.css';
import SpeakerButton from '../SpeakerButton';
import { speakFrench } from '../../utils/speech';

export default function FillBlank({ exercise, onAnswer, answered }) {
  const [selected, setSelected] = useState(null);

  // Render sentence with blank highlighted
  const parts = exercise.sentence.split('_____');
  // Build the full French sentence for audio
  const fullSentence = exercise.sentence.replace('_____', exercise.answer);

  const selectedWord = selected !== null ? exercise.options[selected] : null;
  const isCorrect = selected !== null && selected === exercise.correct;

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    onAnswer(index === exercise.correct);
  };

  return (
    <div className="exercise fill-blank">
      <div className="exercise-question-row">
        <SpeakerButton text={fullSentence} size="medium" />
        <p className="exercise-prompt">Fill in the blank:</p>
      </div>

      <div className="fill-sentence">
        <span>{parts[0]}</span>
        <span className={`fill-slot ${answered ? (isCorrect ? 'correct' : 'incorrect') : selected !== null ? 'selected' : ''}`}>
          {selectedWord || '______'}
        </span>
        <span>{parts[1]}</span>
      </div>

      <div className="mc-options">
        {exercise.options.map((option, index) => {
          let className = 'mc-option';
          if (answered) {
            if (index === exercise.correct) className += ' correct';
            else if (index === selected) className += ' incorrect';
          } else if (index === selected) {
            className += ' selected';
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => handleSelect(index)}
              disabled={answered}
            >
              <span className="mc-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="mc-text">{option}</span>
              <span
                className="mc-speaker"
                onClick={(e) => { e.stopPropagation(); speakFrench(option); }}
                title="Listen"
              >
                🔊
              </span>
            </button>
          );
        })}
      </div>

      {answered && !isCorrect && (
        <div className="correct-answer-row">
          <p className="correct-answer">
            Correct answer: <strong>{exercise.answer}</strong>
          </p>
          <SpeakerButton text={fullSentence} size="small" autoPlay />
        </div>
      )}

      {answered && isCorrect && (
        <div className="correct-answer-row">
          <SpeakerButton text={fullSentence} size="small" autoPlay />
          <span className="hear-answer">Listen to the full sentence</span>
        </div>
      )}
    </div>
  );
}
