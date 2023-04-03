import React, { useState } from "react";
import { Form, Button, Container,Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetPasswordAsync } from "./authSlice";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [formError,setFormError] = useState({});
  const [emailStatus, setEmailStatus] = useState("");
  const dispatch = useDispatch();
 

  // This function is used to perform form validation
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

  // This function is used to call reset password functionality of the firebase
  const handleReset = () => {
    const error = validate();
    if(!error?.hasOwnProperty("email")){
      dispatch(resetPasswordAsync(loginEmail)).then(res => {
        if(!res?.error){
          setEmailStatus("success");
          setLoginEmail("");
        }
        else{
          setEmailStatus("failed");
          setLoginEmail("");
        }
      })
    }
  };


  return (
    <div>
      <Container>
        <Form>
          {emailStatus === "success" && <Alert variant="success">Check your email for further instructions</Alert>}
          {emailStatus === "failed" && <Alert variant="danger">Failed to send email</Alert> }
          <Form.Group>
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              value={loginEmail}
              maxLength={50}
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
