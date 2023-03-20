import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchLoginAuthAsync } from "./authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginpwd, setLoginPwd] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    dispatch(
      fetchLoginAuthAsync({ email: loginEmail, password: loginpwd })
    ).then(() => navigate("/home"));
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     console.log(currentUser);
  //   });
  // }, []);

  return (
    <div>
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              onChange={(event) => setLoginEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              onChange={(event) => setLoginPwd(event.target.value)}
            />
          </Form.Group>
          <Button onClick={login}>Login</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
