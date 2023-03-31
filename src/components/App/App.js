import React from "react";

import { AuthProvider } from "../../contexts/AuthContext";

import AppRoutes from "./AppRoutes";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <AppRoutes />
      </AuthProvider>

      <Footer />
    </div>
  );
}

export default App;
