const express = require('express');
const {
  getAllMovies,
  getMovieById,
  addReview,
  getTrendingMovies
} = require('../controllers/movieController');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * Movie Routes
 */

// GET /api/movies - Get all movies with filters
router.get('/', getAllMovies);

// GET /api/movies/trending - Get trending movies
router.get('/trending', getTrendingMovies);

// GET /api/movies/:movieId - Get movie details
router.get('/:movieId', getMovieById);

// POST /api/movies/:movieId/review - Add movie review (requires authentication)
router.post('/:movieId/review', auth, addReview);

module.exports = router;
