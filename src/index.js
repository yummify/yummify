import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Home from "./components/Home/Home";
import EditUserProfile from "./components/User/EditUserProfile";
import Users from "./components/Users/Users";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
//import { AuthProvider } from "./contexts/AuthContext";
import Bag from "./components/Bag/Bag"
import BagForm from "./components/Bag/BagForm";

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
        <Route path="/bagform" element={<BagForm/>} />

      </Routes>
    </Router>
  </Provider>
);
