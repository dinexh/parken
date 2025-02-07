import { useEffect, useState } from 'react';
import { FaCarSide, FaBan, FaLock } from 'react-icons/fa';

interface ParkingSlot {
  id: string;
  status: number;
  reserved: boolean;
}

interface Floor {
  id: string;
  code: string;
  slots: ParkingSlot[];
}

interface Building {
  id: string;
  name: string;
  floors: Floor[];
}

interface ParkingData {
  buildings: Building[];
}

export default function ParkingStatus() {
  const [parkingData, setParkingData] = useState<ParkingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchParkingStatus();
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchParkingStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchParkingStatus = async () => {
    try {
      const response = await fetch('/api/parking/status');
      const data = await response.json();
      setParkingData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching parking status:', error);
      setError('Failed to fetch parking status');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading parking status...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!parkingData) return null;

  return (
    <div className="parking-status">
      {parkingData.buildings.map((building) => (
        <div key={building.id} className="building-section">
          <h2>{building.name}</h2>
          <div className="floors-container">
            {building.floors.map((floor) => (
              <div key={floor.id} className="floor-section">
                <h3>Floor {floor.code}</h3>
                <div className="slots-grid">
                  {floor.slots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`slot ${slot.status === 1 ? 'occupied' : 'available'} ${slot.reserved ? 'reserved' : ''}`}
                      title={`Slot ${slot.id}${slot.reserved ? ' (Reserved)' : ''}`}
                    >
                      <span className="slot-id">{slot.id}</span>
                      {slot.status === 1 ? (
                        <FaCarSide className="slot-icon" />
                      ) : slot.reserved ? (
                        <FaLock className="slot-icon" />
                      ) : (
                        <FaBan className="slot-icon" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="floor-stats">
                  <div className="stat">
                    <span>Total:</span> {floor.slots.length}
                  </div>
                  <div className="stat">
                    <span>Available:</span> {floor.slots.filter(s => s.status === 0 && !s.reserved).length}
                  </div>
                  <div className="stat">
                    <span>Occupied:</span> {floor.slots.filter(s => s.status === 1).length}
                  </div>
                  <div className="stat">
                    <span>Reserved:</span> {floor.slots.filter(s => s.reserved).length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 