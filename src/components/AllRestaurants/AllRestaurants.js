import React, { useEffect, useState } from "react";
import { fetchAllRestaurants, selectRestaurants } from "./allRestaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import SearchBar from "../ToggleView/SearchBar";
import { Link } from "react-router-dom";
import Filter from "../../Filter/Filter";

const AllRestaurants = () => {
  const dispatch = useDispatch();
  //select the restaurants currently reflected in state  const [searchTerm, setSearchTerm] = useState("");
  const restaurants = useSelector(selectRestaurants);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filterRestaurants = (restaurants) => {
    const filteredByNameOrDescription = restaurants.filter(
      (restaurant) =>
        (restaurant.restaurantName &&
          restaurant.restaurantName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (restaurant.description &&
          restaurant.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    );

    if (selectedCuisine) {
      return filteredByNameOrDescription.filter(
        (restaurant) => restaurant.cuisine === selectedCuisine
      );
    } else {
      return filteredByNameOrDescription;
    }
  };

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const filteredRestaurants = filterRestaurants(restaurants);

  //ONLY RETURN ACCEPTED RESTAURANTS
  return (
    <>
      <h1>Yummify</h1>
      <SearchBar handleSearch={handleSearch} />
      <Filter handleCuisineSelect={handleCuisineSelect} />
      {filteredRestaurants.map((restaurant) => {
        if (restaurant.status === "approved")
          return (
            <Link
              key={restaurant.id}
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
                  <Card.Text>Cuisine: {restaurant.cuisine}</Card.Text>
                  <Card.Text><b>Address:</b> {restaurant.address}</Card.Text>
                  <Card.Img src={restaurant.image?.[1]} />
                </Card.Body>
              </Card>
            </Link>
          );
      })}
    </>
  );
};

export default AllRestaurants;
