import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetPasswordAsync } from "./authSlice";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [formError,setFormError] = useState({});
  const dispatch = useDispatch();
 

  const validate = () => {
    const error = {};
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (loginEmail === "") {
      error.email = "Email cant be BLANK";
    } else if (!loginEmail.match(emailRegEx)) {
      error.email = "Invalid email";
    }
    setFormError(error);
    return error;
  }

  const handleReset = () => {
    const error = validate();
    if(!error?.hasOwnProperty("email")){
      dispatch(resetPasswordAsync(loginEmail));
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
          <Button onClick={handleReset} className="my-3">
            Reset Password
          </Button>
          <Link className="mx-3" to={"/login"}>
            Login
          </Link>
        </Form>
      </Container>
    </div>
  );
};
export default ForgotPassword;
