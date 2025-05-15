// app/_layout.tsx
import { Slot } from "expo-router";
import AuthProvider from "../context/AuthContext"; // Adjust path if needed

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
