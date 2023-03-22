import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { AuthResProvider } from "../../contexts/AuthResContext";
import App from "./App";
import UserSignUp from "../Auth/UserSignUp";
import UserStartPage from "./UserStartPage";
import Login from "../Auth/Login";
import Home from "../Home/Home";
import EditUserProfile from "../User/EditUserProfile";
import Users from "../Users/Users";
import RestaurantLogin from "../Auth/RestaurantLogin";
import RestaurantProfile from "../Restaurant/RestaurantProfile";
import RestaurantSignUp from "../Auth/RestaurantSignUp";
import RestaurantStartPage from "./RestaurantStartPage";
import { useAuth } from "../../contexts/AuthContext";
import { useAuthRes } from "../../contexts/AuthResContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AppRoutes = () => {
  const user = useAuth();
  const restaurant = useAuthRes();
  const navigate = useNavigate();
  const [userBtn, setUserBtn] = useState(false);
  const [restaurantBtn, setRestaurantBtn] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setUserBtn(true);
          navigate("/userstart");
        }}
      >
        User
      </Button>
      <Button
        onClick={() => {
          setRestaurantBtn(true);
          navigate("/restaurantstart");
        }}
      >
        Restaurant
      </Button>
      {/* {userBtn && (
        <AuthProvider>
          <Routes>


            <Route path="/" element={<App />} />
            <Route path="/userstart" element={<UserStartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usersignup" element={<UserSignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/edituserprofile" element={<EditUserProfile />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </AuthProvider>
      )} */}
      {/* {restaurantBtn && ( */}
      <AuthResProvider>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="/restaurantstart" element={<RestaurantStartPage />} />
          <Route path="/loginrestaurant" element={<RestaurantLogin />} />
          <Route path="/restaurantsignup" element={<RestaurantSignUp />} />
          <Route path="/restaurantprofile" element={<RestaurantProfile />} />
        </Routes>
      </AuthResProvider>
      {/* )} */}
    </div>
  );
};
export default AppRoutes;
