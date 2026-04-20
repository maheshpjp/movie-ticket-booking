const express = require('express');
const {
  getAllTheaters,
  getTheaterById,
  getNearbyTheaters,
  getAvailableShows
} = require('../controllers/theaterController');

const router = express.Router();

/**
 * Theater Routes
 */

// GET /api/theaters - Get all theaters
router.get('/', getAllTheaters);

// GET /api/theaters/nearby - Get nearby theaters based on coordinates
router.get('/nearby', getNearbyTheaters);

// GET /api/theaters/:theaterId - Get theater details
router.get('/:theaterId', getTheaterById);

// GET /api/theaters/available-shows - Get available shows for a movie in a theater
router.get('/shows/available', getAvailableShows);

module.exports = router;
