import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { AuthResProvider } from "../../contexts/AuthResContext";
import UserSignUp from "../Auth/UserSignUp";
import UserStartPage from "./UserStartPage";
import Login from "../Auth/Login";
import EditUserProfile from "../User/EditUserProfile";
import Users from "../Users/Users";
import RestaurantLogin from "../Auth/RestaurantLogin";
import RestaurantProfile from "../Restaurant/RestaurantProfile";
import RestaurantSignUp from "../Auth/RestaurantSignUp";
import RestaurantStartPage from "./RestaurantStartPage";
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
import EditRestaurantProfile from "../Restaurant/EditRestaurantProfile";
import PrivateAdminRoute from "../Auth/PrivateAdminRoute";
import AdminProfile from "../Admin/AdminProfile";
import EditAdminProfile from "../Admin/EditAdminProfile";

const AppRoutes = () => {
  return (
    <div>
      <AuthProvider>
        <AuthResProvider>
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
            <Route
              path="/edituserprofile"
              element={
                <PrivateUserRoute>
                  <EditUserProfile />
                </PrivateUserRoute>
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/map" element={<Map />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route
              path="/adminprofile"
              element={
                <PrivateAdminRoute>
                  <AdminProfile />
                </PrivateAdminRoute>
              }
            />
            <Route
              path="/editadminprofile"
              element={
                <PrivateAdminRoute>
                  <EditAdminProfile />
                </PrivateAdminRoute>
              }
            />
            <Route
              path="/admin/manage-restaurants"
              element={<AdminManageRestaurants />}
            />
            <Route path="/admin/manage-users" element={<AdminManageUsers />} />
            <Route
              path="/admin/order-history"
              element={<AdminOrderHistory />}
            />
            <Route path="/restaurantstart" element={<RestaurantStartPage />} />
            <Route path="/loginrestaurant" element={<RestaurantLogin />} />
            <Route path="/restaurantsignup" element={<RestaurantSignUp />} />
            <Route
              path="/editrestaurantprofile"
              element={
                <PrivateRestaurantRoute>
                  <EditRestaurantProfile />
                </PrivateRestaurantRoute>
              }
            />
            <Route
              path="/restaurantprofile"
              element={
                <PrivateRestaurantRoute>
                  <RestaurantProfile />
                </PrivateRestaurantRoute>
              }
            />
            <Route path="/bag" element={<Bag />} />
            <Route path="/bagform" element={<AddBagForm />} />
            <Route path="/bageditform" element={<EditBagForm />} />
            <Route path="/map" element={<Map />} />
            <Route path="/restaurant" element={<SingleRestaurant />} />
          </Routes>
        </AuthResProvider>
      </AuthProvider>
    </div>
  );
};
export default AppRoutes;
