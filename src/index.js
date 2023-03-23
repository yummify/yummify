import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import Login from "./components/Auth/Login";
import UserSignUp from "./components/Auth/UserSignUp";
import Home from "./components/Home/Home";
import EditUserProfile from "./components/User/EditUserProfile";
import Users from "./components/Users/Users";

<<<<<<< HEAD
import Map from "./components/Map/Map";

import AdminHome from "./components/Admin/Admin";
import Cart from "./components/Cart/Cart";
import AdminManageRestaurants from "./components/Admin/AdminManageRestaurants";
import AdminManageUsers from "./components/Admin/AdminManageUsers";
import AdminOrderHistory from "./components/Admin/AdminOrderHistory";

import SingleRestaurant from "./components/SingleRestaurantUserView/SingleRestaurant";
=======
>>>>>>> 2b6f636bf2db9ff4b79c51199f95a27f0a87922b
import AllRestaurants from "./components/AllRestaurants/AllRestaurants";
import Bag from './components/Bag/Bag';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/AuthContext";
import RestaurantSignUp from "./components/Auth/RestaurantSignUp";
import RestaurantProfile from "./components/Restaurant/RestaurantProfile";
import { AuthResProvider } from "./contexts/AuthResContext";
import RestaurantLogin from "./components/Auth/RestaurantLogin";
import RestaurantStartPage from "./components/App/RestaurantStartPage";
import UserStartPage from "./components/App/UserStartPage";
//import { AuthProvider } from "./contexts/AuthContext";
import Bag from "./components/Bag/Bag";
import AddBagForm from "./components/Bag/AddBagForm";
import EditBagForm from "./components/Bag/EditBagForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
<<<<<<< HEAD
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
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/admin/manage-restaurants" element={<AdminManageRestaurants/>}/>
        <Route path="/admin/manage-users" element={<AdminManageUsers/>}/>
        <Route path="/admin/order-history" element={<AdminOrderHistory/>}/>
        <Route path="/restaurant/:id" element={<SingleRestaurant />} />
=======
        <Route path="/*" element={<App />} />
>>>>>>> 2b6f636bf2db9ff4b79c51199f95a27f0a87922b
        <Route path="/restaurants" element={<AllRestaurants />} />
        <Route path="/bag" element={<Bag/>} />
      </Routes>
    </Router>
    {/* <Router>
      <Routes></Routes>
    </Router>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/userstart" element={<UserStartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usersignup" element={<UserSignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/edituserprofile" element={<EditUserProfile />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </AuthProvider>
    <AuthResProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/restaurantstart" element={<RestaurantStartPage />} />
          <Route path="/loginrestaurant" element={<RestaurantLogin />} />
          <Route path="/restaurantsignup" element={<RestaurantSignUp />} />
          <Route path="/restaurantprofile" element={<RestaurantProfile />} />
        </Routes>
      </Router>
    </AuthResProvider> */}
  </Provider>
);
