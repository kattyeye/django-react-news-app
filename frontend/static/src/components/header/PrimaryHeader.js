import { NavLink } from "react-router-dom";

export default function PrimaryHeader() {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        <div
          className="collapse navbar-collapse primarynav"
          id="navbarResponsive"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/local">Local</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/food">Food</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/travel">Travel</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/fashion">Fashion</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/global">Global</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
