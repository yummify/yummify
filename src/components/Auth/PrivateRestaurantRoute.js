import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRestaurantRoute({ children }) {
  const { user } = useAuth();
  //console.log("Restaurant in Private router:", restaurant);
  if (!user || !user?.isRestaurantOwner) {
    return <Navigate to="/authorizationerror" replace />;
  }
  return children;
}
