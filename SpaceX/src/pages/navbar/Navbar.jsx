import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import hamburgerIcon from "../../assets/images/hamburger menu.svg";
import "../../Cssfiles/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={`nav-bar ${isMenuOpen ? "open" : ""}`}>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <button type="button" onClick={toggleMenu} className="menu-btn">
          <img src={hamburgerIcon} alt="Menu" />
        </button>
        <ul className={isMenuOpen ? "open" : ""}>
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Rockets
            </NavLink>
          </li>
          <li>
            <NavLink to="/missions" onClick={closeMenu}>
              Missions
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-profile" onClick={closeMenu}>
              My Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
