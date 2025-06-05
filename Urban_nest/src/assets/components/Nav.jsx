import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Nav.css';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="Project">
        <div className="Project_name">Urban Nest</div>
        <span>Feel like Your home</span>
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className={`lists ${menuOpen ? "open" : ""}`}>
        <ul className='listofsection'>
          <li><a href="#home-section" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#rooms-section" onClick={() => setMenuOpen(false)}>Rooms</a></li>
          <li><a href="#aboutus-section" onClick={() => setMenuOpen(false)}>About us</a></li>
          <li><a href="#contact-section" onClick={() => setMenuOpen(false)}>Contact us</a></li>
          <li>
            <Link to="/login">
              <button className="login-btn" onClick={() => setMenuOpen(false)}>Admin</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
