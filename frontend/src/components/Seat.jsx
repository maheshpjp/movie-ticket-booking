import React from 'react';
import { motion } from 'framer-motion';

/**
 * Seat Component - Individual seat in the theater
 * Shows seat availability and category
 */
const Seat = ({ seat, selected, onSelect, disabled = false }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'VIP':
        return 'bg-secondary';
      case 'Gold':
        return 'bg-yellow-500';
      case 'Silver':
        return 'bg-blue-500';
      default:
        return 'bg-surface-light';
    }
  };

  const handleClick = () => {
    if (!disabled && !seat.booked) {
      onSelect(seat);
    }
  };

  return (
    <motion.button
      whileHover={disabled || seat.booked ? {} : { scale: 1.15 }}
      whileTap={disabled || seat.booked ? {} : { scale: 0.9 }}
      disabled={disabled || seat.booked}
      onClick={handleClick}
      className={`w-8 h-8 rounded-md transition-all duration-200 font-semibold text-xs ${
        seat.booked
          ? 'bg-gray-600 opacity-40 cursor-not-allowed'
          : selected
          ? 'ring-2 ring-primary scale-110 glow-effect'
          : `${getCategoryColor(seat.category)} hover:brightness-110`
      }`}
      title={`${seat.row}${seat.number} - ${seat.category} (₹${seat.price})`}
    >
      {seat.number}
    </motion.button>
  );
};

export default Seat;
