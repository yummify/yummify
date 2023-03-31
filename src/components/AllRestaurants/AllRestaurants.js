import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { fetchAllRestaurants, selectRestaurants } from "./allRestaurantsSlice";
import { Link } from "react-router-dom";
import Filter from "../../Filter/Filter";

const AllRestaurants = (props) => {
  const allRestaurants = useSelector(selectRestaurants);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(allRestaurants);
  const { searchTerm, handleSearch } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRestaurants());
  }, [dispatch]);

  useEffect(() => {
    const filteredByNameOrDescription = allRestaurants.filter(
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

    const filteredByCuisine = selectedCuisine
      ? filteredByNameOrDescription.filter(
          (restaurant) => restaurant.cuisine === selectedCuisine
        )
      : filteredByNameOrDescription;

    setFilteredRestaurants(filteredByCuisine);
  }, [allRestaurants, searchTerm, selectedCuisine]);

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const noRestaurantsMessage = (
    <div style={{ textAlign: "center", padding: "40px", fontSize: "1.2em" }}>
      {selectedCuisine} options coming soon!
    </div>
  );

  return (
    <>
      <Filter
        handleSearch={handleSearch}
        handleCuisineSelect={handleCuisineSelect}
      />
      {filteredRestaurants.length === 0
        ? noRestaurantsMessage
        : filteredRestaurants.map((restaurant) => {
            if (restaurant.status === "approved")
              return (
                <Link
                  key={restaurant.id}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to={`/restaurant/${restaurant.id}`}
                >
                  <Card
                    key={restaurant.id}
                    style={{ width: "90%", backgroundColor: "#E5D4CE" }}
                    className="mb-2"
                  >
                    <Card.Header><span style={{ fontWeight: "700"}}>{restaurant.restaurantName}</span></Card.Header>
                    <Card.Body>
                      <Card.Title>{restaurant.description}</Card.Title>
                      <Card.Text><span style={{ fontWeight: "700" }}>Cuisine:</span> {restaurant.cuisine}</Card.Text>
                      <Card.Text><span style={{ fontWeight: "700" }}>Address:</span> {restaurant.address}</Card.Text>
                      <Card.Img style={{ width: "60%", display: "flex", alignSelf: "center" }} src={restaurant.image?.[1]} />
                    </Card.Body>
                  </Card>
                </Link>
              );
          })}
    </>
  );
};

export default AllRestaurants;
