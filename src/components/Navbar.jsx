import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/yourcards" className="navbar__button">
        Your Cards
      </Link>
      <Link to="/" className="navbar__button">
        All
      </Link>
      <Link to="/blocked" className="navbar__button">
        Blocked
      </Link>
    </nav>
  );
}
