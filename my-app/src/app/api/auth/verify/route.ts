import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    await dbConnect();
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 401 }
    );
  }
} 