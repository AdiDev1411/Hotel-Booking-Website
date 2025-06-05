require('dotenv').config();
const mongoose = require('mongoose');
const RoomInventory = require('../models/RoomInventory');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  initializeRooms();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

async function initializeRooms() {
//   await RoomInventory.deleteMany();
//  // Optional: clear old data

  const rooms = [
    { roomType: 'Deluxe', total: 50, available: 50 },
    { roomType: 'Premium', total: 30, available: 30 },
    { roomType: 'Super Deluxe', total: 20, available: 20 },
  ];

  await RoomInventory.insertMany(rooms);
  console.log('✅ Room inventory initialized');
  process.exit();
}
