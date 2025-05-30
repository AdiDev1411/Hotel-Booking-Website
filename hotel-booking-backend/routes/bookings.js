const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

module.exports = router;
