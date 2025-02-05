"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        if (!response.ok) {
          router.push('/');
          return;
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <p>Welcome, {user?.role}</p>
          <button 
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              router.push('/');
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <main className="dashboard-content">
        <h2>Smart Parking System Dashboard</h2>
        {user?.role === 'superadmin' && (
          <div className="admin-controls">
            <h3>Super Admin Controls</h3>
            {/* Add super admin specific controls */}
          </div>
        )}
        {(user?.role === 'admin' || user?.role === 'superadmin') && (
          <div className="admin-controls">
            <h3>Admin Controls</h3>
            {/* Add admin specific controls */}
          </div>
        )}
      </main>
    </div>
  );
} 