import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { changeForm } from "./appSlice";
function UserStartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Button onClick={() => navigate("/login")}>Login</Button>
      <Button onClick={() => navigate("/usersignup")}>SignUp as User</Button>
    </div>
  );
}

export default UserStartPage;
