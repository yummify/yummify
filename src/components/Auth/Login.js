import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchLoginAuthAsync } from "./authSlice";
import { useNavigate, Link } from "react-router-dom";
import { fetchUserAsync } from "../User/userSlice";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginpwd, setLoginPwd] = useState("");
  const [formError, setFormError] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = {};
  let email = "",
    pwd = "";

  // This function is used to perform form validation
  const validate = () => {
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (loginEmail === "") {
      error.email = "Email cant be BLANK";
    } else if (!loginEmail.match(emailRegEx)) {
      error.email = "Invalid email";
    }
    if (loginpwd === "") {
      error.pwd = "Password cant be BLANK";
    }
    setFormError(error);
    return error;
  };

  // This function is used to perform login functionality and navigate the users to the respective channels based on user type: user,admin or restaurant owner
  
  const login = async () => {
    const error = validate(loginEmail, loginpwd);
    if (!error.hasOwnProperty("email") && !error.hasOwnProperty("pwd")) {
      dispatch(
        fetchLoginAuthAsync({ email: loginEmail, password: loginpwd })
      ).then((res) => {
        if (res?.error) {
          const err = res?.error;
          if (err?.message?.includes("wrong-password")) {
            setFormError({ email, pwd: "Invalid credentials" });
          }
          if (err?.message?.includes("user-not-found")) {
            setFormError({ email: "Invalid credentials", pwd });
          }
          if (err?.message?.includes("invalid-email")) {
            setFormError({ email: "Invalid email", pwd });
          }
          if (err?.message?.includes("too-many-requests")) {
            setFormError({
              email:
                "Access to this account has been temporarily disabled due to many failed login attempts.Please try again later",
              pwd,
            });
          }
        } else {
          const userId = res?.payload?.userId;
          dispatch(fetchUserAsync(userId)).then((res) => {
            const user = res?.payload;
            if (user?.isRestaurantOwner) {
              navigate("/restaurantinventory");
            } else if (!user?.isAdmin) {
              navigate("/restaurants");
            } else if (user?.isAdmin) {
              navigate("/admin");
            }
          });
        }
      });
    }
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
                setFormError({});
              }}
              required
            />
          </Form.Group>
          {formError.email && (
            <p className="text-danger-emphasis my-3">{formError.email}</p>
          )}
          <Form.Group>
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              onChange={(event) => {
                setLoginPwd(event.target.value);
                setFormError({});
              }}
              required
            />
          </Form.Group>
          {formError.pwd && (
            <p className="text-danger-emphasis my-3">{formError.pwd}</p>
          )}
          <Col className="text-center">
            <Button onClick={login} className="my-3">
              Login
            </Button>
            <Link to={"/forgotpassword"} className="mx-3">
              Forgot Password
            </Link>
          </Col>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
