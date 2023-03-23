import React from "react";
import { Route, redirect, Navigate } from "react-router-dom";
import { useAuthRes } from "../../contexts/AuthResContext";

export default function PrivateRestaurantRoute({
  //   component: Component,
  //   ...rest
  children,
}) {
  const { restaurant } = useAuthRes();
  console.log("Restaurant in Private router:", restaurant);
  if (!restaurant) {
    return <Navigate to="/restaurantstart" replace />;
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
