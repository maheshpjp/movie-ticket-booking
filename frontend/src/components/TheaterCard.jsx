import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

/**
 * Theater Selection Card
 */
const TheaterCard = ({ theater, onSelectShow }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated p-5 rounded-lg mb-4"
    >
      {/* Theater Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-primary">{theater.name}</h3>
          <p className="text-text-secondary text-sm">{theater.city}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow-400">
            ⭐ {theater.rating}
          </div>
          <p className="text-xs text-text-secondary">{theater.screens?.length} screens</p>
        </div>
      </div>

      {/* Theater Details */}
      {theater.amenities && (
        <div className="flex flex-wrap gap-2 mb-4">
          {theater.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="text-xs bg-surface-light px-3 py-1 rounded-full text-text-secondary"
            >
              {amenity}
            </span>
          ))}
        </div>
      )}

      {/* Show Times */}
      {theater.shows && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-text-secondary">Available Shows:</p>
          <div className="flex flex-wrap gap-2">
            {theater.shows.map((show, idx) => (
              <Button
                key={idx}
                size="sm"
                variant="outline"
                onClick={() => onSelectShow(theater, show)}
              >
                {show.showTime}
              </Button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TheaterCard;
