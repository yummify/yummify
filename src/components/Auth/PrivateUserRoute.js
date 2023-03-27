import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateUserRoute({ children }) {
  const { user, loading } = useAuth();
  console.log("User in Private router:", user);
  if ((!user || user?.isAdmin || user?.isRestaurantOwner) && !loading) {
    return <Navigate to="/authorizationerror" replace />;
  }
  return children;
}
