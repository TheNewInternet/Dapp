import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar-item">
        <Link to="/" className="navbar-logo">
          <h1>
            Bitcon<i className="fab fa-bitcoin logo"></i>
          </h1>
        </Link>
        <div>
          <Link to="/Product" className="menu-icon">
            Product
          </Link>
          <Link to="/Social" className="menu-icon">
            Social
          </Link>
          <Link to="/Market" className="menu-icon">
            Market
          </Link>
        </div>
        <div className="menu-icon ">
          <Link to="/Connect" className="navbar-logo">
            <i className="fas fa-link "></i>
          </Link>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
