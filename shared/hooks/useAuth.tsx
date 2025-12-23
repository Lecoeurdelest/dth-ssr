"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserInfo {
  name: string;
  birthdate: string;
  phone: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo;
  login: (info: UserInfo) => void;
  logout: () => void;
  updateUserInfo: (info: UserInfo) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    birthdate: "",
    phone: "",
    email: "",
  });
  // Hydrate from server if cookie-based session exists
  React.useEffect(() => {
    fetch("http://localhost:8080/auth/me", { credentials: "include" })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok && json?.success && json?.data) {
          const user = json.data;
          setIsLoggedIn(true);
          setUserInfo({
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
            birthdate: user.dateOfBirth || "",
            phone: user.phone || "",
            email: user.email || "",
          });
        }
      })
      .catch(() => {
        // ignore
      });
  }, []);

  const login = (info: UserInfo) => {
    setIsLoggedIn(true);
    setUserInfo(info);
  };

  const logout = () => {
    // Call backend to clear cookies
    fetch("http://localhost:8080/auth/logout-cookie", {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      setIsLoggedIn(false);
      setUserInfo({
        name: "",
        birthdate: "",
        phone: "",
        email: "",
      });
    });
  };

  const updateUserInfo = (info: UserInfo) => {
    setUserInfo(info);
  };

  const element = (
    <AuthContext.Provider
      value={{ isLoggedIn, userInfo, login, logout, updateUserInfo }}
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
