import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WrongPathRedirect: React.FC = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");
    navigate("/");
  }, []);
  return null;
};

export default WrongPathRedirect;
