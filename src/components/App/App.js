import React from "react";
<<<<<<< HEAD
import AppRoutes from "./AppRoutes";
import NavBar from "../Navbar/Navbar";
=======
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Footer from "../Footer/Footer";
import AppRoutes from "./AppRoutes";
>>>>>>> e38abc74e3ad70919e54ba6c8e8ba408383e8844

function App() {
  return (
    <div className="App">
      <NavBar/>
      <AppRoutes />
<<<<<<< HEAD
=======
      <Footer />

      {/* <Button onClick={() => navigate("/login")}>Login</Button>
      <Button onClick={() => navigate("/loginrestaurant")}>
        Login as Restaurant
      </Button>
      <Button onClick={() => navigate("/usersignup")}>SignUp as User</Button>
      <Button onClick={() => navigate("/restaurantsignup")}>
        SignUp as Restaurant
      </Button> */}
>>>>>>> e38abc74e3ad70919e54ba6c8e8ba408383e8844
    </div>
  );
}

export default App;
