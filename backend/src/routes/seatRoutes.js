const express = require('express');
const {
  getSeatLayout,
  getAvailableSeats,
  getSeatAvailability
} = require('../controllers/seatController');

const router = express.Router();

/**
 * Seat Routes
 */

// GET /api/seats/layout - Get seat layout for a theater screen
router.get('/layout', getSeatLayout);

// GET /api/seats/available - Get available seats for a show
router.get('/available', getAvailableSeats);

// GET /api/seats/availability - Check specific seat availability
router.get('/availability', getSeatAvailability);

module.exports = router;
