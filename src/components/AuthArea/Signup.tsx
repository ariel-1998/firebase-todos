import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  TypeRegistraionData,
  registrationSchema,
} from "../../models/UserModel";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "./AuthContainer";

const Signup: React.FC = () => {
  const { userSignUp, handleErrors } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeRegistraionData>({
    resolver: zodResolver(registrationSchema),
  });

  const registerUser = async (data: TypeRegistraionData) => {
    try {
      setLoading(true);
      await userSignUp(data.email, data.password);
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
            <strong>Sign Up</strong>
          </h3>
        </Card.Header>
        <Card.Body className="p-5 ">
          {error && (
            <Alert variant="danger" className="danger">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit(registerUser)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control {...register("email")} type="email" />
              {errors.email && (
                <Form.Text className="text-danger">
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group id="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control {...register("password")} type="password" />
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group id="passwordConfirm" className="mt-3">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control {...register("passwordConfirm")} type="password" />
              {errors.passwordConfirm && (
                <Form.Text className="text-danger">
                  {errors.passwordConfirm.message}
                </Form.Text>
              )}
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              {!loading ? "Sign Up" : <Spinner animation="border" />}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </Card.Footer>
      </Card>
    </AuthContainer>
  );
};

export default Signup;
