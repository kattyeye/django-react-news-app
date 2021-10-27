import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav, NavDropdown } from "react-bootstrap";
import mainLogo from "./mainLogo.png";
export default function SecondaryHeader(props) {
  return (
    <Navbar collapseOnSelect expand="lg" className="container-fluid">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link>
              <li className="nav-item secondary-nav-item p-3">
                <NavLink to="/">Home</NavLink>
              </li>
            </Nav.Link>
            {/* <Nav.Link>
              <li className="nav-item secondary-nav-item p-3">
                <NavLink to="/admin">Admin</NavLink>
              </li>
            </Nav.Link> */}
          {/* </Nav> */}
          <Nav className="me-auto container-fluid">
            {props.isAuth && (
              <>
                <Nav.Link>
                  <li className="nav-item secondary-nav-item p-3">
                    <NavLink to="/admin">Admin</NavLink>
                  </li>
                </Nav.Link>
                <Nav.Link>
                  <li className="nav-item secondary-nav-item p-3">
                    <NavLink to="/account">My Account</NavLink>
                  </li>
                </Nav.Link>
              </>
            )}

            <Navbar.Brand>
              <li>
                <NavLink className="navbar-brand" to="/">
                  <img src={mainLogo} />
                </NavLink>
              </li>
            </Navbar.Brand>
            {props.isAuth && (
              <NavDropdown
                title="My Articles"
                className=" secondary-nav-item p-3"
                id="dropdown-nav-title"
              >
                <NavDropdown.Item>
                  <Nav.Link>
                    <li className="nav-item secondary-nav-item p-3">
                      <NavLink to="/articles/drafts">Drafts</NavLink>
                    </li>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <li className="nav-item secondary-nav-item p-3">
                      <NavLink to="/articles/submitted">Submitted</NavLink>
                    </li>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <li className="nav-item secondary-nav-item p-3">
                      <NavLink to="/articles/published">Published</NavLink>
                    </li>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <li className="nav-item secondary-nav-item p-3">
                      <NavLink to="/articles/rejected">Rejected</NavLink>
                    </li>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link>
                    <li className="nav-item secondary-nav-item p-3">
                      <NavLink to="/articles/archived">Archived</NavLink>
                    </li>
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {!props.isAuth && (
              <Nav.Link>
                <li className="nav-item secondary-nav-item p-3">
                  <NavLink to="/login">Login</NavLink>
                </li>
              </Nav.Link>
            )}
            {props.isAuth && (
              <Nav.Link>
                <li className="btn-logout">
                  <button
                    className="btn btn-link logout"
                    type="button"
                    onClick={() => props.handleLogoutSubmit()}
                  >
                    Logout
                  </button>
                </li>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
