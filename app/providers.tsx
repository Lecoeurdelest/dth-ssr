"use client";

import React from "react";
import { AuthProvider as AuthProviderComponent } from "@/shared/hooks/useAuth";
import { ChatProvider as ChatProviderComponent } from "@/shared/hooks/useChat";

// Type assertion to work around Next.js type checking issue
const AuthProvider = AuthProviderComponent as React.ComponentType<{ children: React.ReactNode }>;
const ChatProvider = ChatProviderComponent as React.ComponentType<{ children: React.ReactNode }>;

export function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <AuthProvider>
      <ChatProvider>{children}</ChatProvider>
    </AuthProvider>
  );
}

