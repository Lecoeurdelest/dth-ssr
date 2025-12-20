import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ProfessionalTeamSection } from '../components/ProfessionalTeamSection';
import { ServiceCategories } from '../components/ServiceCategories';
import { ServiceWorkerSelector } from '../components/ServiceWorkerSelector';

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