"use client";

import { useState, useEffect } from 'react';
import { FaCog, FaParking, FaSignOutAlt, FaUsers, FaChartBar, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import './page.css';

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [floors, setFloors] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalSlots: 0,
    occupiedSlots: 0,
    reservedSlots: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (activeTab === 'home') fetchStats();
    if (activeTab === 'floors') fetchFloors();
    if (activeTab === 'users') fetchUsers();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      
      if (response.ok) {
        setStats(data);
      } else {
        setError(data.message || 'Failed to fetch statistics');
      }
    } catch (error) {
      setError('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

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

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (error) {
      setError('Failed to fetch users');
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
      case 'home':
        return (
          <div className="home-view">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Parking Slots</h3>
                <p>{stats.totalSlots}</p>
              </div>
              <div className="stat-card">
                <h3>Occupied Slots</h3>
                <p>{stats.occupiedSlots}</p>
              </div>
              <div className="stat-card">
                <h3>Reserved Slots</h3>
                <p>{stats.reservedSlots}</p>
              </div>
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>
            </div>
            {/* Add charts/graphs here */}
          </div>
        );
      
      case 'floors':
        return (
          <div className="floors-view">
            <div className="view-header">
              <h2>Parking Floors</h2>
              <button className="add-btn" onClick={() => setActiveTab('add-floor')}>
                <FaPlus /> Add Floor
              </button>
            </div>
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
      
      case 'users':
        return (
          <div className="users-view">
            <div className="view-header">
              <h2>Users Management</h2>
              <button className="add-btn" onClick={() => setActiveTab('add-user')}>
                <FaPlus /> Add User
              </button>
            </div>
            {loading ? (
              <div className="loading">Loading users...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>EMP ID</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: any) => (
                      <tr key={user._id}>
                        <td>{user.empId}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case 'add-floor':
        return (
          <div className="add-floor-view">
            <h2>Add New Floor</h2>
            <form className="add-form">
              <div className="form-group">
                <label>Floor Code</label>
                <input type="text" placeholder="e.g., F5" required />
              </div>
              <div className="form-group">
                <label>Building</label>
                <select required>
                  <option value="">Select Building</option>
                  {/* Add building options */}
                </select>
              </div>
              <div className="form-group">
                <label>Number of Slots</label>
                <input type="number" min="1" required />
              </div>
              <div className="form-buttons">
                <button type="button" onClick={() => setActiveTab('floors')}>Cancel</button>
                <button type="submit">Add Floor</button>
              </div>
            </form>
          </div>
        );

      case 'add-user':
        return (
          <div className="add-user-view">
            <h2>Add New User</h2>
            <form className="add-form">
              <div className="form-group">
                <label>EMP ID</label>
                <input type="text" placeholder="Enter EMP ID" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter email" required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select required>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
              <div className="form-buttons">
                <button type="button" onClick={() => setActiveTab('users')}>Cancel</button>
                <button type="submit">Add User</button>
              </div>
            </form>
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
    <div className="superadmin-dashboard">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>Super Admin</h1>
        </div>
        <ul className="nav-links">
          <li 
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => setActiveTab('home')}
          >
            <FaChartBar /> Overview
          </li>
          <li 
            className={activeTab === 'floors' ? 'active' : ''}
            onClick={() => setActiveTab('floors')}
          >
            <FaParking /> Floors
          </li>
          <li 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers /> Users
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