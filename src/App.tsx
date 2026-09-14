import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { AboutPage } from '@/pages/AboutPage';
import { BusinessRegisterPage } from '@/pages/BusinessRegisterPage';
import { ContactPage } from '@/pages/ContactPage';
import { ConciergePage } from '@/pages/ConciergePage';
import { DashboardPage } from '@/pages/DashboardPage';
import { DiscoverPage } from '@/pages/DiscoverPage';
import { EventsPage } from '@/pages/EventsPage';
import { HomePage } from '@/pages/HomePage';
import { MenusPage } from '@/pages/MenusPage';
import { BlendLabPage } from '@/pages/BlendLabPage';
import { PalatePage } from '@/pages/PalatePage';
import { PricingPage } from '@/pages/PricingPage';
import { VenuePage } from '@/pages/VenuePage';

export function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/venues/:venueId" element={<VenuePage />} />
        <Route path="/menus" element={<MenusPage />} />
        <Route path="/palate" element={<PalatePage />} />
        <Route path="/concierge" element={<ConciergePage />} />
        <Route path="/blend-lab" element={<BlendLabPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/business/register" element={<BusinessRegisterPage />} />
        <Route path="/business/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
}
