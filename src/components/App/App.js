import React from "react";
import { Link } from "react-router-dom";
import AppRoutes from "./AppRoutes";
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
      <AppRoutes />
    </div>
  );
}

export default App;
