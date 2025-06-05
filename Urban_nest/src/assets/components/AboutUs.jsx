import React from "react";
import "../CSS/about.css"; // Create this CSS file to style the page
import hotelimg from "../Images/hotel.png";
import MapView from "./MapView";
function AboutUs() {
  return (
    <>
      <h1>About Us</h1>
      <div className="about-section">
        <div className="about-content">
          <p>
            Welcome to our hotel! We are committed to providing exceptional
            hospitality, comfort, and unforgettable experiences to our guests.
          </p>
          <p>
            Our hotel features a variety of rooms suited for every traveler —
            from cozy deluxe rooms to luxurious super delux and premium suites.
            Whether you're here for business, leisure, or a relaxing getaway, we
            aim to make your stay special.
          </p>
          <p>
            Our dedicated team ensures the highest standards of cleanliness,
            service, and satisfaction. With modern amenities and warm
            hospitality, we make you feel right at home.
          </p>
        </div>
        <div className="about-image">
          <img src={hotelimg} alt="About Our Hotel" />
        </div>
        <MapView />
      </div>
    </>
  );
}

export default AboutUs;
