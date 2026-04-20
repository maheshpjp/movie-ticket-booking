import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiStar } from 'react-icons/fi';
import Loader from '../components/Loader';
import TheaterCard from '../components/TheaterCard';
import { movieAPI, theaterAPI } from '../services/api';
import { useBooking } from '../context/BookingContext';

/**
 * Movie Details Page - Show movie details, theaters, and showtimes
 */
const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { setMovieData, setTheaterData } = useBooking();

  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch movie and theaters
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [movieRes, theatersRes] = await Promise.all([
          movieAPI.getMovieById(movieId),
          theaterAPI.getAllTheaters({ limit: 100 })
        ]);

        setMovie(movieRes.data.data);
        setTheaters(theatersRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  // Handle show selection
  const handleSelectShow = (theater, show) => {
    setMovieData(movie);
    setTheaterData(theater, show.screenNumber, selectedDate, show.showTime);
    navigate('/seats');
  };

  if (loading) return <Loader fullScreen />;
  if (!movie) return <div className="text-center py-20">Movie not found</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Backdrop */}
        <div className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface-light to-background" />
          {movie.backdropImage && (
            <img
              src={movie.backdropImage}
              alt={movie.title}
              className="w-full h-full object-cover opacity-20"
            />
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 card-elevated p-2 hover:bg-surface-light transition-all"
        >
          <FiArrowLeft size={24} />
        </button>
      </motion.div>

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="card-elevated p-2 rounded-xl overflow-hidden">
              <img
                src={movie.posterImage}
                alt={movie.title}
                className="w-full rounded-lg"
              />
            </div>
          </motion.div>

          {/* Movie Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 space-y-4"
          >
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">{movie.title}</h1>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <FiStar className="text-yellow-400" />
                  <span className="text-lg font-semibold">{movie.rating.toFixed(1)}/10</span>
                </div>
                <span className="text-text-secondary flex items-center gap-2">
                  <FiClock /> {movie.duration} minutes
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-secondary">
                  {movie.certification}
                </span>
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-2 text-text-secondary">
              <p><strong className="text-text-primary">Director:</strong> {movie.director}</p>
              <p><strong className="text-text-primary">Genre:</strong> {movie.genre?.join(', ')}</p>
              <p><strong className="text-text-primary">Languages:</strong> {movie.language?.join(', ')}</p>
              <p><strong className="text-text-primary">Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
            </div>

            {/* Description */}
            <p className="text-text-secondary leading-relaxed">{movie.description}</p>

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <div>
                <h3 className="font-bold mb-3">Cast</h3>
                <div className="flex flex-wrap gap-4">
                  {movie.cast.slice(0, 3).map((actor) => (
                    <div key={actor.name} className="text-sm">
                      <p className="font-semibold text-primary">{actor.name}</p>
                      <p className="text-text-secondary">{actor.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Theater Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold gradient-text mb-8">Select Theater & Showtime</h2>

          {/* Date Selector */}
          <div className="card-elevated p-6 rounded-lg mb-8">
            <label className="block text-sm font-semibold mb-3">Select Date:</label>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="bg-surface-light px-4 py-2 rounded-lg text-text-primary"
            />
          </div>

          {/* Theaters */}
          <div className="space-y-4">
            {theaters.length > 0 ? (
              theaters.map((theater) => (
                <TheaterCard
                  key={theater._id}
                  theater={{
                    ...theater,
                    shows: [
                      { screenNumber: 1, showTime: '10:30 AM' },
                      { screenNumber: 1, showTime: '1:30 PM' },
                      { screenNumber: 2, showTime: '7:00 PM' }
                    ]
                  }}
                  onSelectShow={handleSelectShow}
                />
              ))
            ) : (
              <p className="text-text-secondary text-center py-8">No theaters available</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
