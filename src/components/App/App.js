import React from "react";

import { AuthProvider } from "../../contexts/AuthContext";
import Splash from "../SplashPage/SplashPage";
import AppRoutes from "./AppRoutes";
import NavBar from "../NavBar/NavBar";
import {useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";


function App() {
  const location = useLocation();
  // location.pathname(/)
  return (
    <div className="App">
      <AuthProvider>
        {location.pathname === "/" && <Splash/>}
        {location.pathname !== "/" && <NavBar/>}
        {/* {location.pathname !== "/logout" && <NavBar/>}
        {location.pathname === "/logout" && <Splash/>} */}
        <AppRoutes />
      </AuthProvider>
        {location.pathname !== "/" && <Footer/>}
    </div>
  );
}

export default App;
