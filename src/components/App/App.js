import React from "react";

import { AuthProvider } from "../../contexts/AuthContext";
import Splash from "../SplashPage/SplashPage";
import AppRoutes from "./AppRoutes";
import NavBar from "../NavBar/NavBar";
import {useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";


function App() {
  const location = useLocation();
  return (
    <div className="App">
      <div className='margin'>
      <AuthProvider>
        {location.pathname === "/" && <Splash/>}
        {location.pathname !== "/" && <NavBar/>}
        <AppRoutes />
      </AuthProvider>
      </div>
        {location.pathname !== "/" && <Footer/>}
    </div>
  );
}

export default App;
