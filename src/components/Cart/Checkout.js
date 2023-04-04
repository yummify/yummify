import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Card, ListGroup } from "react-bootstrap";
import {
  fetchSingleRestaurant,
  selectRestaurant,
} from "../SingleRestaurantUserView/singleRestaurantSlice";
import { fetchUserOrdersAsync, selectOrders } from "../Order/orderSlice";

import { useAuth } from "../../contexts/AuthContext";

const Checkout = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userId = user.userId;

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(userId));
  }, [dispatch, userId]);

  const orders = useSelector(selectOrders);

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalPrice = (price) => {
    let tax = price * 0.0875;
    return (tax + price).toFixed(2);
  };
  let copy = [...orders];

  const sorting = (a, b) => {
    let aDate = new Date(a["updated"]);
    let bDate = new Date(b["updated"]);
    return bDate.getTime() - aDate.getTime();
  };
  copy.sort(sorting);

  return (
    <>
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
      <Card style={{ width: "90vw", marginBottom: '8px', border: "3px solid #41ead4" }}>
        <Card.Header className="text-center" style={{backgroundColor: 'white'}}>
          <span style={{ fontWeight: "700", fontSize: "24px" }}>
            Your Order
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <span style={{ fontWeight: "700" }}>Pickup time: </span>
            {copy?.[0]?.pickup}
          </Card.Text>
          <Card.Text>
            <span style={{ fontWeight: "700" }}>Order total: </span>$
            {copy?.[0]?.newPrice}
          </Card.Text>
          <Card.Text>
            <span style={{ fontWeight: "700" }}>Taxes: </span>$
            {(copy?.[0]?.newPrice * 0.0875).toFixed(2)}
          </Card.Text>
          <Card.Text>
            <span style={{ fontWeight: "700" }}>Order total: </span>$
            {totalPrice(copy?.[0]?.newPrice)}
          </Card.Text>
          <Card.Text>
            <span style={{ fontWeight: "700" }}>Confirmation Number: </span>
            {copy?.[0]?.id}
          </Card.Text>
          <Card.Text>
            When you go to pick up your order, just show the shop your
            confirmation number. Don't forget to bring your own bag!
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link style={{ float: "right", color: '#706bca' }} href="/restaurants">
            Back to Restaurants
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default Checkout;
