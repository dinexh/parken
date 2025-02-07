import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Building from '@/models/Building';
import Floor from '@/models/Floor';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const building = await Building.findById(params.id);
    
    if (!building) {
      return NextResponse.json(
        { message: 'Building not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(building);
  } catch (error) {
    console.error('Error fetching building:', error);
    return NextResponse.json(
      { message: 'Failed to fetch building' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const building = await Building.findByIdAndUpdate(
      params.id,
      {
        name: data.name,
        description: data.description,
        location: data.location,
        totalFloors: data.totalFloors,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!building) {
      return NextResponse.json(
        { message: 'Building not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(building);
  } catch (error) {
    console.error('Error updating building:', error);
    return NextResponse.json(
      { message: 'Failed to update building' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // Check if building has any floors
    const floors = await Floor.find({ building: params.id });
    if (floors.length > 0) {
      return NextResponse.json(
        { message: 'Cannot delete building with existing floors' },
        { status: 400 }
      );
    }

    const building = await Building.findByIdAndDelete(params.id);
    
    if (!building) {
      return NextResponse.json(
        { message: 'Building not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Building deleted successfully' });
  } catch (error) {
    console.error('Error deleting building:', error);
    return NextResponse.json(
      { message: 'Failed to delete building' },
      { status: 500 }
    );
  }
} 