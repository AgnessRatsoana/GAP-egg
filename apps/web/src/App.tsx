import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/public/LandingPage';
import { HowItWorksPage } from './components/public/HowItWorksPage';
import { SanctuariesPage } from './components/public/SanctuariesPage';
import { ApplyWizard } from './components/public/ApplyWizard';
import { OfferHome } from './components/public/OfferHome';
import { BeneficiaryPortal } from './components/beneficiary/BeneficiaryPortal';
import { AdminConsole } from './components/admin/AdminConsole';

const AppContent: React.FC = () => {
  const { role, activeView } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'transparent' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Public Site Separated Pages */}
        {role === 'public' && (
          <>
            {activeView === 'landing' && <LandingPage />}
            {activeView === 'how-it-works' && <HowItWorksPage />}
            {activeView === 'sanctuaries' && <SanctuariesPage />}
            {activeView === 'apply' && <ApplyWizard />}
            {activeView === 'offer-home' && <OfferHome />}
          </>
        )}

        {/* Beneficiary Views & Sanctuary Portal */}
        {role === 'beneficiary' && (
          <>
            {activeView === 'landing' && <LandingPage />}
            {activeView === 'how-it-works' && <HowItWorksPage />}
            {activeView === 'sanctuaries' && <SanctuariesPage />}
            {activeView === 'apply' && <ApplyWizard />}
            {activeView === 'offer-home' && <OfferHome />}
            {(!['landing', 'how-it-works', 'sanctuaries', 'apply', 'offer-home'].includes(activeView) ||
              activeView.startsWith('portal-')) && <BeneficiaryPortal />}
          </>
        )}

        {/* Admin Console */}
        {role === 'admin' && <AdminConsole />}
      </main>

      {/* Footer on Public and Beneficiary views */}
      {role !== 'admin' && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
