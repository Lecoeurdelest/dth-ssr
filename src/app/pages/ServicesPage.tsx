import { ProfessionalTeamSection } from '../components/ProfessionalTeamSection';
import { ServiceCategories } from '../components/ServiceCategories';
import { ServiceWorkerSelector } from '../components/ServiceWorkerSelector';

export function ServicesPage() {
  return (
    <div className="pt-16">
      <ProfessionalTeamSection />
      <ServiceCategories />
      <ServiceWorkerSelector />
    </div>
  );
}