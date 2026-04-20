const Theater = require('../models/Theater');
const { calculateDistance } = require('../utils/helpers');

/**
 * Get All Theaters with optional city filter
 */
const getAllTheaters = async (req, res) => {
  try {
    const { city, limit = 20, page = 1 } = req.query;

    let filter = {};
    if (city) {
      filter.city = city;
    }

    const skip = (page - 1) * limit;

    const theaters = await Theater.find(filter)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Theater.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: theaters,
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
      message: 'Error fetching theaters',
      error: error.message
    });
  }
};

/**
 * Get Theater by ID with detailed information
 */
const getTheaterById = async (req, res) => {
  try {
    const { theaterId } = req.params;

    const theater = await Theater.findById(theaterId).populate('screens.shows.movieId');

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: 'Theater not found'
      });
    }

    res.status(200).json({
      success: true,
      data: theater
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching theater',
      error: error.message
    });
  }
};

/**
 * Get Nearby Theaters based on user location
 * Uses Haversine formula to calculate distance
 */
const getNearbyTheaters = async (req, res) => {
  try {
    const { latitude, longitude, radiusKm = 5 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);
    const radius = parseFloat(radiusKm);

    // Get all theaters and calculate distance
    const theaters = await Theater.find({});

    const nearbyTheaters = theaters
      .map(theater => {
        if (!theater.location || !theater.location.latitude) {
          return null;
        }
        
        const distance = calculateDistance(
          userLat,
          userLon,
          theater.location.latitude,
          theater.location.longitude
        );

        return distance <= radius ? { ...theater.toObject(), distance } : null;
      })
      .filter(theater => theater !== null)
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      data: nearbyTheaters
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching nearby theaters',
      error: error.message
    });
  }
};

/**
 * Get Available Shows for a Movie in a Theater on a specific date
 */
const getAvailableShows = async (req, res) => {
  try {
    const { theaterId, movieId, date } = req.query;

    if (!theaterId || !movieId || !date) {
      return res.status(400).json({
        success: false,
        message: 'theaterId, movieId, and date are required'
      });
    }

    const theater = await Theater.findById(theaterId).populate('screens.shows.movieId');

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: 'Theater not found'
      });
    }

    // Filter shows for the movie and date
    const shows = [];
    theater.screens.forEach(screen => {
      screen.shows.forEach(show => {
        if (
          show.movieId._id.toString() === movieId &&
          new Date(show.date).toDateString() === new Date(date).toDateString()
        ) {
          shows.push({
            _id: show._id,
            screenNumber: screen.screenNumber,
            screenName: screen.screenName,
            format: screen.format,
            showTime: show.showTime,
            endTime: show.endTime,
            price: show.price,
            status: show.status,
            availableSeats: screen.totalSeats - show.bookedSeats.length
          });
        }
      });
    });

    res.status(200).json({
      success: true,
      data: shows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching available shows',
      error: error.message
    });
  }
};

module.exports = {
  getAllTheaters,
  getTheaterById,
  getNearbyTheaters,
  getAvailableShows
};
