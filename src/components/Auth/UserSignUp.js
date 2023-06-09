import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchSignUpAuthAsync } from "./authSlice";
import { addUserAsync } from "../User/userSlice";
import { useNavigate } from "react-router-dom";

const UserSignUp = () => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPwd, setSignUpPwd] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [formError, setFormError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = {};
  let email = "",
    pwd = "";

  // This function is used to perform form validation
  const validate = () => {
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (signUpEmail === "") {
      error.email = "Email cant be BLANK";
    } else if (!signUpEmail.match(emailRegEx)) {
      error.email = "Invalid email";
    }
    if (signUpPwd === "") {
      error.pwd = "Password cant be BLANK";
    } else if (signUpPwd.length < 6) {
      error.pwd = "Password should be at least 6 characters";
    }
    if (firstName === "") {
      error.firstName = "FirstName cant be BLANK";
    }
    if (lastName === "") {
      error.lastName = "LastName cant be BLANK";
    }
    const phoneNumberRegEx =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (phoneNumber === "") {
      error.phoneNumber = "PhoneNumber cant be BLANK";
    } else if (!phoneNumber.match(phoneNumberRegEx)) {
      error.phoneNumber = "Invalid PhoneNumber";
    }
    const zipcodeRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/;
    if (zipcode === "") {
      error.zipcode = "Zipcode cant be BLANK";
    } else if (!zipcode.match(zipcodeRegEx)) {
      error.zipcode = "Invalid zipcode";
    }
    setFormError(error);
    return error;
  };

  // This function is used to perform signup functionality and navigate the users to the user profile after creation
  const registerSignUp = async () => {
    const error = validate();
    if (!error.hasOwnProperty("email") && !error.hasOwnProperty("pwd") && !error.hasOwnProperty("zipcode") && !error.hasOwnProperty("phoneNumber") 
    && !(error.hasOwnProperty("firstName")) && !(error.hasOwnProperty("lastName"))) {
      dispatch(
        fetchSignUpAuthAsync({ email: signUpEmail, password: signUpPwd })
      ).then((res) => {
        if (res?.error) {
          const err = res?.error;
          if (err?.message?.includes("email-already-in-use")) {
            setFormError({
              email: "Email already exists,choose different email",
              pwd,
            });
          }
          if (err?.message?.includes("invalid-email")) {
            setFormError({ email: "Invalid email", pwd });
          }
        } else {
          const user = res.payload;
          const reqbody = {
            userId: user.userId,
            name: firstName.trim() + " " + lastName.trim(),
            email: user.email,
            image: "/Student_Profile.png",
            phoneNumber: phoneNumber,
            zipcode: zipcode,
            isAdmin: false,
          };
          dispatch(addUserAsync(reqbody)).then(() => {
            navigate("/userprofile");
          });
        }
      });
    }
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Sign up Email: </Form.Label>
            <Form.Control
              type="email"
              maxLength={60}
              onChange={(event) => {
                setSignUpEmail(event.target.value);
                setFormError({});
              }}
              required
            />
          </Form.Group>
          {formError.email && (
            <p className="text-danger-emphasis my-3">{formError.email}</p>
          )}
          <Form.Group>
            <Form.Label>Sign up Password: </Form.Label>
            <Form.Control
              type="password"
              maxLength={30}
              onChange={(event) => {
                setSignUpPwd(event.target.value);
                setFormError({});
              }}
              required
            />
          </Form.Group>
          {formError.pwd && (
            <p className="text-danger-emphasis my-3">{formError.pwd}</p>
          )}
          <Form.Group>
            <Form.Label>First Name: </Form.Label>
            <Form.Control
              type="text"
              maxLength={30}
              onChange={(event) => {
                setFirstName(event.target.value);
                setFormError({});
              }}
              required
            />
          </Form.Group>
          {formError.firstName && (
            <p className="text-danger-emphasis my-3">{formError.firstName}</p>
          )}
          <Form.Group>
            <Form.Label>Last Name: </Form.Label>
            <Form.Control
              type="text"
              maxLength={30}
              onChange={(event) => {
                setLastName(event.target.value);
                setFormError({});
              }}
              required
            />
          </Form.Group>
          {formError.lastName && (
            <p className="text-danger-emphasis my-3">{formError.lastName}</p>
          )}
          <Form.Group>
            <Form.Label>Phone Number: </Form.Label>
            <Form.Control
              type="text"
              maxLength={15}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
                setFormError({});
              }}
              required
            />
          </Form.Group>
          {formError.phoneNumber && (
            <p className="text-danger-emphasis my-3">{formError.phoneNumber}</p>
          )}
          <Form.Group>
            <Form.Label>Zipcode: </Form.Label>
            <Form.Control
              type="text"
              maxLength={5}
              onChange={(event) => {
                setZipcode(event.target.value);
                setFormError({});
              }}
              required
            />
          </Form.Group>
          {formError.zipcode && (
            <p className="text-danger-emphasis my-3">{formError.zipcode}</p>
          )}
          <Col className="text-center">
            <Button onClick={registerSignUp} className="my-3">
              Register
            </Button>
          </Col>
        </Form>
      </Container>
    </div>
  );
};
export default UserSignUp;
