# CineMax - Features Guide

## 🎭 Core Features Explained

### 1. User Authentication
**Location:** `/login`, `/register`

- **Registration**: Create new account with name, email, password, and optional phone
- **Login**: Access existing account with email and password
- **JWT Tokens**: Secure token-based authentication, expires in 7 days
- **Profile Management**: View and update user profile from account settings

**How to Use:**
```
1. Click "Register" → Fill form → Create account
2. Click "Login" → Enter credentials → Access app
```

### 2. Movie Browsing
**Location:** Home Page, `/movie/:id`

#### Features:
- **Now Showing**: Currently running movies in theaters
- **Coming Soon**: Upcoming movies with pre-booking
- **Search**: Find movies by title or description
- **Filter**: Filter by genre, language, rating, status
- **Sort**: Sort by rating, release date, or popularity
- **Pagination**: Browse through movie pages

**Movie Details Include:**
- High-quality poster and backdrop images
- Movie ratings (0-10 scale)
- Duration and language options
- Cast and crew information
- Director, producer, budget details
- User reviews and ratings
- Certification (U, UA, A, S)

**How to Use:**
```
1. Browse "Now Showing" on home page
2. Click movie card to see details
3. Use search bar to find specific movie
4. Apply filters for genre, language, rating
```

### 3. Theater Selection
**Location:** Movie Details Page

#### Features:
- **Location-based**: Find theaters by city
- **Theater Info**: Name, location, amenities, ratings
- **Multiple Screens**: Different screen formats (IMAX, 4DX, 3D, Standard)
- **Show Times**: Multiple showtimes per day
- **Availability**: Real-time seat availability per show
- **Price Display**: Different prices for VIP, Gold, Silver seats

**Show Information:**
- Screen format and name
- Start and end times
- Available seats count
- Price per category
- Show status (Available, Housefull, Cancelled)

**How to Use:**
```
1. Select movie from details page
2. Choose date from date picker
3. View theaters in your city
4. Select desired showtime
```

### 4. Interactive Seat Selection
**Location:** `/seats`

#### Seat Categories:
- **VIP Seats (Red/Pink)**: Premium front seats, highest price
- **Gold Seats (Yellow)**: Middle section, medium price
- **Silver Seats (Blue)**: Back section, lowest price
- **Booked Seats (Gray)**: Already reserved, cannot select

#### Interactive Features:
- **Hover Effects**: Seats highlight on hover
- **Real-time Updates**: Live seat availability
- **Multi-select**: Choose multiple seats
- **Seat Info**: Display seat ID, category, price on hover
- **Deselect**: Click selected seat again to deselect
- **Selection Summary**: Shows all selected seats with prices

**Screen Layout:**
- Row labels (A, B, C, D, etc.)
- Column numbers (1, 2, 3, etc.)
- Visual theater screen at top
- Legend showing seat categories
- Price breakdown shown at bottom

**How to Use:**
```
1. View theater screen at top
2. Click on available seats to select
3. Selected seats highlight in cyan
4. View selected seats in sidebar
5. See total price in real-time
6. Continue to payment
```

### 5. Booking Flow
**4-Step Process:**

**Step 1: Movie Selection**
- Browse and select your desired movie
- View ratings, duration, cast, and reviews

**Step 2: Theater & Time**
- Select city and theater
- Choose date and showtime
- Check real-time availability

**Step 3: Seat Selection**
- View interactive seat layout
- Select preferred seats
- Confirm seat choices

**Step 4: Payment & Confirmation**
- Review booking details
- Select payment method
- Complete transaction
- Receive booking confirmation and QR code

### 6. Payment Integration
**Location:** `/payment`

#### Payment Methods:
1. **UPI** - Unified Payments Interface
2. **Credit Card** - VISA, Mastercard, American Express
3. **Debit Card** - All major banks
4. **Net Banking** - Direct bank transfer

#### Mock Payment:
- **Status**: All payments simulate as successful
- **Transaction ID**: Auto-generated format: `TXN{timestamp}`
- **Confirmation**: Instant booking confirmation
- **Receipt**: Sent to registered email

**Price Breakdown:**
- Seat prices (variable by category)
- Subtotal calculation
- Convenience fee: ₹20
- Grand total with all charges

**How to Use:**
```
1. Review booking details
2. Enter user information
3. Select payment method
4. Click "Complete Payment"
5. Receive confirmation and QR code
```

### 7. Booking History
**Location:** `/bookings`

#### Features:
- **Upcoming Bookings**: Shows future movie shows
- **Past Bookings**: Shows completed/past movies
- **Booking Details**: 
  - Movie title and poster
  - Theater name and location
  - Show date and time
  - Booked seats
  - Total amount paid
  - Booking ID
  - Payment and ticket status

#### Actions:
- **View Ticket**: Download digital QR code ticket
- **Download Invoice**: Get booking receipt
- **Cancel Booking**: Available for upcoming shows
- **Resend Ticket**: Get ticket via email

