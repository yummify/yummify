import React, { useEffect } from "react";
import { fetchAllRestaurants, selectRestaurants } from "./allRestaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";

const AllRestaurants = () => {
  const dispatch = useDispatch();

  const restaurants = useSelector(selectRestaurants);

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch]);

  //ONLY RETURN ACCEPTED RESTAURANTS
  return (
    <>
      <h1>Yum</h1>
      {/* add filter/search bar here */}
      {restaurants.map((restaurant) => {
        return (
          <Card
            key={restaurant.id}
            // text={restaurant.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: "25rem", backgroundColor: "#E5D4CE" }}
            className="mb-2"
          >
            <Card.Header>{restaurant.restaurantName}</Card.Header>
            <Card.Body>
              <Card.Title>{restaurant.description}</Card.Title>
              <Card.Title>Address: {restaurant.address}</Card.Title>
              {/* <Card.Text>
                        Hours: {restaurant.open} to {restaurant.close}
                    </Card.Text> */}
              <Card.Text>::info from bags:: ::image::</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default AllRestaurants;
