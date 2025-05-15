// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function HomeTab() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.username} 👋</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#23292e' },
  welcome: { color: 'white', fontSize: 22, marginBottom: 20 },
});
