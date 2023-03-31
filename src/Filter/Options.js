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

export default options;
