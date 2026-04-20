const Movie = require('../models/Movie');

/**
 * Get All Movies with filtering
 * Supports filters: status, genre, language, rating, search
 */
const getAllMovies = async (req, res) => {
  try {
    const { status, genre, language, minRating, search, limit = 20, page = 1 } = req.query;

    // Build filter object
    let filter = {};
    
    if (status) {
      filter.status = status; // Now Showing, Upcoming, Archive
    }
    if (genre) {
      filter.genre = genre;
    }
    if (language) {
      filter.language = language;
    }
    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }
    if (search) {
      // Search in title and description
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    // Query with pagination
    const movies = await Movie.find(filter)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ releaseDate: -1 });

    const total = await Movie.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: movies,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching movies',
      error: error.message
    });
  }
};

/**
 * Get Single Movie by ID
 * Includes detailed information and reviews
 */
const getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId).populate('reviews.userId', 'name profileImage');

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching movie',
      error: error.message
    });
  }
};

/**
 * Add Movie Review
 * Requires authentication
 */
const addReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 0 || rating > 10) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 0 and 10'
      });
    }

    const movie = await Movie.findByIdAndUpdate(
      movieId,
      {
        $push: {
          reviews: {
            userId: req.userId,
            rating,
            comment,
            createdAt: Date.now()
          }
        }
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
};

/**
 * Get Trending/Featured Movies
 */
const getTrendingMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ status: 'Now Showing' })
      .sort({ rating: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trending movies',
      error: error.message
    });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  addReview,
  getTrendingMovies
};
