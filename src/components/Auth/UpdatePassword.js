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
  const dispatch = useDispatch();
  const handleUpdate = () => {
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
  };
  return (
    <div>
      <Container>
        <Form>
          {updateStatus === "updated" && (
            <Alert variant="success">Updated password</Alert>
          )}
          {updateStatus === "failed" && (
            <Alert variant="danger">Failed to update</Alert>
          )}
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
          <Form.Group>
            <Form.Label>Current Password :</Form.Label>
            <Form.Control
              type="password"
              onChange={(event) => {
                setOldPassword(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>New Password :</Form.Label>
            <Form.Control
              type="password"
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
              required
            />
          </Form.Group>
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
