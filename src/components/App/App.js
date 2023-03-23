import React from "react";
import AppRoutes from "./AppRoutes";
import NavBar from "../Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <AppRoutes />
    </div>
  );
}

export default App;
