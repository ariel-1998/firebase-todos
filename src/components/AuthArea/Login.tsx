import React, { useState } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TypeRegistraionData } from "../../models/UserModel";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "./AuthContainer";

const Login: React.FC = () => {
  const { userLogin, handleErrors } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } =
    useForm<Omit<TypeRegistraionData, "passwordConfirm">>();

  const loginUser = async (
    data: Omit<TypeRegistraionData, "passwordConfirm">
  ) => {
    try {
      setLoading(true);
      await userLogin(data.email, data.password);
      setError("");
      navigate("/");
    } catch (error: any) {
      handleErrors(setError, error.code);
    }
    setLoading(false);
  };

  return (
    <AuthContainer>
      <Card>
        <Card.Header className="text-center">
          <h3>
            <strong>Log In</strong>
          </h3>
        </Card.Header>
        <Card.Body className="p-5">
          {error && (
            <Alert variant="danger" className="danger">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit(loginUser)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control {...register("email")} type="email" required />
            </Form.Group>
            <Form.Group id="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password")}
                type="password"
                required
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              {!loading ? "Log In" : <Spinner animation="border" />}
            </Button>
          </Form>
          <div className="text-center mt-2">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </Card.Body>
        <Card.Footer className="text-center">
          <div>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Footer>
      </Card>
    </AuthContainer>
  );
};

export default Login;
