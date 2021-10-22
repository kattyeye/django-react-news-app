import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
export default function SecondaryHeader(props) {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item secondary-nav-item p-3">
              <NavLink to="/articles/published">Home</NavLink>
            </li>
            <li className="nav-item secondary-nav-item p-3">
              <NavLink to="/articles/admin">Admin</NavLink>
            </li>
            <li className="nav-item secondary-nav-item p-3">
              <NavLink to="/account">My Account</NavLink>
            </li>
            <li>
              <NavLink className="navbar-brand" to="/articles/published">
                <img src="media/3.png" />
              </NavLink>
            </li>
            {!props.user && (
              <li className="nav-item secondary-nav-item p-3">
                <NavLink to="/login">Login</NavLink>
              </li>
            )}

            <li className="nav-item secondary-nav-item p-3">
              <NavLink to="/articles/drafts">My Drafts</NavLink>
            </li>

            <li className="btn-logout">
              <button
                className="btn btn-link logout"
                type="button"
                onClick={() => props.handleLogoutSubmit()}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
