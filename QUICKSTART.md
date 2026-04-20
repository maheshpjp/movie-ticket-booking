# CineMax - Quick Start Guide

## 🚀 Fast Setup (5 minutes)

### Prerequisites
- Node.js installed
- MongoDB running locally (or use MongoDB Atlas)

### Step 1: Backend Setup
```bash
cd backend
npm install
node seedData.js        # Load sample data
npm run dev            # Start server (http://localhost:5000)
```

### Step 2: Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm start              # Start app (http://localhost:3000)
```

## 🎬 Demo Account
- Email: `john@example.com`
- Password: `password123`

## 📌 Key Files
- Backend: `backend/src/index.js`
- Frontend: `frontend/src/App.jsx`
- Models: `backend/src/models/`
- Components: `frontend/src/components/`
- Pages: `frontend/src/pages/`

## 🔗 Important URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

## 📱 Test the App
1. Visit http://localhost:3000
2. Login with demo credentials
3. Browse and select a movie
4. Select theater and seats
5. Complete payment (mock)
6. View booking in "My Bookings"

## 🛠️ Troubleshooting

### MongoDB Won't Connect
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas
# Update MONGODB_URI in .env
```

### Port 3000/5000 in Use
```bash
# Change port in .env
PORT=5001
```

### Dependencies Missing
```bash
npm install --legacy-peer-deps
```

## 📚 Documentation
See `README.md` for complete documentation

## ✨ Features to Try
1. Search movies
2. View movie details with cast
3. Interactive seat selection
4. Multiple payment methods
5. Booking history
6. QR code tickets
7. Mobile responsive

---
Happy Booking! 🎭🍿
