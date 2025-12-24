"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import {
    authApi,
    type UserDto,
    type LoginRequest,
    type RegisterRequest,
} from "@/lib/auth-api";

interface UserInfo {
    id?: number;
    name: string;
    username?: string;
    birthdate: string;
    phone: string;
    email: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    userInfo: UserInfo;
    isLoading: boolean;
    login: (info: UserInfo) => void;
    loginWithCredentials: (credentials: LoginRequest) => Promise<void>;
    registerUser: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    updateUserInfo: (info: UserInfo) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "auth_user";

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}): React.ReactElement {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "",
        birthdate: "",
        phone: "",
        email: "",
    });

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserInfo(user);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Failed to parse stored user:", error);
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    // Mock login for backward compatibility
    const login = (info: UserInfo) => {
        setIsLoggedIn(true);
        setUserInfo(info);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
    };

    // Real API login
    const loginWithCredentials = async (credentials: LoginRequest) => {
        try {
            const response = await authApi.login(credentials);
            const user: UserInfo = {
                id: response.user.id,
                name: response.user.firstName || response.user.username,
                username: response.user.username,
                email: response.user.email,
                birthdate: "",
                phone: "",
            };

            setIsLoggedIn(true);
            setUserInfo(user);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    // Register new user
    const registerUser = async (data: RegisterRequest) => {
        try {
            const response = await authApi.register(data);
            const user: UserInfo = {
                id: response.user.id,
                name: response.user.firstName || response.user.username,
                username: response.user.username,
                email: response.user.email,
                birthdate: "",
                phone: "",
            };

            setIsLoggedIn(true);
            setUserInfo(user);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error("Logout API call failed:", error);
        } finally {
            setIsLoggedIn(false);
            setUserInfo({
                name: "",
                birthdate: "",
                phone: "",
                email: "",
            });
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const updateUserInfo = (info: UserInfo) => {
        setUserInfo(info);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
    };

    const element = (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                userInfo,
                isLoading,
                login,
                loginWithCredentials,
                registerUser,
                logout,
                updateUserInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

    return element;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// Export for backward compatibility during migration
export { useAuth as useUser };
export { AuthProvider as UserProvider };
