import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addUserAsync } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../Auth/authSlice";
import { useNavigate } from "react-router-dom";

const EditUserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log("auth.currentuser+++++++" + auth.currentUser.email);
  const authenticate = useSelector(selectAuth);
  console.log("Authen:", authenticate);
  const createNewUser = () => {
    const reqbody = {
      userId: authenticate.userId,
      name: authenticate.displayName
        ? authenticate.displayName
        : firstName + " " + lastName,
      email: authenticate.email,
      phoneNumber: authenticate.phoneNumber
        ? authenticate.phoneNumber
        : phoneNumber,
      zipcode: zipcode,
    };
    dispatch(addUserAsync(reqbody)).then(() => navigate("/home"));
  };

  return (
    <div>
      <h2>User Profile :</h2>
      <Form>
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

        <Button onClick={createNewUser}>Next</Button>
      </Form>
    </div>
  );
};
export default EditUserProfile;
