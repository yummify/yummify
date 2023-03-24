import React from "react";

import { Link } from "react-router-dom";

import Footer from "../Footer/Footer";
import AppRoutes from "./AppRoutes";
import NavBar from "../NavBar/NavBar";

function App() {
  return (
    <div className="App">

      <Link to={"/"} className="mx-3">
        Home
      </Link>
      <Link to={"/userstart"} className="mx-3">
        User
      </Link>
      <Link to={"/restaurantstart"} className="mx-3">
        Restaurant
      </Link>
      <NavBar />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
