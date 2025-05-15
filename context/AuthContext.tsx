import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { router, useSegments } from "expo-router";

// ✅ Define the User and context types
type User = {
    id: string;
    username: string;
};

type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
};

// ✅ Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Custom hook for redirecting
function useProtectedRoute(user: User | null) {
    const segments = useSegments();

    useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)";
        if (!user && !inAuthGroup) {
            router.replace("/(auth)/login");
        } else if (user && inAuthGroup) {
            router.replace("/(tabs)");
        }
    }, [user, segments]);
}

// ✅ Hook to use context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a <AuthProvider />");
    }
    return context;
}

// ✅ The AuthProvider component
export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = (username: string, password: string) => {
        console.log("login", username, password);
        setUser({ id: "1", username });
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    useProtectedRoute(user);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
