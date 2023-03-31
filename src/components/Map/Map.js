import { useMemo, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { db } from "../../firebase/config";
import "./map.css";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Map({ searchTerm, handleSearch, selectedCuisine }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [restaurants, setRestaurants] = useState([]);

  // pulling the restaurant collection data from the Firestore database
  useEffect(() => {
    async function fetchRestaurants() {
      const restaurantsCollection = collection(db, "restaurants");

      const snapshot = await getDocs(restaurantsCollection);

      const results = await Promise.all(
        snapshot.docs
          .filter((doc) => doc.data().status === "approved") // only get restaurants with status set to "approved"
          .map(async (doc) => {
            const data = doc.data();
            // makes a call to the Google Maps API to get the lat and lng coordinates for the restaurant's address
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                data.address
              )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            );

            const result = await response.json();
            const location =
              result.results && result.results.length > 0
                ? result.results[0].geometry.location
                : { lat: 0, lng: 0 };

            const photos =
              data.image && data.image.length > 0 ? data.image : null;
            const photoUrl = photos
              ? photos[1]
              : "https://via.placeholder.com/150";

            return {
              id: doc.id,
              name: data.restaurantName,
              address: data.address,
              phone: data.phoneNumber,
              website: data.website,
              cuisine: data.cuisine,
              lat: location.lat,
              lng: location.lng,
              image: photoUrl,
            };
          })
      );
      setRestaurants(results);
    }

    fetchRestaurants();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  // Filter restaurants by search term and selected cuisine
  const filteredRestaurants = restaurants
    .filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (restaurant) => !selectedCuisine || restaurant.cuisine === selectedCuisine
    );

  return (
    <MapContent restaurants={filteredRestaurants} handleSearch={handleSearch} />
  );
}

function MapContent({ restaurants, handleSearch }) {
  const center = useMemo(() => ({ lat: 40.7075, lng: -74.0113 }), []);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleMarkerClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleCloseClick = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName="map-container"
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={{ lat: restaurant.lat, lng: restaurant.lng }}
            title={restaurant.name}
            onClick={() => handleMarkerClick(restaurant)}
          />
        ))}
        {selectedRestaurant && (
          <InfoWindow
            position={{
              lat: selectedRestaurant.lat,
              lng: selectedRestaurant.lng,
            }}
            onCloseClick={handleCloseClick}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={selectedRestaurant.image}
                    alt="restaurant"
                    className="img-fluid"
                    style={{
                      width: "120px",
                      height: "120px",
                      float: "left",
                      marginRight: "30px",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <h3 className="mb-0">{selectedRestaurant.name}</h3>
                  <p className="mb-0">{selectedRestaurant.address}</p>
                  <p className="mb-0">
                    Phone:{" "}
                    <a href={`tel:${selectedRestaurant.phone}`}>
                      {selectedRestaurant.phone}
                    </a>
                  </p>
                  <p className="mb-0">
                    Website:{" "}
                    <a
                      href={selectedRestaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedRestaurant.website}
                    </a>
                  </p>
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <Link
                        to={`/restaurant/${selectedRestaurant.id}`}
                        className="btn btn-success btn-sm"
                      >
                        Reserve a Bag
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
