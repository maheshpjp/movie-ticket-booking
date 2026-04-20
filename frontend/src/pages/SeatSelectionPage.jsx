import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Seat from '../components/Seat';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { seatAPI } from '../services/api';
import { useBooking } from '../context/BookingContext';

/**
 * Seat Selection Page - Interactive seat layout with modern design
 */
const SeatSelectionPage = () => {
  const navigate = useNavigate();
  const { bookingData, setSeatData } = useBooking();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seatsByRow, setSeatsByRow] = useState({});

  // Fetch seat layout
  useEffect(() => {
    if (!bookingData.theater) {
      navigate('/');
      return;
    }

    const fetchSeats = async () => {
      try {
        setLoading(true);
        const response = await seatAPI.getAvailableSeats({
          theaterId: bookingData.theater._id,
          screenNumber: bookingData.screenNumber,
          showDate: bookingData.showDate,
          showTime: bookingData.showTime
        });

        const seatData = response.data.data;
        setSeats(seatData.seats);
        setSeatsByRow(seatData.seatsByRow);
      } catch (error) {
        console.error('Error fetching seats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [bookingData]);

  // Handle seat selection
  const handleSeatClick = (seat) => {
    const isSelected = selectedSeats.some(s => s.seatId === seat.seatId);

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.seatId !== seat.seatId));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Calculate total price
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  // Handle booking continuation
  const handleContinue = () => {
    setSeatData(selectedSeats, totalPrice);
    navigate('/payment');
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-elevated sticky top-0 z-40 p-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-surface-light p-2 rounded transition-colors"
          >
            <FiArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold gradient-text">{bookingData.movie?.title}</h1>
            <p className="text-text-secondary text-sm">
              {bookingData.theater?.name} • {bookingData.showTime}
            </p>
          </div>
        </div>

        {/* Price Summary */}
        <div className="text-right">
          <p className="text-text-secondary text-sm">Total Amount</p>
          <p className="text-3xl font-bold gradient-text">₹{totalPrice}</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Theater Screen */}
          <div className="text-center mb-12">
            <div className="inline-block card-elevated px-8 py-3 rounded-full">
              <p className="font-semibold">🎬 SCREEN</p>
            </div>
            <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded" />
          </div>

          {/* Seat Grid */}
          <div className="card-elevated p-8 rounded-xl mb-12">
            {Object.keys(seatsByRow).map((row) => (
              <motion.div
                key={row}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <span className="w-6 font-bold text-text-secondary">{row}</span>
                <div className="flex gap-2">
                  {seatsByRow[row].map((seat) => (
                    <Seat
                      key={seat.seatId}
                      seat={{
                        ...seat,
                        booked: !seat.isAvailable,
                        number: parseInt(seat.seatNumber)
                      }}
                      selected={selectedSeats.some(s => s.seatId === seat.seatId)}
                      onSelect={handleSeatClick}
                    />
                  ))}
                </div>
                <span className="w-6 font-bold text-text-secondary">{row}</span>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="card-elevated p-6 rounded-lg mb-12"
          >
            <h3 className="font-bold mb-4">Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-600 rounded opacity-40" />
                <span className="text-sm">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-secondary rounded" />
                <span className="text-sm">VIP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-500 rounded" />
                <span className="text-sm">Gold</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded" />
                <span className="text-sm">Silver</span>
              </div>
            </div>
          </motion.div>

          {/* Selected Seats Summary */}
          {selectedSeats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-elevated p-6 rounded-lg mb-12"
            >
              <h3 className="font-bold mb-4">Selected Seats ({selectedSeats.length})</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedSeats.map((seat) => (
                  <motion.span
                    key={seat.seatId}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-4 py-2 bg-primary text-background rounded-lg font-semibold"
                  >
                    {seat.row}{seat.seatNumber}
                  </motion.span>
                ))}
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b border-surface-light">
                {selectedSeats.map((seat) => (
                  <div key={seat.seatId} className="flex justify-between">
                    <span className="text-text-secondary">
                      {seat.row}{seat.seatNumber} - {seat.category}
                    </span>
                    <span>₹{seat.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Grand Total</span>
                <span className="text-3xl gradient-text font-bold">₹{totalPrice}</span>
              </div>

              <Button
                size="lg"
                onClick={handleContinue}
                className="w-full"
              >
                Continue to Payment
              </Button>
            </motion.div>
          )}

          {selectedSeats.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-text-secondary"
            >
              <p>Select seats to continue with booking</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
