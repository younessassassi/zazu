import { useState, useEffect } from 'react';
import './exercises.css';

export default function Matching({ exercise, onAnswer, answered }) {
  const [frenchItems, setFrenchItems] = useState([]);
  const [englishItems, setEnglishItems] = useState([]);
  const [selectedFrench, setSelectedFrench] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrongPair, setWrongPair] = useState(null);

  // Shuffle items on mount
  useEffect(() => {
    const shuffled = (arr) => [...arr].sort(() => Math.random() - 0.5);
    setFrenchItems(shuffled(exercise.pairs.map((p, i) => ({ text: p.french, id: i }))));
    setEnglishItems(shuffled(exercise.pairs.map((p, i) => ({ text: p.english, id: i }))));
  }, [exercise]);

  useEffect(() => {
    if (selectedFrench !== null && selectedEnglish !== null) {
      if (selectedFrench === selectedEnglish) {
        // Correct match
        setMatched((prev) => new Set([...prev, selectedFrench]));
        setSelectedFrench(null);
        setSelectedEnglish(null);

        // Check if all matched
        if (matched.size + 1 === exercise.pairs.length) {
          onAnswer(true);
        }
      } else {
        // Wrong match
        setWrongPair({ french: selectedFrench, english: selectedEnglish });
        setTimeout(() => {
          setWrongPair(null);
          setSelectedFrench(null);
          setSelectedEnglish(null);
        }, 600);
      }
    }
  }, [selectedFrench, selectedEnglish, exercise.pairs.length, matched.size, onAnswer]);

  const handleFrenchClick = (id) => {
    if (answered || matched.has(id)) return;
    setSelectedFrench(id);
  };

  const handleEnglishClick = (id) => {
    if (answered || matched.has(id)) return;
    setSelectedEnglish(id);
  };

  return (
    <div className="exercise matching">
      <p className="exercise-prompt">Match the pairs:</p>
      <div className="matching-grid">
        <div className="matching-column">
          <div className="matching-label">French</div>
          {frenchItems.map((item) => {
            let className = 'match-card french';
            if (matched.has(item.id)) className += ' matched';
            else if (selectedFrench === item.id) className += ' selected';
            if (wrongPair && wrongPair.french === item.id) className += ' wrong';
            return (
              <button
                key={item.id}
                className={className}
                onClick={() => handleFrenchClick(item.id)}
                disabled={answered || matched.has(item.id)}
              >
                {item.text}
              </button>
            );
          })}
        </div>
        <div className="matching-column">
          <div className="matching-label">English</div>
          {englishItems.map((item) => {
            let className = 'match-card english';
            if (matched.has(item.id)) className += ' matched';
            else if (selectedEnglish === item.id) className += ' selected';
            if (wrongPair && wrongPair.english === item.id) className += ' wrong';
            return (
              <button
                key={item.id}
                className={className}
                onClick={() => handleEnglishClick(item.id)}
                disabled={answered || matched.has(item.id)}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
