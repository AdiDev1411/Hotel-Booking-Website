const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  roomType: String,
  acOption: String,
  startDate: String,
  endDate: String,
  breakfast: String,
  guests: Number,
  rooms: Number,
  paymentMethod: String,
  specialRequests: String,
  name: String,
  email: String,
  phone: String,
  idType: String,
  idNumber: String,
  totalAmount: Number,
  bookingId : String,
  confirmed: {
  type: Boolean,
  default: false,
}

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
