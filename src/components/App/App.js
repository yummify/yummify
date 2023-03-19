import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Button onClick={() => navigate("/login")}>Login</Button>
      <Button onClick={() => navigate("/signup")}>SignUp as User</Button>
      <Button>SignUp as Restaurant</Button>
    </div>
  );
}

export default App;
