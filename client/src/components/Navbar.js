import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [isAuth, setIsAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [userData, setUserData] = useState({});
  const [count, setCount] = useState(0);

  const [data, setData] = useState(() => {
    const user = localStorage.getItem("travel-helper-user");
    const data = JSON.parse(user);
    return data;
  });

  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("travel-helper-user");

    console.log(user);

    const data = JSON.parse(user);
    if (data) {
      setIsAuth(true);
      setUserData(data);
      setIsAdmin(data.isAdmin)
    }
  }, []);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("travel-helper-user");
    setIsAuth(null);
    setUserData(null);
    navigate("/login");
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        style={{ minHeight: "10vh" }}
        expand="lg"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            Urban Ride
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {isAuth ? (
                <>
                  <Nav.Link as={Link} to="/destination">
                    Destination
                  </Nav.Link>

                  {isAdmin && (
                    <Nav.Link as={Link} to="/admin">
                      Admin
                    </Nav.Link>
                  )}

                  <NavDropdown title={userData.name} id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/orders">
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login-process">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/registration-process">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
