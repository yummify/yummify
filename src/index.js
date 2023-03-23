import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/Home/Home";
import EditUserProfile from "./components/User/EditUserProfile";
import Users from "./components/Users/Users";

import Map from "./components/Map/Map";

import AdminHome from "./components/Admin/Admin";
import AdminManageRestaurants from "./components/Admin/AdminManageRestaurants";
import AdminManageUsers from "./components/Admin/AdminManageUsers";
import AdminOrderHistory from "./components/Admin/AdminOrderHistory";

import SingleRestaurant from "./components/SingleRestaurantUserView/SingleRestaurant";
import AllRestaurants from "./components/AllRestaurants/AllRestaurants";
import Bag from './components/Bag/Bag';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
//import { AuthProvider } from "./contexts/AuthContext";
import AddBagForm from "./components/Bag/AddBagForm";
import EditBagForm from "./components/Bag/EditBagForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edituserprofile" element={<EditUserProfile />} />
        <Route path="/users" element={<Users />} />
        
        {/*for testing */}
        <Route path="/bag" element={<Bag/>} />
        <Route path="/bagform" element={<AddBagForm/>} />
        <Route path="/bageditform" element={<EditBagForm/>}/>


        <Route path="/map" element={<Map />} />

        <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/admin/manage-restaurants" element={<AdminManageRestaurants/>}/>
        <Route path="/admin/manage-users" element={<AdminManageUsers/>}/>
        <Route path="/admin/order-history" element={<AdminOrderHistory/>}/>
        <Route path="/restaurant/:id" element={<SingleRestaurant />} />
        <Route path="/restaurants" element={<AllRestaurants />} />
        <Route path="/bag" element={<Bag/>} />
      </Routes>
    </Router>
  </Provider>
);
