const express = require('express');
const {
  createBooking,
  getUserBookings,
  getBookingDetails,
  completePayment,
  cancelBooking
} = require('../controllers/bookingController');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * Booking Routes (All require authentication)
 */

// POST /api/bookings - Create a new booking
router.post('/', auth, createBooking);

// GET /api/bookings - Get user's bookings
router.get('/', auth, getUserBookings);

// GET /api/bookings/:bookingId - Get booking details
router.get('/:bookingId', auth, getBookingDetails);

// POST /api/bookings/:bookingId/payment - Complete payment
router.post('/:bookingId/payment', auth, completePayment);

// POST /api/bookings/:bookingId/cancel - Cancel booking
router.post('/:bookingId/cancel', auth, cancelBooking);

module.exports = router;
