import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import Login from "./components/Auth/Login";
import UserSignUp from "./components/Auth/UserSignUp";
import Home from "./components/Home/Home";
import EditUserProfile from "./components/User/EditUserProfile";
import Users from "./components/Users/Users";
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
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
