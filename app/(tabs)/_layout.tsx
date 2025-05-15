// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="tee-times-test" options={{ title: "Tee Times" }} />
        </Tabs>
    );
}
