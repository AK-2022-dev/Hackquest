import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../utils/supabaseClient';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace('/home'); // redirect to Home if logged in
      } else {
        router.replace('/login'); // else redirect to Login
      }
    };
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Checking session...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  text: { color: 'white', fontSize: 18 },
});
