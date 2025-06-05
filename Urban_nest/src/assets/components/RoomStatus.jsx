import React, { useEffect, useState } from 'react';

function RoomStatus() {
  const BASE_URL = "http://localhost:5002/api";
  const [roomStats, setRoomStats] = useState({
    total: 0,
    Deluxe: 0,
    Premium: 0,
    "Super Deluxe": 0,
  });

  const fetchDetails = async () => {
    try {
      const res = await fetch(`${BASE_URL}/rooms`);
      const data = await res.json();

      let totalAvailable = 0;
      const roomMap = {
        Deluxe: 0,
        Premium: 0,
        "Super Deluxe": 0,
        total: 0
      };

      data.forEach(room => {
        roomMap[room.roomType] = room.available;
        totalAvailable += room.available;
      });

      roomMap.total = totalAvailable;
      setRoomStats(roomMap);
    } catch (err) {
      console.error("Error fetching room data", err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Room Availability</h2>
      <p><strong>Total Rooms Available:</strong> {roomStats.total}</p>
      <p><strong>Deluxe:</strong> {roomStats.Deluxe}</p>
      <p><strong>Premium:</strong> {roomStats.Premium}</p>
      <p><strong>Super Deluxe:</strong> {roomStats["Super Deluxe"]}</p>
    </div>
  );
}

export default RoomStatus;
