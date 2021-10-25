import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
export default function SecondaryHeader(props) {
  return (
    <nav className="">
      <div className="container">
        <div
          className="collapse navbar-collapse navbar navbar-expand-lg"
          id="navbarResponsive"
        >
          <div class="pos-f-t">
            <div class="collapse" id="navbarToggleExternalContent">
              <div class="bg-dark p-4">
                <ul>
                  <li className="nav-item secondary-nav-item p-3">
                    <NavLink to="/">Home</NavLink>
                  </li>

                  {props.isAuth && (
                    <>
                      <li className="nav-item secondary-nav-item p-3">
                        <NavLink to="/admin">Admin</NavLink>
                      </li>
                      <li className="nav-item secondary-nav-item p-3">
                        <NavLink to="/account">My Account</NavLink>
                      </li>
                    </>
                  )}

                  <li>
                    <NavLink className="navbar-brand" to="/">
                      <img src="media/3.png" />
                    </NavLink>
                  </li>

                  <li className="nav-item secondary-nav-item p-3">
                    <NavLink to="/login">Login</NavLink>
                  </li>

                  <li className="nav-item secondary-nav-item p-3">
                    <NavLink to="/articles/drafts">My Drafts</NavLink>
                  </li>

                  <li className="btn-logout">
                    <button
                      className="btn btn-link logout"
                      type="button"
                      onClick={() => props.handleLogoutSubmit()}
                    >
                      Logout <i class="fas fa-sign-out-alt"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <nav class="navbar navbar-dark bg-dark">
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
            </nav>
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item secondary-nav-item p-3">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav-item secondary-nav-item p-3">
              <NavLink to="/admin">Admin</NavLink>
            </li>
            <li className="nav-item secondary-nav-item p-3">
              <NavLink to="/account">My Account</NavLink>
            </li>
            <li>
              <NavLink className="navbar-brand" to="/">
                <img src="media/3.png" />
              </NavLink>
            </li>

            <li className="nav-item secondary-nav-item p-3">
              <NavLink to="/login">Login</NavLink>
            </li>

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
