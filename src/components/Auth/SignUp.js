import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchAuthAsync } from "./authSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPwd, setSignUpPwd] = useState("");
  //const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSignUp = async () => {
    dispatch(fetchAuthAsync({ email: signUpEmail, password: signUpPwd })).then(
      () => navigate("/edituserprofile")
    );
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     console.log(currentUser);
  //   });
  // }, []);

  return (
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
        <Button onClick={registerSignUp}>Register</Button>
      </Form>
    </div>
  );
};
export default SignUp;
