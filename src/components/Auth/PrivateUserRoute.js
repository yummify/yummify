import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// This component is used to enable authorized users to have protected user routes
export default function PrivateUserRoute({ children }) {
  const { user, loading } = useAuth();
  if ((!user || user?.isAdmin || user?.isRestaurantOwner) && !loading) {
    return <Navigate to="/authorizationerror" replace />;
  }
  return children;
}
