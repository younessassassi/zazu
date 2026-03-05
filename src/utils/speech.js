// Text-to-Speech utility using the Web Speech API

let frenchVoice = null;
let voiceLoaded = false;

function loadFrenchVoice() {
  if (voiceLoaded) return;
  const voices = window.speechSynthesis.getVoices();
  // Prefer a native French voice
  frenchVoice =
    voices.find((v) => v.lang === 'fr-FR' && v.localService) ||
    voices.find((v) => v.lang === 'fr-FR') ||
    voices.find((v) => v.lang.startsWith('fr'));
  if (frenchVoice) voiceLoaded = true;
}

// Voices load asynchronously in some browsers
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = loadFrenchVoice;
  loadFrenchVoice();
}

/**
 * Speak French text using the Web Speech API.
 * @param {string} text - The French text to speak.
 * @param {'normal'|'slow'} speed - Speech rate.
 */
export function speakFrench(text, speed = 'normal') {
  if (!window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Try loading voice if not yet loaded
  if (!voiceLoaded) loadFrenchVoice();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = speed === 'slow' ? 0.6 : 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  if (frenchVoice) {
    utterance.voice = frenchVoice;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Stop any currently playing speech.
 */
export function stopSpeech() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Speak French text and return a Promise that resolves when done.
 */
export function speakFrenchAsync(text, speed = 'normal') {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();
    if (!voiceLoaded) loadFrenchVoice();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = speed === 'slow' ? 0.6 : 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    if (frenchVoice) utterance.voice = frenchVoice;
    utterance.onend = resolve;
    utterance.onerror = resolve;
    window.speechSynthesis.speak(utterance);
  });
}
