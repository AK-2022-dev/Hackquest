import React, { useState, useEffect } from 'react';
import { Slot } from 'expo-router';
import LoadingScreen from '../components/LoadingScreen';

export default function Layout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      // Optional delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsReady(true);
    };
    prepare();
  }, []);

  if (!isReady) return <LoadingScreen />;
  return <Slot />;
}
