"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuthModalType = "login" | "register" | null;

interface AuthModalContextType {
  modalType: AuthModalType;
  openLogin: () => void;
  openRegister: () => void;
  close: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [modalType, setModalType] = useState<AuthModalType>(null);

  const openLogin = () => setModalType("login");
  const openRegister = () => setModalType("register");
  const close = () => setModalType(null);

  return (
    <AuthModalContext.Provider
      value={{ modalType, openLogin, openRegister, close }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}

