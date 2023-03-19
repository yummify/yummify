import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginpwd, setLoginPwd] = useState("");
  //const [user, setUser] = useState({});

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginpwd);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
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
