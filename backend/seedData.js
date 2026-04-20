// Sample data to seed MongoDB for development
// Run this file: node seedData.js

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');
const Movie = require('./src/models/Movie');
const Theater = require('./src/models/Theater');
const SeatLayout = require('./src/models/SeatLayout');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cinemax');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data and drop indexes
    await User.deleteMany({});
    await Movie.deleteMany({});
    await Theater.deleteMany({});
    await SeatLayout.deleteMany({});
    
    // Drop indexes to avoid duplicate key errors
    try {
      await SeatLayout.collection.dropIndexes();
    } catch (err) {
      // Index might not exist, ignore
    }

    // Sample Movies
    const movies = await Movie.insertMany([
      {
        title: 'Dune: Part Two',
        description: 'Paul Atreides travels to the dangerous planet Arrakis to ensure the future of his family and people.',
        genre: ['Sci-Fi', 'Adventure'],
        rating: 8.5,
        releaseDate: new Date('2024-02-28'),
        duration: 166,
        language: ['English'],
        certification: 'UA',
        posterImage: 'https://via.placeholder.com/300x450?text=Dune+2',
        backdropImage: 'https://via.placeholder.com/1920x1080?text=Dune+2',
        trailerUrl: 'https://www.youtube.com/watch?v=videoid',
        cast: [
          { name: 'Timothée Chalamet', role: 'Paul Atreides' },
          { name: 'Zendaya', role: 'Chani' },
          { name: 'Austin Butler', role: 'Feyd-Rautha' }
        ],
        director: 'Denis Villeneuve',
        budget: '190 Million',
        boxOffice: '711 Million',
        status: 'Now Showing'
      },
      {
        title: 'Oppenheimer',
        description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
        genre: ['Drama', 'Thriller'],
        rating: 8.8,
        releaseDate: new Date('2023-07-21'),
        duration: 180,
        language: ['English', 'Hindi'],
        certification: 'A',
        posterImage: 'https://via.placeholder.com/300x450?text=Oppenheimer',
        backdropImage: 'https://via.placeholder.com/1920x1080?text=Oppenheimer',
        trailerUrl: 'https://www.youtube.com/watch?v=videoid',
        cast: [
          { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer' },
          { name: 'Emily Blunt', role: 'Kitty Oppenheimer' }
        ],
        director: 'Christopher Nolan',
        budget: '100 Million',
        boxOffice: '952 Million',
        status: 'Now Showing'
      },
      {
        title: 'Pushpa 2: The Rule',
        description: 'The sequel to the blockbuster Pushpa continues the saga with higher stakes and more action.',
        genre: ['Action', 'Drama'],
        rating: 8.2,
        releaseDate: new Date('2024-12-05'),
        duration: 185,
        language: ['Telugu', 'Tamil', 'Hindi'],
        certification: 'UA',
        posterImage: 'https://via.placeholder.com/300x450?text=Pushpa2',
        backdropImage: 'https://via.placeholder.com/1920x1080?text=Pushpa2',
        trailerUrl: 'https://www.youtube.com/watch?v=videoid',
        cast: [
          { name: 'Allu Arjun', role: 'Pushpa Raj' },
          { name: 'Rashmika Mandanna', role: 'Srivalli' }
        ],
        director: 'Sukumar',
        budget: '200 Crore',
        boxOffice: '1000+ Crore',
        status: 'Now Showing'
      },
      {
        title: 'Killers of the Flower Moon',
        description: 'An exploration of the Osage murders and the FBI investigation into the crimes.',
        genre: ['Drama', 'Thriller'],
        rating: 8.1,
        releaseDate: new Date('2023-10-27'),
        duration: 206,
        language: ['English'],
        certification: 'A',
        posterImage: 'https://via.placeholder.com/300x450?text=Killers',
        backdropImage: 'https://via.placeholder.com/1920x1080?text=Killers',
        trailerUrl: 'https://www.youtube.com/watch?v=videoid',
        cast: [
          { name: 'Leonardo DiCaprio', role: 'Ernest Burkhart' },
          { name: 'Robert De Niro', role: 'William Hale' }
        ],
        director: 'Martin Scorsese',
        budget: '200 Million',
        boxOffice: '156 Million',
        status: 'Archive'
      },
      {
        title: 'Salaar',
        description: 'An action-packed revenge drama set in the streets of an Indian city.',
        genre: ['Action', 'Drama'],
        rating: 7.9,
        releaseDate: new Date('2023-12-22'),
        duration: 150,
        language: ['Telugu', 'Tamil', 'Kannada', 'Hindi'],
        certification: 'UA',
        posterImage: 'https://via.placeholder.com/300x450?text=Salaar',
        backdropImage: 'https://via.placeholder.com/1920x1080?text=Salaar',
        trailerUrl: 'https://www.youtube.com/watch?v=videoid',
        cast: [
          { name: 'Prabhas', role: 'Salaar' },
          { name: 'Shruti Haasan', role: 'Asha' }
        ],
        director: 'Prashanth Neel',
        budget: '150 Crore',
        boxOffice: '200+ Crore',
        status: 'Archive'
      }
    ]);

    console.log('✅ Movies seeded successfully');

    // Sample Theaters
    const theaters = await Theater.insertMany([
      {
        name: 'CineMax Premium - Hyderabad',
        city: 'Hyderabad',
        location: {
          address: '123 Main Street, Hyderabad',
          latitude: 17.3850,
          longitude: 78.4867
        },
        image: 'https://via.placeholder.com/400x300?text=CineMax',
        amenities: ['WiFi', 'Parking', 'Food Court', 'Wheelchair Accessible'],
        screens: [
          {
            screenNumber: 1,
            screenName: 'IMAX Screen',
            format: 'IMAX',
            totalSeats: 120,
            rows: 12,
            columns: 10,
            shows: [
              {
                movieId: movies[0]._id,
                showTime: '10:30 AM',
                endTime: '1:15 PM',
                price: { gold: 400, silver: 300, vip: 500 },
                bookedSeats: [],
                date: new Date('2024-04-20'),
                status: 'Available'
              },
              {
                movieId: movies[0]._id,
                showTime: '3:30 PM',
                endTime: '6:15 PM',
                price: { gold: 400, silver: 300, vip: 500 },
                bookedSeats: [],
                date: new Date('2024-04-20'),
                status: 'Available'
              }
            ]
          },
          {
            screenNumber: 2,
            screenName: 'Standard Screen',
            format: '3D',
            totalSeats: 150,
            rows: 15,
            columns: 10,
            shows: [
              {
                movieId: movies[1]._id,
                showTime: '11:00 AM',
                endTime: '2:00 PM',
                price: { gold: 300, silver: 200, vip: 400 },
                bookedSeats: [],
                date: new Date('2024-04-20'),
                status: 'Available'
              },
              {
                movieId: movies[2]._id,
                showTime: '6:00 PM',
                endTime: '8:45 PM',
                price: { gold: 350, silver: 250, vip: 450 },
                bookedSeats: [],
                date: new Date('2024-04-20'),
                status: 'Available'
              }
            ]
          }
        ],
        phoneNumber: '+91-9876543210',
        email: 'contact@cinemax-hyd.com',
        rating: 4.8
      },
      {
        name: 'MoviePlex - Mumbai',
        city: 'Mumbai',
        location: {
          address: '456 Bandra West, Mumbai',
          latitude: 19.0596,
          longitude: 72.8295
        },
        image: 'https://via.placeholder.com/400x300?text=MoviePlex',
        amenities: ['WiFi', 'Parking', 'IMAX', 'Premium Recliner Seats'],
        screens: [
          {
            screenNumber: 1,
            screenName: 'Premium Hall',
            format: '4DX',
            totalSeats: 100,
            rows: 10,
            columns: 10,
            shows: [
              {
                movieId: movies[2]._id,
                showTime: '1:30 PM',
                endTime: '4:30 PM',
                price: { gold: 400, silver: 300, vip: 550 },
                bookedSeats: [],
                date: new Date('2024-04-20'),
                status: 'Available'
              }
            ]
          }
        ],
        phoneNumber: '+91-9876543211',
        email: 'contact@movieplex-mum.com',
        rating: 4.6
      }
    ]);

    console.log('✅ Theaters seeded successfully');

    // Create Seat Layouts
    const createSeatsForScreen = (rows, columns, pricesByCategory) => {
      const seats = [];
      const rowLabels = 'ABCDEFGHIJKLMNOP'.split('');
      
      // VIP seats - Front rows
      for (let r = 0; r < 2; r++) {
        for (let c = 1; c <= columns; c++) {
          seats.push({
            row: rowLabels[r],
            seatNumber: c,
            seatId: `${rowLabels[r]}${c}`,
            category: 'VIP',
            isAvailable: true,
            price: pricesByCategory.vip
          });
        }
      }

      // Gold seats - Middle rows
      for (let r = 2; r < rows - 2; r++) {
        for (let c = 1; c <= columns; c++) {
          seats.push({
            row: rowLabels[r],
            seatNumber: c,
            seatId: `${rowLabels[r]}${c}`,
            category: 'Gold',
            isAvailable: true,
            price: pricesByCategory.gold
          });
        }
      }

      // Silver seats - Back rows
      for (let r = rows - 2; r < rows; r++) {
        for (let c = 1; c <= columns; c++) {
          seats.push({
            row: rowLabels[r],
            seatNumber: c,
            seatId: `${rowLabels[r]}${c}`,
            category: 'Silver',
            isAvailable: true,
            price: pricesByCategory.silver
          });
        }
      }

      return seats;
    };

    // Create seat layouts for all screens
    await SeatLayout.insertMany([
      {
        theaterId: theaters[0]._id,
        screenNumber: 1,
        seats: createSeatsForScreen(12, 10, { gold: 400, silver: 300, vip: 500 }),
        totalRows: 12,
        totalSeatsPerRow: 10
      },
      {
        theaterId: theaters[0]._id,
        screenNumber: 2,
        seats: createSeatsForScreen(15, 10, { gold: 300, silver: 200, vip: 400 }),
        totalRows: 15,
        totalSeatsPerRow: 10
      },
      {
        theaterId: theaters[1]._id,
        screenNumber: 1,
        seats: createSeatsForScreen(10, 10, { gold: 400, silver: 300, vip: 550 }),
        totalRows: 10,
        totalSeatsPerRow: 10
      }
    ]);

    console.log('✅ Seat layouts created successfully');

    // Create sample users
    await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '+91-9876543210',
        city: 'Hyderabad'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        phone: '+91-9876543211',
        city: 'Mumbai'
      }
    ]);

    console.log('✅ Users seeded successfully');
    console.log('🎉 Database seeding completed successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
