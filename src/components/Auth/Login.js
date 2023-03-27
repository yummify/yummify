import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchLoginAuthAsync } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { fetchUserAsync } from "../User/userSlice";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginpwd, setLoginPwd] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    dispatch(
      fetchLoginAuthAsync({ email: loginEmail, password: loginpwd })
    ).then((res) => {
      const userId = res.payload.userId;
      dispatch(fetchUserAsync(userId)).then((res) => {
        const user = res.payload;
        if (user?.isRestaurantOwner) {
          navigate("/restaurantprofile");
        } else if (!user?.isAdmin) {
          navigate("/userprofile");
        } else if (user?.isAdmin) {
          navigate("/adminprofile");
        }
      });
    });
  };

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
