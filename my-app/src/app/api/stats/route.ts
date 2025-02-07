import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Floor from '@/models/Floor';
import ParkingSlot from '@/models/ParkingSlot';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();

    // Get total slots
    const totalSlots = await ParkingSlot.countDocuments({ isActive: true });

    // Get occupied slots
    const occupiedSlots = await ParkingSlot.countDocuments({ 
      isActive: true,
      isOccupied: true 
    });

    // Get reserved slots
    const reservedSlots = await ParkingSlot.countDocuments({ 
      isActive: true,
      isReserved: true 
    });

    // Get total users
    const totalUsers = await User.countDocuments();

    // Get total floors
    const totalFloors = await Floor.countDocuments({ isActive: true });

    // Calculate occupancy rate
    const occupancyRate = totalSlots > 0 
      ? Math.round((occupiedSlots / totalSlots) * 100) 
      : 0;

    return NextResponse.json({
      totalSlots,
      occupiedSlots,
      reservedSlots,
      totalUsers,
      totalFloors,
      occupancyRate
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
} 