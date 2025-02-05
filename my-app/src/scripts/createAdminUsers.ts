import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import bcrypt from 'bcryptjs';
import dbConnect from '../utils/dbConnect';
import User from '../models/User';

async function createAdminUsers() {
  try {
    await dbConnect();

    const adminUsers = [
      {
        empId: "1000",
        password: "admin123",
        role: "admin"
      },
      {
        empId: "2000",
        password: "superadmin123",
        role: "superadmin"
      }
    ];

    for (const user of adminUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      // Check if user already exists
      const existingUser = await User.findOne({ empId: user.empId });
      
      if (existingUser) {
        console.log(`User with empId ${user.empId} already exists`);
        continue;
      }

      // Create new user
      await User.create({
        empId: user.empId,
        password: hashedPassword,
        role: user.role
      });

      console.log(`Created ${user.role} user with empId: ${user.empId}`);
    }

    console.log('Admin users created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin users:', error);
    process.exit(1);
  }
}

createAdminUsers(); 