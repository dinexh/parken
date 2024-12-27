"use client";
import './sidebar.css';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  BuildingOffice2Icon,
  PlusCircleIcon,
  UserPlusIcon,
  UserCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

const menuItems = [
  { name: 'Home', icon: HomeIcon, path: '/dashboard' },
  { name: 'All Floors', icon: BuildingOffice2Icon, path: '/floors' },
  { name: 'Add a Floor', icon: PlusCircleIcon, path: '/floors/add' },
  { name: 'Add Admins', icon: UserPlusIcon, path: '/admins/add' },
  { name: 'Profile', icon: UserCircleIcon, path: '/profile' },
];

export default function Sidebar({ onCollapse }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    onCollapse?.(isCollapsed);
  }, [isCollapsed, onCollapse]);

  const breadcrumbs = useMemo(() => {
    const currentItem = menuItems.find(item => item.path === pathname);
    if (!currentItem) return 'Dashboard';
    return currentItem.name;
  }, [pathname]);

  return (
    <div 
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
    >
      <div className="sidebar-header">
        <div className="breadcrumbs">
          <span className={`breadcrumb-text ${isCollapsed ? 'hidden' : ''}`}>
            {breadcrumbs}
          </span>
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="collapse-btn"
        >
          {isCollapsed ? (
            <ArrowRightIcon className="w-5 h-5" />
          ) : (
            <ArrowLeftIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon className="w-6 h-6" />
              <span className={isCollapsed ? 'hidden' : ''}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
