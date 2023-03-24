import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
function RestaurantStartPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Button className="mx-3 my-3" onClick={() => navigate("/login")}>
        Login
      </Button>
      <Button
        className="mx-3 my-3"
        onClick={() => navigate("/restaurantsignup")}
      >
        SignUp as Restaurant
      </Button>
    </div>
  );
}

export default RestaurantStartPage;
