import React from "react";
import { Route, redirect, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase/config";

export default function PrivateUserRoute({
  //   component: Component,
  //   ...rest
  children,
}) {
  //const { user } = useAuth();
  //console.log("User in Private router:", user);
  //if (!user) {
  if (!auth?.currentUser) {
    return <Navigate to="/userstart" replace />;
  }
  return children;
}
