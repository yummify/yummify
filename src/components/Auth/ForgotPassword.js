import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetPasswordAsync } from "./authSlice";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(resetPasswordAsync(loginEmail));
  };
  return (
    <div>
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Button onClick={handleReset} className="my-3">
            Reset Password
          </Button>
          <Link className="d-block" to={"/login"}>
            Login
          </Link>
        </Form>
      </div>
    </div>
  );
};
export default ForgotPassword;
