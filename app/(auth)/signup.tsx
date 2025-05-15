import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext'; // make sure the path is correct

export default function Signup() {
  const router = useRouter();
  const { login } = useAuth(); // ✅ get login function from AuthContext
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Optional: Store token in web
        if (Platform.OS === 'web') {
          localStorage.setItem('token', data.token);
        }

        // ✅ Update Auth Context
        login(email, password);

        // ✅ Navigate to protected tab screen
        router.replace('/tee-times-test');
      } else {
        Alert.alert('Signup Failed', data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#23292e' },
  title: { color: 'white', fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#0d6efd', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  link: { color: '#0d6efd', marginTop: 16, textAlign: 'center' },
});
