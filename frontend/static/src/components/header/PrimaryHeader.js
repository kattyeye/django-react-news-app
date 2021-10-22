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
              <NavLink to="/articles/local">Local</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/articles/food">Food</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/articles/travel">Travel</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/articles/fashion">Fashion</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/articles/global">Global</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
