import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminAuthFlag") === "true";

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;
