import React from "react";
import AppRoutes from "./AppRoutes";
import NavBar from "../Navbar/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <AppRoutes />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
