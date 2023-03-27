import React from "react";

import { Link } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";

import Footer from "../Footer/Footer";
import AppRoutes from "./AppRoutes";
import NavBar from "../NavBar/NavBar";

function App() {
  return (
    <div className="App">
      {/* <Link to={"/"} className="mx-3">
        Home
      </Link>
      <Link to={"/userstart"} className="mx-3">
        User
      </Link>
      <Link to={"/restaurantstart"} className="mx-3">
        Restaurant
      </Link> */}
      <AuthProvider>
        <NavBar />
        <AppRoutes />
      </AuthProvider>

      <Footer />
    </div>
  );
}

export default App;
