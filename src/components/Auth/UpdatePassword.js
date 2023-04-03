import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { reAuthenticateAsync, updatePasswordAsync } from "./authSlice";
import { Link } from "react-router-dom";

const UpdatePassword = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [formError,setFormError] = useState({});
  const dispatch = useDispatch();

  // This function is used to perform form validation
  const validate = () => {
    const error = {};
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (loginEmail === "") {
      error.loginEmail = "Email cant be BLANK";
    } else if (!loginEmail.match(emailRegEx)) {
      error.loginEmail = "Invalid email";
    }
    if (oldPassword === "") {
      error.oldPassword = "Password cant be BLANK";
    } else if (oldPassword.length < 6) {
      error.oldPassword = "Password should be at least 6 characters";
    }
    if (newPassword === "") {
      error.newPassword = "Password cant be BLANK";
    } else if (newPassword.length < 6) {
      error.newPassword = "Password should be at least 6 characters";
    }
    setFormError(error);
    return error;

  };

  // This function is used to call update password functionality of the firebase
  const handleUpdate = () => {
    const error = validate();
    if(!error.hasOwnProperty("loginEmail") && !error.hasOwnProperty("oldPassword") && !error.hasOwnProperty("newPassword")){
      dispatch(
        reAuthenticateAsync({ email: loginEmail, password: oldPassword })
      ).then((res) => {
        if (!res?.error) {
          dispatch(updatePasswordAsync(newPassword)).then(() => {
            setUpdateStatus("updated");
            setLoginEmail("");
            setOldPassword("");
            setNewPassword("");
          });
        } else if (res.error) {
          setUpdateStatus("failed");
          setLoginEmail("");
          setOldPassword("");
          setNewPassword("");
        }
      });
    }
  };
  return (
    <div>
      <Container>
        <Form>
          {(updateStatus === "updated" && !loginEmail && !oldPassword && !newPassword)  && (
            <Alert variant="success">Updated password</Alert>
          )}
          {(updateStatus === "failed" && !loginEmail && !oldPassword && !newPassword)&& (
            <Alert variant="danger">Failed to update</Alert>
          )}
          <Form.Group>
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              value={loginEmail}
              maxLength={60}
              onChange={(event) => {
                setLoginEmail(event.target.value);
                setFormError({})
              }}
              required
            />
          </Form.Group>
          {formError.loginEmail && <p className="text-danger-emphasis my-3">{formError.loginEmail}</p>}
          <Form.Group>
            <Form.Label>Current Password :</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              maxLength={30}
              onChange={(event) => {
                setOldPassword(event.target.value);
                setFormError({})
              }}
              required
            />
          </Form.Group>
          {formError.oldPassword && <p className="text-danger-emphasis my-3">{formError.oldPassword}</p>}
          <Form.Group>
            <Form.Label>New Password :</Form.Label>
            <Form.Control
              type="password"
              maxLength={30}
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                setFormError({})
              }}
              required
            />
          </Form.Group>
          {formError.newPassword && <p className="text-danger-emphasis my-3">{formError.newPassword}</p>}
          <Button onClick={handleUpdate} className="my-3">
            Update Password
          </Button>
          <Link to={-1} className="mx-3">
            Back to profile
          </Link>
        </Form>
      </Container>
    </div>
  );
};
export default UpdatePassword;
