import './loadEnv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import dbConnect from '../utils/dbConnect';

const adminUsers = [
  {
    empId: '2300030350',
    email: '2300030350@kluniversity.in',
    password: 'admin123',
    role: 'admin'
  },
  {
    empId: '2300033004',
    email: '2300033004@kluniversity.in',
    password: 'superadmin123',
    role: 'superadmin'
  }
];

async function createAdminUsers() {
  try {
    await dbConnect();
    console.log('Connected to database');

    for (const admin of adminUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ 
        $or: [
          { empId: admin.empId },
          { email: admin.email }
        ]
      });

      if (existingUser) {
        console.log(`User with empId ${admin.empId} or email ${admin.email} already exists`);
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(admin.password, salt);

      // Create new user
      const user = new User({
        empId: admin.empId,
        email: admin.email,
        password: hashedPassword,
        role: admin.role
      });

      await user.save();
      console.log(`Created ${admin.role} user with empId ${admin.empId}`);
    }

    console.log('Admin users creation completed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin users:', error);
    process.exit(1);
  }
}

createAdminUsers(); 