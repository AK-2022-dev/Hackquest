// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function IndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/loading'); // 🚀 Send user to loading first
  }, []);

  return null;
}
