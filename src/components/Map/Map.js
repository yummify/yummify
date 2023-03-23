import { useMemo, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { getPlaces } from "../../firebase/mapsSeed";
import "./map.css";

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const result = await getPlaces("restaurants", {
        location: { lat: 40.712776, lng: -74.005974 }, // example location (New York, NY)
        radius: 5000, // search radius in meters
      });
      setPlaces(result);
    };
    fetchPlaces();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return <MapContent places={places} />;
}

function MapContent({ places }) {
  const center = useMemo(() => ({ lat: 40.7075, lng: -74.0113 }), []);

  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handleCloseClick = () => {
    setSelectedPlace(null);
  };

  return (
    <GoogleMap zoom={14} center={center} mapContainerClassName="map-container">
      {places.map((place) => (
        <Marker
          key={place.id}
          position={{ lat: place.lat, lng: place.lng }}
          title={place.name}
          onClick={() => handleMarkerClick(place)}
        />
      ))}
      {selectedPlace && (
        <InfoWindow
          position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
          onCloseClick={handleCloseClick}
        >
          <div>
            <h3>{selectedPlace.name}</h3>
            <p>{selectedPlace.address}</p>
            <p>
              Phone:{" "}
              <a href={`tel:${selectedPlace.phone}`}>{selectedPlace.phone}</a>
            </p>
            <p>
              Website:{" "}
              <a
                href={selectedPlace.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedPlace.website}
              </a>
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
