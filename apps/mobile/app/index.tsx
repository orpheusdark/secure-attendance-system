import { router } from 'expo-router';
import { useEffect } from 'react';

export default function SplashScreen() {
  useEffect(() => {
    // Redirect to health check on mount
    // @ts-ignore - Route exists but TypeScript doesn't recognize dynamic routes
    setTimeout(() => router.replace('/(auth)/health'), 500);
  }, []);

  return null;
}
