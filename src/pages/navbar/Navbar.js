import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar-item">
        <Link to="/" className="navbar-logo">
          <div className="logo">
            <i className="fab fa-ethereum" />
            Instachain
          </div>
        </Link>
        <div>
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
