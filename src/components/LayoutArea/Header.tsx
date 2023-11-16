import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const { pathname } = useLocation();

  const todosLinkClass = pathname === "/todos" ? "active" : "";
  const createTodoLinkClass = pathname === "/todos/create" ? "active" : "";
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/todos" className="">
          Todos
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/todos" className={todosLinkClass}>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/todos/create"
              className={createTodoLinkClass}
            >
              Add Todo
            </Nav.Link>
            {/* <NavDropdown title="Dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
