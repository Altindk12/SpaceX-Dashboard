import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import hamburgerIcon from "../../assets/images/hamburger menu.svg"; // Import the hamburger menu icon

import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`nav-bar ${isMenuOpen ? "open" : ""}`}>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Updated button element with hamburger menu icon */}
        <button type="button" onClick={handleMenuOpen} className="menu-btn">
          <img src={hamburgerIcon} alt="Menu" />
        </button>

        <ul className={isMenuOpen ? "open" : ""}>
          <li>
            <NavLink to="/" onClick={handleMenuOpen}>
              Rockets
            </NavLink>
          </li>
          <li>
            <NavLink to="/missions" onClick={handleMenuOpen}>
              Missions
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-profile" onClick={handleMenuOpen}>
              My Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
