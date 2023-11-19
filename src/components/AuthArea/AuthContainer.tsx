import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";

type AuthContainerProps = {
  children: ReactNode;
};

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <Container className="d-flex align-items-center justify-content-center h-100 ">
      <div className="w-100" style={{ maxWidth: 400 }}>
        {children}
      </div>
    </Container>
  );
};

export default AuthContainer;
