import mongoose from 'mongoose';

const ParkingSlotSchema = new mongoose.Schema({
  slotNumber: {
    type: String,
    required: true,
  },
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor',
    required: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
  reservedFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  sensorId: {
    type: String,
    required: true,
    unique: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create a compound index on floor and slotNumber to ensure uniqueness
ParkingSlotSchema.index({ floor: 1, slotNumber: 1 }, { unique: true });

export default mongoose.models.ParkingSlot || mongoose.model('ParkingSlot', ParkingSlotSchema); 