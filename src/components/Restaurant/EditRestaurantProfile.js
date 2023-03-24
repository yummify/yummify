import React, { useState, useEffect } from "react";
import { Form, Button, FormCheck } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  fetchRestaurantAsync,
  editRestaurantAsync,
  selectRestaurant,
} from "./restaurantSlice";
import { useAuthRes } from "../../contexts/AuthResContext";
import { useDispatch, useSelector } from "react-redux";

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
  const [terms, setTerms] = useState("false");
  const [website, setWebsite] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurant } = useAuthRes();
  const authRestaurant = useSelector(selectRestaurant);

  useEffect(() => {
    if (restaurant?.restaurantId)
      dispatch(fetchRestaurantAsync(restaurant?.restaurantId));
  }, [restaurant?.restaurantId]);

  const editRestaurant = () => {
    const reqbody = {
      restaurantId: restaurant.restaurantId,
      restaurantName: restaurantName
        ? restaurantName
        : authRestaurant.restaurantName,
      cuisine: cuisine ? cuisine : authRestaurant.cuisine,
      description: description ? description : authRestaurant.description,
      address: address ? address : authRestaurant.address,
      open: open ? open : authRestaurant.open,
      close: close ? close : authRestaurant.close,
      website: website ? website : authRestaurant.website,
      EIN: EIN ? EIN : authRestaurant.EIN,
      phoneNumber: phoneNumber ? phoneNumber : authRestaurant.phoneNumber,
      zipcode: zipcode ? zipcode : authRestaurant.zipcode,
    };
    dispatch(editRestaurantAsync(reqbody)).then(() =>
      navigate("/restaurantprofile")
    );
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Restaurant Name :</Form.Label>
          <Form.Control
            type="text"
            placeholder={authRestaurant.restaurantName}
            onChange={(event) => setRestaurantName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Cuisine :</Form.Label>
          <Form.Control
            type="text"
            placeholder={authRestaurant.cuisine}
            onChange={(event) => setCuisine(event.target.value)}
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
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>phoneNumber :</Form.Label>
          <Form.Control
            type="text"
            placeholder={authRestaurant.phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Opens at :</Form.Label>
          <Form.Control
            type="text"
            placeholder={authRestaurant.open}
            onChange={(event) => setOpen(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Closes at :</Form.Label>
          <Form.Control
            type="text"
            placeholder={authRestaurant.close}
            onChange={(event) => setClose(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>zipcode :</Form.Label>
          <Form.Control
            type="text"
            placeholder={authRestaurant.zipcode}
            onChange={(event) => setZipcode(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>website :</Form.Label>
          <Form.Control
            type="text"
            placeholder={authRestaurant.website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>EIN :</Form.Label>
          <Form.Control
            type="text"
            placeholder={authRestaurant.EIN}
            onChange={(event) => setEIN(event.target.value)}
          />
        </Form.Group>
        <Button onClick={editRestaurant}>Save</Button>
        <Button onClick={() => navigate("/restaurantprofile")}>Cancel</Button>
      </Form>
    </div>
  );
};
export default EditRestaurantProfile;
