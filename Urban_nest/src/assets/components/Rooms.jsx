import React, { useState, useEffect } from "react";
import "../CSS/rooms.css";
// import superdelux from "../Images/Super-Deluxe.png";
// import delux from "../Images/Deluxe.png";
// import premium from "../Images/premium.png";
import { Link } from "react-router-dom";

function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState("Super Deluxe");

  const roomDetails = {
    "Super Deluxe": {
      img: "https://ik.imagekit.io/Aditya14/Hotel_images/Super-Deluxe.png?",
      description:
        "A luxurious Super Deluxe room with all modern amenities including a king-sized bed, minibar, and balcony with a view.",
      features: [
        "King-sized bed",
        "Private balcony with view",
        "Mini bar",
        "Complimentary breakfast",
        "Air conditioning",
        "Free Wi-Fi",
      ],
      price: "₹3,999 / night",
    },
    Premium: {
      img: "https://images.unsplash.com/photo-1725962479542-1be0a6b0d444?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Premium room with elegant interiors, comfortable bedding, and complimentary breakfast included.",
      features: [
        "Queen-sized bed",
        "Elegant interior",
        "Complimentary breakfast",
        "Free Wi-Fi",
        "Air conditioning",
        "24/7 room service",
      ],
      price: "₹2,499 / night",
    },
    Deluxe: {
      img: "https://ik.imagekit.io/Aditya14/Hotel_images/image.png",
      description:
        "Affordable yet comfortable Delux room perfect for a relaxing stay, complete with all essential facilities.",
      features: [
        "Double bed",
        "Essential toiletries",
        "Flat screen TV",
        "Free Wi-Fi",
        "Daily housekeeping",
      ],
      price: "₹1,499 / night",
    },
  };

  const handleRoomChange = (room) => {
    setSelectedRoom(room);
  };

  const [roomStats, setRoomStats] = useState({});

  const fetchDetails = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/rooms");
      const data = await res.json();

      // Convert array into object: { Deluxe: { total, available }, ... }
      const statsMap = {};
      data.forEach((room) => {
        statsMap[room.roomType] = {
          total: room.total,
          available: room.available,
        };
      });

      setRoomStats(statsMap);
    } catch (error) {
      console.error("Failed to fetch room stats", error);
    }
  };
  const getRoomInfo = (roomType) => roomStats[roomType] || {};

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <section id="#rooms">
        <div className="types">
          {Object.keys(roomDetails).map((room) => (
            <button
              key={room}
              className={`optionbtn ${selectedRoom === room ? "active" : ""}`}
              onClick={() => handleRoomChange(room)}
            >
              {room}
            </button>
          ))}
        </div>

        <div className="room-details">
          <div className="room-image">
            <img src={roomDetails[selectedRoom].img} alt={selectedRoom} />
          </div>
          <div className="room-description">
            <h2>{selectedRoom}</h2>
            <p>{roomDetails[selectedRoom].description}</p>
            <h4>Features:</h4>
            <ul className="features-list">
              {roomDetails[selectedRoom].features.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
            <p className="price">{roomDetails[selectedRoom].price}</p>
            <p
              className="room-left"
              style={{
                color:
                  getRoomInfo(selectedRoom).available > 3 ? "green" : "red",
                
              }}
            >
              Rooms left:{" "}
              <strong>
                {getRoomInfo(selectedRoom).available ?? "Loading..."}
              </strong>
              <span> {getRoomInfo(selectedRoom).available<3 ?"Hurry Up!":" "}</span>
            </p>

            <Link to="/book-room">
              <button className="book-now-btn">Book Now</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Rooms;
