import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AppRoutes from "./AppRoutes";
function App() {
  //const navigate = useNavigate();
  return (
    <div className="App">
      {/* <Link className="d-block" to={"/restaurantstart"}>
        Go to Restaurant Page
      </Link>
      <Link to={"/userstart"}>Go to User Page</Link> */}
      <AppRoutes />

      {/* <Button onClick={() => navigate("/login")}>Login</Button>
      <Button onClick={() => navigate("/loginrestaurant")}>
        Login as Restaurant
      </Button>
      <Button onClick={() => navigate("/usersignup")}>SignUp as User</Button>
      <Button onClick={() => navigate("/restaurantsignup")}>
        SignUp as Restaurant
      </Button> */}
    </div>
  );
}

export default App;
