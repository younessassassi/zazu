// Text-to-Speech utility using the Web Speech API

let frenchVoiceMale = null;
let frenchVoiceFemale = null;
let frenchVoiceDefault = null;
let voicesLoaded = false;

function loadFrenchVoices() {
  if (voicesLoaded) return;
  const voices = window.speechSynthesis.getVoices();
  const frVoices = voices.filter((v) => v.lang === 'fr-FR' || v.lang.startsWith('fr'));
  if (frVoices.length === 0) return;

  // Try to find distinct male/female voices by name heuristics
  for (const v of frVoices) {
    const name = v.name.toLowerCase();
    if (!frenchVoiceFemale && /female|femme|woman|amelie|marie|virginie|lea|céline|audrey|celine/i.test(name)) {
      frenchVoiceFemale = v;
    }
    if (!frenchVoiceMale && /male(?!.*fe)|homme|man\b|thomas|mathieu|nicolas|pierre|henri/i.test(name)) {
      frenchVoiceMale = v;
    }
  }

  // Default voice fallback
  frenchVoiceDefault =
    frVoices.find((v) => v.lang === 'fr-FR' && v.localService) ||
    frVoices.find((v) => v.lang === 'fr-FR') ||
    frVoices[0];

  // If we couldn't distinguish male/female, use the default for both but vary pitch
  if (!frenchVoiceFemale) frenchVoiceFemale = frenchVoiceDefault;
  if (!frenchVoiceMale) frenchVoiceMale = frenchVoiceDefault;

  voicesLoaded = true;
}

// Voices load asynchronously in some browsers
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = loadFrenchVoices;
  loadFrenchVoices();
}

/**
 * Get the appropriate voice and pitch for a gender.
 */
function getVoiceConfig(gender) {
  if (!voicesLoaded) loadFrenchVoices();
  if (gender === 'male') {
    return { voice: frenchVoiceMale, pitch: frenchVoiceMale === frenchVoiceFemale ? 0.8 : 1 };
  }
  if (gender === 'female') {
    return { voice: frenchVoiceFemale, pitch: frenchVoiceFemale === frenchVoiceMale ? 1.3 : 1 };
  }
  return { voice: frenchVoiceDefault, pitch: 1 };
}

/**
 * Speak French text using the Web Speech API.
 * @param {string} text - The French text to speak.
 * @param {'normal'|'slow'} speed - Speech rate.
 * @param {'male'|'female'} [gender] - Optional voice gender.
 */
export function speakFrench(text, speed = 'normal', gender) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  if (!voicesLoaded) loadFrenchVoices();

  const { voice, pitch } = getVoiceConfig(gender);
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = speed === 'slow' ? 0.6 : 0.85;
  utterance.pitch = pitch;
  utterance.volume = 1;
  if (voice) utterance.voice = voice;

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
 * @param {string} text
 * @param {'normal'|'slow'} speed
 * @param {'male'|'female'} [gender]
 */
export function speakFrenchAsync(text, speed = 'normal', gender) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();
    if (!voicesLoaded) loadFrenchVoices();

    const { voice, pitch } = getVoiceConfig(gender);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = speed === 'slow' ? 0.6 : 0.85;
    utterance.pitch = pitch;
    utterance.volume = 1;
    if (voice) utterance.voice = voice;
    utterance.onend = resolve;
    utterance.onerror = resolve;
    window.speechSynthesis.speak(utterance);
  });
}
