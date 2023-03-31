import { useState } from "react";
import { Button } from "react-bootstrap";
import Map from "../Map/Map";
import AllRestaurants from "../AllRestaurants/AllRestaurants";
import SearchBar from "./SearchBar";

export default function ToggleView() {
  const [isMapView, setIsMapView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleView = () => {
    setIsMapView(!isMapView);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex">
          <Button
            variant="primary"
            className="mx-1"
            active={!isMapView}
            onClick={handleToggleView}
          >
            List View
          </Button>
          <Button
            variant="primary"
            className="mx-1"
            active={isMapView}
            onClick={handleToggleView}
          >
            Map View
          </Button>
        </div>
        <SearchBar handleSearch={handleSearch} />
      </div>
      {isMapView ? (
        <Map searchTerm={searchTerm} handleSearch={handleSearch} />
      ) : (
        <AllRestaurants searchTerm={searchTerm} handleSearch={handleSearch} />
      )}
    </div>
  );
}
