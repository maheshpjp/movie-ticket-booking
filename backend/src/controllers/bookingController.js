const Booking = require('../models/Booking');
const Theater = require('../models/Theater');
const User = require('../models/User');
const { generateQRCode } = require('../utils/helpers');

/**
 * Create a New Booking
 * Selects seats, calculates total price, and creates booking
 */
const createBooking = async (req, res) => {
  try {
    const { movieId, theaterId, screenNumber, showDate, showTime, seats, paymentMethod } = req.body;

    // Validation
    if (!movieId || !theaterId || !screenNumber || !showDate || !showTime || !seats || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Calculate total price
    const totalPrice = seats.reduce((sum, seat) => sum + seat.price, 0);

    // Create booking object
    const booking = new Booking({
      userId: req.userId,
      movieId,
      theaterId,
      screenNumber,
      showDate,
      showTime,
      seats,
      totalPrice,
      paymentMethod: paymentMethod || 'UPI'
    });

    await booking.save();

    // Add booking to user's booking list
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { bookings: booking._id } }
    );

    // Update theater's booked seats
    const seatIds = seats.map(seat => seat.seatId);
    await Theater.findByIdAndUpdate(
      theaterId,
      {
        $push: {
          'screens.$[screen].shows.$[show].bookedSeats': { $each: seatIds }
        }
      },
      {
        arrayFilters: [
          { 'screen.screenNumber': screenNumber },
          { 'show.date': new Date(showDate), 'show.showTime': showTime }
        ]
      }
    );

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

/**
 * Get User Bookings
 * Fetches all bookings for authenticated user
 */
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate('movieId', 'title posterImage rating')
      .populate('theaterId', 'name city')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

/**
 * Get Booking Details
 * Fetches single booking with all details
 */
const getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
      .populate('movieId')
      .populate('theaterId')
      .populate('userId', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Verify ownership
    if (booking.userId._id.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking details',
      error: error.message
    });
  }
};

/**
 * Complete Payment for Booking
 * Updates booking status and generates ticket
 */
const completePayment = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { transactionId, paymentMethod } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: 'Completed',
        transactionId,
        paymentMethod,
        qrCode: generateQRCode(bookingId),
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Payment completed successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error completing payment',
      error: error.message
    });
  }
};

/**
 * Cancel Booking
 * Cancels booking and refunds booked seats
 */
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { cancellationReason } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Verify ownership
    if (booking.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Check if already used or cancelled
    if (booking.ticketStatus === 'Used' || booking.ticketStatus === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel this booking'
      });
    }

    // Update booking status
    booking.ticketStatus = 'Cancelled';
    booking.cancellationReason = cancellationReason || 'User requested cancellation';
    booking.cancellationDate = Date.now();
    await booking.save();

    // Release booked seats
    const seatIds = booking.seats.map(seat => seat.seatId);
    await Theater.findByIdAndUpdate(
      booking.theaterId,
      {
        $pull: {
          'screens.$[screen].shows.$[show].bookedSeats': { $in: seatIds }
        }
      },
      {
        arrayFilters: [
          { 'screen.screenNumber': booking.screenNumber },
          { 'show.date': booking.showDate, 'show.showTime': booking.showTime }
        ]
      }
    );

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingDetails,
  completePayment,
  cancelBooking
};
