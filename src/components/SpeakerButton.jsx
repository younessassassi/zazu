import { useState } from 'react';
import { speakFrench } from '../utils/speech';
import './SpeakerButton.css';

/**
 * A clickable speaker icon button that speaks French text.
 * Supports normal and slow speeds (click once for normal, again for slow).
 */
export default function SpeakerButton({ text, size = 'medium', autoPlay = false }) {
  const [playing, setPlaying] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (playing) {
      // Second click = slow
      speakFrench(text, 'slow');
    } else {
      speakFrench(text, 'normal');
    }
    setPlaying(true);
    // Reset after speech finishes (estimate based on text length)
    const duration = Math.max(1500, text.length * 120);
    setTimeout(() => setPlaying(false), duration);
  };

  // Auto-play on mount
  useState(() => {
    if (autoPlay && text) {
      // Small delay so the component mounts first
      const timer = setTimeout(() => speakFrench(text, 'normal'), 300);
      return () => clearTimeout(timer);
    }
  });

  return (
    <button
      className={`speaker-btn speaker-${size} ${playing ? 'speaking' : ''}`}
      onClick={handleClick}
      title={playing ? 'Click for slow speed' : 'Listen'}
      type="button"
    >
      <svg viewBox="0 0 24 24" fill="none" className="speaker-icon">
        <path
          d="M11 5L6 9H2v6h4l5 4V5z"
          fill="currentColor"
        />
        <path
          d="M15.54 8.46a5 5 0 0 1 0 7.07"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {!playing ? (
          <path
            d="M19.07 4.93a10 10 0 0 1 0 14.14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : null}
      </svg>
    </button>
  );
}
