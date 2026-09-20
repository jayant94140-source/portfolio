import React from 'react';
import { PermissionProvider } from './context/PermissionContext';
import { OwnerConfigProvider } from './context/OwnerConfigContext';
import { Navbar } from './components/Common/Navbar';
import { Hero } from './components/Sections/Hero';
import { About } from './components/Sections/About';
import { Capabilities } from './components/Sections/Capabilities';
import { Skills } from './components/Sections/Skills';
import { Projects } from './components/Sections/Projects';
import { Experiments } from './components/Sections/Experiments';
import { BuildLog } from './components/Sections/BuildLog';
import { Contact } from './components/Sections/Contact';
import { Footer } from './components/Common/Footer';
import { PermissionModal } from './components/Common/PermissionModal';
import { PrivacyModal } from './components/Privacy/PrivacyModal';
import { OwnerConfigModal } from './components/Admin/OwnerConfigModal';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans antialiased selection:bg-purple-900/50 selection:text-purple-200">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <About />
        <Capabilities />
        <Skills />
        <Projects />
        <Experiments />
        <BuildLog />
        <Contact />
      </main>

      <Footer />

      {/* Modals & Overlays */}
      <PermissionModal />
      <PrivacyModal />
      <OwnerConfigModal />
    </div>
  );
};

export default function App() {
  return (
    <OwnerConfigProvider>
      <PermissionProvider>
        <AppContent />
      </PermissionProvider>
    </OwnerConfigProvider>
  );
}
