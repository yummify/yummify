import React, { useState } from "react";
import { Form, Button, InputGroup, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchSignUpAuthAsync } from "./authSlice";
import { addRestaurantAsync } from "../Restaurant/restaurantSlice";
import { useNavigate } from "react-router-dom";
import { addUserAsync } from "../User/userSlice";

const RestaurantSignUp = () => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPwd, setSignUpPwd] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [EIN, setEIN] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [terms, setTerms] = useState("false");
  const [website, setWebsite] = useState("");
  const [formError, setFormError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = {};
  let email = "",
    pwd = "";
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

    if (restaurantName === "") {
      error.restaurantName = "Restaurant Name cant be BLANK";
    }
    if (cuisine === "") {
      error.cuisine = "Cuisine cant be BLANK";
    }
    if (description === "") {
      error.description = "Description cant be BLANK";
    }
    if (address === "") {
      error.address = "Address cant be BLANK";
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
    const websiteRegEx =
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if (website === "") {
      error.website = "Website cant be BLANK";
    } else if (!website.match(websiteRegEx)) {
      error.website = "Invalid Website";
    }

    const EINRegEx = /^[1-9]\d?-\d{7}$/;
    if (EIN === "") {
      error.EIN = "EIN cant be BLANK";
    } else if (!EIN.match(EINRegEx)) {
      error.EIN = "Invalid EIN";
    }
    setFormError(error);
    return error;
  };

  const registerSignUp = async () => {
    const error = validate(signUpEmail, signUpPwd);

    // if (
    //   !error.hasOwnProperty("email") &&
    //   !error.hasOwnProperty("pwd") &&
    //   !error.hasOwnProperty("restaurantName") &&
    //   !error.hasOwnProperty("cuisine") &&
    //   !error.hasOwnProperty("description") &&
    //   !error.hasOwnProperty("address") &&
    //   !error.hasOwnProperty("phoneNumber") &&
    //   !error.hasOwnProperty("zipcode") &&
    //   !error.hasOwnProperty("website") &&
    //   !error.hasOwnProperty("EIN")
    // )
    // {
    dispatch(
      fetchSignUpAuthAsync({ email: signUpEmail, password: signUpPwd })
    ).then((res) => {
      if (res?.error) {
        const err = res?.error;
        console.log(err?.message);
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
        console.log(res.payload);
        const reqbody = {
          userId: user.userId,
          name: restaurantName,
          email: user.email,
          image: "/Student_Profile.png",
          phoneNumber: phoneNumber,
          zipcode: zipcode,
          isAdmin: false,
          isRestaurantOwner: true,
        };
        dispatch(addUserAsync(reqbody));
        const reqResbody = {
          restaurantId: user.userId,
          restaurantName,
          email: user.email,
          image: "/Student_Profile.png",
          cuisine,
          description,
          address,
          website,
          EIN,
          role: "restaurant",
          status: "pending",
          phoneNumber: phoneNumber,
          zipcode: zipcode,
          terms,
        };
        dispatch(addRestaurantAsync(reqResbody)).then(() => {
          console.log("restaurant added");
          navigate("/restaurantprofile");
        });
      }
    });
    // }
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>SignUp Email :</Form.Label>
            <Form.Control
              type="email"
              onChange={(event) => {
                setSignUpEmail(event.target.value);
                setFormError({});
              }}
            />
          </Form.Group>
          {formError.email && (
            <p className="text-danger-emphasis my-3">{formError.email}</p>
          )}
          <Form.Group>
            <Form.Label>SignUp Password :</Form.Label>
            <Form.Control
              type="password"
              onChange={(event) => {
                setSignUpPwd(event.target.value);
                setFormError({});
              }}
            />
          </Form.Group>
          {formError.pwd && (
            <p className="text-danger-emphasis my-3">{formError.pwd}</p>
          )}
          <Form.Group>
            <Form.Label>Restaurant Name :</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => {
                setRestaurantName(event.target.value);
                setFormError({});
              }}
            />
          </Form.Group>
          {formError.restaurantName && (
            <p className="text-danger-emphasis my-3">
              {formError.restaurantName}
            </p>
          )}
          <Form.Group>
            <Form.Label>Cuisine :</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => {
                setCuisine(event.target.value);
                setFormError({});
              }}
            />
          </Form.Group>
          {formError.cuisine && (
            <p className="text-danger-emphasis my-3">{formError.cuisine}</p>
          )}

          <Form.Group>
            <Form.Label>Description :</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => {
                setDescription(event.target.value);
                setFormError({});
              }}
            />
          </Form.Group>
          {formError.description && (
            <p className="text-danger-emphasis my-3">{formError.description}</p>
          )}

          <Form.Group>
            <Form.Label>Address :</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => {
                setAddress(event.target.value);
                setFormError({});
              }}
            />
          </Form.Group>
          {formError.address && (
            <p className="text-danger-emphasis my-3">{formError.address}</p>
          )}
          <Form.Group>
            <Form.Label>PhoneNumber :</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => {
                setPhoneNumber(event.target.value);
                setFormError({});
              }}
            />
          </Form.Group>
          {formError.phoneNumber && (
            <p className="text-danger-emphasis my-3">{formError.phoneNumber}</p>
          )}
          <Form.Group>
            <Form.Label>Zipcode :</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => {
                setZipcode(event.target.value);
                setFormError({});
              }}
            />
          </Form.Group>
          {formError.zipcode && (
            <p className="text-danger-emphasis my-3">{formError.zipcode}</p>
          )}
          <Form.Group>
            <Form.Label>Website :</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">https://</InputGroup.Text>
              <Form.Control
                type="text"
                onChange={(event) => {
                  setWebsite("https://" + event.target.value);
                  setFormError({});
                }}
              />
            </InputGroup>
          </Form.Group>
          {formError.website && (
            <p className="text-danger-emphasis my-3">{formError.website}</p>
          )}
          <Form.Group>
            <Form.Label>EIN :</Form.Label>
            <Form.Control
              type="text"
              onChange={(event) => {
                setEIN(event.target.value);
                setFormError({});
              }}
            />
          </Form.Group>
          {formError.EIN && (
            <p className="text-danger-emphasis my-3">{formError.EIN}</p>
          )}
          <Form.Group>
            <Form.Label>Terms and Conditions :</Form.Label>
            <Form.Check
              onChange={(event) => setTerms(event.target.checked)}
              label="I agree"
            ></Form.Check>
          </Form.Group>
          {terms && (
            <Button className="my-3" onClick={registerSignUp}>
              Register
            </Button>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default RestaurantSignUp;
