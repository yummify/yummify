import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync, editUserAsync, selectUser } from "../User/userSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const EditAdminProfile = () => {
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
    dispatch(editUserAsync(reqbody)).then(() => navigate("/adminprofile"));
  }
  };

  return (
    <div>
      <Container>
        <h2>Admin Profile :</h2>
        <Form>
          <Form.Group>
            <Form.Label>FirstName: </Form.Label>
            <Form.Control
              type="text"
              placeholder={name[0]}
              maxLength={30}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>LastName: </Form.Label>
            <Form.Control
              type="text"
              placeholder={name[1]}
              maxLength={30}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>PhoneNumber: </Form.Label>
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

          <Button className="my-3" onClick={editUser}>
            Save
          </Button>
          <Button className="mx-3" onClick={() => navigate("/userprofile")}>
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
};
export default EditAdminProfile;
