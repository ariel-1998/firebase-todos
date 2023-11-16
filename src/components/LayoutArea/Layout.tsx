import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <Container fluid className="bg-dark layout text-white">
      <Row className="d-flex flex-column h-100">
        {/* Header */}
        <Col className="p-0 flex-grow-0">
          <Header />
        </Col>

        {/* Content */}
        <Col className="p-0 flex-grow-1 overflow-auto">
          <Outlet />
        </Col>

        {/* Footer */}
        <Col className="p-0 flex-grow-0">
          <Footer />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
