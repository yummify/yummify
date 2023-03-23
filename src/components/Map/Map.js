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

export default function Map() {
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
        snapshot.docs.map(async (doc) => {
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

          return {
            id: doc.id,
            name: data.restaurantName,
            address: data.address,
            phone: data.phoneNumber,
            website: data.website,
            cuisine: data.cuisine,
            lat: location.lat,
            lng: location.lng,
          };
        })
      );
      setRestaurants(results);
    }

    fetchRestaurants();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return <MapContent restaurants={restaurants} />;
}

function MapContent({ restaurants }) {
  console.log(restaurants);
  const center = useMemo(() => ({ lat: 40.7075, lng: -74.0113 }), []);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleMarkerClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleCloseClick = () => {
    setSelectedRestaurant(null);
  };

  return (
    <GoogleMap zoom={14} center={center} mapContainerClassName="map-container">
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
          <div>
            <h3>{selectedRestaurant.name}</h3>
            <p>{selectedRestaurant.address}</p>
            <p>
              Phone:{" "}
              <a href={`tel:${selectedRestaurant.phone}`}>
                {selectedRestaurant.phone}
              </a>
            </p>
            <p>
              Website:{" "}
              <a
                href={selectedRestaurant.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedRestaurant.website}
              </a>
            </p>
            <p>{selectedRestaurant.cuisine}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
