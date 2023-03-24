import React from "react";
import { Route, redirect, Navigate } from "react-router-dom";
import { useAuthRes } from "../../contexts/AuthResContext";
import { auth } from "../../firebase/config";

export default function PrivateRestaurantRoute({
  //   component: Component,
  //   ...rest
  children,
}) {
  //const { restaurant } = useAuthRes();
  //console.log("Restaurant in Private router:", restaurant);
  if (!auth?.currentUser) {
    return <Navigate to="/restaurantstart" replace />;
  }
  return children;
}
