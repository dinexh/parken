import { useEffect, useState } from 'react';

interface ParkingSlot {
  _id: string;
  slotNumber: string;
  isOccupied: boolean;
  isReserved: boolean;
  sensorId: string;
}

interface FloorGridProps {
  floorCode: string;
  slots: ParkingSlot[];
}

export default function FloorGrid({ floorCode, slots }: FloorGridProps) {
  const [sensorData, setSensorData] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Fetch initial sensor data
    fetchSensorData();

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchSensorData, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchSensorData = async () => {
    try {
      const response = await fetch('/api/sensor');
      const data = await response.json();
      
      // Create a map of sensorId to occupancy status
      const statusMap = data.slots.reduce((acc: Record<string, boolean>, slot: any) => {
        acc[slot.sensorId] = slot.isOccupied;
        return acc;
      }, {});

      setSensorData(statusMap);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  return (
    <div className="floor-card">
      <h3>{floorCode}</h3>
      <div className="floor-stats">
        <div>Total Slots: {slots.length}</div>
        <div>
          Available: {slots.filter(slot => !sensorData[slot.sensorId] && !slot.isReserved).length}
        </div>
        <div>
          Reserved: {slots.filter(slot => slot.isReserved).length}
        </div>
      </div>
      <div className="slots-grid">
        {slots.map((slot) => {
          const isOccupied = sensorData[slot.sensorId] ?? slot.isOccupied;
          return (
            <div 
              key={slot._id} 
              className={`slot ${isOccupied ? 'occupied' : 'available'} ${slot.isReserved ? 'reserved' : ''}`}
              title={`Slot ${slot.slotNumber}${slot.isReserved ? ' (Reserved)' : ''}`}
            >
              {slot.slotNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
} 