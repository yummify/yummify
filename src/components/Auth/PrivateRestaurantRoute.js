import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// This component is used to enable authorized restaurant owners to have protected restaurant routes
export default function PrivateRestaurantRoute({ children }) {
  const { user, loading } = useAuth();
  if ((!user || !user?.isRestaurantOwner) && !loading) {
    return <Navigate to="/authorizationerror" replace />;
  }
  return children;
}
