import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function UserStartPage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Button className="mx-3 my-3" onClick={() => navigate("/login")}>
        Login
      </Button>
      <Button className="mx-3 my-3" onClick={() => navigate("/usersignup")}>
        SignUp as User
      </Button>
    </div>
  );
}

export default UserStartPage;
