import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { sendEmail } from '@/utils/mailer';
import { generateResetPasswordEmail } from '@/utils/emailTemplates';

export async function POST(req: Request) {
  try {
    await dbConnect();
    console.log('Connected to database');
    
    const { email } = await req.json();
    console.log('Received email:', email);
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('No user found with email:', email);
      return NextResponse.json(
        { message: 'No account found with this email address' },
        { status: 404 }
      );
    }

    console.log('User found:', user.empId);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    console.log('Generated OTP:', otp);

    // Save OTP to user document
    user.resetPasswordOTP = otp;
    user.resetPasswordExpiry = otpExpiry;
    await user.save();
    console.log('Saved OTP to user document');

    // Send email
    const emailTemplate = generateResetPasswordEmail(otp);
    console.log('Attempting to send email to:', email);
    
    const emailSent = await sendEmail(
      email,
      'Password Reset Request - Smart Parking System',
      emailTemplate
    );

    if (!emailSent) {
      console.error('Failed to send email');
      return NextResponse.json(
        { message: 'Failed to send reset email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully');
    return NextResponse.json(
      { 
        message: 'Password reset instructions sent to your email',
        email: email
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 