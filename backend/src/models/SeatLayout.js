const mongoose = require('mongoose');

// Seat Layout Schema - Defines the seat arrangement for each screen
const seatLayoutSchema = new mongoose.Schema({
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  screenNumber: {
    type: Number,
    required: true
  },
  // Seats organized by row
  seats: [{
    row: {
      type: String, // A, B, C, D, etc.
      required: true
    },
    seatNumber: {
      type: Number,
      required: true
    },
    seatId: {
      type: String, // e.g., A1, A2, B1, B2
      unique: true
    },
    category: {
      type: String,
      enum: ['Gold', 'Silver', 'VIP'],
      default: 'Silver'
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalRows: Number,
  totalSeatsPerRow: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SeatLayout', seatLayoutSchema);
