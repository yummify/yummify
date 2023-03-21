import React, { useState, useEffect } from 'react';  
import { fetchSingleRestaurant, selectRestaurant } from './singleRestaurantSlice';
import { useSelector, useDispatch } from "react-redux";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

//import Bag component


const SingleRestaurant = () => {
    const dispatch = useDispatch();

    const restaurant = useSelector(selectRestaurant);

    useEffect(() => {
        dispatch(fetchSingleRestaurant());
      }, [dispatch, restaurant]);

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
        <Modal.Body>Surprise bags are a surprise! Your friendly neighborhood restaurant fills them based on available products at the end of the day, so you can't be exactly sure what you'll get. 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <Card style={{ width: '25rem' }}>
        <Card.Img variant="top" src="image-here" />
        <Card.Header className="text-center">{restaurant.name}</Card.Header>
        <Card.Body>
            <Card.Text>
                Surprise bags from {restaurant.name} may include: {restaurant.description}
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>Cuisine: {restaurant.cuisine}</ListGroup.Item>
            <ListGroup.Item>Address: {restaurant.address}</ListGroup.Item>
            <ListGroup.Item>Open: {restaurant.open}</ListGroup.Item>
            <ListGroup.Item>Close: {restaurant.close}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
            Order a Surprise Bag from {restaurant.name}:
            {/* <Bag />//link to Bag component here */}
        </Card.Body>
        <Card.Body>
            <Card.Link href={restaurant.website}>Website</Card.Link>
            <Card.Link href="#">Back to Restaurants</Card.Link> 
        </Card.Body>
        </Card>
        </>
    )
};

export default SingleRestaurant;