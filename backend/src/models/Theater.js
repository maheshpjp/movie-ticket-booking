const mongoose = require('mongoose');

// Theater Schema - Stores theater information and showtimes
const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true
  },
  location: {
    address: String,
    latitude: Number,
    longitude: Number
  },
  image: String,
  amenities: [String], // e.g., ['WiFi', 'Parking', 'Wheelchair Accessible']
  screens: [{
    screenNumber: Number,
    screenName: String,
    format: String, // IMAX, 4DX, 3D, Standard
    totalSeats: Number,
    rows: Number,
    columns: Number,
    shows: [{
      movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
      },
      showTime: String, // e.g., "10:30 AM"
      endTime: String,
      price: {
        gold: Number,
        silver: Number,
        vip: Number
      },
      bookedSeats: [String], // Seat IDs that are booked
      date: Date,
      status: {
        type: String,
        enum: ['Available', 'Housefull', 'Cancelled'],
        default: 'Available'
      }
    }]
  }],
  phoneNumber: String,
  email: String,
  rating: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Theater', theaterSchema);
