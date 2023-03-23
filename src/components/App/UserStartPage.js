import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
function UserStartPage() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Button onClick={() => navigate("/login")}>Login</Button>
      <Button onClick={() => navigate("/usersignup")}>SignUp as User</Button>
    </div>
  );
}

export default UserStartPage;
