const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Generate mock QR code URL (in production, use qrcode npm package)
const generateQRCode = (bookingId) => {
  // This returns a URL from a QR code API. In production, generate on backend
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${bookingId}`;
};

// Format seat ID from row and number (e.g., A, 1 -> A1)
const formatSeatId = (row, number) => {
  return `${row}${number}`;
};

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

module.exports = {
  generateToken,
  generateQRCode,
  formatSeatId,
  calculateDistance
};
