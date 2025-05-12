import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    // <Stack>
    //   <Stack.Screen name="index" options={{ title: "Home" }} />
    //   <Stack.Screen name="tee-times" options={{ title: "Tee Times" }} />
    //   <Stack.Screen name="tee-times-test" options={{ title: "Tee Times Test" }} />
    //   <Stack.Screen name="login" options={{ title: "Login" }} />
    //   <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
    // </Stack>
    <Tabs />
  );
}