import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin', 'user'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordOTP: String,
  resetPasswordExpiry: Date,
});

export default mongoose.models.User || mongoose.model('User', UserSchema); 