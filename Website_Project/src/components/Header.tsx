import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <nav>
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          HOME
        </Link>
        <Link
          to="/cv"
          className={`nav-link ${location.pathname === "/cv" ? "active" : ""}`}
        >
          CV
        </Link>
        <Link
          to="/visitors"
          className={`nav-link ${
            location.pathname === "/visitors" ? "active" : ""
          }`}
        >
          Visitors
        </Link>
      </nav>
    </header>
  );
};

export default Header;
