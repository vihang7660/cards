import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/yourcards">
        <button className="navbar__button">Your Cards</button>
      </Link>
      <Link to="/">
        <button className="navbar__button">All</button>
      </Link>
      <Link to="/blocked">
        <button className="navbar__button">Blocked</button>
      </Link>
    </nav>
  );
}
