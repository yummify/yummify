import React from "react";

import { AuthProvider } from "../../contexts/AuthContext";
import Splash from "../SplashPage/SplashPage";
import AppRoutes from "./AppRoutes";
import NavBar from "../NavBar/NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";

function App() {
  const user = useAuth();
  console.log(user);
  const location = useLocation();
  // location.pathname(/)
  return (
    <div className="App">
      <AuthProvider>
        {location.pathname === "/" && <Splash/>}
        {location.pathname !== "/" && <NavBar/>}
        <AppRoutes />
      </AuthProvider>
        {location.pathname !== "/" && <Footer/>}
    </div>
  );
}

export default App;
