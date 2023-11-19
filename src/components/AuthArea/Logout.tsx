import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTodos } from "../../context/TodoProvider";
import { errorToast } from "../../utils/errorToast";

const Logout: React.FC = () => {
  const { userLogout } = useAuth();
  const { resetTodosOnLogout } = useTodos();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await userLogout();
      resetTodosOnLogout();
      navigate("/login");
    } catch (error) {
      errorToast("Could not logout, Try again.");
    }
  };
  return (
    <NavDropdown.Item onClick={logout} className="text-danger">
      LOG OUT
    </NavDropdown.Item>
  );
};

export default Logout;
