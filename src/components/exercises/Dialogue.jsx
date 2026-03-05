import { useState, useEffect, useRef } from 'react';
import './exercises.css';
import SpeakerButton from '../SpeakerButton';
import { speakFrench, speakFrenchAsync, stopSpeech } from '../../utils/speech';

export default function Dialogue({ exercise, onAnswer, answered }) {
  const [selected, setSelected] = useState(null);
  const [activeLine, setActiveLine] = useState(-1);
  const [autoPlayDone, setAutoPlayDone] = useState(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    let mounted = true;

    async function playDialogue() {
      for (let i = 0; i < exercise.lines.length; i++) {
        if (cancelledRef.current || !mounted) return;
        setActiveLine(i);
        const line = exercise.lines[i];
        await speakFrenchAsync(line.french, 'normal', line.gender);
        // Small pause between lines
        if (!cancelledRef.current && mounted) {
          await new Promise((r) => setTimeout(r, 400));
        }
      }
      if (mounted) {
        setActiveLine(-1);
        setAutoPlayDone(true);
      }
    }

    playDialogue();

    return () => {
      mounted = false;
      cancelledRef.current = true;
      stopSpeech();
    };
  }, [exercise]);

  const handleReplay = async () => {
    cancelledRef.current = false;
    setAutoPlayDone(false);
    for (let i = 0; i < exercise.lines.length; i++) {
      if (cancelledRef.current) return;
      setActiveLine(i);
      const line = exercise.lines[i];
      await speakFrenchAsync(line.french, 'normal', line.gender);
      if (!cancelledRef.current) {
        await new Promise((r) => setTimeout(r, 400));
      }
    }
    setActiveLine(-1);
    setAutoPlayDone(true);
  };

  const handleSelect = (index) => {
    if (answered) return;
    setSelected(index);
    onAnswer(index === exercise.correct);
  };

  return (
    <div className="exercise dialogue">
      <p className="exercise-prompt">Listen to the dialogue, then answer:</p>

      <div className="dialogue-scene">
        <div className="dialogue-picture">{exercise.picture}</div>
        <div className="dialogue-lines">
          {exercise.lines.map((line, i) => (
            <div key={i} className={`dialogue-line ${i % 2 === 0 ? 'left' : 'right'} ${activeLine === i ? 'speaking' : ''}`}>
              <div className="dialogue-speaker">{line.speaker}</div>
              <div className="dialogue-bubble">
                <span className="dialogue-french">{line.french}</span>
                <span className="dialogue-english">{line.english}</span>
                <span
                  className="dialogue-audio"
                  onClick={() => speakFrench(line.french, 'normal', line.gender)}
                  title="Listen"
                >
                  🔊
                </span>
              </div>
            </div>
          ))}
        </div>
        {autoPlayDone && (
          <button className="dialogue-replay" onClick={handleReplay} title="Replay dialogue">
            🔁 Replay
          </button>
        )}
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
