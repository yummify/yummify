import { useState, useEffect } from "react";
import "./filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import options from "./Options";

const Filter = ({ handleCuisineSelect, selectedCuisine }) => {
  const [selectedCuisineLocal, setSelectedCuisineLocal] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setSelectedCuisineLocal(selectedCuisine);
  }, [selectedCuisine]);

  const handleSelect = (cuisine) => {
    setSelectedCuisineLocal(cuisine);
    if (cuisine === "All") {
      handleCuisineSelect(null);
    } else {
      handleCuisineSelect(cuisine);
    }
  };

  const handleScrollLeft = () => {
    const container = document.getElementById("filter-container");
    const newPosition = scrollPosition - container.offsetWidth;
    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
  };

  const handleScrollRight = () => {
    const container = document.getElementById("filter-container");
    const newPosition = scrollPosition + container.offsetWidth;
    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
  };

  return (
    <div className="filter-wrapper">
      <div className="filter-container" id="filter-container">
        {options.map((cuisineIcon) => (
          <div
            key={cuisineIcon.name}
            className={`cuisine-icon ${
              selectedCuisine === cuisineIcon.filter ? "selected" : ""
            }`}
            onClick={() => handleSelect(cuisineIcon.filter)}
          >
            {cuisineIcon.icon}
            <p>{cuisineIcon.name}</p>
          </div>
        ))}
      </div>
      <div className="scroll-arrows">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="arrow left-arrow"
          onClick={handleScrollLeft}
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          className="arrow right-arrow"
          onClick={handleScrollRight}
        />
      </div>
    </div>
  );
};

export default Filter;
