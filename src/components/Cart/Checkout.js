import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Card, ListGroup } from "react-bootstrap";
import { fetchSingleRestaurant, selectRestaurant } from "../SingleRestaurantUserView/singleRestaurantSlice";
import { fetchUserOrdersAsync, selectOrders } from "../Order/orderSlice";
import { fetchOrderByStatusAsync, selectCartBag } from "./cartBagSlice";
import { useAuth } from "../../contexts/AuthContext";

const Checkout = () => {
    const dispatch = useDispatch();

    //get userId from auth context
    const { user } = useAuth();
    console.log('user.userId', user);
    const userId = user.userId;

    useEffect(() => {
        dispatch(fetchOrderByStatusAsync(userId, "shopping"));
      }, [dispatch]);

    //select order currently in state
    const order = useSelector(selectCartBag);
    console.log('order', order);
  
    //for Bootstrap modal
    const [show, setShow] = useState(true);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //reduce array method to get total
    const total = order.reduce((acc, curr) => acc + Number(curr.newPrice), 0);
  
    return (
      <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

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
       <Card style={{ width: "90vw" }}>
        {/* <Card.Img variant="top" src={restaurant.image?.[0]} /> */}
        <Card.Header className="text-center">
          Your Order
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Pickup time: {order?.[0]?.pickup}
          </Card.Text>
          <Card.Text>
            Order total: ${total}
          </Card.Text>
          <Card.Text>
            Confirmation Number: {order?.[0]?.id}
          </Card.Text>
          <Card.Text>
            When you go to pick up your order, just show the shop your confirmation number.  Don't forget to bring your own bag!
          </Card.Text>
        </Card.Body>
        <Card.Body>
            <Card.Link style={{float: 'right'}}href="/restaurants">Back to Restaurants</Card.Link> 
        </Card.Body>
      </Card>
      </>
    );
  };

export default Checkout;