import React, { useState, useEffect } from 'react';  
import { useParams } from "react-router-dom";
import { fetchSingleRestaurant, selectRestaurant } from './singleRestaurantSlice';
import { useSelector, useDispatch } from "react-redux";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Bag from '../Bag/Bag';
import { fetchSingleBagByRestAsync, selectBag } from '../Bag/bagSlice';


const SingleRestaurant = () => {
    const dispatch = useDispatch();

    const restaurant = useSelector(selectRestaurant);
    const bag = useSelector(selectBag);
    const {expiration, image, newPrice, originalPrice, pickup, type} = bag;
    //console.log(expiration);
    

    //useParams to get bagId
    const { id } = useParams();
    console.log('id from SingleRest Component:', id);

    useEffect(() => {
        dispatch(fetchSingleRestaurant(id));
        dispatch(fetchSingleBagByRestAsync(id));
        //console.log('bag:', bag);
      }, [dispatch, id]);
      

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
        <Card.Header className="text-center">{restaurant.restaurantName}</Card.Header>
        <Card.Body>
            <Card.Text>
                Surprise bags from {restaurant.restaurantName} may include: {restaurant.description}
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>Cuisine: {restaurant.cuisine}</ListGroup.Item>
            <ListGroup.Item>Address: {restaurant.address}</ListGroup.Item>
            <ListGroup.Item>Phone: {restaurant.phoneNumber}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
            Order a Surprise Bag from {restaurant.name}:
            {/* add onClick */}
            <Bag bag={bag}/>
        </Card.Body>
        <Card.Body>
            <Card.Link href={restaurant.website}>Website</Card.Link>
            <Card.Link href="/restaurants">Back to Restaurants</Card.Link> 
        </Card.Body>
        </Card>
        </>
    )
};

export default SingleRestaurant;