import { useAuth } from "@src/hooks";
import React, { ReactNode } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate: NavigateFunction = useNavigate();

  // token
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

  // check login
  useAuth();

  return <>{children}</>;
};

export default PrivateRoute;
