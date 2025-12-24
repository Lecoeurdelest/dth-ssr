"use client";

import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServiceCategories } from './components/ServiceCategories';
import { ServiceWorkerSelector } from './components/ServiceWorkerSelector';
import { TestimonialsSection } from './components/TestimonialsSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServiceCategories />
      <ServiceWorkerSelector />
      <TestimonialsSection />
    </>
  );
}

