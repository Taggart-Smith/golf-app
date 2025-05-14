import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext'; // Adjust the path as needed

export default function Layout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="tee-times" options={{ title: "Tee Times" }} />
        <Stack.Screen name="tee-times-test" options={{ title: "Tee Times Test" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      </Stack>
    </AuthProvider>
  );
}
