import React, { useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthContainer from "./AuthContainer";

const ForgotPassword: React.FC = () => {
  const { resetPassword, handleErrors } = useAuth();
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<{ email: string }>();

  const onSubmitPasswordReset = async ({ email }: { email: string }) => {
    try {
      setLoading(true);
      await resetPassword(email);
      setError("");
      setSuccessMsg("Email was sent to you.");
    } catch (error: any) {
      setSuccessMsg("");
      const err = handleErrors(error?.code || "");
      setError(err);
    }
    setLoading(false);
  };

  return (
    <AuthContainer>
      <Card>
        <Card.Header className="text-center">
          <h3>
            <strong>Reset Password</strong>
          </h3>
        </Card.Header>
        <Card.Body className="p-5">
          {error && <Alert variant="danger">{error}</Alert>}
          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          <Form onSubmit={handleSubmit(onSubmitPasswordReset)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control {...register("email")} type="text" required />
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100 mt-4">
              {!loading ? "Reset Password" : <Spinner animation="border" />}
            </Button>
          </Form>
          <div className="text-center mt-2">
            <Link to="/login">Log In</Link>
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

export default ForgotPassword;
