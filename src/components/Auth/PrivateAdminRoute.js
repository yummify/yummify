import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// This component is used to enable admin-authorized users to have protected admin routes
export default function PrivateAdminRoute({ children }) {
  const { user, loading } = useAuth();
  if ((!user || !user?.isAdmin || user?.isRestaurantOwner) && !loading) {
    return <Navigate to="/authorizationerror" replace />;
  }
  return children;
}
