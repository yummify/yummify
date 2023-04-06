import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import Bag from "../Bag/Bag";
import {
  fetchSingleRestaurant,
  selectRestaurant,
} from "./singleRestaurantSlice";
import { fetchGroupBagByRestAsync, selectBag } from "../Bag/bagSlice";

const SingleRestaurant = () => {
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);
  const bags = useSelector(selectBag);

  //get restaurant ID from URL
  const { id } = useParams();

  //retrieve specific restaurant and group of bags from db
  useEffect(() => {
    dispatch(fetchSingleRestaurant(id));

    dispatch(fetchGroupBagByRestAsync(id));
  }, [dispatch, id]);

  //check db for active bags
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

  return (
    <>
      <Card style={{ width: "98%", marginBottom: '8px', border: "3px solid #8783d1"}}>
        <Card.Img variant="top" src={restaurant.image?.[0]} />
        <Card.Header style={{backgroundColor: 'white'}} className="text-center">
          <span style={{ fontWeight: "700", fontSize: "24px" }}>
            {restaurant.restaurantName}
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Surprise bags from {restaurant.restaurantName} may include:{" "}
            {restaurant.description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush" style={{textAlign: 'center'}}>
          <ListGroup.Item>
            <b>Cuisine:</b> {restaurant.cuisine}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Address:</b> {restaurant.address}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Phone:</b> {restaurant.phoneNumber}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          Order a Surprise Bag from: {restaurant.restaurantName}
          {bags.length > 0
            ? bags.map((bag) => {
                if (checkActive(bag.expiration, bag.quantity) === true) {
                  return <Bag bag={bag} key={bag.id} />;
                } else {
                  return null;
                }
              })
            : " No bags available"}
        </Card.Body>
        <Card.Body>
          <Card.Link href={restaurant.website} style={{color: '#706bca'}}>Website</Card.Link>
          <Card.Link style={{ float: "right", color: '#706bca' }} href="/restaurants">
            Back to Restaurants
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleRestaurant;
