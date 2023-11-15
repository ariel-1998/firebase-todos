import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [error, setError] = useState("");
  const { user, userLogout, handleErrors } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await userLogout();
      navigate("/login");
    } catch (error: any) {
      handleErrors(setError, error.code);
    }
  };

  return (
    <Card>
      <Card.Header className="text-center">
        <h3>
          <strong>Profile</strong>
        </h3>
      </Card.Header>
      <Card.Body className="p-5 pb-4">
        {error && (
          <Alert variant="danger" className="danger">
            {error}
          </Alert>
        )}
        <p>
          <strong>
            Email: <span className="text-secondary">{user?.email}</span>
          </strong>
        </p>
        <p>
          <strong>
            Created at:{" "}
            <span className="text-secondary">
              {user?.metadata.creationTime}
            </span>
          </strong>
        </p>
        <p>
          <strong>
            Last Signin:{" "}
            <span className="text-secondary">
              {user?.metadata.lastSignInTime}
            </span>
          </strong>
        </p>
        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
          Update profile
        </Link>
      </Card.Body>
      <Card.Footer className="text-center">
        <Button variant="link" onClick={logout}>
          Log Out
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Dashboard;
