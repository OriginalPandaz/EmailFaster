import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const className = "active-link";

  return (
    <div className="topnav">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? className : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/email-generator"
        className={({ isActive }) => (isActive ? className : undefined)}
      >
        Send Emails
      </NavLink>
      <NavLink
        to="/create-template"
        className={({ isActive }) => (isActive ? className : undefined)}
      >
        Create Template
      </NavLink>
    </div>
  );
}
