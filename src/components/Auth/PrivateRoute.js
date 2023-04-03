import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// This component is used to enable authorized users to have protected routes
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (!user && !loading) {
    return <Navigate to="/authorizationerror" replace />;
  }
  return children;
}
