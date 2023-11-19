import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthContainer from "./AuthContainer";

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <AuthContainer>
      <Card>
        <Card.Header className="text-center">
          <h3>
            <strong>Profile</strong>
          </h3>
        </Card.Header>
        <Card.Body className="p-5 pb-4">
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
      </Card>
    </AuthContainer>
  );
};

export default Profile;
