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
              <NavLink to="/articles/published/?:category/">Local</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/articles/published/food">Food</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/articles/published/travel">Travel</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/articles/published/fashion">Fashion</NavLink>
            </li>
            <li className="nav-item p-3" id="primary-nav-item">
              <NavLink to="/articles/published/global">Global</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
