import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; 

const AuthRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); 

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default AuthRoute;
