import { FaCog, FaParking, FaSignOutAlt, FaUsers, FaChartBar, FaBuilding } from 'react-icons/fa';

interface SidebarProps {
  role: 'admin' | 'superadmin';
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ role, activeTab, onTabChange, onLogout }: SidebarProps) {
  const isAdmin = role === 'admin';

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h1>{isAdmin ? 'Admin' : 'Super Admin'}</h1>
      </div>
      <ul className="nav-links">
        {!isAdmin && (
          <li 
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => onTabChange('home')}
          >
            <FaChartBar /> Overview
          </li>
        )}
        {!isAdmin && (
          <li 
            className={activeTab === 'buildings' ? 'active' : ''}
            onClick={() => onTabChange('buildings')}
          >
            <FaBuilding /> Buildings
          </li>
        )}
        <li 
          className={activeTab === 'floors' ? 'active' : ''}
          onClick={() => onTabChange('floors')}
        >
          <FaParking /> Floors
        </li>
        {!isAdmin && (
          <li 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => onTabChange('users')}
          >
            <FaUsers /> Users
          </li>
        )}
        <li 
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => onTabChange('settings')}
        >
          <FaCog /> Settings
        </li>
        <li onClick={onLogout} className="logout-link">
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </nav>
  );
} 