import React from 'react';
import { motion } from 'framer-motion';

/**
 * Movie Card Component - Displays movie with poster and details
 * Used in listing pages (Home, Search results)
 */
const MovieCard = ({ movie, onClick, hoverEffect = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={hoverEffect ? { scale: 1.05, y: -10 } : {}}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-xl card-elevated h-72 w-full">
        {/* Movie Poster */}
        <img
          src={movie.posterImage}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Overlay with details */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          {/* Movie Info */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg line-clamp-2">{movie.title}</h3>

            {/* Rating and Duration */}
            <div className="flex gap-3 text-sm text-text-secondary">
              <span className="flex items-center gap-1">
                ⭐ {movie.rating.toFixed(1)}
              </span>
              <span>{movie.duration}min</span>
            </div>

            {/* Language and Status Badge */}
            <div className="flex flex-wrap gap-2">
              {movie.language?.slice(0, 2).map((lang) => (
                <span
                  key={lang}
                  className="text-xs px-2 py-1 rounded bg-primary text-background font-semibold"
                >
                  {lang}
                </span>
              ))}
              <span
                className={`text-xs px-2 py-1 rounded font-semibold ${
                  movie.status === 'Now Showing'
                    ? 'bg-success text-background'
                    : 'bg-warning text-background'
                }`}
              >
                {movie.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
