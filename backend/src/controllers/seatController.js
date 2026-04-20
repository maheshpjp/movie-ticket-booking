const SeatLayout = require('../models/SeatLayout');
const Theater = require('../models/Theater');

/**
 * Get Seat Layout for a Theater Screen
 * Returns all seats with their categories and availability
 */
const getSeatLayout = async (req, res) => {
  try {
    const { theaterId, screenNumber } = req.query;

    if (!theaterId || !screenNumber) {
      return res.status(400).json({
        success: false,
        message: 'theaterId and screenNumber are required'
      });
    }

    const seatLayout = await SeatLayout.findOne({
      theaterId,
      screenNumber: parseInt(screenNumber)
    });

    if (!seatLayout) {
      return res.status(404).json({
        success: false,
        message: 'Seat layout not found'
      });
    }

    // Organize seats by row for better UI rendering
    const seatsByRow = {};
    seatLayout.seats.forEach(seat => {
      if (!seatsByRow[seat.row]) {
        seatsByRow[seat.row] = [];
      }
      seatsByRow[seat.row].push(seat);
    });

    res.status(200).json({
      success: true,
      data: {
        ...seatLayout.toObject(),
        seatsByRow
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching seat layout',
      error: error.message
    });
  }
};

/**
 * Get Available Seats for a specific show
 * Returns only available seats for a show date and time
 */
const getAvailableSeats = async (req, res) => {
  try {
    const { theaterId, screenNumber, showDate, showTime } = req.query;

    if (!theaterId || !screenNumber || !showDate || !showTime) {
      return res.status(400).json({
        success: false,
        message: 'theaterId, screenNumber, showDate, and showTime are required'
      });
    }

    // Get seat layout
    const seatLayout = await SeatLayout.findOne({
      theaterId,
      screenNumber: parseInt(screenNumber)
    });

    if (!seatLayout) {
      return res.status(404).json({
        success: false,
        message: 'Seat layout not found'
      });
    }

    // Get booked seats for this show
    const theater = await Theater.findById(theaterId);
    const screen = theater.screens.find(s => s.screenNumber === parseInt(screenNumber));
    const show = screen?.shows.find(
      s => new Date(s.date).toDateString() === new Date(showDate).toDateString() &&
           s.showTime === showTime
    );

    const bookedSeatIds = show?.bookedSeats || [];

    // Mark seats as available/booked
    const seatsWithAvailability = seatLayout.seats.map(seat => ({
      ...seat.toObject(),
      isAvailable: !bookedSeatIds.includes(seat.seatId)
    }));

    // Organize by row
    const seatsByRow = {};
    seatsWithAvailability.forEach(seat => {
      if (!seatsByRow[seat.row]) {
        seatsByRow[seat.row] = [];
      }
      seatsByRow[seat.row].push(seat);
    });

    res.status(200).json({
      success: true,
      data: {
        totalSeats: seatLayout.seats.length,
        bookedSeats: bookedSeatIds.length,
        availableSeats: seatLayout.seats.length - bookedSeatIds.length,
        seatsByRow,
        seats: seatsWithAvailability
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching available seats',
      error: error.message
    });
  }
};

/**
 * Get Seat Availability Status (for real-time updates)
 * Returns quick availability check without full layout
 */
const getSeatAvailability = async (req, res) => {
  try {
    const { theaterId, screenNumber, showDate, showTime, seatIds } = req.query;

    if (!theaterId || !screenNumber || !showDate || !showTime) {
      return res.status(400).json({
        success: false,
        message: 'Required parameters missing'
      });
    }

    const theater = await Theater.findById(theaterId);
    const screen = theater.screens.find(s => s.screenNumber === parseInt(screenNumber));
    const show = screen?.shows.find(
      s => new Date(s.date).toDateString() === new Date(showDate).toDateString() &&
           s.showTime === showTime
    );

    const bookedSeatIds = show?.bookedSeats || [];
    
    // Check specific seats if provided
    const requestedSeats = seatIds ? seatIds.split(',') : [];
    const availability = {};

    requestedSeats.forEach(seatId => {
      availability[seatId] = !bookedSeatIds.includes(seatId);
    });

    res.status(200).json({
      success: true,
      data: {
        showStatus: show?.status || 'Not Found',
        totalBooked: bookedSeatIds.length,
        availability
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking seat availability',
      error: error.message
    });
  }
};

module.exports = {
  getSeatLayout,
  getAvailableSeats,
  getSeatAvailability
};
