import React from "react";
import { Route, redirect, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateUserRoute({
  //   component: Component,
  //   ...rest
  children,
}) {
  const { user } = useAuth();
  console.log("User in Private router:", user);
  if (!user) {
    return <Navigate to="/userstart" replace />;
  }
  return children;
  //return (
  // <Route
  //   {...rest}
  //   render={(props) => {
  //     return restaurant ? (
  //       <Component {...props} />
  //     ) : (
  //       redirect("/restaurantstart")
  //     );
  //   }}
  // ></Route>

  //);
}
