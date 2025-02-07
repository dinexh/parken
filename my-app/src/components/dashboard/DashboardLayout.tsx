import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'superadmin';
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function DashboardLayout({ 
  children, 
  role, 
  activeTab, 
  onTabChange, 
  onLogout 
}: DashboardLayoutProps) {
  return (
    <div className={`${role}-dashboard dashboard-layout`}>
      <Sidebar 
        role={role}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onLogout={onLogout}
      />
      <div className="dashboard-content">
        <main className="main-content">
          {children}
        </main>
        <footer className="dashboard-footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} KLEF Smart Parking System</p>
            <p>Developed by <a href="https://www.dineshkorukonda.in" target="_blank" rel="noopener noreferrer">2300030350 - Dinesh Korukonda</a></p>
          </div>
        </footer>
      </div>
    </div>
  );
} 