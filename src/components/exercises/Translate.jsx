import { useState } from 'react';
import './exercises.css';
import SpeakerButton from '../SpeakerButton';
import { speakFrench } from '../../utils/speech';

export default function Translate({ exercise, onAnswer, answered }) {
  const [selected, setSelected] = useState(null);

  const isFromFrench = exercise.prompt?.toLowerCase().includes('to english');
  const frenchText = isFromFrench ? exercise.sentence : exercise.answer;

  // Options are always in French for "Translate to French" exercises
  const optionsAreFrench = !isFromFrench;

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    onAnswer(index === exercise.correct);
  };

  return (
    <div className="exercise translate">
      <p className="exercise-prompt">{exercise.prompt}</p>
      <div className="exercise-sentence-row">
        {isFromFrench && <SpeakerButton text={frenchText} size="large" autoPlay />}
        <h2 className="exercise-sentence">{exercise.sentence}</h2>
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

      {answered && selected !== exercise.correct && (
        <div className="correct-answer-row">
          <p className="correct-answer">
            Correct answer: <strong>{exercise.options[exercise.correct]}</strong>
          </p>
          <SpeakerButton text={exercise.answer} size="small" autoPlay={!isFromFrench} />
        </div>
      )}

      {answered && selected === exercise.correct && !isFromFrench && (
        <div className="correct-answer-row">
          <SpeakerButton text={exercise.answer} size="small" autoPlay />
          <span className="hear-answer">Listen to your answer</span>
        </div>
      )}
    </div>
  );
}
