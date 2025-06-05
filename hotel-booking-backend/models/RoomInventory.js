const mongoose = require('mongoose');

const roomInventorySchema = new mongoose.Schema({
  roomType: { type: String, required: true, unique: true },
  total: { type: Number, required: true },
  available: { type: Number, required: true }
});

module.exports = mongoose.model('RoomInventory', roomInventorySchema);
