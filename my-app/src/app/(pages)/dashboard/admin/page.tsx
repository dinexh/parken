"use client";

import { useState, useEffect } from 'react';
import { FaCog, FaParking, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import './page.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('floors');
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchFloors();
  }, []);

  const fetchFloors = async () => {
    try {
      const response = await fetch('/api/floors');
      const data = await response.json();
      
      if (response.ok) {
        setFloors(data.floors);
      } else {
        setError(data.message || 'Failed to fetch floors');
      }
    } catch (error) {
      setError('Failed to fetch floors');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.replace('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'floors':
        return (
          <div className="floors-view">
            <h2>Parking Floors</h2>
            {loading ? (
              <div className="loading">Loading floors...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <div className="floors-grid">
                {floors.map((floor: any) => (
                  <div key={floor._id} className="floor-card">
                    <h3>{floor.code}</h3>
                    <div className="floor-stats">
                      <div>Total Slots: {floor.totalSlots}</div>
                      <div>Available: {floor.totalSlots - floor.occupiedSlots}</div>
                      <div>Reserved: {floor.reservedSlots}</div>
                    </div>
                    <div className="slots-grid">
                      {floor.slots.map((slot: any) => (
                        <div 
                          key={slot._id} 
                          className={`slot ${slot.isOccupied ? 'occupied' : 'available'} ${slot.isReserved ? 'reserved' : ''}`}
                        >
                          {slot.slotNumber}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      
      case 'settings':
        return (
          <div className="settings-view">
            <h2>Settings</h2>
            <div className="settings-form">
              <div className="form-group">
                <label>Change Password</label>
                <input type="password" placeholder="Current Password" />
                <input type="password" placeholder="New Password" />
                <input type="password" placeholder="Confirm New Password" />
                <button className="save-btn">Update Password</button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>Admin Dashboard</h1>
        </div>
        <ul className="nav-links">
          <li 
            className={activeTab === 'floors' ? 'active' : ''}
            onClick={() => setActiveTab('floors')}
          >
            <FaParking /> Floors
          </li>
          <li 
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            <FaCog /> Settings
          </li>
          <li onClick={handleLogout} className="logout-link">
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </nav>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}