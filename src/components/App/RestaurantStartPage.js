import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
function RestaurantStartPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/loginrestaurant")}>
        Login as Restaurant
      </Button>
      <Button onClick={() => navigate("/restaurantsignup")}>
        SignUp as Restaurant
      </Button>
    </div>
  );
}

export default RestaurantStartPage;
