"use client";
import './page.css';
import { useState } from 'react';
import Sidebar from '../components/sidebar/sidebar';

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-in">
        <aside className="dashboard-in-sidebar">
          <Sidebar onCollapse={handleSidebarCollapse} />
        </aside>
        <main className={`dashboard-in-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
       
        </main>
      </div>
    </div>
  );
}