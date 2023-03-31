import { useState } from "react";
import { Button } from "react-bootstrap";
import Map from "../Map/Map";
import AllRestaurants from "../AllRestaurants/AllRestaurants";
import SearchBar from "./SearchBar";
import Filter from "../../Filter/Filter";
import options from "../../Filter/Options";

export default function ToggleView() {
  const [isMapView, setIsMapView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const handleMapView = () => {
    setIsMapView(true);
  };

  const handleListView = () => {
    setIsMapView(false);
    setSearchTerm("");
    setSelectedCuisine(null);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex">
          <Button variant="primary" className="mx-1" onClick={handleListView}>
            List View
          </Button>
          <Button variant="primary" className="mx-1" onClick={handleMapView}>
            Map View
          </Button>
        </div>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <Filter
        handleCuisineSelect={handleCuisineSelect}
        selectedCuisine={selectedCuisine}
        options={options}
      />
      {isMapView ? (
        <Map
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          selectedCuisine={selectedCuisine}
          handleCuisineSelect={handleCuisineSelect}
        />
      ) : (
        <AllRestaurants
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          selectedCuisine={selectedCuisine}
          handleCuisineSelect={handleCuisineSelect}
        />
      )}
    </div>
  );
}
