const express = require('express');
const router = express.Router();

const RoomInventory = require('../models/RoomInventory');

router.get('/available' , async (req ,res) =>{
    const rooms = await RoomInventory.find()
    res.json(rooms);
});

router.post('/confirm' , async (req , res) =>{
    const { roomType } = req.body;
    const room = await RoomInventory.findOne({roomType});

    if(!room|| room.available<=0){
        return res.status(400).json({message : 'No rooms available'})
    }

    room.available -= 1 ; 
    await room.save();
    res.json({message : 'Booking confirmed'});
});

router.post('/delete' , async (req ,res) =>{
    const {roomType} = req.body;

    const room = await RoomInventory.findOne({roomType})

    if (!room || room.available >= room.total) {
    return res.status(400).json({ message: 'Cannot increase beyond total' });
  }

    room.available +=1;
    await room.save();
    res.json({message : 'Booking cancelled and room restored'});

});

// In your Express route
router.delete('/api/bookings/:id', async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).send("Booking not found");

  // Update room inventory
  const roomType = booking.roomType;
  const inventory = await RoomInventory.findOne(); // assuming one inventory document

  if (roomType === "Deluxe") inventory.deluxe += 1;
  else if (roomType === "Premium") inventory.premium += 1;
  else if (roomType === "Super Deluxe") inventory.superDeluxe += 1;

  await inventory.save();
  await booking.remove();
  res.json({ message: "Booking deleted and inventory updated" });
});


module.exports = router;