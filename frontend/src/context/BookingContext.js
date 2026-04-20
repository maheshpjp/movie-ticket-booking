import React, { createContext, useContext, useState } from 'react';

// Create Booking Context to manage booking flow state
const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    movie: null,
    theater: null,
    screenNumber: null,
    showDate: null,
    showTime: null,
    seats: [],
    totalPrice: 0,
  });

  // Update booking data
  const setMovieData = (movie) => {
    setBookingData(prev => ({ ...prev, movie }));
  };

  const setTheaterData = (theater, screenNumber, showDate, showTime) => {
    setBookingData(prev => ({
      ...prev,
      theater,
      screenNumber,
      showDate,
      showTime
    }));
  };

  const setSeatData = (seats, totalPrice) => {
    setBookingData(prev => ({
      ...prev,
      seats,
      totalPrice
    }));
  };

  const resetBooking = () => {
    setBookingData({
      movie: null,
      theater: null,
      screenNumber: null,
      showDate: null,
      showTime: null,
      seats: [],
      totalPrice: 0,
    });
  };

  const value = {
    bookingData,
    setMovieData,
    setTheaterData,
    setSeatData,
    resetBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use booking context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};
