import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { fetchAllRestaurants, selectRestaurants } from "./allRestaurantsSlice";
import { Link } from "react-router-dom";

const AllRestaurants = ({ searchTerm, selectedCuisine }) => {
  const allRestaurants = useSelector(selectRestaurants);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(allRestaurants);

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

  const noRestaurantsMessage = (
    <div style={{ textAlign: "center", padding: "40px", fontSize: "1.2em" }}>
      {selectedCuisine} options coming soon!
    </div>
  );

  return (
    <>
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
                    style={{ width: "30rem", backgroundColor: "#E5D4CE" }}
                    className="mb-2"
                  >
                    <Card.Header>{restaurant.restaurantName}</Card.Header>
                    <Card.Body>
                      <Card.Title>{restaurant.description}</Card.Title>
                      <Card.Text>Address: {restaurant.address}</Card.Text>
                      <Card.Img src={restaurant.image?.[1]} />
                      <Card.Text>Cuisine: {restaurant.cuisine}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              );
          })}
    </>
  );
};

export default AllRestaurants;
