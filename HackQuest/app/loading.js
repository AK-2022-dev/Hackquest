import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import LoadingScreen from '../components/LoadingScreen';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');  // Use route path, not screen name
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return <LoadingScreen />;
}
