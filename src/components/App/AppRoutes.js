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
import PrivateRestaurantRoute from "../Auth/PrivateRestaurantRoute";
import PrivateUserRoute from "../Auth/PrivateUserRoute";
import UserProfile from "../User/UserProfile";
import Bag from "../Bag/Bag";
import AddBagForm from "../Bag/AddBagForm";
import EditBagForm from "../Bag/EditBagForm";
import Map from "../Map/Map";

import AdminHome from "../Admin/Admin";
import AdminManageRestaurants from "../Admin/AdminManageRestaurants";
import AdminManageUsers from "../Admin/AdminManageUsers";
import AdminOrderHistory from "../Admin/AdminOrderHistory";

import SingleRestaurant from "../SingleRestaurantUserView/SingleRestaurant";

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
      {/* <AuthProvider>
        <Routes>
          <Route path="/userstart" element={<UserStartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usersignup" element={<UserSignUp />} />
          <Route
            path="/userprofile"
            element={
              <PrivateUserRoute>
                <UserProfile />
              </PrivateUserRoute>
            }
          />
          <Route path="/edituserprofile" element={<EditUserProfile />} />
          <Route path="/users" element={<Users />} />
           <Route path="/map" element={<Map />} />
                 <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/admin/manage-restaurants" element={<AdminManageRestaurants/>}/>
        <Route path="/admin/manage-users" element={<AdminManageUsers/>}/>
        <Route path="/admin/order-history" element={<AdminOrderHistory/>}/>
        </Routes>
      </AuthProvider> */}
      <AuthResProvider>
        <Routes>
          <Route path="/restaurantstart" element={<RestaurantStartPage />} />
          <Route path="/loginrestaurant" element={<RestaurantLogin />} />
          <Route path="/restaurantsignup" element={<RestaurantSignUp />} />
          <Route
            path="/restaurantprofile"
            element={
              <PrivateRestaurantRoute>
                <RestaurantProfile />
              </PrivateRestaurantRoute>
            }
          />
          {/* new routes */}
          <Route path="/bag" element={<Bag />} />
          <Route path="/bagform" element={<AddBagForm />} />
          <Route path="/bageditform" element={<EditBagForm />} />
          <Route path="/map" element={<Map />} />
          <Route path="/restaurant" element={<SingleRestaurant />} />
        </Routes>
      </AuthResProvider>
    </div>
  );
};
export default AppRoutes;
