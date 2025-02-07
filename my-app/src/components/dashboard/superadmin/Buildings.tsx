import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Building {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  totalFloors: number;
  createdAt: string;
}

export default function Buildings() {
  const [buildings, setBuildings] = useState<Building[]>([
    // Demo data
    {
      _id: '1',
      name: 'Main Parking Building',
      description: 'Main parking facility for students and staff',
      location: 'Near Main Gate',
      totalFloors: 5,
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      name: 'Faculty Parking',
      description: 'Exclusive parking for faculty members',
      location: 'Behind Admin Block',
      totalFloors: 3,
      createdAt: new Date().toISOString()
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    totalFloors: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement building creation
    setShowAddForm(false);
  };

  return (
    <div className="buildings-view">
      <div className="view-header">
        <h2>Buildings</h2>
        <button className="add-btn" onClick={() => setShowAddForm(true)}>
          <FaPlus /> Add Building
        </button>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Building</h3>
            <form onSubmit={handleSubmit} className="add-form">
              <div className="form-group">
                <label>Building Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter building name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter building description"
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter building location"
                />
              </div>
              <div className="form-group">
                <label>Total Floors</label>
                <input
                  type="number"
                  value={formData.totalFloors}
                  onChange={(e) => setFormData({ ...formData, totalFloors: parseInt(e.target.value) })}
                  min="1"
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button type="submit">Add Building</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="buildings-grid">
        {buildings.map((building) => (
          <div key={building._id} className="building-card">
            <div className="building-header">
              <h3>{building.name}</h3>
              <div className="building-actions">
                <button className="icon-btn edit">
                  <FaEdit />
                </button>
                <button className="icon-btn delete">
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
    </div>
  );
} 