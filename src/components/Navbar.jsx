import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isButtonActive, setIsButtonActive] = useState({
    mycards: false,
    all: true,
    blocked: false,
  });

  function handleActiveButton(e) {
    setIsButtonActive((prevState) => {
      return {
        mycards: false,
        all: false,
        blocked: false,
        [e.target.name]: true,
      };
    });
  }

  return (
    <nav className="navbar">
      <Link to="/mycards">
        <button
          className={`navbar__button${isButtonActive.mycards ? " active" : ""}`}
          name="mycards"
          onClick={handleActiveButton}
        >
          My Cards
        </button>
      </Link>
      <Link to="/">
        <button
          className={`navbar__button${isButtonActive.all ? " active" : ""}`}
          name="all"
          onClick={handleActiveButton}
        >
          All
        </button>
      </Link>
      <Link to="/blocked">
        <button
          className={`navbar__button${isButtonActive.blocked ? " active" : ""}`}
          name="blocked"
          onClick={handleActiveButton}
        >
          Blocked
        </button>
      </Link>
    </nav>
  );
}
