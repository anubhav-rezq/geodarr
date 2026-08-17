import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';

import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';
import { IntelligenceMapPage } from './pages/IntelligenceMapPage';
import { AIDetectionPage } from './pages/AIDetectionPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ReportsPage } from './pages/ReportsPage';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { ProfilePage } from './pages/ProfilePage';

const AppRouter: React.FC = () => {
  const { currentPath } = useApp();

  const renderCurrentPage = () => {
    if (currentPath === '/') return <HomePage />;
    if (currentPath === '/platform') return <PlatformPage />;
    if (currentPath === '/map') return <IntelligenceMapPage />;
    if (currentPath === '/ai-detection') return <AIDetectionPage />;
    if (currentPath === '/solutions') return <SolutionsPage />;
    if (currentPath === '/about') return <AboutPage />;
    if (currentPath === '/login') return <LoginPage />;
    if (currentPath === '/register') return <RegisterPage />;
    if (currentPath === '/dashboard') return <DashboardPage />;
    if (currentPath === '/reports') return <ReportsPage />;
    if (currentPath.startsWith('/report/')) return <ReportDetailPage />;
    if (currentPath === '/profile') return <ProfilePage />;

    // Fallback to Home
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-[#F7F7FF] text-[#17172A] flex flex-col font-sans selection:bg-[#27187E] selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
