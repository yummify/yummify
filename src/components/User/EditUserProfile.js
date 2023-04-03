import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync, editUserAsync, selectUser } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// This component is used to handle edit changes in the User profile page
const EditUserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const authuser = useSelector(selectUser);
  const [formError, setFormError] = useState({});
  const name = authuser?.name?.split(" ");

  useEffect(() => {
    if (user?.userId) dispatch(fetchUserAsync(user?.userId));
  }, [dispatch, user?.userId]);

  // This function is used to perform form validation
  const validate = () => {
    const error = {};
    const phoneNumberRegEx =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (phoneNumber !== '' && !phoneNumber.match(phoneNumberRegEx)) {
      error.phoneNumber = "Invalid PhoneNumber";
    }
    const zipcodeRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/;
    if (zipcode !== '' && !zipcode.match(zipcodeRegEx)) {
      error.zipcode = "Invalid zipcode";
    }
    setFormError(error);
    return error;
  }

  // This function is used to handle edit changes in the User profile page
  const editUser = () => {
    const error = validate();
    if(!error.hasOwnProperty("zipcode") && !error.hasOwnProperty("phoneNumber")){
      const fName =
      firstName !== undefined && firstName !== "" ? firstName : name[0];
    const lName =
      lastName !== undefined && lastName !== "" ? lastName : name[1];
    const reqbody = {
      userId: user.userId,
      name: fName.trim() + " " + lName.trim(),
      phoneNumber: phoneNumber ? phoneNumber : authuser.phoneNumber,
      zipcode: zipcode ? zipcode : authuser.zipcode,
    };
    dispatch(editUserAsync(reqbody)).then(() => navigate("/userprofile"));
    }
    
  };

  return (
    <div>
      <Container>
        <h2>User Profile: </h2>
        <Form>
          <Form.Group>
            <Form.Label>First Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder={name[0]}
              maxLength={30}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder={name[1]}
              maxLength={30}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number: </Form.Label>
            <Form.Control
              type="text"
              placeholder={authuser.phoneNumber}
              maxLength={15}
              onChange={(event) => {setPhoneNumber(event.target.value)
              setFormError({})}}
            />
          </Form.Group>
          {formError.phoneNumber && (
            <p className="text-danger-emphasis my-3">{formError.phoneNumber}</p>
          )}
          <Form.Group>
            <Form.Label>Zipcode: </Form.Label>
            <Form.Control
              type="text"
              placeholder={authuser.zipcode}
              maxLength={5}
              onChange={(event) => {setZipcode(event.target.value)
              setFormError({})}}
            />
          </Form.Group>
          {formError.zipcode && <p className="text-danger-emphasis my-3">{formError.zipcode}</p>}

          <Button onClick={editUser} className="my-3">
            Save
          </Button>
          <Button onClick={() => navigate("/userprofile")} className="mx-3">
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
};
export default EditUserProfile;
