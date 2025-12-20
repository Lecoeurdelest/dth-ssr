"use client";

import { useState } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { useAuthModal } from '@/shared/hooks/useAuthModal';

export function useBooking() {
  const { isLoggedIn } = useAuth();
  const { openLogin } = useAuthModal();
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const handleBookService = () => {
    if (!isLoggedIn) {
      openLogin();
      return;
    }
    setIsBookModalOpen(true);
  };

  const closeBookModal = () => {
    setIsBookModalOpen(false);
  };

  return {
    isBookModalOpen,
    handleBookService,
    closeBookModal
  };
}

