import React from "react";

import { Link } from "react-router-dom";

import AppRoutes from "./AppRoutes";
import NavBar from "../Navbar/Navbar";
import { useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";
import Footer from "../Footer/Footer";

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
