import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchSignUpAuthAsync } from "./authSlice";
import { addUserAsync } from "../User/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPwd, setSignUpPwd] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  //const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSignUp = async () => {
    dispatch(fetchSignUpAuthAsync({ email: signUpEmail, password: signUpPwd }))
      .then((res) => {
        const user = res.payload;
        console.log(res.payload);
        const reqbody = {
          userId: user.userId,
          name: firstName + " " + lastName,
          email: user.email,
          phoneNumber: phoneNumber,
          zipcode: zipcode,
        };
        dispatch(addUserAsync(reqbody));
      })
      .then(() => navigate("/home"));
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
        <Form.Group>
          <Form.Label>FirstName :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>LastName :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setLastName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>PhoneNumber :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Zipcode :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setZipcode(event.target.value)}
          />
        </Form.Group>
        <Button onClick={registerSignUp}>Register</Button>
      </Form>
    </div>
  );
};
export default SignUp;
