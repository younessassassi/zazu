// Progress tracking using localStorage

const STORAGE_KEY = 'frenchlearn_progress';

function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {
    // ignore parse errors
  }
  return {
    completedLessons: {},  // lessonId -> { stars, bestScore, completedAt }
    totalXP: 0,
    currentStreak: 0,
    lastPracticeDate: null,
    level: 1,
  };
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getUserProgress() {
  return getProgress();
}

export function getGrade(percentage) {
  if (percentage >= 0.95) return 'A+';
  if (percentage >= 0.85) return 'A';
  if (percentage >= 0.70) return 'B';
  if (percentage >= 0.50) return 'C';
  return 'D';
}

export function completeLesson(lessonId, score, maxScore, xpReward, bestCombo = 0) {
  const progress = getProgress();
  const percentage = score / maxScore;
  const grade = getGrade(percentage);
  const xpEarned = Math.round(xpReward * percentage);

  const existing = progress.completedLessons[lessonId];
  if (!existing || score > existing.bestScore) {
    progress.completedLessons[lessonId] = {
      grade,
      bestScore: score,
      maxScore,
      bestCombo,
      completedAt: new Date().toISOString(),
    };
  }

  progress.totalXP += xpEarned;

  // Update streak
  const today = new Date().toDateString();
  if (progress.lastPracticeDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (progress.lastPracticeDate === yesterday) {
      progress.currentStreak += 1;
    } else if (progress.lastPracticeDate !== today) {
      progress.currentStreak = 1;
    }
    progress.lastPracticeDate = today;
  }

  // Update level (every 100 XP)
  progress.level = Math.floor(progress.totalXP / 100) + 1;

  saveProgress(progress);
  return { grade, xpEarned };
}

export function isLessonUnlocked(lessonId, allLessons) {
  const progress = getProgress();
  const lessonIndex = allLessons.findIndex((l) => l.id === lessonId);

  // First lesson is always unlocked
  if (lessonIndex === 0) return true;

  // A lesson is unlocked if the previous lesson has been completed
  const prevLesson = allLessons[lessonIndex - 1];
  return !!progress.completedLessons[prevLesson.id];
}

export function getLessonProgress(lessonId) {
  const progress = getProgress();
  return progress.completedLessons[lessonId] || null;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
