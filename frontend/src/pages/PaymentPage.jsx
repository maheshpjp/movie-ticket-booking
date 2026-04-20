import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { bookingAPI } from '../services/api';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

/**
 * Payment Page - Process payment and confirm booking
 */
const PaymentPage = () => {
  const navigate = useNavigate();
  const { bookingData, resetBooking } = useBooking();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!bookingData.movie) {
    return navigate('/');
  }

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);

      // Create booking
      const bookingPayload = {
        movieId: bookingData.movie._id,
        theaterId: bookingData.theater._id,
        screenNumber: bookingData.screenNumber,
        showDate: bookingData.showDate,
        showTime: bookingData.showTime,
        seats: bookingData.seats.map(seat => ({
          seatId: seat.seatId,
          row: seat.row,
          number: seat.seatNumber,
          category: seat.category,
          price: seat.price
        })),
        paymentMethod
      };

      const bookingRes = await bookingAPI.createBooking(bookingPayload);
      const booking = bookingRes.data.data;

      // Simulate payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Complete payment
      await bookingAPI.completePayment(booking._id, {
        transactionId: `TXN${Date.now()}`,
        paymentMethod
      });

      // Show confirmation
      setShowConfirmModal(true);
      resetBooking();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-elevated sticky top-0 z-40 p-6 flex items-center gap-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-surface-light p-2 rounded transition-colors"
        >
          <FiArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold gradient-text">Payment & Confirmation</h1>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Booking Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-elevated p-6 rounded-lg"
            >
              <h2 className="text-xl font-bold mb-4">Booking Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Movie:</span>
                  <span className="font-semibold">{bookingData.movie?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Theater:</span>
                  <span className="font-semibold">{bookingData.theater?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Date & Time:</span>
                  <span className="font-semibold">{bookingData.showTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Seats:</span>
                  <span className="font-semibold">
                    {bookingData.seats.map(s => `${s.row}${s.seatNumber}`).join(', ')}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-elevated p-6 rounded-lg"
            >
              <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
              <div className="space-y-3">
                {['UPI', 'Credit Card', 'Debit Card', 'Net Banking'].map((method) => (
                  <motion.label
                    key={method}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-4 card-elevated rounded-lg cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-primary"
                    />
                    <span className="ml-4 font-semibold">{method}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-elevated p-6 rounded-lg"
            >
              <h2 className="text-xl font-bold mb-4">Your Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Name:</span>
                  <span className="font-semibold">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Email:</span>
                  <span className="font-semibold text-xs">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Phone:</span>
                  <span className="font-semibold">{user?.phone || 'Not provided'}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Price Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="card-elevated p-6 rounded-lg sticky top-24 space-y-4">
              <h2 className="text-xl font-bold">Price Summary</h2>

              {bookingData.seats.map((seat) => (
                <div key={seat.seatId} className="flex justify-between text-sm">
                  <span className="text-text-secondary">
                    {seat.row}{seat.seatNumber} ({seat.category})
                  </span>
                  <span>₹{seat.price}</span>
                </div>
              ))}

              <div className="border-t border-surface-light pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span>₹{bookingData.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Convenience Fee</span>
                  <span>₹20</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total</span>
                  <span className="gradient-text">₹{bookingData.totalPrice + 20}</span>
                </div>
              </div>

              <Button
                size="lg"
                onClick={handlePayment}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Complete Payment'}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => navigate('/bookings')}
        title="✅ Booking Confirmed!"
        size="lg"
      >
        <div className="text-center space-y-4">
          <p className="text-lg text-text-secondary">
            Your booking has been confirmed successfully!
          </p>
          <div className="bg-surface-light p-6 rounded-lg space-y-2">
            <p className="text-sm text-text-secondary">Booking Confirmation</p>
            <p className="text-2xl font-bold gradient-text">Sent to your email</p>
          </div>
          <p className="text-text-secondary">
            A QR code ticket and details have been sent to {user?.email}
          </p>
        </div>
        <div className="flex gap-3 justify-end pt-4 border-t border-surface-light">
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Button onClick={() => navigate('/bookings')}>
            View Bookings
          </Button>
        </div>
      </Modal>

      {loading && <Loader fullScreen />}
    </div>
  );
};

export default PaymentPage;
