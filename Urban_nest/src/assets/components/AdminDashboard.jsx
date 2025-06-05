import React, { useEffect, useState } from "react";
import "../CSS/AdminDashboard.css";
import UserContacts from "./UserContacts"; // import component


export default function AdminDashboard() {
  const BASE_URL = "http://localhost:5002/api";
  const [activeTab, setActiveTab] = useState("bookings");

  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmed, setConfirmed] = useState({});
  const [roomStats, setRoomStats] = useState({
    total: 0,
    Deluxe: 0,
    Premium: 0,
    "Super Deluxe": 0,
  });

  // Fetch booking data
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings`);
      const data = await res.json();
      setBookings(data);

      // Track confirmed bookings
      const confirmedMap = {};
      data.forEach((booking) => {
        if (booking.confirmed) confirmedMap[booking._id] = true;
      });
      setConfirmed(confirmedMap);

      // Update room availability based on confirmed bookings
      const confirmedBookings = data.filter((b) => b.confirmed);
      const deluxe = confirmedBookings.filter(
        (b) => b.roomType === "Deluxe"
      ).length;
      const premium = confirmedBookings.filter(
        (b) => b.roomType === "Premium"
      ).length;
      const superDeluxe = confirmedBookings.filter(
        (b) => b.roomType === "Super Deluxe"
      ).length;
      const totalConfirmed = confirmedBookings.length;

      setRoomStats({
        total: 100 - totalConfirmed,
        Deluxe: 50 - deluxe,
        Premium: 30 - premium,
        "Super Deluxe": 20 - superDeluxe,
      });
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // Fetch room stats directly from DB
  const fetchRoomStats = async () => {
    try {
      const res = await fetch(`${BASE_URL}/rooms`);
      const data = await res.json();

      let totalAvailable = 0;
      const roomMap = {
        total: 0,
        Deluxe: 0,
        Premium: 0,
        "Super Deluxe": 0,
      };

      data.forEach((room) => {
        roomMap[room.roomType] = room.available;
        totalAvailable += room.available;
      });

      roomMap.total = totalAvailable;
      setRoomStats(roomMap);
    } catch (err) {
      console.error("Error fetching room stats:", err);
    }
  };

  // Confirm a booking and update DB and UI
  const toggle = async (bookingId) => {
    try {
      const booking = bookings.find((b) => b._id === bookingId);
      if (!booking) return;

      await fetch(`${BASE_URL}/bookings/${bookingId}/confirm`, {
        method: "PUT",
      });

      await fetch(`${BASE_URL}/rooms`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomType: booking.roomType,
          action: "decrement",
        }),
      });

      setConfirmed((prev) => ({
        ...prev,
        [bookingId]: true,
      }));

      fetchBookings();
      fetchRoomStats();
    } catch (err) {
      console.error("Confirmation failed", err);
    }
  };

  // Delete a booking and update DB and UI
  const deleteBooking = async (id, roomType) => {
    try {
      await fetch(`${BASE_URL}/bookings/${id}`, {
        method: "DELETE",
      });

      await fetch(`${BASE_URL}/rooms`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomType: roomType,
          action: "increment",
        }),
      });

      setBookings((prev) => prev.filter((b) => b._id !== id));
      fetchBookings();
      fetchRoomStats();
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  // Auto refresh data every 5 seconds
  useEffect(() => {
    fetchBookings();
    fetchRoomStats();

    const interval = setInterval(() => {
      fetchBookings();
      fetchRoomStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filtered bookings based on search
  const filteredBookings = bookings.filter((booking) => {
    const query = searchQuery.toLowerCase();
    return (
      !searchQuery ||
      (booking.bookingId?.toLowerCase() || "").includes(query) ||
      (booking.name?.toLowerCase() || "").includes(query)
    );
  });

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="sidebar-title">Admin Dashboard</h1>
<nav className="sidebar-nav">
  <button onClick={() => setActiveTab("bookings")}>Bookings</button>
  <button onClick={() => setActiveTab("contacts")}>User Contacts</button>
</nav>

      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "bookings" ?(
          <>

        <div className="div1">
          <h2 className="main-heading">Welcome, Aditya</h2>

          <div className="table-wrapper">
            <div className="search-bar">
              <button>🔍</button>
              <input
                type="text"
                placeholder="Search by Booking ID or Name"
                className="pl-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Name</th>
                  <th>Room Type</th>
                  <th>Total Bill</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.bookingId || booking._id}</td>
                      <td>{booking.name}</td>
                      <td>{booking.roomType}</td>
                      <td>₹{booking.totalAmount || "N/A"}</td>
                      <td>{booking.startDate?.slice(0, 10)}</td>
                      <td>{booking.endDate?.slice(0, 10)}</td>
                      <td>
                        <button
                          className={`btn-confirm ${
                            confirmed[booking._id] ? "unbookbtn" : "bookbtn"
                          }`}
                          disabled={confirmed[booking._id]} // disable after confirmation
                          onClick={() => toggle(booking._id)}
                        >
                          {confirmed[booking._id] ? "Confirmed" : "Confirm"}
                        </button>

                        <button
                          onClick={() =>
                            deleteBooking(booking._id, booking.roomType)
                          }
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-bookings">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="div2">
          <div className="room-updates">
            <h2 className="room-heading">Room Status</h2>

            <span className="room-ava">
              Total Rooms Available:{" "}
              <span className="">{roomStats.total}</span>
            </span>
            <p className="">
              Deluxe: <span className="">{roomStats.Deluxe}</span>
            </p>
            <p className="">
              Premium:{" "}
              <span className="">{roomStats.Premium}</span>
            </p>
            <p className="">
              Super Deluxe:{" "}
              <span className="">{roomStats["Super Deluxe"]}</span>
            </p>
          </div>
        </div>
          </>

        ):(
          <UserContacts/>
        )}
      </main>
    </div>
  );
}
