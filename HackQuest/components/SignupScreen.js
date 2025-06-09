import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        emailRedirectTo: 'hackquest://login', // Deep linking to login after email confirmation
      }
    );

    if (error) {
      Alert.alert('Signup failed', error.message);
    } else if (data?.user) {
      Alert.alert(
        'Signup successful',
        'Please check your email for a confirmation link. After confirming, come back and log in.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HackQuest Signup</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#ccc"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#ccc"
        secureTextEntry
      />

      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
    backgroundColor: '#4caf50', padding: 15, borderRadius: 10, width: '100%',
  },
  buttonText: {
    color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16,
  },
});
