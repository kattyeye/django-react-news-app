import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          News App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item p-3">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav-item p-3">
              <NavLink to="/account">My Account</NavLink>
            </li>
            <li className="nav-item p-3">
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
