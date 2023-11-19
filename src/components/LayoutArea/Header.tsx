import React from "react";
import { Navbar, Container, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Logout from "../AuthArea/Logout";

const Header: React.FC = () => {
  const { pathname } = useLocation();

  const activClassName = `fw-bold text-dark`;
  const todosLinkClass = pathname === "/" ? activClassName : "text-secondary";
  const createTodoLinkClass =
    pathname === "/create" ? activClassName : "text-secondary";

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          TODOS
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/" className={`${todosLinkClass} fw-bold`}>
              HOME
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/create"
              className={`${createTodoLinkClass} fw-bold`}
            >
              ADD TODO
            </Nav.Link>
            <NavDropdown title="More" className="text-secondary">
              <Dropdown.Item as={Link} to={"/profile"}>
                PROFILE
              </Dropdown.Item>
              <Logout />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <SmScreenDropDown />
      </Container>
    </Navbar>
  );
};

export default Header;

function SmScreenDropDown() {
  return (
    <NavDropdown
      title="More"
      drop="start"
      className="text-secondary d-sm-none "
    >
      <Dropdown.Item as={Link} to={"/"}>
        HOME
      </Dropdown.Item>
      <Dropdown.Item as={Link} to={"/create"}>
        ADD TODO
      </Dropdown.Item>
      <Dropdown.Item as={Link} to={"/profile"}>
        PROFILE
      </Dropdown.Item>
      <Logout />
    </NavDropdown>
  );
}
