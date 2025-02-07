import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Building from '@/models/Building';

export async function GET() {
  try {
    await dbConnect();
    const buildings = await Building.find().sort({ createdAt: -1 });
    return NextResponse.json({ buildings });
  } catch (error) {
    console.error('Error fetching buildings:', error);
    return NextResponse.json(
      { message: 'Failed to fetch buildings' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    // Validate required fields
    if (!data.name || !data.totalFloors) {
      return NextResponse.json(
        { message: 'Name and total floors are required' },
        { status: 400 }
      );
    }

    // Create new building
    const building = await Building.create({
      name: data.name,
      description: data.description,
      location: data.location,
      totalFloors: data.totalFloors
    });

    return NextResponse.json(building);
  } catch (error) {
    console.error('Error creating building:', error);
    return NextResponse.json(
      { message: 'Failed to create building' },
      { status: 500 }
    );
  }
} 