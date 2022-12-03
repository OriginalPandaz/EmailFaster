import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import "font-awesome/css/font-awesome.min.css";
import { useState } from "react";

export default function Navbar() {
  const className = "active-link";
  const [clicked, setClicked] = useState(false);
  console.log(clicked);
  return (
    <div className={clicked ? "topnav-resp" : "topnav"}>
      <NavLink
        end
        to="/EmailFaster"
        className={({ isActive }) => (isActive ? className : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/EmailFaster/email-generator"
        className={({ isActive }) => (isActive ? className : undefined)}
      >
        Send Emails
      </NavLink>
      <NavLink
        to="/EmailFaster/create-template"
        className={({ isActive }) => (isActive ? className : undefined)}
      >
        Create Template
      </NavLink>
      <div className="menu-icon">
        <i
          onClick={() => setClicked(!clicked)}
          className={clicked ? "fa fa-times" : "fa fa-bars"}
        ></i>
      </div>
    </div>
  );
}
