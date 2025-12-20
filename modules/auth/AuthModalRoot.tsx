"use client";

import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import { useAuthModal } from "@/shared/hooks/useAuthModal";

export function AuthModalRoot() {
  const { modalType, close } = useAuthModal();

  return (
    <>
      <LoginModal isOpen={modalType === "login"} onClose={close} />
      <RegisterModal isOpen={modalType === "register"} onClose={close} />
    </>
  );
}

