// app/(auth)/login.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth(); // Context login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (Platform.OS === 'web') {
          localStorage.setItem('token', data.token); // Web only
        }

        login(email, password); // Store in context
        router.replace('/tee-times-test'); // Navigate
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#23292e' },
  title: { color: 'white', fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#0d6efd', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  link: { color: '#0d6efd', marginTop: 16, textAlign: 'center' },
});
