import './loadEnv';
import mongoose from 'mongoose';
import User from '../models/User';
import dbConnect from '../utils/dbConnect';

async function clearAllUsers() {
  try {
    await dbConnect();
    console.log('Connected to database');

    // Delete all users
    const result = await User.deleteMany({});
    console.log(`Deleted ${result.deletedCount} users`);

    console.log('Database cleared successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
}

clearAllUsers(); 