import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';

export const initializeUserProgress = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      wordsLearned: 0,
      streak: 0,
      totalSessions: 0,
      lastActiveDate: new Date().toDateString(),
      weeklyGoal: 50,
      weeklyProgress: 0,
      level: 1,
      experience: 0,
      createdAt: new Date()
    });
  }
};

export const updateProgress = async (userId, data) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...data,
    lastActiveDate: new Date().toDateString()
  });
};

export const incrementWordsLearned = async (userId) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    wordsLearned: increment(1),
    experience: increment(10),
    weeklyProgress: increment(1)
  });
};

export const getUserProgress = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};