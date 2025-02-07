import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Floor from '@/models/Floor';
import ParkingSlot from '@/models/ParkingSlot';

export async function GET() {
  try {
    await dbConnect();

    // Fetch all floors
    const floors = await Floor.find({ isActive: true })
      .populate('building')
      .lean();

    // For each floor, fetch its parking slots
    const floorsWithSlots = await Promise.all(
      floors.map(async (floor) => {
        const slots = await ParkingSlot.find({ 
          floor: floor._id,
          isActive: true 
        }).lean();

        // Count occupied slots
        const occupiedSlots = slots.filter(slot => slot.isOccupied).length;

        return {
          ...floor,
          slots,
          occupiedSlots
        };
      })
    );

    return NextResponse.json({ floors: floorsWithSlots });
  } catch (error) {
    console.error('Error fetching floors:', error);
    return NextResponse.json(
      { message: 'Failed to fetch floors' },
      { status: 500 }
    );
  }
} 