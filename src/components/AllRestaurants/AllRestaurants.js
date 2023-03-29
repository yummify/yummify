import React, { useEffect, useState } from "react";
import { fetchAllRestaurants, selectRestaurants } from "./allRestaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import SearchBar from "../ToggleView/SearchBar";

const AllRestaurants = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const restaurants = useSelector(selectRestaurants);

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
      <h1>Yum</h1>
      <SearchBar handleSearch={handleSearch} />
      {filteredRestaurants.map((restaurant) => {
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
