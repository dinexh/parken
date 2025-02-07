import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();

    // Fetch all users except their passwords
    const users = await User.find({}, { password: 0 }).lean();

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { empId, email, role } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ empId }, { email }]
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this EMP ID or email already exists' },
        { status: 400 }
      );
    }

    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);

    // Create new user
    const user = await User.create({
      empId,
      email,
      role,
      password: tempPassword // This should be hashed in a real application
    });

    // TODO: Send email with temporary password

    // Return user without password
    const { password, ...userWithoutPassword } = user.toObject();
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const { userId } = await req.json();

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { message: 'Failed to delete user' },
      { status: 500 }
    );
  }
} 