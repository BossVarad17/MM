import React from 'react';
import { Navigation } from './Navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Navigation />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </>
  );
}