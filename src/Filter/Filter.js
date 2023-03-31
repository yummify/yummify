import { useState, useEffect } from "react";
import "./filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import frenchIcon from "./Icons/French.png";
import sushiIcon from "./Icons/Sushi.png";
import indianIcon from "./Icons/Indian.png";
import chineseIcon from "./Icons/Chinese.png";
import italianIcon from "./Icons/Italian.png";
import greekIcon from "./Icons/Greek.png";
import mexicanIcon from "./Icons/Mexican.png";
import thaiIcon from "./Icons/Thai.png";
import bakeryIcon from "./Icons/Bakery.png";
import saladIcon from "./Icons/Salad.png";
// import mediterraneanIcon from "./Icons/Mediterranean.png";
import pizzaIcon from "./Icons/Pizza.png";
import americanIcon from "./Icons/American.png";

const options = [
  {
    name: "All",
    icon: <img src={bakeryIcon} alt="All" />,
    filter: "All",
  },

  {
    name: "Italian",
    icon: <img src={italianIcon} alt="Italian" />,
    filter: "Italian",
  },
  {
    name: "French",
    icon: <img src={frenchIcon} alt="French" />,
    filter: "French",
  },
  {
    name: "Mexican",
    icon: <img src={mexicanIcon} alt="Mexican" />,
    filter: "Mexican",
  },
  { name: "Pizza", icon: <img src={pizzaIcon} alt="Pizza" />, filter: "Pizza" },
  {
    name: "American",
    icon: <img src={americanIcon} alt="American" />,
    filter: "American",
  },
  {
    name: "Chinese",
    icon: <img src={chineseIcon} alt="Chinese" />,
    filter: "Chinese",
  },
  { name: "Thai", icon: <img src={thaiIcon} alt="Thai" />, filter: "Thai" },

  { name: "Greek", icon: <img src={greekIcon} alt="Greek" />, filter: "Greek" },
  {
    name: "Salads",
    icon: <img src={saladIcon} alt="Salad" />,
    filter: "Salads",
  },
  { name: "Sushi", icon: <img src={sushiIcon} alt="Sushi" />, filter: "Sushi" },
  {
    name: "Indian",
    icon: <img src={indianIcon} alt="Indian" />,
    filter: "Indian",
  },
];

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
