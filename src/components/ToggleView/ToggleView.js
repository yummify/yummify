import { useState } from "react";
import { Button } from "react-bootstrap";
import Map from "../Map/Map";
import AllRestaurants from "../AllRestaurants/AllRestaurants";

export default function ToggleView() {
  const [isMapView, setIsMapView] = useState(false);

  const handleToggleView = () => {
    setIsMapView(!isMapView);
  };

  const buttonStyle = {
    backgroundColor: "hsl(219, 100%, 57%)",
    border: "none",
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-3">
        <Button
          variant="secondary"
          className="mx-1"
          active={!isMapView}
          onClick={handleToggleView}
          style={buttonStyle}
        >
          List View
        </Button>
        <Button
          variant="secondary"
          className="mx-1"
          active={isMapView}
          onClick={handleToggleView}
          style={buttonStyle}
        >
          Map View
        </Button>
      </div>
      {isMapView ? <Map /> : <AllRestaurants />}
    </div>
  );
}
