import React, { useState } from "react";
import { Form, Button, FormCheck } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchSignUpAuthAsync } from "./authSlice";
import { addRestaurantAsync } from "../Restaurant/restaurantSlice";
import { useNavigate } from "react-router-dom";

const RestaurantSignUp = () => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPwd, setSignUpPwd] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [EIN, setEIN] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [terms, setTerms] = useState("false");
  const [website, setWebsite] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSignUp = async () => {
    dispatch(
      fetchSignUpAuthAsync({ email: signUpEmail, password: signUpPwd })
    ).then((res) => {
      const restaurant = res.payload;
      console.log("Restaurant from fetchsignup:", res.payload);
      const reqbody = {
        restaurantId: restaurant.userId,
        restaurantName,
        email: restaurant.email,
        image: "/Student_Profile.png",
        cuisine,
        description,
        address,
        open,
        close,
        website,
        EIN,
        role: "restaurant",
        status: "pending",
        phoneNumber: phoneNumber,
        zipcode: zipcode,
        terms,
      };
      dispatch(addRestaurantAsync(reqbody)).then(() => {
        console.log("restaurant added");
        navigate("/restaurantprofile");
      });
    });
  };

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
          <Form.Label>Restaurant Name :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setRestaurantName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Cuisine :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setCuisine(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Address :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setAddress(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>phoneNumber :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Opens at :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setOpen(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Closes at :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setClose(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>zipcode :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setZipcode(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>website :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setWebsite(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>EIN :</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setEIN(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Terms and Conditions :</Form.Label>
          <Form.Check
            onChange={(event) => setTerms(event.target.checked)}
            label="I agree"
          ></Form.Check>
        </Form.Group>
        {terms && <Button onClick={registerSignUp}>Register</Button>}
      </Form>
    </div>
  );
};

export default RestaurantSignUp;
