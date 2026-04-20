const mongoose = require('mongoose');

// Booking Schema - Stores user bookings and transaction information
const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    default: () => 'BK' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase()
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  screenNumber: {
    type: Number,
    required: true
  },
  showDate: {
    type: Date,
    required: true
  },
  showTime: {
    type: String,
    required: true
  },
  // Selected seats with their category
  seats: [{
    seatId: String,
    row: String,
    number: Number,
    category: {
      type: String,
      enum: ['Gold', 'Silver', 'VIP']
    },
    price: Number
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Cancelled'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Debit Card', 'UPI', 'Wallet', 'Net Banking'],
    default: null
  },
  transactionId: String,
  qrCode: String, // QR code URL for the ticket
  ticketStatus: {
    type: String,
    enum: ['Active', 'Used', 'Cancelled'],
    default: 'Active'
  },
  cancellationReason: String,
  cancellationDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ showDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
