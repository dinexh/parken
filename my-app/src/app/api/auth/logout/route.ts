import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  cookies().delete('authToken');
  cookies().delete('userRole');
  
  return NextResponse.json({ message: 'Logged out successfully' });
} 