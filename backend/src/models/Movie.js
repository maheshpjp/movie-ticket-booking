const mongoose = require('mongoose');

// Movie Schema - Stores movie information
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  genre: [{
    type: String,
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi', 'Animation', 'Adventure']
  }],
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  releaseDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  language: [{
    type: String,
    enum: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam']
  }],
  certification: {
    type: String,
    enum: ['U', 'UA', 'A', 'S'],
    default: 'UA'
  },
  posterImage: {
    type: String,
    required: true
  },
  backdropImage: {
    type: String,
    default: null
  },
  trailerUrl: {
    type: String,
    default: null
  },
  cast: [{
    name: String,
    role: String,
    image: String
  }],
  director: String,
  producer: String,
  budget: String,
  boxOffice: String,
  status: {
    type: String,
    enum: ['Now Showing', 'Upcoming', 'Archive'],
    default: 'Upcoming'
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema);
