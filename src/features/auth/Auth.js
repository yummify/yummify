import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
const { auth } = require("../../firebase");

const Auth = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginpwd, setLoginPwd] = useState("");
  const [user, setUser] = useState({});
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPwd, setSignUpPwd] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginpwd);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPwd
      );
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <Form>
          <Form.Group>
            <Form.Label>SignUp Email :</Form.Label>
            <Form.Control
              type="email"
              onChange={(event) => setSignUpEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>SignUp Password :</Form.Label>
            <Form.Control
              type="password"
              onChange={(event) => setSignUpPwd(event.target.value)}
            />
          </Form.Group>
          <Button onClick={register}>Register</Button>
        </Form>
      </div>
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
          {user?.email} && <Button onClick={logout}>Logout</Button>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
