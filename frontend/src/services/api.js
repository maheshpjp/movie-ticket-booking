import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/profile'),
  updateProfile: (data) => API.put('/auth/profile', data),
};

// Movie APIs
export const movieAPI = {
  getAllMovies: (params) => API.get('/movies', { params }),
  getMovieById: (id) => API.get(`/movies/${id}`),
  getTrendingMovies: () => API.get('/movies/trending'),
  addReview: (movieId, data) => API.post(`/movies/${movieId}/review`, data),
};

// Theater APIs
export const theaterAPI = {
  getAllTheaters: (params) => API.get('/theaters', { params }),
  getTheaterById: (id) => API.get(`/theaters/${id}`),
  getNearbyTheaters: (params) => API.get('/theaters/nearby', { params }),
  getAvailableShows: (params) => API.get('/theaters/shows/available', { params }),
};

// Seat APIs
export const seatAPI = {
  getSeatLayout: (params) => API.get('/seats/layout', { params }),
  getAvailableSeats: (params) => API.get('/seats/available', { params }),
  checkAvailability: (params) => API.get('/seats/availability', { params }),
};

// Booking APIs
export const bookingAPI = {
  createBooking: (data) => API.post('/bookings', data),
  getUserBookings: () => API.get('/bookings'),
  getBookingDetails: (id) => API.get(`/bookings/${id}`),
  completePayment: (id, data) => API.post(`/bookings/${id}/payment`, data),
  cancelBooking: (id, data) => API.post(`/bookings/${id}/cancel`, data),
};

export default API;
