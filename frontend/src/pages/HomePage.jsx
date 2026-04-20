import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { movieAPI } from '../services/api';

/**
 * Home Page - Main landing page
 * Displays now showing and upcoming movies
 */
const HomePage = () => {
  const navigate = useNavigate();
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [nowShowing, upcoming] = await Promise.all([
          movieAPI.getAllMovies({ status: 'Now Showing', limit: 12 }),
          movieAPI.getAllMovies({ status: 'Upcoming', limit: 8 }),
        ]);

        setNowShowingMovies(nowShowing.data.data);
        setUpcomingMovies(upcoming.data.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Handle search
  const handleSearch = async (query) => {
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  // Handle movie click
  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie._id}`);
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 bg-gradient-to-b from-surface to-background overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold"
          >
            <span className="gradient-text">CineMax</span>
          </motion.h1>

          <p className="text-xl text-text-secondary max-w-2xl">
            Book your favorite movies, select premium seats, and enjoy an unforgettable cinema experience
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-xl"
          >
            <SearchBar onSearch={handleSearch} placeholder="Search movies by title..." size="lg" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Now Showing Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <h2 className="text-3xl font-bold gradient-text">Now Showing</h2>
            <div className="flex-1 h-1 bg-gradient-to-r from-primary to-transparent rounded" />
          </motion.div>

          {nowShowingMovies.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {nowShowingMovies.map((movie, idx) => (
                <motion.div
                  key={movie._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <MovieCard
                    movie={movie}
                    onClick={() => handleMovieClick(movie)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-text-secondary text-center py-8">No movies available</p>
          )}
        </div>

        {/* Upcoming Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <h2 className="text-3xl font-bold gradient-text">Coming Soon</h2>
            <div className="flex-1 h-1 bg-gradient-to-r from-secondary to-transparent rounded" />
          </motion.div>

          {upcomingMovies.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {upcomingMovies.map((movie, idx) => (
                <motion.div
                  key={movie._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <MovieCard
                    movie={movie}
                    onClick={() => handleMovieClick(movie)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-text-secondary text-center py-8">No upcoming movies</p>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="card-elevated p-12 text-center rounded-xl"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to book your tickets?</h3>
          <p className="text-text-secondary mb-8">
            Select a movie above and get started with our easy 4-step booking process
          </p>
          <Button size="lg" onClick={() => navigate('/movies')}>
            Browse All Movies <FiArrowRight />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
