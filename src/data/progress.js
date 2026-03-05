// Progress tracking — localStorage cache + Firestore cloud sync

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const STORAGE_KEY = 'zazu_progress';
let _currentUid = null;

function defaultProgress() {
  return {
    completedLessons: {},
    totalXP: 0,
    currentStreak: 0,
    lastPracticeDate: null,
    level: 1,
  };
}

function getLocalProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {
    // ignore
  }
  return defaultProgress();
}

function saveLocal(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// Called when user logs in — loads cloud progress and merges with any local data
export async function initProgressForUser(uid) {
  _currentUid = uid;
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  const cloud = snap.exists() ? snap.data() : null;
  const local = getLocalProgress();

  if (cloud) {
    // Merge: keep the best score per lesson from either source
    const merged = { ...defaultProgress(), ...cloud };
    for (const [id, localLesson] of Object.entries(local.completedLessons)) {
      const cloudLesson = merged.completedLessons[id];
      if (!cloudLesson || localLesson.bestScore > cloudLesson.bestScore) {
        merged.completedLessons[id] = localLesson;
      }
    }
    merged.totalXP = Math.max(merged.totalXP || 0, local.totalXP || 0);
    merged.currentStreak = Math.max(merged.currentStreak || 0, local.currentStreak || 0);
    merged.level = Math.floor(merged.totalXP / 100) + 1;
    if (local.lastPracticeDate && (!merged.lastPracticeDate || local.lastPracticeDate > merged.lastPracticeDate)) {
      merged.lastPracticeDate = local.lastPracticeDate;
    }
    saveLocal(merged);
    await setDoc(ref, merged);
    return merged;
  } else {
    // First time cloud — push local data up
    await setDoc(ref, local);
    return local;
  }
}

export function clearLocalOnLogout() {
  _currentUid = null;
  localStorage.removeItem(STORAGE_KEY);
}

async function syncToCloud(progress) {
  if (_currentUid) {
    try {
      await setDoc(doc(db, 'users', _currentUid), progress);
    } catch {
      // offline — local cache will be synced next login
    }
  }
}

export function getUserProgress() {
  return getLocalProgress();
}

export function getGrade(percentage) {
  if (percentage >= 0.95) return 'A+';
  if (percentage >= 0.85) return 'A';
  if (percentage >= 0.70) return 'B';
  if (percentage >= 0.50) return 'C';
  return 'D';
}

export function completeLesson(lessonId, score, maxScore, xpReward, bestCombo = 0) {
  const progress = getLocalProgress();
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

  progress.level = Math.floor(progress.totalXP / 100) + 1;

  saveLocal(progress);
  syncToCloud(progress);
  return { grade, xpEarned };
}

export function isLessonUnlocked(lessonId, allLessons) {
  const progress = getLocalProgress();
  const lessonIndex = allLessons.findIndex((l) => l.id === lessonId);
  if (lessonIndex === 0) return true;
  const prevLesson = allLessons[lessonIndex - 1];
  return !!progress.completedLessons[prevLesson.id];
}

export function getLessonProgress(lessonId) {
  const progress = getLocalProgress();
  return progress.completedLessons[lessonId] || null;
}

export async function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  if (_currentUid) {
    try {
      await setDoc(doc(db, 'users', _currentUid), defaultProgress());
    } catch {
      // ignore
    }
  }
}
