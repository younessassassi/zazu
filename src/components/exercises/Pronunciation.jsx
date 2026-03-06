import { useState, useRef, useCallback } from 'react';
import './exercises.css';
import SpeakerButton from '../SpeakerButton';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

/**
 * Normalize text for comparison — lowercase, strip accents/punctuation/extra spaces.
 */
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Compute similarity between two strings (0-1) using longest common subsequence.
 */
function similarity(a, b) {
  if (!a || !b) return 0;
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1;

  const m = na.length;
  const n = nb.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = na[i - 1] === nb[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n] / Math.max(m, n);
}

const THRESHOLD = 0.6;

export default function Pronunciation({ exercise, onAnswer, answered }) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [status, setStatus] = useState('idle');
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const recognitionRef = useRef(null);

  const supported = !!SpeechRecognition;

  const startRecording = useCallback(() => {
    if (!supported || answered) return;
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    setScore(null);
    setStatus('listening');

    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      // Collect interim results for live display
      let interim = '';
      let finalResult = null;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalResult = event.results[i];
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setInterimTranscript(interim);

      if (finalResult) {
        setStatus('analyzing');
        // Check all alternatives for best match
        let bestScore = 0;
        let bestTranscript = '';
        for (let i = 0; i < finalResult.length; i++) {
          const t = finalResult[i].transcript;
          const s = similarity(t, exercise.text);
          if (s > bestScore) {
            bestScore = s;
            bestTranscript = t;
          }
        }
        setTranscript(bestTranscript);
        setInterimTranscript('');
        setScore(bestScore);
        setAttempts((a) => a + 1);
        setRecording(false);
        setStatus(bestScore >= THRESHOLD ? 'passed' : 'failed');

        if (bestScore >= THRESHOLD) {
          onAnswer(true);
        }
      }
    };

    recognition.onerror = (event) => {
      setRecording(false);
      setStatus('idle');
      if (event.error === 'no-speech') {
        setError("No speech detected. Tap the microphone and try again.");
      } else if (event.error === 'not-allowed') {
        setError("Microphone access denied. Please allow microphone access in your browser settings.");
      } else {
        setError("Could not recognize speech. Please try again.");
      }
    };

    recognition.onend = () => {
      setRecording(false);
      setInterimTranscript('');
    };

    setRecording(true);
    recognition.start();
  }, [supported, answered, exercise.text, onAnswer]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setRecording(false);
    setInterimTranscript('');
  }, []);

  const handleSkip = () => {
    if (!answered) {
      onAnswer(false);
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'listening': return '🎧 Listening — speak now...';
      case 'analyzing': return '🔍 Analyzing your pronunciation...';
      case 'passed': return '🎉 Great pronunciation!';
      case 'failed': return '🔄 Not quite right — try again or listen to the correct pronunciation';
      default: return '🎤 Tap the microphone and say the phrase above';
    }
  };

  const getScoreLabel = () => {
    if (score === null) return null;
    if (score >= 0.9) return { text: 'Excellent!', className: 'score-excellent' };
    if (score >= THRESHOLD) return { text: 'Good enough!', className: 'score-good' };
    return { text: 'Try again', className: 'score-poor' };
  };

  const scoreLabel = getScoreLabel();
  const pct = score !== null ? Math.round(score * 100) : 0;

  if (!supported) {
    return (
      <div className="exercise pronunciation">
        <div className="exercise-question-row">
          <SpeakerButton text={exercise.text} size="medium" autoPlay />
          <h2 className="exercise-question">Say this in French:</h2>
        </div>
        <p className="exercise-sentence">{exercise.text}</p>
        {exercise.english && <p className="pronun-hint">{exercise.english}</p>}
        <div className="pronun-unsupported">
          <p>Speech recognition is not supported in this browser.</p>
          <p>Please use Chrome or Edge for pronunciation exercises.</p>
          <button className="pronun-skip-btn" onClick={handleSkip}>
            Skip this exercise
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise pronunciation">
      <div className="exercise-question-row">
        <SpeakerButton text={exercise.text} size="medium" autoPlay />
        <h2 className="exercise-question">Say this in French:</h2>
      </div>

      <p className="exercise-sentence">{exercise.text}</p>
      {exercise.english && <p className="pronun-hint">{exercise.english}</p>}

      {/* Microphone button */}
      <div className="pronun-mic-area">
        <button
          className={`pronun-mic-btn ${recording ? 'recording' : ''} ${answered ? 'disabled' : ''}`}
          onClick={recording ? stopRecording : startRecording}
          disabled={answered}
        >
          <span className="pronun-mic-icon">{recording ? '⏹️' : '🎤'}</span>
          <span className="pronun-mic-label">
            {recording ? 'Tap to stop' : answered ? 'Done' : 'Tap to speak'}
          </span>
        </button>
        {recording && <div className="pronun-pulse" />}
      </div>

      {/* Status message */}
      <p className={`pronun-status pronun-status-${status}`}>{getStatusMessage()}</p>

      {/* Live transcript while speaking */}
      {recording && interimTranscript && (
        <div className="pronun-live">
          <span className="pronun-live-label">Hearing:</span>
          <span className="pronun-live-text">"{interimTranscript}"</span>
        </div>
      )}

      {/* Error message */}
      {error && <p className="pronun-error">{error}</p>}

      {/* Result */}
      {score !== null && !answered && (
        <div className="pronun-result">
          <div className={`pronun-score-badge ${scoreLabel.className}`}>
            <span className="pronun-pct">{pct}%</span>
            <span className="pronun-score-text">{scoreLabel.text}</span>
          </div>
          <div className="pronun-transcript">
            <span className="pronun-transcript-label">You said:</span>
            <span className="pronun-transcript-text">"{transcript}"</span>
          </div>
          {score < THRESHOLD && (
            <p className="pronun-tryagain">
              Listen again and try to match the pronunciation. (Attempt {attempts})
            </p>
          )}
        </div>
      )}

      {/* Answered state */}
      {answered && transcript && (
        <div className="pronun-result">
          <div className={`pronun-score-badge ${score >= THRESHOLD ? 'score-good' : 'score-poor'}`}>
            <span className="pronun-pct">{pct}%</span>
            <span className="pronun-score-text">{score >= THRESHOLD ? 'Accepted!' : 'Skipped'}</span>
          </div>
          <div className="pronun-transcript">
            <span className="pronun-transcript-label">You said:</span>
            <span className="pronun-transcript-text">"{transcript}"</span>
          </div>
        </div>
      )}

      {/* Skip button — always available */}
      {!answered && (
        <button className="pronun-skip-btn" onClick={handleSkip}>
          Skip this exercise
        </button>
      )}
    </div>
  );
}
