import React, { useState } from 'react';
import { Sidebar } from '../components/dashboard/Sidebar.jsx';
import { TopNavbar } from '../components/dashboard/TopNavbar.jsx';

/**
 * Standard layout for Dashboard modules, managing collapsible navigations and responsive panels.
 */
export const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#07070a] font-sans antialiased text-neutral-200">
      {/* Collapsible Left Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Workspace Frame */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky Top Navigation */}
        <TopNavbar />

        {/* Dynamic Inner Panel Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#07070a] p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