**How to Use:**
```
1. Go to "My Bookings" from navbar
2. View upcoming shows at top
3. View past bookings below
4. Click booking to see details
5. Download ticket or invoice
```

## 🎨 UI/UX Features

### Color Theme
```
Primary (Cyan): #00f0ff - Main accent color, buttons, highlights
Secondary (Pink): #ff006e - Complementary accent, hover states
Background: #0a0e27 - Main dark background
Surface: #1a1f3a - Card and component backgrounds
Text Primary: #ffffff - Main text color
Text Secondary: #b0b8d4 - Secondary text, descriptions
Success: #00ff88 - Confirmations, success states
Warning: #ffd60a - Warnings, pending states
Error: #ff4757 - Errors, cancellations
```

### Animations
- **Page Transitions**: Smooth fade-in and slide effects
- **Hover Effects**: Interactive button and card animations
- **Loading Spinner**: Rotating gradient spinner
- **Modal Dialogs**: Entrance and exit animations
- **Seat Selection**: Scale and glow effects on selection
- **Button Clicks**: Scale and tap animations

### Responsive Design
- **Mobile (320px-640px)**: Single column, hamburger menu
- **Tablet (641px-1024px)**: Two columns, optimized layout
- **Desktop (1025px+)**: Full multi-column layout

## 🔒 Security Features

### Authentication
- **JWT Tokens**: Secure token-based auth
- **Token Storage**: localStorage with auto-expiry
- **Protected Routes**: Booking pages require login
- **Session Management**: Auto-logout on token expiry

### Data Protection
- **Password Hashing**: bcrypt with salt (10 rounds)
- **CORS Protection**: Restricted API access
- **Input Validation**: Client and server-side validation
- **Authorization Checks**: User can only access own bookings

## 📱 Mobile Features

### Responsive
- Full functionality on mobile devices
- Touch-optimized buttons and interactions
- Mobile-first design approach
- Hamburger menu for navigation

### Performance
- Lazy loading for images
- Optimized bundle size
- Fast page transitions
- Efficient API calls

## 🔄 Real-time Features

### Live Updates
- **Seat Availability**: Updates when seats are booked
- **Show Status**: Available, Housefull, Cancelled
- **Theater Updates**: New shows added in real-time
- **Booking Status**: Instant confirmation

### WebSocket Ready
- Architecture supports WebSocket implementation
- Can enable real-time notifications
- Live theater availability
- Instant seat updates

## 📊 Data Management

### Booking Information Stored
- Booking ID (unique identifier)
- User and movie details
- Theater and screen information
- Selected seats with categories and prices
- Payment information
- Transaction ID
- QR code URL
- Ticket status

### User Profile
- Name, email, phone
- City/location
- Profile picture
- Booking history
- Account creation date
- Last login

## 🎯 Advanced Features

### Search & Filter
- **Full-text Search**: Search by movie title or description
- **Genre Filter**: Action, Comedy, Drama, Horror, Romance, etc.
- **Language Filter**: English, Hindi, Tamil, Telugu, Kannada, Malayalam
- **Rating Filter**: Minimum rating selection
- **Status Filter**: Now Showing, Upcoming, Archive
- **Smart Pagination**: Browse through results

### Theater Insights
- **Amenities Display**: WiFi, Parking, Wheelchair Access, etc.
- **Theater Rating**: User ratings for theater experience
- **Screen Formats**: IMAX, 4DX, 3D, Standard options
- **Contact Info**: Phone and email for support

### User Reviews
- **Rate Movies**: 0-10 rating scale
- **Write Reviews**: Share thoughts about movie
- **View Reviews**: See other user reviews
- **Rating Aggregation**: Average rating calculation

## 📈 Scaling Features

These features support future enhancement:
- **Admin Panel**: Movie and theater management
- **Analytics Dashboard**: Booking trends, revenue
- **Recommendation Engine**: Personalized movie suggestions
- **Loyalty Program**: Points and discounts
- **Group Bookings**: Book for multiple users
- **Affiliate System**: Referral and commission tracking

## 🎪 Testing the App

### Test Scenarios:

**Scenario 1: Complete Booking**
1. Login with demo credentials
2. Search and select a "Now Showing" movie
3. Select theater and showtime
4. Choose 5-6 seats from different categories
5. Complete mock payment
6. View booking in history

**Scenario 2: Browse Movies**
1. View homepage with Now Showing movies
2. Filter by language or genre
3. Click "Coming Soon" section
4. Read movie details and reviews
5. Check different theaters

**Scenario 3: Seat Selection**
1. Open seat selection
2. Try selecting/deselecting seats
3. Check price updates
4. View seat legend
5. Verify all seat categories

**Scenario 4: Mobile Experience**
1. Open on mobile device
2. Test hamburger menu
3. Browse movies
4. Test responsive layout
5. Complete booking flow

---

**For more help, check the README.md or QUICKSTART.md files** 📖
