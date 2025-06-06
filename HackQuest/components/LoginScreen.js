//login screen 
// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert('Login failed', error.message);
    } else {
      router.replace('/home'); // navigate to next screen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HackQuest Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#ccc"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#ccc"
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Optionally add Signup button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', padding: 20,
  },
  title: {
    fontSize: 30, fontWeight: 'bold', color: '#fff', marginBottom: 40,
  },
  input: {
    width: '100%', backgroundColor: '#1f1f1f', color: '#fff', padding: 15,
    borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#333',
  },
  button: {
    backgroundColor: '#ff4b4b', padding: 15, borderRadius: 10, width: '100%',
  },
  buttonText: {
    color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16,
  },
});
