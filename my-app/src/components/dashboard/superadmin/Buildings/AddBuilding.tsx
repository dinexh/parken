import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface AddBuildingProps {
  onClose: () => void;
  onAdd: (buildingData: any) => void;
}

export default function AddBuilding({ onClose, onAdd }: AddBuildingProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    totalFloors: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/buildings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        onAdd(data);
        onClose();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add building');
      }
    } catch (error) {
      console.error('Error adding building:', error);
      alert('Failed to add building');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Add New Building</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label htmlFor="name">Building Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter building name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter building description"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter building location"
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalFloors">Number of Floors *</label>
            <input
              id="totalFloors"
              type="number"
              value={formData.totalFloors}
              onChange={(e) => setFormData({ ...formData, totalFloors: parseInt(e.target.value) })}
              min="1"
              required
            />
          </div>
          <div className="form-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Building
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 