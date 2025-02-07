import mongoose from 'mongoose';

const FloorSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building',
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  totalSlots: {
    type: Number,
    required: true,
    default: 0,
  },
  reservedSlots: {
    type: Number,
    required: true,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Create a compound index on building and level to ensure uniqueness
FloorSchema.index({ building: 1, level: 1 }, { unique: true });

export default mongoose.models.Floor || mongoose.model('Floor', FloorSchema); 