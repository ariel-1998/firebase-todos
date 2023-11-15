import React, { useEffect, ReactNode } from "react";
import { RouteProps, Outlet, Navigate, Route } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type ProtectedRouteProps = {
  redirect: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirect }) => {
  const { user } = useAuth();
  return !!user ? <Outlet /> : <Navigate to={redirect} />;
};

export default ProtectedRoute;
