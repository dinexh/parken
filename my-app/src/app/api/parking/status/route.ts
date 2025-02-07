import { NextResponse } from 'next/server';

// Demo data for testing
const demoParkingData = {
  buildings: [
    {
      id: '1',
      name: 'Main Parking Building',
      floors: [
        {
          id: 'F1',
          code: 'F1',
          slots: [
            { id: 'F1-01', status: 1, reserved: false },
            { id: 'F1-02', status: 0, reserved: true },
            { id: 'F1-03', status: 1, reserved: false },
            { id: 'F1-04', status: 0, reserved: false },
            { id: 'F1-05', status: 1, reserved: false },
          ]
        },
        {
          id: 'F2',
          code: 'F2',
          slots: [
            { id: 'F2-01', status: 0, reserved: false },
            { id: 'F2-02', status: 1, reserved: false },
            { id: 'F2-03', status: 0, reserved: true },
            { id: 'F2-04', status: 1, reserved: false },
            { id: 'F2-05', status: 0, reserved: false },
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Faculty Parking',
      floors: [
        {
          id: 'F3',
          code: 'F3',
          slots: [
            { id: 'F3-01', status: 1, reserved: true },
            { id: 'F3-02', status: 0, reserved: true },
            { id: 'F3-03', status: 1, reserved: false },
          ]
        }
      ]
    }
  ]
};

export async function GET() {
  // Return demo data
  return NextResponse.json(demoParkingData);
}

export async function POST(req: Request) {
  try {
    const { sensorId, status } = await req.json();

    // Validate input
    if (!sensorId || typeof status !== 'number' || ![0, 1].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid sensor data' },
        { status: 400 }
      );
    }

    /* 
    // TODO: Implement when ESP32 is connected
    // This is where you'll handle the ESP32 sensor data
    // 1. Update the slot status in the database
    // 2. Emit WebSocket event for real-time updates
    // 3. Log the status change
    */

    // For demo, return success with random status
    return NextResponse.json({
      success: true,
      sensorId,
      status: Math.random() > 0.5 ? 1 : 0,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing sensor data:', error);
    return NextResponse.json(
      { message: 'Failed to process sensor data' },
      { status: 500 }
    );
  }
}

// Helper function to get slot status (will be used when implementing real functionality)
function getSlotStatus(buildingId: string, floorCode: string, slotId: string) {
  const building = demoParkingData.buildings.find(b => b.id === buildingId);
  if (!building) return null;

  const floor = building.floors.find(f => f.code === floorCode);
  if (!floor) return null;

  return floor.slots.find(s => s.id === slotId) || null;
} 