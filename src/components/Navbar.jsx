import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/mycards" className="navButton">
        My Cards
      </NavLink>
      <NavLink to="/" className="navButton">
        All
      </NavLink>
      <NavLink to="/blocked" className="navButton">
        Blocked
      </NavLink>
    </nav>
  );
}
