import React, { useEffect, useState } from "react";
import { fetchAllRestaurants, selectRestaurants } from "./allRestaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import SearchBar from "../ToggleView/SearchBar";
import { Link } from "react-router-dom";

const AllRestaurants = () => {
  const dispatch = useDispatch();
  //select the restaurants currently reflected in state  const [searchTerm, setSearchTerm] = useState("");
  const restaurants = useSelector(selectRestaurants);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Filter based on search
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const nameMatches =
      restaurant.restaurantName &&
      restaurant.restaurantName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const descriptionMatches =
      restaurant.description &&
      restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());

    return nameMatches || descriptionMatches;
  });

  //ONLY RETURN ACCEPTED RESTAURANTS
  return (
    <>
      <h1>Yummify</h1>
      <SearchBar handleSearch={handleSearch} />
      {filteredRestaurants.map((restaurant) => {
        if (restaurant.status === "approved")
          return (
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={`/restaurant/${restaurant.id}`}
            >
              <Card
                key={restaurant.id}
                style={{ width: "30rem", backgroundColor: "#E5D4CE" }}
                className="mb-2"
              >
                <Card.Header>{restaurant.restaurantName}</Card.Header>
                <Card.Body>
                    <Card.Title>{restaurant.description}</Card.Title>
                    <Card.Text>Address: {restaurant.address}</Card.Text>
                    <Card.Img src={restaurant.image?.[1]} />
                    <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Link>
          );
      })}
    </>
  );
};

export default AllRestaurants;
