import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiMapPin, FiFilm } from 'react-icons/fi';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { bookingAPI } from '../services/api';

/**
 * Booking History Page - Show user's past and upcoming bookings
 */
const BookingHistoryPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await bookingAPI.getUserBookings();
        setBookings(response.data.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Separate upcoming and past bookings
  const now = new Date();
  const upcomingBookings = bookings.filter(b => new Date(b.showDate) >= now);
  const pastBookings = bookings.filter(b => new Date(b.showDate) < now);

  const BookingCard = ({ booking, isPast = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated p-6 rounded-lg"
    >
      <div className="flex gap-6 mb-6">
        {/* Poster */}
        <img
          src={booking.movieId?.posterImage}
          alt={booking.movieId?.title}
          className="w-24 h-32 rounded-lg object-cover"
        />

        {/* Details */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{booking.movieId?.title}</h3>

          <div className="space-y-2 text-text-secondary text-sm mb-4">
            <div className="flex items-center gap-2">
              <FiMapPin size={16} />
              <span>{booking.theaterId?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar size={16} />
              <span>
                {new Date(booking.showDate).toLocaleDateString()} at {booking.showTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiFilm size={16} />
              <span>{booking.seats?.map(s => `${s.row}${s.number}`).join(', ')}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex gap-2 flex-wrap">
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                booking.paymentStatus === 'Completed'
                  ? 'bg-success text-background'
                  : 'bg-warning text-background'
              }`}
            >
              {booking.paymentStatus}
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                booking.ticketStatus === 'Active'
                  ? 'bg-primary text-background'
                  : 'bg-error text-background'
              }`}
            >
              {booking.ticketStatus}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <p className="text-text-secondary text-sm mb-2">Total Amount</p>
          <p className="text-2xl font-bold gradient-text">₹{booking.totalPrice}</p>
          <p className="text-xs text-text-secondary mt-2">Booking ID: {booking.bookingId}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 border-t border-surface-light pt-4">
        {booking.qrCode && (
          <a href={booking.qrCode} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline">
              View Ticket
            </Button>
          </a>
        )}
        {booking.ticketStatus === 'Active' && !isPast && (
          <Button size="sm" variant="outline" className="text-error border-error">
            Cancel Booking
          </Button>
        )}
        <Button size="sm" variant="ghost">
          Download Invoice
        </Button>
      </div>
    </motion.div>
  );

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-elevated p-6 flex items-center gap-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-surface-light p-2 rounded transition-colors"
        >
          <FiArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold gradient-text">My Bookings</h1>
          <p className="text-text-secondary">Manage your movie tickets and bookings</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Upcoming Bookings */}
        {upcomingBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Upcoming</h2>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} isPast={false} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-6">Past Bookings</h2>
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} isPast={true} />
              ))}
            </div>
          </motion.div>
        )}

        {/* No Bookings */}
        {bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-elevated p-12 text-center rounded-lg"
          >
            <p className="text-xl text-text-secondary mb-6">No bookings yet</p>
            <Button onClick={() => navigate('/')}>
              Browse Movies
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookingHistoryPage;
