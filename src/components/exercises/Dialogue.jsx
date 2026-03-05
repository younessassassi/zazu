import { useState } from 'react';
import './exercises.css';
import SpeakerButton from '../SpeakerButton';
import { speakFrench } from '../../utils/speech';

export default function Dialogue({ exercise, onAnswer, answered }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    onAnswer(index === exercise.correct);
  };

  return (
    <div className="exercise dialogue">
      <p className="exercise-prompt">Read the dialogue, then answer:</p>

      <div className="dialogue-scene">
        <div className="dialogue-picture">{exercise.picture}</div>
        <div className="dialogue-lines">
          {exercise.lines.map((line, i) => (
            <div key={i} className={`dialogue-line ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="dialogue-speaker">{line.speaker}</div>
              <div className="dialogue-bubble">
                <span className="dialogue-french">{line.french}</span>
                <span className="dialogue-english">{line.english}</span>
                <span
                  className="dialogue-audio"
                  onClick={() => speakFrench(line.french)}
                  title="Listen"
                >
                  🔊
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="dialogue-question">{exercise.question}</h3>

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
