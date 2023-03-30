import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Bag from "../Bag/Bag";
import {
  fetchSingleRestaurant,
  selectRestaurant,
} from "./singleRestaurantSlice";
import { fetchGroupBagByRestAsync, selectBag } from "../Bag/bagSlice";


const SingleRestaurant = () => {
  const dispatch = useDispatch();
  //select restaurant currently in state
  const restaurant = useSelector(selectRestaurant);
  //select bag connected to restaurant
  const bags = useSelector(selectBag);

  //useParams, restaurantId, to get bagId
  const { id } = useParams();

  //dispatch thunks with restaurantId to grab restaurant and bag
  useEffect(() => {
    dispatch(fetchSingleRestaurant(id));

    dispatch(fetchGroupBagByRestAsync(id));
  }, [dispatch, id]);

  //get userId from auth context
  // const { user } = useAuth();
  // console.log('user.userId', user);
  // const userIdFromAuth = user.userId;

  //to sort bags from fetchGroupBag array from active/inactive
  const checkActive = (expir, quant) => {
    const parts = expir.split("-");
    const expdate = new Date(parts[0], parts[1] - 1, parts[2]);
    const today = new Date();
    if (expdate.getTime() >= today.getTime() && quant > 0) {
      return true;
    } else {
      return false;
    }
  };

  //for Bootstrap modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Remember!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Surprise bags are a surprise! Your friendly neighborhood restaurant
          fills them based on available products at the end of the day, so you
          can't be exactly sure what you'll get.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Card style={{ width: "25rem" }}>
        <Card.Img variant="top" src={restaurant.image?.[0]} />
        <Card.Header className="text-center">
          {restaurant.restaurantName}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Surprise bags from {restaurant.restaurantName} may include:{" "}
            {restaurant.description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Cuisine: {restaurant.cuisine}</ListGroup.Item>
          <ListGroup.Item>Address: {restaurant.address}</ListGroup.Item>
          <ListGroup.Item>Phone: {restaurant.phoneNumber}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
            Order a Surprise Bag from {restaurant.name}:
            
            {bags.length > 0 ? bags.map((bag)=>{
                    if(checkActive(bag.expiration,bag.quantity)===true){
                        return(
                          <Bag bag={bag} />
                        )}
                    else{
                      return null;
                    }
            }): "No bags available"}

        </Card.Body>
        <Card.Body>
          <Card.Link href={restaurant.website}>Website</Card.Link>
          <Card.Link href="/restaurants">Back to Restaurants</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleRestaurant;
