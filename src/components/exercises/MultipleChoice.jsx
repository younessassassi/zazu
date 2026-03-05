import { useState } from 'react';
import './exercises.css';

export default function MultipleChoice({ exercise, onAnswer, answered }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    onAnswer(index === exercise.correct);
  };

  return (
    <div className="exercise multiple-choice">
      <h2 className="exercise-question">{exercise.question}</h2>
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
