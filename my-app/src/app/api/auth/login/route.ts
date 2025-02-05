import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const { empId, password } = await req.json();

    // Find user by empId
    const user = await User.findOne({ empId });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    // Create user object without sensitive data
    const userResponse = {
      empId: user.empId,
      role: user.role,
      name: user.name // if you have this field
      // Add other non-sensitive user fields you want to send
    };

    // Set JWT token in HTTP-only cookie and return user data
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: userResponse
      },
      { status: 200 }
    );
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 1 day in seconds
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 