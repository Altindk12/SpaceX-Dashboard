import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

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

        <button type="button" onClick={handleMenuOpen} className="menu-btn">
          {isMenuOpen ? "Close" : "Menu"}
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
