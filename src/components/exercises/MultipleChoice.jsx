import { useState } from 'react';
import './exercises.css';
import SpeakerButton from '../SpeakerButton';
import { speakFrench } from '../../utils/speech';

export default function MultipleChoice({ exercise, onAnswer, answered }) {
  const [selected, setSelected] = useState(null);

  // Extract French text from question — looks for quoted text in patterns like:
  // 'What does "Bonjour" mean?' or 'What does "Au revoir" mean?'
  const frenchWord = exercise.frenchAudio ||
    (() => {
      const match = exercise.question.match(/[""\u201C\u201D]([^""\u201C\u201D]+)[""\u201C\u201D]/);
      return match ? match[1] : null;
    })();

  // Detect if the options are in French (e.g. "How do you say X in French?")
  const optionsAreFrench = exercise.optionLang === 'fr' ||
    /how do you say|comment/i.test(exercise.question) ||
    /in french/i.test(exercise.question) ||
    /complete/i.test(exercise.question);

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    onAnswer(index === exercise.correct);
  };

  return (
    <div className="exercise multiple-choice">
      <div className="exercise-question-row">
        {frenchWord && <SpeakerButton text={frenchWord} size="medium" autoPlay />}
        <h2 className="exercise-question">{exercise.question}</h2>
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
              {optionsAreFrench && (
                <span
                  className="mc-speaker"
                  onClick={(e) => { e.stopPropagation(); speakFrench(option); }}
                  title="Listen"
                >
                  🔊
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
