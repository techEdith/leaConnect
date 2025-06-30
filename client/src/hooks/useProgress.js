import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { getUserProgress, initializeUserProgress } from '../services/progressService';

export const useProgress = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      if (auth.currentUser) {
        try {
          await initializeUserProgress(auth.currentUser.uid);
          const userProgress = await getUserProgress(auth.currentUser.uid);
          setProgress(userProgress);
        } catch (error) {
          console.error('Error loading progress:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProgress();
  }, []);

  return { progress, loading, setProgress };
};