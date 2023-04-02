import React, { useEffect, useState } from "react";
import { useParams,  useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleRestaurant,
  selectRestaurant,
} from "../SingleRestaurantUserView/singleRestaurantSlice";
import { editRestaurantAsync } from "../Restaurant/restaurantSlice";
import { Container, Form, Button, Modal } from "react-bootstrap";

const AdminEditRestaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurant = useSelector(selectRestaurant);
  const { id } = useParams();

  const [restaurantName, setRestaurantName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [EIN, setEIN] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [website, setWebsite] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleRestaurant(id));
  }, [dispatch, id]);

  const editRestaurant = () => {
    const reqbody = {
      restaurantId: id,
      restaurantName: restaurantName
        ? restaurantName
        : restaurant.restaurantName,
      cuisine: cuisine ? cuisine : restaurant.cuisine,
      description: description ? description : restaurant.description,
      address: address ? address : restaurant.address,
      website: website ? website : restaurant.website,
      EIN: EIN ? EIN : restaurant.EIN,
      phoneNumber: phoneNumber ? phoneNumber : restaurant.phoneNumber,
      zipcode: zipcode ? zipcode : restaurant.zipcode,
    };
    dispatch(editRestaurantAsync(reqbody));
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    navigate(`/manage-restaurants/${id}`);
}

  return (
    <>
      <Container>
        <h2 style={{fontWeight: '700'}}>Edit: {restaurant.restaurantName}</h2>
        <Form></Form>
        <Form>
          <Form.Group>
            <Form.Label>Restaurant Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder={restaurant.restaurantName}
              onChange={(event) => setRestaurantName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cuisine: </Form.Label>
            <Form.Control
              type="text"
              placeholder={restaurant.cuisine}
              onChange={(event) => setCuisine(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description: </Form.Label>
            <Form.Control
              type="text"
              placeholder={restaurant.description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address: </Form.Label>
            <Form.Control
              type="text"
              placeholder={restaurant.address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number: </Form.Label>
            <Form.Control
              type="text"
              placeholder={restaurant.phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Zip Code: </Form.Label>
            <Form.Control
              type="text"
              placeholder={restaurant.zipcode}
              onChange={(event) => setZipcode(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Website: </Form.Label>
            <Form.Control
              type="text"
              placeholder={restaurant.website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>EIN: </Form.Label>
            <Form.Control
              type="text"
              placeholder={restaurant.EIN}
              onChange={(event) => setEIN(event.target.value)}
            />
          </Form.Group>
          <Button onClick={editRestaurant}>Save</Button>
        </Form>
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>Restaurant Updated!</Modal.Header>
            <Modal.Body>
                Click the button below to navigate back to the Manage Restaurants page.
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => navigate('/manage-restaurants')}>Manage Restaurants</Button>
            </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default AdminEditRestaurant;
