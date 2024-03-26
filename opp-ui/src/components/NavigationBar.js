import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavigationBar.css";

function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/transaction">Transaction</Link>
        </li>
        <li>
          <Link to="/payment">Payment</Link>
        </li>
        <li>
          <Link to="/features">Features</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
