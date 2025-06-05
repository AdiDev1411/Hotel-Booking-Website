const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookingRoutes = require('./routes/bookings')
const RoomInventory = require('./models/RoomInventory');
const contactRoutes = require('./routes/contactRoutes');

require("dotenv").config();
const Booking = require("./models/Booking");

const app = express(); // ✅ This should come before app.use

const allowedOrigins = [
  "http://localhost:5173",
  "https://hotel-booking-website-1-j8sb.onrender.com"
];

// ✅ Only one CORS setup — no duplicates
app.use(cors({
  // origin: allowedOrigins,
  credentials: true
}));

const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json()); // ✅ No need to repeat cors()


app.use('/api/contact', contactRoutes);
// Routes
app.get("/", (req, res) => {
  res.send("Hotel Booking API Running");
});


app.get("/ping",(req,res) =>{
  res.send("server is wake up")
})

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  
  bufferCommands: false,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Booking Route
app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking({...req.body});
    await booking.save();
    res.status(201).json({ message: "✅ Booking saved", data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error saving booking", error });
  }
});

app.get("/api/bookings" , async (req,res) =>{
  try{
    const bookings = await Booking.find().sort({checkIn :-1});
    res.status(200).json(bookings);
  } catch(error){
    res.status(500).json({message:"❌ Error fetching booking" , error});
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
});


// In your Express backend
app.put("/api/bookings/:id/confirm", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { confirmed: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to confirm booking" });
  }
});


//For a try
app.get("/api/rooms", async (req ,res)=>{
  try {
    const RoomData = await RoomInventory.find();
    if(!RoomData){
      return res.status(404).json({message : "No room inventory found."})
    }
    res.status(200).json(RoomData);
  
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching room inventory", error })
  }
})


app.put("/api/rooms" , async (req,res)=>{
  try {
    const {roomType , action } = req.body;
    if(!roomType || !action){
      return res.status(400).json({message : "Room type and action are required"});
    }

    const roomDoc = await RoomInventory.findOne({roomType});

    if(!roomDoc){
      return res.status(404).json({message : "Room type not found"});

    }

    if(action === "decrement"){
      if(roomDoc.available> 0){
        roomDoc.available -=1

      }
      else{
        return res.status(400).json({message : `No available ${roomType} rooms left`})
      }
    }

    else if(action === "increment"){
      if(roomDoc.available<roomDoc.total){
        roomDoc.available +=1

      }
      else{
        return res.status(400).json({message : `${roomType} is already full`})

      }

    }
    else{
    
      return res.status(400).json({ message: "Invalid action. Use 'increment' or 'decrement'." });

    }

    await roomDoc.save();
    res.status(200).json({message : "Room availablility update." , room:roomDoc})

  } catch (error) {
     console.error("Error updating room availability:", error);
    res.status(500).json({ message: "Internal server error", error });   
  }
})

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
