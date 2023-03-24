import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { addUserAsync } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync, editUserAsync, selectUser } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const EditUserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const authuser = useSelector(selectUser);
  const name = authuser?.name?.split(" ");

  useEffect(() => {
    if (user?.userId) dispatch(fetchUserAsync(user?.userId));
  }, [user?.userId]);

  //console.log("auth.currentuser+++++++" + auth.currentUser.email);
  // const authenticate = useSelector(selectAuth);
  // console.log("Authen:", authenticate);
  // const createNewUser = () => {
  //   const reqbody = {
  //     userId: authenticate.userId,
  //     name: authenticate.displayName
  //       ? authenticate.displayName
  //       : firstName + " " + lastName,
  //     email: authenticate.email,
  //     phoneNumber: authenticate.phoneNumber
  //       ? authenticate.phoneNumber
  //       : phoneNumber,
  //     zipcode: zipcode,
  //   };
  //   dispatch(addUserAsync(reqbody)).then(() => navigate("/home"));
  // };

  const editUser = () => {
    const fName =
      firstName !== undefined && firstName !== "" ? firstName : name[0];
    const lName =
      lastName !== undefined && lastName !== "" ? lastName : name[1];
    const reqbody = {
      userId: user.userId,
      name: fName + " " + lName,
      phoneNumber: phoneNumber ? phoneNumber : authuser.phoneNumber,
      zipcode: zipcode ? zipcode : authuser.zipcode,
    };
    dispatch(editUserAsync(reqbody)).then(() => navigate("/userprofile"));
  };

  return (
    <div>
      <h2>User Profile :</h2>
      <Form>
        <Form.Group>
          <Form.Label>FirstName :</Form.Label>
          <Form.Control
            type="text"
            placeholder={name[0]}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>LastName :</Form.Label>
          <Form.Control
            type="text"
            placeholder={name[1]}
            onChange={(event) => setLastName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>PhoneNumber :</Form.Label>
          <Form.Control
            type="text"
            placeholder={authuser.phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Zipcode :</Form.Label>
          <Form.Control
            type="text"
            placeholder={authuser.zipcode}
            onChange={(event) => setZipcode(event.target.value)}
          />
        </Form.Group>

        <Button onClick={editUser}>Save</Button>
        <Button onClick={() => navigate("/userprofile")}>Cancel</Button>
      </Form>
    </div>
  );
};
export default EditUserProfile;
