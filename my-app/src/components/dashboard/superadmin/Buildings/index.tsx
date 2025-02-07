import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBuilding } from 'react-icons/fa';
import AddBuilding from './AddBuilding';

interface Building {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  totalFloors: number;
  createdAt: string;
}

export default function Buildings() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      const response = await fetch('/api/buildings');
      const data = await response.json();
      
      if (response.ok) {
        setBuildings(data.buildings);
      } else {
        setError(data.message || 'Failed to fetch buildings');
      }
    } catch (error) {
      setError('Failed to fetch buildings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (buildingId: string) => {
    if (!confirm('Are you sure you want to delete this building?')) return;

    try {
      const response = await fetch(`/api/buildings/${buildingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBuildings(buildings.filter(b => b._id !== buildingId));
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to delete building');
      }
    } catch (error) {
      console.error('Error deleting building:', error);
      alert('Failed to delete building');
    }
  };

  const handleAdd = (newBuilding: Building) => {
    setBuildings([...buildings, newBuilding]);
  };

  if (loading) return <div className="loading">Loading buildings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="buildings-view">
      <div className="view-header">
        <div className="header-title">
          <FaBuilding className="header-icon" />
          <h2>Buildings</h2>
        </div>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Add Building
        </button>
      </div>

      {buildings.length === 0 ? (
        <div className="empty-state">
          <FaBuilding className="empty-icon" />
          <h3>No Buildings Added</h3>
          <p>Start by adding your first building</p>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            <FaPlus /> Add Building
          </button>
        </div>
      ) : (
        <div className="buildings-grid">
          {buildings.map((building) => (
            <div key={building._id} className="building-card">
              <div className="building-header">
                <h3>{building.name}</h3>
                <div className="building-actions">
                  <button 
                    className="icon-btn edit"
                    title="Edit Building"
                    onClick={() => {/* TODO: Implement edit */}}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="icon-btn delete"
                    title="Delete Building"
                    onClick={() => handleDelete(building._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="building-info">
                {building.description && <p>{building.description}</p>}
                {building.location && (
                  <div className="info-item">
                    <strong>Location:</strong> {building.location}
                  </div>
                )}
                <div className="info-item">
                  <strong>Total Floors:</strong> {building.totalFloors}
                </div>
                <div className="info-item">
                  <strong>Added:</strong> {new Date(building.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <AddBuilding 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
} 