import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  fetchRestaurantAsync,
  editRestaurantAsync,
  selectRestaurant,
} from "./restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";

// This component is used to handle edit changes in the Restaurant profile page
const EditRestaurantProfile = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [EIN, setEIN] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [website, setWebsite] = useState("");
  const [formError, setFormError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const authRestaurant = useSelector(selectRestaurant);

  useEffect(() => {
    if (user?.userId) dispatch(fetchRestaurantAsync(user?.userId));
  }, [dispatch, user?.userId]);

  // This function is used to perform form validation
  const validate = () => {
    const error = {};
    const websiteRegEx =
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    if (website!=='' && !website.match(websiteRegEx)) {
      error.website = "Invalid Website";
    }
    const phoneNumberRegEx =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (phoneNumber !== '' && !phoneNumber.match(phoneNumberRegEx)) {
      error.phoneNumber = "Invalid PhoneNumber";
    }
    setFormError(error);
    return error;
  }
  
  // This function is used to handle edit changes in the Restaurant profile page
  const editRestaurant = () => {
    const error = validate();
    if(!error.hasOwnProperty("website") && 
    !error.hasOwnProperty("phoneNumber")){
      const reqbody = {
        restaurantId: user.userId,

        description: description ? description : authRestaurant.description,

        website: website ? website : authRestaurant.website,
        
        phoneNumber: phoneNumber ? phoneNumber : authRestaurant.phoneNumber,
        
      };
      dispatch(editRestaurantAsync(reqbody)).then(() =>
        navigate("/restaurantprofile")
      );
    }
    
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Restaurant Name :</Form.Label>
            <Form.Control
              type="text"
              placeholder={authRestaurant.restaurantName}
              onChange={(event) => setRestaurantName(event.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cuisine :</Form.Label>
            <Form.Control
              type="text"
              placeholder={authRestaurant.cuisine}
              onChange={(event) => setCuisine(event.target.value)}
              disabled
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description :</Form.Label>
            <Form.Control
              type="text"
              placeholder={authRestaurant.description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Address :</Form.Label>
            <Form.Control
              type="text"
              placeholder={authRestaurant.address}
              onChange={(event) => setAddress(event.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>phoneNumber :</Form.Label>
            <Form.Control
              type="text"
              placeholder={authRestaurant.phoneNumber}
              onChange={(event) => {setPhoneNumber(event.target.value)
              setFormError({})}}
            />
          </Form.Group>
          {formError.phoneNumber && (
            <p className="text-danger-emphasis my-3">{formError.phoneNumber}</p>
          )}
          <Form.Group>
            <Form.Label>zipcode :</Form.Label>
            <Form.Control
              type="text"
              placeholder={authRestaurant.zipcode}
              onChange={(event) => setZipcode(event.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>website :</Form.Label>
            <Form.Control
              type="text"
              placeholder={authRestaurant.website}
              onChange={(event) => {setWebsite(event.target.value)
              setFormError({})}}
            />
          </Form.Group>
          {formError.website && (
            <p className="text-danger-emphasis my-3">{formError.website}</p>
          )}
          <Form.Group>
            <Form.Label>EIN :</Form.Label>
            <Form.Control
              type="text"
              placeholder={authRestaurant.EIN}
              onChange={(event) => setEIN(event.target.value)}
              disabled
            />
          </Form.Group>
          <Button onClick={editRestaurant} className="my-3">
            Save
          </Button>
          <Button
            onClick={() => navigate("/restaurantprofile")}
            className="mx-3"
          >
            Cancel
          </Button>
        </Form>
        <p>
          <strong>
            For editing disabled fields, Please contact our team at
            admin@yummify.com
          </strong>
        </p>
      </Container>
    </div>
  );
};
export default EditRestaurantProfile;
