import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import ParkingSlot from '@/models/ParkingSlot';

// Demo data for testing
const demoSlots = [
  { sensorId: 'F5-01', isOccupied: true },
  { sensorId: 'F5-02', isOccupied: false },
  { sensorId: 'F5-03', isOccupied: true },
  { sensorId: 'F5-04', isOccupied: false },
  { sensorId: 'F5-05', isOccupied: true },
];

export async function GET() {
  // Return demo data for now
  return NextResponse.json({ slots: demoSlots });
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { sensorId, status } = await req.json();

    // Validate input
    if (!sensorId || typeof status !== 'number' || ![0, 1].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid sensor data' },
        { status: 400 }
      );
    }

    /* Commented out for now, will be implemented when ESP32 is connected
    // Update parking slot status
    const slot = await ParkingSlot.findOne({ sensorId });
    
    if (!slot) {
      return NextResponse.json(
        { message: 'Sensor ID not found' },
        { status: 404 }
      );
    }

    slot.isOccupied = status === 1;
    slot.lastUpdated = new Date();
    await slot.save();

    // Emit WebSocket event for real-time updates
    // TODO: Implement WebSocket
    */

    return NextResponse.json({ 
      message: 'Sensor data received',
      // For demo, return random status
      status: Math.random() > 0.5 ? 1 : 0
    });
  } catch (error) {
    console.error('Error processing sensor data:', error);
    return NextResponse.json(
      { message: 'Failed to process sensor data' },
      { status: 500 }
    );
  }
} 